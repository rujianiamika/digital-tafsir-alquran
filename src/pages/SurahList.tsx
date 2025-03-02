
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SurahCard from "../components/SurahCard";
import SearchFilter from "../components/SearchFilter";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSurahList } from "../hooks/useQuran";
import { Surah } from "../types/quran";
import { motion } from "framer-motion";

const SurahList: React.FC = () => {
  const { data, isLoading, error } = useSurahList();
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeFilter, setPlaceFilter] = useState("all");

  useEffect(() => {
    if (data?.data) {
      let filtered = [...data.data];
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (surah) =>
            surah.namaLatin.toLowerCase().includes(searchLower) ||
            surah.arti.toLowerCase().includes(searchLower) ||
            surah.nomor.toString().includes(searchLower)
        );
      }
      
      // Apply place filter
      if (placeFilter !== "all") {
        filtered = filtered.filter(
          (surah) => surah.tempatTurun === placeFilter
        );
      }
      
      setFilteredSurahs(filtered);
    }
  }, [data, searchTerm, placeFilter]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (place: string) => {
    setPlaceFilter(place);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">
            Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-center mb-2">Daftar Surah</h1>
          <p className="text-muted-foreground text-center mb-8">
            Al-Quran terdiri dari 114 surah dengan total 6.236 ayat
          </p>
        </motion.div>

        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        {filteredSurahs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSurahs.map((surah, index) => (
              <SurahCard key={surah.nomor} surah={surah} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Tidak ada surah yang sesuai dengan filter atau pencarian Anda.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SurahList;
