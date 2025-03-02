
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useBookmark } from "../hooks/useBookmark";
import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const Bookmarks: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmark();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Bookmark</h1>
          <p className="text-muted-foreground">
            Ayat-ayat Al-Quran yang telah Anda tandai
          </p>
        </motion.div>

        {bookmarks.length > 0 ? (
          <div className="glass-card p-6">
            <div className="space-y-4">
              {bookmarks.map((bookmark, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={`${bookmark.surahNumber}-${bookmark.ayatNumber}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent panel-transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-islamic-primary/10 flex items-center justify-center text-islamic-primary">
                      <Bookmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Surah {bookmark.surahNumber}, Ayat {bookmark.ayatNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(bookmark.timestamp).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/surah/${bookmark.surahNumber}#ayat-${bookmark.ayatNumber}`}>
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBookmark(bookmark.surahNumber, bookmark.ayatNumber)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Tidak Ada Bookmark</h3>
            <p className="text-muted-foreground mb-6">
              Anda belum menambahkan bookmark apapun
            </p>
            <Link to="/surah">
              <Button>Lihat Daftar Surah</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;
