import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactConfirmation, sendAdminNotification } from "@/lib/email/brevo";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(30).optional().default(""),
  category: z.enum(["real-estate", "automobiles", "luxury-goods", "timepieces", "other"]),
  message: z.string().min(10, "Please provide more detail").max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await Promise.all([
      sendContactConfirmation(data),
      sendAdminNotification(data),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", JSON.stringify(error, Object.getOwnPropertyNames(error as object)));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
