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
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: VINAY_CONTEXT,
        messages,
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text();
      return res.status(anthropicRes.status).json({ error: err });
    }

    const data = await anthropicRes.json();
    const reply = data.content?.[0]?.text ?? "I'm not sure how to answer that!";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: err.message });
  }
}