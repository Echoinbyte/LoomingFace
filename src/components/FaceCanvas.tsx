import React, { useState } from "react";
import { Shuffle, Plus, Menu, X, RotateCcw } from "lucide-react";
import Image from "next/image";
import { faceCategories, FaceSelection } from "../data/faceData";
import SaveDialog from "./SaveDialog";

interface FaceCanvasProps {
  selectedCategory: string;
  onMenuToggle: () => void;
  nestedSidebarOpen: boolean;
  onNestedSidebarClose: () => void;
  faceSelection: FaceSelection;
  onFaceOptionSelect: (categoryId: string, optionId: string | null) => void;
  onRandomize: () => void;
  onCategoryRandomize: (categoryId: string) => void;
  onClearAll: () => void;
  onNewPortrait: () => void;
}

const FaceCanvas: React.FC<FaceCanvasProps> = ({
  selectedCategory,
  onMenuToggle,
  onNestedSidebarClose,
  faceSelection,
  onFaceOptionSelect,
  onRandomize,
  onCategoryRandomize,
  onClearAll,
  onNewPortrait,
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const renderMobileNestedOptions = () => {
    if (!selectedCategory) return null;

    const category = faceCategories.find((cat) => cat.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="lg:hidden bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {category.name}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCategoryRandomize(category.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Randomize this category"
            >
              <Shuffle size={20} className="text-gray-600" />
            </button>
            <button
              onClick={onNestedSidebarClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 max-h-32 overflow-y-auto pr-2 pb-2">
          {category.options.map((option) => (
            <button
              key={option.id}
              onClick={() =>
                onFaceOptionSelect(
                  category.id,
                  option.id === "none" ? null : option.id
                )
              }
              className={`aspect-square rounded-lg transition-colors flex items-center justify-center relative overflow-hidden m-1 ${
                faceSelection[category.id] === option.id ||
                (faceSelection[category.id] === null && option.id === "none")
                  ? "ring-2 ring-red-500 bg-red-50"
                  : "bg-white hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {option.imagePath ? (
                <div className="w-full h-full relative bg-white">
                  <Image
                    src={option.imagePath}
                    alt={option.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              ) : (
                <span className="text-xs font-medium text-gray-700 text-center px-1">
                  {option.name}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderFaceAvatar = () => {
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

    return (
      <div className="relative w-64 h-64 lg:w-[426px] lg:h-[426px] bg-white rounded-full overflow-hidden shadow-lg">
        {layerOrder.map((categoryId) => {
          const selectedOptionId = faceSelection[categoryId];
          if (!selectedOptionId) return null;

          const category = faceCategories.find((cat) => cat.id === categoryId);
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
                className="object-contain p-4"
                style={{
                  objectPosition: "center center",
                  transform: "translate(0, 0)", // Ensure no transform offset
                }}
                sizes="(max-width: 1024px) 256px, 384px"
                priority={categoryId === "skin"}
              />
            </div>
          );
        })}
        {/* Fallback if no selections made */}
        {Object.values(faceSelection).every((value) => value === null) && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="text-lg text-center px-4">
              Select features to build your face
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col h-screen">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 flex justify-between items-center bg-white border-b border-gray-200 flex-shrink-0">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear all"
          >
            <RotateCcw size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => setSaveDialogOpen(true)}
            className="px-3 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm"
          >
            Save →
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex px-4 lg:px-6 py-4 justify-end items-center flex-shrink-0">
        <button
          onClick={() => setSaveDialogOpen(true)}
          className="px-3 py-2 lg:px-4 lg:py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm lg:text-base"
        >
          Save →
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-2 lg:p-8 overflow-hidden">
        <div className="flex flex-col items-center gap-4 lg:gap-8">
          {/* Face Avatar */}
          {renderFaceAvatar()}

          {/* Action Buttons - Only show when nested sidebar/bottom bar is closed */}
          {!selectedCategory && (
            <div className="flex justify-center gap-3 lg:gap-4">
              <button
                onClick={onRandomize}
                className="p-2 lg:p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                title="Randomize face"
              >
                <Shuffle size={18} className="text-gray-600 lg:w-5 lg:h-5" />
              </button>
              <button
                onClick={onClearAll}
                className="p-2 lg:p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                title="Clear all"
              >
                <RotateCcw size={18} className="text-gray-600 lg:w-5 lg:h-5" />
              </button>
              <button
                onClick={onNewPortrait}
                className="px-4 py-2 lg:px-6 lg:py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors flex items-center gap-2 text-sm lg:text-base"
              >
                <Plus size={18} className="lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">New Portrait</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
          )}

          {/* Selection Info */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Features selected:{" "}
              {Object.values(faceSelection).filter((v) => v !== null).length} /
              8
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Options */}
      {renderMobileNestedOptions()}

      {/* Save Dialog */}
      <SaveDialog
        isOpen={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        faceSelection={faceSelection}
      />
    </div>
  );
};

export default FaceCanvas;
