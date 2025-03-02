
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import QuoteRotator from "../components/QuoteRotator";
import FeatureCard from "../components/FeatureCard";
import { Book, BookOpen, Headphones, Languages } from "lucide-react";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-islamic-accent/30 dark:bg-islamic-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-light-pattern opacity-10 dark:opacity-5"
          style={{ backgroundSize: "200px" }}
        ></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold mb-6 text-islamic-primary"
            >
              Al-Quran Digital & Tafsir
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Baca, dengarkan, dan pahami Al-Quran dengan tafsir lengkap dalam bahasa Indonesia
            </motion.p>
            
            <QuoteRotator />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/surah">
                <button className="btn-primary">Mulai Membaca</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Fitur Unggulan</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Al-Quran Digital & Tafsir menyediakan berbagai fitur untuk memudahkan Anda dalam mempelajari Al-Quran
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={BookOpen}
            title="Tafsir Lengkap"
            description="Tafsir lengkap 30 juz dalam bahasa Indonesia yang mudah dipahami"
            index={0}
          />
          <FeatureCard
            icon={Headphones}
            title="Audio Murottal"
            description="Dengarkan murottal dari 5 qori pilihan dengan kualitas audio terbaik"
            index={1}
          />
          <FeatureCard
            icon={Languages}
            title="Terjemahan"
            description="Terjemahan ayat-ayat Al-Quran dalam bahasa Indonesia"
            index={2}
          />
          <FeatureCard
            icon={Book}
            title="114 Surah"
            description="Akses ke semua 114 surah dalam Al-Quran dengan informasi lengkap"
            index={3}
          />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-islamic-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Mulai Membaca Al-Quran Sekarang
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Rasakan kemudahan mengakses Al-Quran digital kapan saja dan di mana saja dengan fitur lengkap untuk mendukung pembelajaran Anda.
          </p>
          <Link to="/surah">
            <button className="bg-white text-islamic-primary px-6 py-3 rounded-full shadow-md hover:shadow-lg panel-transition hover:scale-[1.02] active:scale-[0.98]">
              Lihat Daftar Surah
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
