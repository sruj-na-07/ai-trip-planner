export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { type, destination, question, days, travelStyle } =
      request.body;

    // Basic validation
    if (!type || !destination) {
      return response.status(400).json({
        error: "Missing required information.",
      });
    }

    let prompt = "";

    // ---------------- CHAT ASSISTANT ----------------

    if (type === "chat") {
      if (!question) {
        return response.status(400).json({
          error: "Please enter a question.",
        });
      }

      prompt = `
You are a thoughtful and knowledgeable travel concierge for a premium travel discovery application.

The user is currently exploring ${destination.name}, ${destination.country}.

Answer this travel-related question:

"${question}"

Response guidelines:
- Give accurate, practical, and useful travel advice.
- Be concise and aim for approximately 80–130 words unless the question genuinely requires more detail.
- Make the answer easy to scan.
- Use Markdown formatting naturally when useful.
- Use short paragraphs and bullet points where appropriate.
- Do not use unnecessarily large headings.
- Do not repeat the user's question.
- Focus specifically on ${destination.name}.
- Maintain a warm, refined, and helpful tone.

Do not mention that you are an AI or language model.
`;
    }

    // ---------------- ITINERARY PLANNER ----------------

    if (type === "itinerary") {
      if (!days || !travelStyle) {
        return response.status(400).json({
          error: "Please provide the number of days and travel style.",
        });
      }

     prompt = `
You are an expert travel planner creating a personalised itinerary for a premium travel application.

Create a realistic ${days}-day itinerary for ${destination.name}, ${destination.country}.

Travel style: ${travelStyle}.

Return ONLY valid JSON in exactly the following structure:

{
  "itinerary": [
    {
      "day": 1,
      "title": "A short and engaging title for the day",
      "morning": "A specific morning activity or experience",
      "afternoon": "A specific afternoon activity or experience",
      "evening": "A specific evening activity or experience"
    }
  ]
}

Important rules:
- Return exactly ${days} days.
- Use valid JSON only.
- Do not use Markdown or code fences.
- Do not include any explanation before or after the JSON.
- Make the itinerary geographically sensible and realistic.
- Group nearby attractions together on the same day where possible.
- Avoid repeating places or activities.
- Match the activities to the selected travel style: ${travelStyle}.
- Each activity description should be concise, specific, and useful.
- Do not include generic filler activities.
`;
    }

    if (type !== "chat" && type !== "itinerary") {
  return response.status(400).json({
    error: "Invalid AI request type.",
  });
}

    // ---------------- GROQ API REQUEST ----------------

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-20b",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.7,

          max_tokens:
            type === "itinerary" ? 1800 : 500,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();

      console.error("Groq API error:", errorData);

      return response.status(groqResponse.status).json({
        error:
          errorData?.error?.message ||
          "The AI service is temporarily unavailable.",
      });
    }

    const data = await groqResponse.json();

    const aiResponse =
      data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response received from AI.");
    }

    // ---------------- FORMAT RESPONSE ----------------

    if (type === "itinerary") {
      try {
        // Remove accidental markdown code fences if AI adds them
        const cleanedResponse = aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsedItinerary =
          JSON.parse(cleanedResponse);

        return response.status(200).json(
          parsedItinerary
        );
      } catch (parseError) {
        console.error(
          "Itinerary parsing error:",
          parseError
        );

        return response.status(500).json({
          error:
            "The itinerary could not be formatted correctly. Please try again.",
        });
      }
    }

    return response.status(200).json({
      response: aiResponse,
    });
  } catch (error) {
    console.error("Server error:", error);

    return response.status(500).json({
      error:
        "Something went wrong while connecting to the AI assistant.",
    });
  }
}