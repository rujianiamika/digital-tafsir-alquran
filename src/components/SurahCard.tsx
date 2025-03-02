
import React from "react";
import { Link } from "react-router-dom";
import { Surah } from "../types/quran";
import { motion } from "framer-motion";

interface SurahCardProps {
  surah: Surah;
  index: number;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah, index }) => {
  return (
    <Link to={`/surah/${surah.nomor}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="glass-card panel-transition hover:shadow-xl h-full p-5 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-islamic-primary text-white font-medium text-sm">
            {surah.nomor}
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-arabic font-bold text-islamic-primary dark:text-white">{surah.nama}</h3>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-lg">{surah.namaLatin}</h4>
          <p className="text-sm text-muted-foreground">{surah.arti}</p>
          
          <div className="flex justify-between items-center pt-2 mt-2 border-t border-border/50">
            <span className="text-xs inline-flex items-center px-2 py-1 rounded-full bg-islamic-accent text-islamic-primary dark:bg-islamic-primary/30 dark:text-white">
              {surah.tempatTurun}
            </span>
            <span className="text-xs text-muted-foreground">
              {surah.jumlahAyat} Ayat
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SurahCard;
