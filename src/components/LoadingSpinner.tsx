
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="h-12 w-12 rounded-full border-4 border-islamic-primary/30 border-t-islamic-primary animate-spin mb-4"></div>
      <p className="text-muted-foreground">Memuat data...</p>
    </div>
  );
};

export default LoadingSpinner;
