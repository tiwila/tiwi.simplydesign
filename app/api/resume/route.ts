import { NextResponse } from "next/server";

const RESUME_URL =
  "https://drive.google.com/file/d/1vfiwDxfMezvEQljHFsaTNSjKdPJtvARz/view?usp=sharing";

export async function GET() {
  return NextResponse.redirect(RESUME_URL, 302);
}
