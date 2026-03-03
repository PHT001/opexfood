import { nanoid } from "nanoid";
import QRCode from "qrcode";

/**
 * Generate a unique barcode string for a loyalty client.
 * Format: OPX-<SLUG_PREFIX>-<NANOID>
 */
export function generateBarcode(slug: string): string {
  const prefix = slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const id = nanoid(8);
  return `OPX-${prefix}-${id}`;
}

/**
 * Generate a QR code as a base64 data URL (PNG).
 * Used for displaying QR codes in the browser.
 */
export async function generateQRCodeDataURL(
  data: string,
  options?: { width?: number; margin?: number }
): Promise<string> {
  return QRCode.toDataURL(data, {
    width: options?.width ?? 300,
    margin: options?.margin ?? 2,
    color: { dark: "#0f172a", light: "#ffffff" },
    errorCorrectionLevel: "M",
  });
}

/**
 * Generate a QR code as an SVG string.
 * Used for high-quality print downloads.
 */
export async function generateQRCodeSVG(
  data: string,
  options?: { width?: number; margin?: number }
): Promise<string> {
  return QRCode.toString(data, {
    type: "svg",
    width: options?.width ?? 600,
    margin: options?.margin ?? 2,
    color: { dark: "#0f172a", light: "#ffffff" },
    errorCorrectionLevel: "M",
  });
}

/**
 * Generate a QR code as a PNG Buffer.
 * Used for API responses (Content-Type: image/png).
 */
export async function generateQRCodeBuffer(
  data: string,
  options?: { width?: number; margin?: number }
): Promise<Buffer> {
  return QRCode.toBuffer(data, {
    width: options?.width ?? 600,
    margin: options?.margin ?? 2,
    color: { dark: "#0f172a", light: "#ffffff" },
    errorCorrectionLevel: "M",
  });
}

/**
 * Normalize a French phone number to digits only (without country code).
 * "06 12 34 56 78" → "0612345678"
 * "+33 6 12 34 56 78" → "0612345678"
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("33") && digits.length === 11) {
    return "0" + digits.slice(2);
  }
  return digits;
}

/**
 * Format a normalized phone for display.
 * "0612345678" → "06 12 34 56 78"
 */
export function formatPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  return normalized.replace(/(\d{2})(?=\d)/g, "$1 ");
}
