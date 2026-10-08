"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();
  await supabase.from("bookings").delete().eq("id", id);
  revalidatePath("/admin");
}
