import {
  Palette,
  Eye,
  Minus,
  Glasses,
  Triangle,
  Smile,
  Scissors,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export interface FaceOption {
  id: string;
  name: string;
  imagePath?: string;
  color?: string;
}

export interface FaceCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  options: FaceOption[];
  canBeEmpty: boolean; // Whether this category can have no selection (except skin)
}

// Get available images for each category using loops
const getAvailableImages = () => {
  // Helper function to generate sequential numbers as strings
  const generateRange = (start: number, end: number): string[] => {
    return Array.from({ length: end - start + 1 }, (_, i) =>
      (start + i).toString()
    );
  };

  const categories = {
    "skin-tone": generateRange(1, 6), // 1-6 (6 files)
    eyes: generateRange(1, 60), // 1-60 (60 files)
    brows: generateRange(1, 46), // 1-46 (46 files)
    "eye-wear": generateRange(1, 26), // 1-26 (20 files, but some gaps, going to max)
    nose: generateRange(1, 68), // 1-68 (68 files)
    mouth: generateRange(1, 105), // 1-105 (105 files)
    hair: generateRange(1, 345), // 1-345 (241 files, but with gaps, going to max from listing)
    accessories: generateRange(1, 16), // 1-16 (16 files)
  };

  return categories;
};

const availableImages = getAvailableImages();

export const faceCategories: FaceCategory[] = [
  {
    id: "skin",
    name: "Skin tone",
    icon: Palette,
    canBeEmpty: false,
    options: availableImages["skin-tone"].map((id) => ({
      id,
      name: `Skin tone ${id}`,
      imagePath: `/loomingface/skin-tone/${id}.png`,
    })),
  },
  {
    id: "eyes",
    name: "Eyes",
    icon: Eye,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["eyes"].map((id) => ({
        id,
        name: `Eyes ${id}`,
        imagePath: `/loomingface/eyes/${id}.png`,
      })),
    ],
  },
  {
    id: "brows",
    name: "Brows",
    icon: Minus,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["brows"].map((id) => ({
        id,
        name: `Brows ${id}`,
        imagePath: `/loomingface/brows/${id}.png`,
      })),
    ],
  },
  {
    id: "eyewear",
    name: "Eyewear",
    icon: Glasses,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["eye-wear"].map((id) => ({
        id,
        name: `Eyewear ${id}`,
        imagePath: `/loomingface/eye-wear/${id}.png`,
      })),
    ],
  },
  {
    id: "nose",
    name: "Nose",
    icon: Triangle,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["nose"].map((id) => ({
        id,
        name: `Nose ${id}`,
        imagePath: `/loomingface/nose/${id}.png`,
      })),
    ],
  },
  {
    id: "mouth",
    name: "Mouth",
    icon: Smile,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["mouth"].map((id) => ({
        id,
        name: `Mouth ${id}`,
        imagePath: `/loomingface/mouth/${id}.png`,
      })),
    ],
  },
  {
    id: "hair",
    name: "Hair",
    icon: Scissors,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["hair"].map((id) => ({
        id,
        name: `Hair ${id}`,
        imagePath: `/loomingface/hair/${id}.png`,
      })),
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Sparkles,
    canBeEmpty: true,
    options: [
      { id: "none", name: "None" },
      ...availableImages["accessories"].map((id) => ({
        id,
        name: `Accessories ${id}`,
        imagePath: `/loomingface/accessories/${id}.png`,
      })),
    ],
  },
];

export interface FaceSelection {
  [categoryId: string]: string | null;
}

export const defaultFaceSelection: FaceSelection = {
  skin: "1", // Default skin tone
  eyes: null,
  brows: null,
  eyewear: null,
  nose: null,
  mouth: null,
  hair: null,
  accessories: null,
};

// Function to generate a random combination each time it's called
export const generateRandomCombination = (): FaceSelection => {
  // Helper function to get random element from array
  const getRandomFromArray = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Helper function to get random option ID from a category (excluding "none")
  const getRandomOptionId = (categoryId: string): string => {
    const category = faceCategories.find((cat) => cat.id === categoryId);
    if (!category) return "1";

    const availableOptions = category.options.filter(
      (opt) => opt.id !== "none"
    );
    return getRandomFromArray(availableOptions).id;
  };

  // Helper function to randomly decide if optional category should be included (70% chance)
  const shouldIncludeOptional = (): boolean => Math.random() > 0.3;

  return {
    skin: getRandomOptionId("skin"),
    hair: shouldIncludeOptional() ? getRandomOptionId("hair") : null,
    eyes: shouldIncludeOptional() ? getRandomOptionId("eyes") : null,
    brows: shouldIncludeOptional() ? getRandomOptionId("brows") : null,
    nose: shouldIncludeOptional() ? getRandomOptionId("nose") : null,
    mouth: shouldIncludeOptional() ? getRandomOptionId("mouth") : null,
    eyewear:
      shouldIncludeOptional() && Math.random() > 0.6
        ? getRandomOptionId("eyewear")
        : null, // Less likely
    accessories:
      shouldIncludeOptional() && Math.random() > 0.6
        ? getRandomOptionId("accessories")
        : null, // Less likely
  };
};
