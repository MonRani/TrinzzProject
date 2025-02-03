import fetchImages from './api';

describe('fetchImages Utility Function', () => {
  it('should return an array of image URLs with the correct length', async () => {
    const count = 5; // Example count value for the test
    const images = await fetchImages(count);

    // Check if the returned value is an array of the correct length
    expect(Array.isArray(images)).toBe(true);
    expect(images.length).toBe(count);

    // Check if the URLs follow the expected pattern
    images.forEach((image, index) => {
      expect(image).toBe(`https://picsum.photos/300/200?random=${index}`);
    });
  });

  it('should return 10 images by default when no count is provided', async () => {
    const images = await fetchImages();

    // Check if the returned array has the default length (10)
    expect(images.length).toBe(10);

    // Check if the URLs follow the expected pattern
    images.forEach((image, index) => {
      expect(image).toBe(`https://picsum.photos/300/200?random=${index}`);
    });
  });
});
