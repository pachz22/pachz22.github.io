import { NextResponse } from "next/server"

// In a real application, these would be stored in a database
const validCoupons = new Set([
  "ABCDE-12345-FGHIJ-67890-KLMNO",
  "PQRST-54321-UVWXY-09876-ZABCD",
  // ... add 18 more unique coupon codes here
])

const usedCoupons = new Set()

export async function POST(req: Request) {
  const { couponCode } = await req.json()

  if (!couponCode) {
    return NextResponse.json({ message: "Coupon code is required" }, { status: 400 })
  }

  if (!validCoupons.has(couponCode)) {
    return NextResponse.json({ message: "Invalid coupon code" }, { status: 400 })
  }

  if (usedCoupons.has(couponCode)) {
    return NextResponse.json({ message: "Coupon has already been used" }, { status: 400 })
  }

  // Mark the coupon as used
  usedCoupons.add(couponCode)

  // In a real application, you would process the order here

  return NextResponse.json({ message: "Coupon redeemed successfully" }, { status: 200 })
}

