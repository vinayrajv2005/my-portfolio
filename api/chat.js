// api/chat.js  –  Vercel Serverless Function (Edge-compatible)
// Place this file at:  /api/chat.js  in your project root
//
// In your Vercel dashboard → Project → Settings → Environment Variables
// add:  ANTHROPIC_API_KEY = sk-ant-xxxxxxxxxxxxxxxx

export const config = { runtime: "edge" };

const VINAY_CONTEXT = `You are a helpful assistant on Vinay Raj V's portfolio website. Here is everything about Vinay:
- Name: Vinay Raj V
- Role: 6th Semester AIML (Artificial Intelligence & Machine Learning) student
- Location: Shivamogga, Karnataka, India
- Portfolio: https://my-portfolio-nmj4.vercel.app/
- Skills: Python, Machine Learning, React, Flask, PyTorch, Pandas, NumPy, Scikit-learn, OpenCV, TensorFlow, Node.js, MongoDB, Power BI, Tableau, MS Fabric, Git, Streamlit
- Projects: 4 AI/ML projects (ClassBridge AI, Fitness Guru, and more)
- Education: B.E. in AIML, currently in 6th semester at JNNCE Shivamogga
- Interests: NLP, Computer Vision, Generative AI, MLOps
- Open to: Internships, collaborations, freelance ML/AI projects
- GitHub: https://github.com/vinayrajv2005
- LinkedIn: https://www.linkedin.com/in/vinay-raj-v-b89963341/
- Email: vinayrajv33@gmail.com
Answer questions about Vinay warmly and professionally. Keep answers concise (2-4 sentences). If asked something you don't know specifically, say Vinay would be happy to discuss it directly.`;

export default async function handler(req) {
  // Allow CORS for your own domain
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }

  try {
    const { messages } = await req.json();

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // Fast & cheap for a chatbot
        max_tokens: 512,
        system: VINAY_CONTEXT,
        messages,
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text();
      return new Response(JSON.stringify({ error: err }), { status: anthropicRes.status, headers });
    }

    const data = await anthropicRes.json();
    const reply = data.content?.[0]?.text ?? "I'm not sure how to answer that!";
    return new Response(JSON.stringify({ reply }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
