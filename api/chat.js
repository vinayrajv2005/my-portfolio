// api/chat.js — Vercel Serverless Function (Node.js runtime)

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
    // Parse body manually if needed
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 512,
        system: VINAY_CONTEXT,
        messages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      console.error("Anthropic error:", JSON.stringify(data));
      return res.status(anthropicRes.status).json({ error: data.error?.message || "Anthropic API error" });
    }

    const reply = data.content?.[0]?.text ?? "I'm not sure how to answer that!";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
