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

    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!unsplashResponse.ok) {
      const errorData = await unsplashResponse.json();

      console.error("Unsplash API error:", errorData);

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