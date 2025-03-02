
import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AyatCardProps {
  ayatNumber: number;
  arabic: string;
  translation: string;
  tafsir: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const AyatCard: React.FC<AyatCardProps> = ({
  ayatNumber,
  arabic,
  translation,
  tafsir,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "glass-card p-6 mb-6",
        isBookmarked && "border-islamic-primary/30"
      )}
      id={`ayat-${ayatNumber}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-islamic-primary/10 text-islamic-primary font-medium">
          {ayatNumber}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleBookmark}
          className={cn(
            "h-9 w-9 rounded-full text-muted-foreground hover:text-islamic-primary hover:bg-islamic-primary/10",
            isBookmarked && "text-islamic-primary"
          )}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="space-y-6">
        <p className="arabic-text text-2xl font-arabic leading-loose py-2 text-islamic-primary">
          {arabic}
        </p>
        
        <div className="border-t border-border pt-4">
          <p className="text-foreground mb-4 italic">{translation}</p>
          <div className="text-muted-foreground text-sm space-y-2">
            <h4 className="font-medium text-base text-foreground mb-1">Tafsir:</h4>
            <p>{tafsir}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AyatCard;
