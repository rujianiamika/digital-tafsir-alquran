
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 panel-transition hover:opacity-90">
            <img src="/images/logo.svg" alt="Al-Quran Digital" className="h-8 w-auto" />
            <span className="font-medium text-lg md:text-xl hidden sm:inline-block">Al-Quran Digital & Tafsir</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-foreground/90 hover:text-foreground panel-transition">Beranda</Link>
              <Link to="/surah" className="text-foreground/90 hover:text-foreground panel-transition">Daftar Surah</Link>
              <Link to="/bookmarks" className="text-foreground/90 hover:text-foreground panel-transition">Bookmark</Link>
            </nav>
            
            <ModeToggle />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="text-foreground panel-transition px-2 py-2 rounded-md hover:bg-accent">
                    Beranda
                  </Link>
                  <Link to="/surah" className="text-foreground panel-transition px-2 py-2 rounded-md hover:bg-accent">
                    Daftar Surah
                  </Link>
                  <Link to="/bookmarks" className="text-foreground panel-transition px-2 py-2 rounded-md hover:bg-accent">
                    Bookmark
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-card py-6 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="text-center text-sm text-muted-foreground mb-2">
            © {new Date().getFullYear()} Al-Quran Digital & Tafsir. All rights reserved.
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Contact: aazeenkirani@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
