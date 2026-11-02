import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, doc, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "printforex-admin-secret-key-2026";
const COOKIE_NAME = "pf_admin_session";

function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, expiresAtStr, receivedHmac] = decoded.split(":");
    if (!email || !expiresAtStr || !receivedHmac) return false;
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;
    const expectedPayload = `${email}:${expiresAt}`;
    const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(expectedPayload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac));
  } catch {
    return false;
  }
}

// GET all registrations
export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const registrations = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        fullName: data.fullName || "Sans nom",
        email: data.email || "",
        phone: data.phone || "",
        age: data.age || null,
        city: data.city || null,
        country: data.country || "Non spécifié",
        experience: data.experience || "Beginner",
        consent: !!data.consent,
        status: data.status || "pending",
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null,
      };
    });

    return NextResponse.json({ success: true, count: registrations.length, registrations });
  } catch (error: any) {
    console.error("Failed to fetch registrations:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH status
export async function PATCH(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Format JSON invalide ou corps vide." },
        { status: 400 }
      );
    }
    const { id, status } = body;
    if (!id || !["pending", "contacted", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, error: "Paramètres invalides" }, { status: 400 });
    }

    const docRef = doc(db, "registrations", id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, id, status });
  } catch (error: any) {
    console.error("Failed to update registration status:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
