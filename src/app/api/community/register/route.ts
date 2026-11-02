import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";

export const dynamic = "force-dynamic";

interface RegistrationPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  age?: string;
  city?: string;
  country?: string;
  experience?: string;
  consent?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_EXPERIENCE = ["Beginner", "Intermediate", "Advanced", "Professional"] as const;

export async function POST(req: NextRequest) {
  try {
    let body: RegistrationPayload = {};
    try {
      body = ((await req.json()) || {}) as RegistrationPayload;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format or empty request body." },
        { status: 400 }
      );
    }
    const errors: Record<string, string> = {};

    // 1. Validation: Full Name
    const fullName = (body.fullName || "").trim();
    if (!fullName) {
      errors.fullName = "Full name is required.";
    } else if (fullName.length < 2 || fullName.length > 100) {
      errors.fullName = "Full name must be between 2 and 100 characters.";
    }

    // 2. Validation: Email
    const email = (body.email || "").trim().toLowerCase();
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(email) || email.length > 150) {
      errors.email = "Please provide a valid email address.";
    }

    // 3. Validation: Phone
    const phone = (body.phone || "").trim();
    if (!phone) {
      errors.phone = "Phone or WhatsApp contact is required.";
    } else if (phone.length < 6 || phone.length > 30) {
      errors.phone = "Please provide a valid phone number.";
    }

    // 4. Validation: Country
    const country = (body.country || "").trim();
    if (!country) {
      errors.country = "Country selection is required.";
    } else if (country.length > 100) {
      errors.country = "Country name is too long.";
    }

    // 5. Validation: Experience
    const experience = (body.experience || "").trim();
    if (!experience) {
      errors.experience = "Trading experience level is required.";
    } else if (!ALLOWED_EXPERIENCE.includes(experience as any)) {
      errors.experience = "Invalid experience selection.";
    }

    // 6. Validation: Consent
    if (body.consent !== true) {
      errors.consent = "You must agree to the Privacy Policy to join.";
    }

    // 7. Optional fields sanitization
    const age = (body.age || "").trim().slice(0, 10);
    const city = (body.city || "").trim().slice(0, 100);

    // If validation fails, return 400 Bad Request
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors: errors,
        },
        { status: 400 }
      );
    }

    // 8. Secure Persistent Write to Firestore
    const registrationRecord = {
      fullName,
      email,
      phone,
      age: age || null,
      city: city || null,
      country,
      experience,
      consent: true,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    let docRef;
    try {
      docRef = await addDoc(collection(db, "registrations"), registrationRecord);
    } catch (writeErr) {
      handleFirestoreError(writeErr, OperationType.CREATE, "registrations");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your application to join PRINTFOREX community has been successfully registered.",
        registrationId: docRef.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
