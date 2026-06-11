exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ text: data.content?.[0]?.text || "Error" })
  };
};
