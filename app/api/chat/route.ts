export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Custom simple RAG logic (Mock)
  let responseText = "Hello! I'm Revaldo's AI Assistant. I can tell you about his skills, experience, or contact info. What would you like to know?";
  
  if (lastMessage.includes("skill") || lastMessage.includes("stack")) {
    responseText = "Revaldo is proficient in Next.js, Python, TypeScript, and AI Engineering tools like LangChain and OpenAI API. He also masters creative tools like Blender and After Effects.";
  } else if (lastMessage.includes("contact") || lastMessage.includes("email")) {
    responseText = "You can reach Revaldo at revaldo@example.com or connect via LinkedIn.";
  } else if (lastMessage.includes("rate") || lastMessage.includes("price")) {
    responseText = "For rates and project estimates, please contact Revaldo directly via email.";
  } else if (lastMessage.includes("project") || lastMessage.includes("work")) {
    responseText = "Revaldo has worked on high-scale systems serving millions of users. Check out the 'Work' section above!";
  }

  // Simulate AI streaming response
  const encoder = new TextEncoder();
  const words = responseText.split(" ");
  
  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise(r => setTimeout(r, 50 + Math.random() * 50)); // Random typing speed
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
