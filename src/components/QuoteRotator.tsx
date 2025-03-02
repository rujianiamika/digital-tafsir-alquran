
import React, { useState, useEffect } from "react";
import { quranQuotes } from "../data/quotes";
import { motion, AnimatePresence } from "framer-motion";

const QuoteRotator: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quranQuotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quranQuotes[currentQuoteIndex];

  return (
    <div className="h-32 flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <p className="text-lg md:text-xl text-foreground mb-2 italic">
            "{currentQuote.text}"
          </p>
          <p className="text-sm text-muted-foreground">
            {currentQuote.surah} : {currentQuote.ayat}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuoteRotator;
