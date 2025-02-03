/**
 * fetchImages Utility Function
 *
 * This function generates an array of image URLs using the Picsum Photos API.
 * It creates a specified number of random images by appending a unique `random` query parameter.
 *
 * @param {number} count - The number of images to generate (default is 10).
 * @returns {Promise<string[]>} A promise that resolves to an array of image URLs.
 */
const fetchImages = async (count = 10) => {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/300/200?random=${i}`
  );
};

export default fetchImages;
