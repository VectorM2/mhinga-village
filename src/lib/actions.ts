"use server";

/**
 * Server actions for public forms.
 *
 * They validate input and return a result, but do not persist anything yet.
 * To go live, insert into Supabase where marked (tables in supabase/schema.sql)
 * and upload photos to the `report-photos` storage bucket.
 */
import { generateReference } from "./utils";

export type FormState = { ok: boolean; message?: string; reference?: string; errors?: Record<string, string> };

const REPORT_CATEGORIES = ["water", "electricity", "roads", "waste", "sewage", "streetlights", "infrastructure", "other"];
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitReport(_prev: FormState, fd: FormData): Promise<FormState> {
  const errors: Record<string, string> = {};
  const category = str(fd, "category");
  const description = str(fd, "description");
  const location = str(fd, "location");
  const photo = fd.get("photo");

  if (!REPORT_CATEGORIES.includes(category)) errors.category = "Please choose what the problem is about.";
  if (description.length < 10) errors.description = "Please describe the problem in a few more words.";
  if (location.length < 3) errors.location = "Please tell us where the problem is.";
  if (photo instanceof File && photo.size > 0) {
    if (!photo.type.startsWith("image/")) errors.photo = "Please upload an image file.";
    else if (photo.size > MAX_PHOTO_BYTES) errors.photo = "Photo must be smaller than 5 MB.";
  }
  if (Object.keys(errors).length) return { ok: false, errors, message: "Please check the highlighted fields." };

  const reference = generateReference("MH");
  // TODO(supabase): upload photo to storage bucket "report-photos", then
  // await supabase.from("service_reports").insert({ reference, category, description, location,
  //   reporter_name: str(fd, "name") || null, reporter_contact: str(fd, "contact") || null, photo_url, status: "submitted" });
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, reference, message: "Report submitted successfully." };
}

export async function submitBusiness(_prev: FormState, fd: FormData): Promise<FormState> {
  const errors: Record<string, string> = {};
  if (str(fd, "name").length < 2) errors.name = "Please enter the business name.";
  if (!str(fd, "category")) errors.category = "Please choose a category.";
  if (str(fd, "description").length < 10) errors.description = "Please describe what you offer.";
  if (str(fd, "phone").replace(/\D/g, "").length < 9) errors.phone = "Please enter a valid phone number.";
  if (!fd.get("consent")) errors.consent = "Please confirm you may list this business.";
  if (Object.keys(errors).length) return { ok: false, errors, message: "Please check the highlighted fields." };
  // TODO(supabase): insert into "businesses" with status = 'pending' for admin approval.
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, reference: generateReference("BIZ"), message: "Thank you! Your listing will appear once it has been reviewed." };
}

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  const errors: Record<string, string> = {};
  if (str(fd, "name").length < 2) errors.name = "Please enter your name.";
  if (str(fd, "contact").length < 5) errors.contact = "Please enter a phone number or email so we can reply.";
  if (str(fd, "message").length < 10) errors.message = "Please write a short message.";
  if (Object.keys(errors).length) return { ok: false, errors, message: "Please check the highlighted fields." };
  // TODO(supabase): insert into "contact_messages".
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, message: "Message sent. We'll get back to you as soon as we can." };
}

export async function submitPhoto(_prev: FormState, fd: FormData): Promise<FormState> {
  const photo = fd.get("photo");
  if (!(photo instanceof File) || photo.size === 0) return { ok: false, errors: { photo: "Please choose a photo." } };
  if (!photo.type.startsWith("image/")) return { ok: false, errors: { photo: "Please upload an image file." } };
  if (photo.size > MAX_PHOTO_BYTES * 2) return { ok: false, errors: { photo: "Photo must be smaller than 10 MB." } };
  if (!fd.get("consent")) return { ok: false, errors: { consent: "Please confirm you have permission to share this photo." } };
  // TODO(supabase): upload to "gallery" bucket and insert gallery_items row with status 'pending'.
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true, message: "Thank you! Your photo will be reviewed before it appears in the gallery." };
}
