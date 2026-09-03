export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { query, count = 1 } = request.query;

    if (!query) {
      return response.status(400).json({
        error: "Missing image search query.",
      });
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      console.error("UNSPLASH_ACCESS_KEY is missing");
      return response.status(500).json({
        error: "Unsplash API key is not configured.",
      });
    }

    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!unsplashResponse.ok) {
      const errorText = await unsplashResponse.text();

      console.error(
        "Unsplash API error:",
        unsplashResponse.status,
        errorText
      );

      return response.status(unsplashResponse.status).json({
        error: "Unable to fetch images from Unsplash.",
      });
    }

    const data = await unsplashResponse.json();

    return response.status(200).json(data.results);
  } catch (error) {
    console.error("Image API error:", error);

    return response.status(500).json({
      error: "Something went wrong while fetching images.",
    });
  }
}