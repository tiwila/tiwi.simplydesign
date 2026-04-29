import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const IMAGE_MAP: Record<string, string> = {
  mosm:
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_Desktop_-_3-24a74ff3-4de1-4acd-8cd5-f176d5c8824a.png",
  theralink:
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_image-58843fd1-945d-4aea-8c8d-d3538a8981b7.png",
  "theralink-midfi":
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_image-a753070d-53c9-42e9-81fc-ed4d4ca7d894.png",
  "theralink-journey":
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_user_journey_map_thera-e7c5cc51-cad6-4498-98bf-455c885b2f05.png",
  "theralink-findings":
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_image-b2bb40be-39d0-477d-bb75-8d345ef6af2a.png",
  moro:
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_Screenshot__1_-dc1c2ab5-8222-4d75-897d-e61af005005b.png",
  linkedin:
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_image-f5d53d27-8ea8-4069-8b2b-1be695b0ba97.png",
  about:
    "C:\\Users\\tiwil\\.cursor\\projects\\c-Users-tiwil-OneDrive-Desktop-tiwi-s-portfolio\\assets\\c__Users_tiwil_AppData_Roaming_Cursor_User_workspaceStorage_02084a530671ca44fec34f659202c3d8_images_image-10b66b9b-0e3f-461c-870b-f865d3fa7bba.png"
};

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key || !(key in IMAGE_MAP)) {
    return NextResponse.json({ error: "Unknown image key" }, { status: 400 });
  }

  const filePath = IMAGE_MAP[key];
  try {
    const buffer = await fs.readFile(filePath);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentTypeFor(filePath),
        "Cache-Control": "no-store, max-age=0"
      }
    });
  } catch {
    return NextResponse.json({ error: "Image not found on disk" }, { status: 404 });
  }
}

