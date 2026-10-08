"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper to save a file locally and return its public URL path
async function saveLocalFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure public/uploads directory exists
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {
    // Ignore if exists
  }

  const ext = file.name.split(".").pop();
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  await writeFile(filePath, buffer);
  
  // Return the path that the browser will use to fetch the image
  return `/uploads/${uniqueName}`;
}

export async function uploadAlbum(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const mainImage = formData.get("mainImage") as File;
  
  // Get all other images (FormData can have multiple entries with the same key)
  const otherImages = formData.getAll("otherImages") as File[];

  if (!name || !mainImage || mainImage.size === 0) {
    throw new Error("Name and Main Image are required.");
  }

  // 1. Save main image locally
  const mainImageUrl = await saveLocalFile(mainImage);

  // 2. Insert album into Supabase DB
  const { data: albumData, error: albumError } = await supabase
    .from("albums")
    .insert([{ name, description, main_image_url: mainImageUrl }])
    .select()
    .single();

  if (albumError) {
    throw new Error(`Failed to create album in database: ${albumError.message}`);
  }

  // 3. Save other images locally and link to DB
  const validOtherImages = otherImages.filter((file) => file.size > 0);
  
  if (validOtherImages.length > 0) {
    const imageRecords = [];
    
    for (const file of validOtherImages) {
      const url = await saveLocalFile(file);
      imageRecords.push({
        album_id: albumData.id,
        image_url: url,
      });
    }

    const { error: imagesError } = await supabase
      .from("album_images")
      .insert(imageRecords);

    if (imagesError) {
      throw new Error(`Failed to save extra images in database: ${imagesError.message}`);
    }
  }

  revalidatePath("/gallery");
  revalidatePath("/admin");
  redirect("/admin");
}
