import fs from "node:fs/promises";
import { NextResponse } from "next/server";

const RESUME_PATH = "C:\\Users\\tiwil\\Downloads\\professional design resume (2) (1).pdf";

export async function GET() {
  try {
    const buffer = await fs.readFile(RESUME_PATH);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Tiwi-Lanre-Adisa-Resume.pdf"',
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch {
    return NextResponse.json({ error: "Resume file not found." }, { status: 404 });
  }
}
