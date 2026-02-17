export const runtime = "edge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ASSISTANT_FALLBACK =
  "Hi, I am Revaldo's AI Assistant. I can help with his stack, projects, availability, and contact details.";

const SYSTEM_PROMPT = [
  "You are Revaldo Putra Anggara's portfolio assistant.",
  "Keep answers concise, clear, and practical.",
  "Only claim details that are consistent with this portfolio:",
  "- Role: System Architect and Precision Developer",
  "- Stack: Next.js, React, TypeScript, Python, Tailwind, AI engineering tools",
  "- Focus: scalable systems, performance, product-minded engineering",
  "- Contact channel: revaldo@example.com, LinkedIn",
  "If asked outside scope, be transparent and redirect to contact.",
].join("\n");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const chunks = text.split(/(\s+)/).filter(Boolean);

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await sleep(20 + Math.random() * 35);
      }
      controller.close();
    },
  });
}

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const role = "role" in item ? item.role : undefined;
      const content = "content" in item ? item.content : undefined;

      if (
        (role !== "user" && role !== "assistant") ||
        typeof content !== "string"
      ) {
        return null;
      }

      const cleanContent = content.trim();
      if (!cleanContent) return null;

      return { role, content: cleanContent } as ChatMessage;
    })
    .filter((item): item is ChatMessage => item !== null)
    .slice(-12);
}

function buildFallbackReply(messages: ChatMessage[]) {
  const lastUserMessage =
    [...messages].reverse().find((msg) => msg.role === "user")?.content ?? "";
  const text = lastUserMessage.toLowerCase();

  if (!text) return ASSISTANT_FALLBACK;

  if (/(hello|hi|hey|halo|hai|yo|sup)/.test(text)) {
    return "Hi. Ask me about Revaldo's stack, selected work, availability, or contact and I will help quickly.";
  }

  if (
    /(skill|stack|tech|teknologi|tools?|kemampuan|expertise|framework)/.test(
      text
    )
  ) {
    return "Revaldo's core stack is Next.js, React, TypeScript, Python, and Tailwind. He also works with AI engineering tooling and performance-focused web architecture.";
  }

  if (/(project|work|portfolio|case study|proyek|pengalaman)/.test(text)) {
    return "Revaldo builds scalable products such as real-time analytics systems, distributed processing pipelines, and edge-ready web platforms with strong performance metrics.";
  }

  if (/(hire|available|availability|freelance|collab|kerja sama|tersedia)/.test(text)) {
    return "Revaldo is open to discussing new projects. Share your scope, timeline, and goals, then continue through email for a proper plan.";
  }

  if (/(contact|email|linkedin|github|kontak|hubungi)/.test(text)) {
    return "You can contact Revaldo at revaldo@example.com and connect via LinkedIn. Include your project scope, target timeline, and expected outcomes.";
  }

  if (/(rate|price|cost|budget|harga|tarif)/.test(text)) {
    return "Rates depend on scope, timeline, and system complexity. Send project details to revaldo@example.com for a tailored estimate.";
  }

  if (/(about|who are you|siapa|profil|background)/.test(text)) {
    return "Revaldo Putra Anggara is a system architect and precision-focused developer. He combines product thinking with scalable engineering and AI-enabled workflows.";
  }

  return "I can help with Revaldo's stack, work, collaboration availability, and contact details. Tell me what you need and I will answer directly.";
}

async function generateModelReply(messages: ChatMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenAI request failed:", response.status, errorBody);
      return null;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content?.trim();
    return content || null;
  } catch (error) {
    console.error("Failed to generate model reply:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = normalizeMessages(body?.messages);

    if (messages.length === 0) {
      return new Response("Please send at least one valid message.", {
        status: 400,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const modelReply = await generateModelReply(messages);
    const finalReply = modelReply ?? buildFallbackReply(messages);

    return new Response(streamText(finalReply), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Chat route failed:", error);

    return new Response(streamText(ASSISTANT_FALLBACK), {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}
