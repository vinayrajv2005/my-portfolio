// api/chat.js — Vercel Serverless Function using Groq (Free!)

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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    let { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Normalize messages
    messages = messages
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({ role: m.role, content: m.content || m.text || "" }));

    // Must start with user message
    while (messages.length > 0 && messages[0].role !== "user") {
      messages.shift();
    }

    // Remove consecutive duplicate roles
    const cleaned = [];
    for (const msg of messages) {
      if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== msg.role) {
        cleaned.push(msg);
      }
    }

    if (cleaned.length === 0) {
      return res.status(400).json({ error: "No valid messages" });
    }

    // Add system message for Groq
    const groqMessages = [
      { role: "system", content: VINAY_CONTEXT },
      ...cleaned,
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 512,
        messages: groqMessages,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq error:", JSON.stringify(data));
      return res.status(groqRes.status).json({ error: data.error?.message || "Groq API error" });
    }

    const reply = data.choices?.[0]?.message?.content ?? "I'm not sure how to answer that!";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}