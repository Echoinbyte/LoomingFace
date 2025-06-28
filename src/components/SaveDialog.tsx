import React, { useState } from "react";
import { X, Download, Palette, Copy, Check } from "lucide-react";
import Image from "next/image";
import { FaceSelection, faceCategories } from "../data/faceData";
import { downloadFacePortrait } from "../utils/downloadUtils";

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  faceSelection: FaceSelection;
}

const SaveDialog: React.FC<SaveDialogProps> = ({
  isOpen,
  onClose,
  faceSelection,
}) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [showCustomColor, setShowCustomColor] = useState(false);
  const [copied, setCopied] = useState(false);

  const predefinedColors = [
    { name: "White", value: "#ffffff" },
    { name: "Light Gray", value: "#f3f4f6" },
    { name: "Gray", value: "#e5e7eb" },
    { name: "Blue", value: "#dbeafe" },
    { name: "Green", value: "#dcfce7" },
    { name: "Yellow", value: "#fef3c7" },
    { name: "Pink", value: "#fce7f3" },
    { name: "Purple", value: "#e9d5ff" },
    { name: "Orange", value: "#fed7aa" },
    { name: "Red", value: "#fecaca" },
    { name: "Indigo", value: "#e0e7ff" },
    { name: "Teal", value: "#ccfbf1" },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowCustomColor(false);
  };

  const handleCustomColorClick = () => {
    setShowCustomColor(true);
    setSelectedColor(customColor);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    setSelectedColor(color);
  };

  const generateNepLoomString = (): string => {
    const parts: string[] = [];

    // Add each category in order
    faceCategories.forEach((category) => {
      const selectedValue = faceSelection[category.id];
      const value = selectedValue || "none";
      parts.push(`${category.id}-${value}`);
    });

    // Add color
    parts.push(`color-${selectedColor.replace("#", "")}`);

    return `!${parts.join(",")}`;
  };

  const handleCopyNepLoomString = async () => {
    const nepLoomString = generateNepLoomString();
    try {
      await navigator.clipboard.writeText(nepLoomString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = nepLoomString;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadWithBackground = async () => {
    try {
      await downloadFacePortrait(faceSelection, {
        backgroundColor: selectedColor,
        transparent: false,
      });
      onClose();
    } catch (error) {
      console.error("Error downloading portrait:", error);
      // TODO: Show error message to user
    }
  };

  const handleDownloadTransparent = async () => {
    try {
      await downloadFacePortrait(faceSelection, {
        transparent: true,
      });
      onClose();
    } catch (error) {
      console.error("Error downloading portrait:", error);
      // TODO: Show error message to user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Save Portrait</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        {/* Preview */}
        <div className="p-6 border-b border-gray-200">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Preview</h3>
            <div className="flex justify-center">
              <div
                className="relative w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden"
                style={{ backgroundColor: selectedColor }}
              >
                {/* Render face layers */}
                {(() => {
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

                  return layerOrder.map((categoryId) => {
                    const selectedOptionId = faceSelection[categoryId];
                    if (!selectedOptionId) return null;

                    const category = faceCategories.find(
                      (cat) => cat.id === categoryId
                    );
                    if (!category) return null;

                    const option = category.options.find(
                      (opt) => opt.id === selectedOptionId
                    );
                    if (!option?.imagePath) return null;

                    return (
                      <div
                        key={categoryId}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: layerOrder.indexOf(categoryId) + 1 }}
                      >
                        <Image
                          src={option.imagePath}
                          alt={option.name}
                          fill
                          className="object-contain p-2"
                          style={{
                            objectPosition: "center center",
                          }}
                          sizes="128px"
                        />
                      </div>
                    );
                  });
                })()}

                {/* Fallback if no selections made */}
                {Object.values(faceSelection).every(
                  (value) => value === null
                ) && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-xs text-center">No Portrait</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Color Selection */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Background Color
          </h3>

          {/* Predefined Colors */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`aspect-square rounded-lg border-2 transition-all ${
                  selectedColor === color.value && !showCustomColor
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>

          {/* Custom Color */}
          <div className="space-y-3">
            <button
              onClick={handleCustomColorClick}
              className={`w-full p-3 border-2 rounded-lg transition-all flex items-center gap-3 ${
                showCustomColor
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Palette size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">Custom Color</span>
            </button>

            {showCustomColor && (
              <div className="ml-4 space-y-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  placeholder="#ffffff"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                />
              </div>
            )}
          </div>
        </div>{" "}
        {/* Download Options */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Export Options
          </h3>

          {/* NepLoom String */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Use for NepLoom</h4>
              <button
                onClick={handleCopyNepLoomString}
                className="flex items-center gap-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-3">
              <code className="text-sm font-mono text-gray-800 break-all select-all">
                {generateNepLoomString()}
              </code>
            </div>
            <p className="text-xs text-gray-600">
              Copy this text to use your face design in NepLoom
            </p>
          </div>

          <button
            onClick={handleDownloadWithBackground}
            className="w-full flex items-center gap-3 p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Download size={20} />
            <div className="text-left">
              <div className="font-medium">Download with Background</div>
              <div className="text-sm opacity-90">
                PNG with selected background color
              </div>
            </div>
          </button>

          <button
            onClick={handleDownloadTransparent}
            className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <div className="text-left">
              <div className="font-medium">Download Portrait Only</div>
              <div className="text-sm text-gray-600">
                PNG with transparent background
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDialog;
