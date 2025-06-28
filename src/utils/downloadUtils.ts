import { FaceSelection, faceCategories } from "../data/faceData";

export interface DownloadOptions {
  backgroundColor?: string;
  transparent?: boolean;
  width?: number;
  height?: number;
}

export const downloadFacePortrait = async (
  faceSelection: FaceSelection,
  options: DownloadOptions = {}
): Promise<void> => {
  const {
    backgroundColor = "#ffffff",
    transparent = false,
    width = 512,
    height = 512,
  } = options;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Set background if not transparent
  if (!transparent) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  // Define the stacking order for the layers
  const layerOrder = [
    "skin",
    "hair",
    "eyes",
    "brows",
    "nose",
    "mouth",
    "eyewear",
    "accessories",
  ];

  // Load and draw each layer
  const imagePromises = layerOrder
    .map((categoryId) => {
      const selectedOptionId = faceSelection[categoryId];
      if (!selectedOptionId) return null;

      const category = faceCategories.find((cat) => cat.id === categoryId);
      if (!category) return null;

      const option = category.options.find(
        (opt) => opt.id === selectedOptionId
      );
      if (!option?.imagePath) return null;

      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.crossOrigin = "anonymous";
        img.src = option.imagePath!; // We know imagePath exists due to the check above
      });
    })
    .filter(Boolean);

  try {
    // Wait for all images to load
    const images = await Promise.all(imagePromises);

    // Draw each image on the canvas
    images.forEach((img) => {
      if (img) {
        // Calculate the size and position to center the image
        const padding = width * 0.1; // 10% padding
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding * 2;

        // Calculate scale to fit the image within the available space
        const scaleX = availableWidth / img.width;
        const scaleY = availableHeight / img.height;
        const scale = Math.min(scaleX, scaleY);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        // Center the image
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      }
    });

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Could not create image blob");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `face-portrait-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  } catch (error) {
    console.error("Error downloading portrait:", error);
    throw error;
  }
};
