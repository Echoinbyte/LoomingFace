"use client";

import FaceCanvas from "@/components/FaceCanvas";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  FaceSelection,
  defaultFaceSelection,
  faceCategories,
  generateRandomCombination,
} from "@/data/faceData";
import { useSearchParams, useRouter } from "next/navigation";

const AvatarBuilder = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nestedSidebarOpen, setNestedSidebarOpen] = useState(false);

  // Initialize face selection from URL params or random great combination
  const initializeFaceSelection = useCallback(() => {
    const urlSelection: FaceSelection = {};
    let hasUrlParams = false;

    // Check if there are face selection parameters in URL
    faceCategories.forEach((category) => {
      const paramValue = searchParams.get(category.id);
      if (paramValue !== null) {
        hasUrlParams = true;
        urlSelection[category.id] = paramValue === "null" ? null : paramValue;
      }
    });

    if (hasUrlParams) {
      return urlSelection;
    } else {
      // No URL params, use a random great combination
      return generateRandomCombination();
    }
  }, [searchParams]);

  const [faceSelection, setFaceSelection] =
    useState<FaceSelection>(defaultFaceSelection);

  // Update URL when face selection changes
  const updateURL = useCallback(
    (selection: FaceSelection) => {
      const params = new URLSearchParams();
      Object.entries(selection).forEach(([key, value]) => {
        if (value !== null) {
          params.set(key, value);
        }
      });
      const newUrl = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl);
    },
    [router]
  );

  // Initialize on mount
  useEffect(() => {
    const initialSelection = initializeFaceSelection();
    setFaceSelection(initialSelection);
    updateURL(initialSelection);
  }, [initializeFaceSelection, updateURL]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setNestedSidebarOpen(true);
  };

  const handleNestedSidebarClose = () => {
    setNestedSidebarOpen(false);
    setSelectedCategory("");
  };

  const handleFaceOptionSelect = (
    categoryId: string,
    optionId: string | null
  ) => {
    const newSelection = {
      ...faceSelection,
      [categoryId]: optionId,
    };
    setFaceSelection(newSelection);
    updateURL(newSelection);
  };

  const handleRandomize = () => {
    const randomCombination = generateRandomCombination();
    setFaceSelection(randomCombination);
    updateURL(randomCombination);
  };

  const handleCategoryRandomize = (categoryId: string) => {
    const category = faceCategories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const availableOptions = category.options.filter(
      (opt) => opt.id !== "none"
    );
    if (availableOptions.length === 0) return;

    const randomOption =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const newSelection = {
      ...faceSelection,
      [categoryId]: randomOption.id,
    };
    setFaceSelection(newSelection);
    updateURL(newSelection);
  };

  const handleClearAll = () => {
    const clearedSelection = Object.keys(faceSelection).reduce((acc, key) => {
      acc[key] = key === "skin" ? "1" : null; // Keep default skin tone
      return acc;
    }, {} as FaceSelection);

    setFaceSelection(clearedSelection);
    updateURL(clearedSelection);
    handleNestedSidebarClose();
  };

  const handleNewPortrait = () => {
    // Open the first category (skin-tone) in the nested sidebar
    const firstCategory = faceCategories[0]; // skin-tone should be first
    if (firstCategory) {
      handleCategorySelect(firstCategory.id);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        nestedSidebarOpen={nestedSidebarOpen}
        onNestedSidebarClose={handleNestedSidebarClose}
        faceSelection={faceSelection}
        onFaceOptionSelect={handleFaceOptionSelect}
        onCategoryRandomize={handleCategoryRandomize}
      />
      <FaceCanvas
        selectedCategory={selectedCategory}
        onMenuToggle={() => setSidebarOpen(true)}
        nestedSidebarOpen={nestedSidebarOpen}
        onNestedSidebarClose={handleNestedSidebarClose}
        faceSelection={faceSelection}
        onFaceOptionSelect={handleFaceOptionSelect}
        onRandomize={handleRandomize}
        onCategoryRandomize={handleCategoryRandomize}
        onClearAll={handleClearAll}
        onNewPortrait={handleNewPortrait}
      />
    </div>
  );
};

const Index = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-gray-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AvatarBuilder />
    </Suspense>
  );
};

export default Index;
