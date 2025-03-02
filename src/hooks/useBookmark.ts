
import { useState, useEffect } from "react";

interface Bookmark {
  surahNumber: number;
  ayatNumber: number;
  timestamp: number;
}

export const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("quran-bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Failed to parse bookmarks:", error);
        localStorage.removeItem("quran-bookmarks");
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Add a bookmark
  const addBookmark = (surahNumber: number, ayatNumber: number) => {
    setBookmarks((prev) => {
      // Check if bookmark already exists
      const exists = prev.some(
        (b) => b.surahNumber === surahNumber && b.ayatNumber === ayatNumber
      );
      
      if (exists) return prev;
      
      return [
        ...prev,
        {
          surahNumber,
          ayatNumber,
          timestamp: Date.now(),
        },
      ];
    });
  };

  // Remove a bookmark
  const removeBookmark = (surahNumber: number, ayatNumber: number) => {
    setBookmarks((prev) =>
      prev.filter(
        (b) => !(b.surahNumber === surahNumber && b.ayatNumber === ayatNumber)
      )
    );
  };

  // Check if a verse is bookmarked
  const isBookmarked = (surahNumber: number, ayatNumber: number) => {
    return bookmarks.some(
      (b) => b.surahNumber === surahNumber && b.ayatNumber === ayatNumber
    );
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
};
