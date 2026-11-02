import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "essaimeko@gmail.com";
const ADMIN_PASSWORD = "PrintForex2026!";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "printforex-admin-secret-key-2026";
const COOKIE_NAME = "pf_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function generateSessionToken(email: string): string {
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const payload = `${email}:${expiresAt}`;
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

function verifySessionToken(token: string): { valid: boolean; email?: string } {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, expiresAtStr, receivedHmac] = decoded.split(":");
    if (!email || !expiresAtStr || !receivedHmac) return { valid: false };

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return { valid: false };

    const expectedPayload = `${email}:${expiresAt}`;
    const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(expectedPayload).digest("hex");
    if (crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac))) {
      return { valid: true, email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

// Check session
export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const { valid, email } = verifySessionToken(token);
  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    authenticated: true,
    email,
  });
}

// Authenticate Admin
export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Format JSON invalide ou corps de requête vide." },
        { status: 400 }
      );
    }
    const { email, password } = body;

    const normalizedEmail = (email || "").trim().toLowerCase();
    const providedPassword = (password || "").trim();

    if (normalizedEmail !== ADMIN_EMAIL.toLowerCase() || providedPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifiants invalides. Veuillez vérifier l'adresse email et le mot de passe administrateur.",
        },
        { status: 401 }
      );
    }

    const sessionToken = generateSessionToken(normalizedEmail);
    const response = NextResponse.json({
      success: true,
      email: normalizedEmail,
      message: "Connexion administrateur réussie.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION_SECONDS,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de la tentative de connexion." },
      { status: 500 }
    );
  }
}

// Log out
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Déconnecté" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
