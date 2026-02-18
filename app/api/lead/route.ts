export const runtime = "nodejs";

type Locale = "id" | "en";

type LeadPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  locale?: Locale;
  company?: string;
  startedAt?: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FORM_FILL_TIME_MS = 1500;
const ALLOWED_PROJECT_TYPES = [
  "web_app",
  "landing_page",
  "ecommerce",
  "mobile_app",
  "ui_ux_design",
  "graphic_design",
  "video_editing",
  "social_media",
  "ads_management",
  "seo",
  "article_writing",
  "copywriting",
  "translation",
  "ai_system",
  "automation",
  "consulting",
  "other_digital",
] as const;

const ipRequests = new Map<string, number[]>();

function now() {
  return Date.now();
}

function normalizeLocale(value: unknown): Locale {
  return value === "id" ? "id" : "en";
}

function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const current = now();
  const bucket = ipRequests.get(ip) ?? [];
  const freshBucket = bucket.filter((time) => current - time < WINDOW_MS);

  if (freshBucket.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequests.set(ip, freshBucket);
    return true;
  }

  freshBucket.push(current);
  ipRequests.set(ip, freshBucket);
  return false;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOption(
  value: string,
  allowedValues: ReadonlyArray<string>
): boolean {
  return allowedValues.includes(value);
}

function validateLead(payload: LeadPayload, locale: Locale): string | null {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const projectType = payload.projectType?.trim() ?? "";
  const budget = payload.budget?.trim() ?? "";
  const timeline = payload.timeline?.trim() ?? "";

  if (payload.company && payload.company.trim() !== "") {
    return locale === "id"
      ? "Permintaan ditolak oleh sistem anti-spam."
      : "Submission blocked by anti-spam system.";
  }

  if (
    typeof payload.startedAt === "number" &&
    now() - payload.startedAt < MIN_FORM_FILL_TIME_MS
  ) {
    return locale === "id"
      ? "Mohon isi formulir dengan benar lalu kirim ulang."
      : "Please complete the form properly and submit again.";
  }

  if (name.length < 2 || name.length > 80) {
    return locale === "id"
      ? "Nama harus 2 sampai 80 karakter."
      : "Name must be between 2 and 80 characters.";
  }

  if (!isValidEmail(email)) {
    return locale === "id"
      ? "Format email tidak valid."
      : "Email format is invalid.";
  }

  if (!isAllowedOption(projectType, ALLOWED_PROJECT_TYPES)) {
    return locale === "id"
      ? "Tipe proyek tidak valid."
      : "Project type is invalid.";
  }

  if (!isAllowedOption(budget, ["lt_1k", "1k_5k", "5k_20k", "20k_plus"])) {
    return locale === "id"
      ? "Rentang budget tidak valid."
      : "Budget range is invalid.";
  }

  if (!isAllowedOption(timeline, ["asap", "2_4_weeks", "1_3_months", "flexible"])) {
    return locale === "id"
      ? "Timeline tidak valid."
      : "Timeline is invalid.";
  }

  if (message.length < 20 || message.length > 2000) {
    return locale === "id"
      ? "Pesan harus 20 sampai 2000 karakter."
      : "Message must be between 20 and 2000 characters.";
  }

  return null;
}

async function forwardToWebhook(payload: LeadPayload) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return;

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "rvldporto",
      sentAt: new Date().toISOString(),
      lead: {
        name: payload.name,
        email: payload.email,
        projectType: payload.projectType,
        budget: payload.budget,
        timeline: payload.timeline,
        message: payload.message,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Webhook rejected (${res.status}): ${body}`);
  }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Too many submissions. Please try again later.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }

    const payload = (await req.json()) as LeadPayload;
    const locale = normalizeLocale(payload.locale);

    const validationError = validateLead(payload, locale);
    if (validationError) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: validationError,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }

    await forwardToWebhook(payload);

    console.info("[lead-submission]", {
      name: payload.name,
      email: payload.email,
      projectType: payload.projectType,
      budget: payload.budget,
      timeline: payload.timeline,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message:
          locale === "id"
            ? "Terima kasih. Pesan Anda sudah terkirim."
            : "Thanks. Your inquiry has been sent.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  } catch (error) {
    console.error("Lead route failed:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Server failed to process this request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }
}
