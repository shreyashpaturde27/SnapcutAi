/**
 * Background removal service — typed seam for n8n + Cloudinary + AI API.
 *
 * Production wiring (do this when self-hosting):
 *   1. POST the file (or a Cloudinary signed-upload URL) to `VITE_N8N_WEBHOOK_URL`.
 *   2. n8n validates → uploads to Cloudinary → calls AI API → uploads result →
 *      inserts into Supabase `uploads` table → returns { id, originalUrl, resultUrl }.
 *   3. Replace the `simulateProcessing` body with a real fetch.
 *
 * The shape returned here is the contract the UI depends on — keep it stable.
 */

export type ProcessedImage = {
  id: string;
  originalUrl: string;
  resultUrl: string;
  fileName: string;
  sizeBytes: number;
  createdAt: string;
};

export type UploadConstraints = {
  maxBytes: number;
  maxDimension: number;
  acceptedTypes: readonly string[];
};

export const UPLOAD_LIMITS: UploadConstraints = {
  maxBytes: 10 * 1024 * 1024, // 10 MB
  maxDimension: 5000,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
} as const;

export function validateFile(file: File): string | null {
  if (!UPLOAD_LIMITS.acceptedTypes.includes(file.type)) {
    return "Unsupported format. Use JPG, PNG, or WEBP.";
  }
  if (file.size > UPLOAD_LIMITS.maxBytes) {
    return "File exceeds 10 MB limit.";
  }
  return null;
}

/**
 * Background removal service — sends binary image to n8n for processing.
 */
export async function processBackgroundRemoval(file: File): Promise<ProcessedImage> {
  const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "https://shreyash111.app.n8n.cloud/webhook-test/remove-background";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to process image: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      throw new Error("Empty response received from n8n. Ensure your workflow returns a JSON object with a 'url' field.");
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse n8n response as JSON:", responseText);
      throw new Error("Invalid JSON response from n8n. Check console for details.");
    }

    // The n8n webhook returns { "url": "..." }
    const resultUrl = data.url;

    if (!resultUrl) {
      throw new Error("No URL returned from processing service");
    }

    // The shape returned here is the contract the UI depends on — keep it stable.
    return {
      id: crypto.randomUUID(),
      originalUrl: URL.createObjectURL(file),
      resultUrl: resultUrl,
      fileName: file.name,
      sizeBytes: file.size,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Background removal error:", error);
    throw error;
  }
}
