export const searchImages = async (query, count = 3) => {
  const response = await fetch(
    `/api/images?query=${encodeURIComponent(query)}&count=${count}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch images");
  }

  return await response.json();
};