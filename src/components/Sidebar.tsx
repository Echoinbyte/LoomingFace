import React from "react";
import { Shuffle, X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import NepLoomLogo from "../../public/NepLoom.svg";
import { faceCategories, FaceSelection } from "../data/faceData";
import Link from "next/link";

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  nestedSidebarOpen: boolean;
  onNestedSidebarClose: () => void;
  faceSelection: FaceSelection;
  onFaceOptionSelect: (categoryId: string, optionId: string | null) => void;
  onCategoryRandomize: (categoryId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onCategorySelect,
  isOpen,
  onToggle,
  nestedSidebarOpen,
  onNestedSidebarClose,
  faceSelection,
  onFaceOptionSelect,
  onCategoryRandomize,
}) => {
  const renderDesktopNestedSidebar = () => {
    if (!nestedSidebarOpen || !selectedCategory) return null;

    const category = faceCategories.find((cat) => cat.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="w-64 xl:w-80 2xl:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Nested Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onNestedSidebarClose}
              className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            >
              <ArrowLeft size={16} className="text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-900 capitalize">
              {category.name}
            </span>
          </div>
          <button
            onClick={() => onCategoryRandomize(category.id)}
            className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            title="Randomize this category"
          >
            <Shuffle size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Nested Options */}
        <div className="flex-1 p-4 overflow-y-auto min-h-0">
          <div className="grid grid-cols-3 gap-3">
            {category.options.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  onFaceOptionSelect(
                    category.id,
                    option.id === "none" ? null : option.id
                  )
                }
                className={`aspect-square rounded-lg cursor-pointer transition-colors flex items-center justify-center relative overflow-hidden ${
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
                  <span className="text-sm font-medium text-gray-700 text-center px-2">
                    {option.name}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar Container */}
      <div className="hidden lg:flex h-screen bg-white border-r border-gray-200">
        {/* Main Sidebar */}
        <div className="w-64 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                  src={NepLoomLogo}
                  alt="NepLoom Logo"
                  width={32}
                  height={32}
                  priority
                />
              </div>
              <span className="text-xl font-semibold text-gray-900">Faces</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 p-4">
            <div className="space-y-1">
              {faceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left cursor-pointer transition-colors ${
                      selectedCategory === category.id
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <Link
              href={"https://neploom.tech"}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="font-medium">Use NepLoom</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Nested Sidebar */}
        {renderDesktopNestedSidebar()}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform cursor-pointer transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header with close button */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image
                src={NepLoomLogo}
                alt="NepLoom Logo"
                width={32}
                height={32}
                priority
              />
            </div>
            <span className="text-xl font-semibold text-gray-900">Faces</span>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {faceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategorySelect(category.id);
                    onToggle();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left cursor-pointer transition-colors ${
                    selectedCategory === category.id
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href={"https://neploom.tech"}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">Use NepLoom</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
