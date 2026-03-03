// Loyalty system configuration and URL builders

export const LOYALTY_DEFAULTS = {
  pointsPerEuro: 10,
  rewardThreshold: 500,
  rewardDescription: "1 Bowl offert",
  welcomePoints: 50,
} as const;

function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/** Public inscription page URL for a restaurant */
export function getLoyaltyInscriptionURL(slug: string): string {
  return `${getAppUrl()}/loyalty/${slug}`;
}

/** PWA pass page URL for a specific client */
export function getLoyaltyPassURL(slug: string, barcode: string): string {
  return `${getAppUrl()}/loyalty/${slug}/pass/${barcode}`;
}

/** API endpoint to download Apple Wallet pass */
export function getApplePassURL(barcode: string): string {
  return `${getAppUrl()}/api/loyalty/pass/apple?barcode=${barcode}`;
}

/** API endpoint to get Google Wallet save link */
export function getGooglePassURL(barcode: string): string {
  return `${getAppUrl()}/api/loyalty/pass/google?barcode=${barcode}`;
}
