
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import AudioPlayer from "../components/AudioPlayer";
import AyatCard from "../components/AyatCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSurahDetail } from "../hooks/useQuran";
import { useBookmark } from "../hooks/useBookmark";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SurahDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const surahNumber = parseInt(id || "1");
  const { data, isLoading, error } = useSurahDetail(surahNumber);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark();
  const [currentAyat, setCurrentAyat] = useState(1);

  useEffect(() => {
    // Scroll to top when surah changes
    window.scrollTo(0, 0);
  }, [surahNumber]);

  useEffect(() => {
    // Scroll to current ayat if specified in URL hash
    const hash = window.location.hash;
    if (hash) {
      const ayatNumber = parseInt(hash.replace("#ayat-", ""));
      if (!isNaN(ayatNumber)) {
        setCurrentAyat(ayatNumber);
        setTimeout(() => {
          const element = document.getElementById(`ayat-${ayatNumber}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 500);
      }
    }
  }, [data]);

  const navigate = useNavigate();

  const handleToggleBookmark = (ayatNumber: number) => {
    if (isBookmarked(surahNumber, ayatNumber)) {
      removeBookmark(surahNumber, ayatNumber);
      toast("Bookmark dihapus");
    } else {
      addBookmark(surahNumber, ayatNumber);
      toast("Bookmark ditambahkan");
    }
  };

  const navigateToPreviousSurah = () => {
    if (data?.data.suratSebelumnya) {
      navigate(`/surah/${data.data.suratSebelumnya.nomor}`);
    }
  };

  const navigateToNextSurah = () => {
    if (data?.data.suratSelanjutnya) {
      navigate(`/surah/${data.data.suratSelanjutnya.nomor}`);
    }
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

  if (error || !data) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">
            Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.
          </p>
          <Link to="/surah">
            <Button variant="outline">Kembali ke Daftar Surah</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const { data: surah } = data;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Surah Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center bg-islamic-accent px-3 py-1 rounded-full text-islamic-primary text-sm mb-2">
              Surah ke-{surah.nomor}
            </div>
            <h1 className="text-4xl font-bold mb-1">{surah.namaLatin}</h1>
            <h2 className="text-3xl font-arabic text-islamic-primary mb-2">{surah.nama}</h2>
            <p className="text-muted-foreground mb-1">
              {surah.arti} • {surah.tempatTurun} • {surah.jumlahAyat} Ayat
            </p>
            
            <div className="flex justify-center mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    <span>Info Surah</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{surah.namaLatin}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <div 
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
                    />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Audio Player */}
          <div className="max-w-2xl mx-auto w-full">
            <AudioPlayer audioSources={surah.audioFull} />
          </div>

          {/* Ayat List */}
          <div className="mt-8 space-y-6">
            {surah.tafsir.map((ayat, index) => {
              // Jika kita memiliki data ayat dari API
              const ayatData = surah.ayat && surah.ayat[index];
              
              return (
                <AyatCard
                  key={ayat.ayat}
                  ayatNumber={ayat.ayat}
                  arabic={ayatData ? ayatData.teksArab : ""}
                  translation={ayatData ? ayatData.teksIndonesia : ""}
                  tafsir={ayat.teks}
                  isBookmarked={isBookmarked(surahNumber, ayat.ayat)}
                  onToggleBookmark={() => handleToggleBookmark(ayat.ayat)}
                />
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={navigateToPreviousSurah}
              disabled={!surah.suratSebelumnya}
              className="panel-transition"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Surah Sebelumnya
            </Button>
            
            <Button
              variant="outline"
              onClick={navigateToNextSurah}
              disabled={!surah.suratSelanjutnya}
              className="panel-transition"
            >
              Surah Selanjutnya
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SurahDetail;
