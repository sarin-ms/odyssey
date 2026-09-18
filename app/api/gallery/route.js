import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GALLERY_PATH = path.join(process.cwd(), "database", "gallery.json");

function readGallery() {
  try {
    const data = fs.readFileSync(GALLERY_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeGallery(entries) {
  const dir = path.dirname(GALLERY_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(GALLERY_PATH, JSON.stringify(entries, null, 2));
}

// GET — return all gallery entries (newest first)
export async function GET() {
  const entries = readGallery();
  return NextResponse.json(entries.reverse());
}

// POST — upload image to imgBB and save entry
export async function POST(request) {
  try {
    const { image, name, frame } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "imgBB API key not configured" },
        { status: 500 },
      );
    }

    // Strip data URL prefix to get raw base64
    const base64 = image.replace(/^data:image\/\w+;base64,/, "");

    // Upload to imgBB
    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", base64);
    formData.append("name", `odyssey-${Date.now()}`);

    const imgbbRes = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!imgbbRes.ok) {
      const errText = await imgbbRes.text();
      console.error("imgBB upload failed:", errText);
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 502 },
      );
    }

    const imgbbData = await imgbbRes.json();
    const imageUrl = imgbbData.data?.display_url || imgbbData.data?.url;
    const thumbUrl = imgbbData.data?.thumb?.url || imageUrl;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to get image URL" },
        { status: 502 },
      );
    }

    // Save to gallery
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      imageUrl,
      thumbUrl,
      name: name || "Anonymous",
      frame: frame || "Unknown",
      createdAt: new Date().toISOString(),
    };

    const entries = readGallery();
    entries.push(entry);
    writeGallery(entries);

    return NextResponse.json({ success: true, entry });
  } catch (err) {
    console.error("Gallery POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
