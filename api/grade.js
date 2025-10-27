import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { answers, correct } = req.body;
  const prompt = `
Compare the player's answers with the list of correct oddities.
Mark each as correct, close, or wrong, and write a short one-sentence reply.
answers: ${answers}
correct oddities: ${correct}
`;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  res.json({ message: completion.choices[0].message.content });
}
