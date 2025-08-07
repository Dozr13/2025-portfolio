import { envConfig } from "@/lib/config"
import { handleCors } from "@/lib/utils/cors"
import { JWT_SECRET } from "@/lib/utils/jwt"
import { SignJWT, jwtVerify } from "jose"
import { NextResponse } from "next/server"

// Admin credentials (in production, use a proper user management system)
const ADMIN_CREDENTIALS = {
  username: envConfig.ADMIN_USERNAME,
  password: envConfig.ADMIN_PASSWORD
}

export async function OPTIONS() {
  return handleCors()
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({ 
      username,
      role: "admin",
      iat: Math.floor(Date.now() / 1000)
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    const response = NextResponse.json({ 
      success: true, 
      token,
      user: { username, role: "admin" }
    })

    // Set httpOnly cookie for additional security
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.headers.get("cookie")?.split("adminToken=")[1]?.split(";")[0]
    const token = authHeader?.replace("Bearer ", "") || cookieToken

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      )
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)

    return NextResponse.json({
      authenticated: true,
      user: {
        username: payload.username,
        role: payload.role
      }
    })

  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }
}
