# Digital Tafsir Al-Quran

Aplikasi Al-Quran digital dengan tafsir bahasa Indonesia, audio murottal, dan fitur bookmark ayat.

## Fitur utama

- Daftar 114 surah dengan informasi lengkap
- Detail surah dengan teks Arab, terjemahan, dan tafsir
- Audio murottal untuk mendengarkan setiap surah
- Bookmark ayat menggunakan `localStorage`
- Pencarian dan filter surah berdasarkan nama, arti, dan tempat turun
- Animasi halaman dengan `framer-motion`

## Teknologi

- Vite
- React 18 + TypeScript
- Tailwind CSS
- shadcn-ui
- React Router DOM
- TanStack Query

## Menjalankan proyek

```sh
npm install
npm run dev
```

Buka http://localhost:8080 untuk melihat aplikasi.

## Struktur penting

- `src/App.tsx` — routing, query provider, dan animasi halaman
- `src/hooks/useQuran.ts` — fetch data API Al-Quran
- `src/pages/SurahList.tsx` — daftar dan filter surah
- `src/pages/SurahDetail.tsx` — detail surah dan bookmark
- `src/hooks/useBookmark.ts` — penyimpanan bookmark di browser

## Catatan

Dependensi `next-themes`, `vaul`, dan `lovable-tagger` digunakan untuk komponen UI dan tooling pengembangan.
