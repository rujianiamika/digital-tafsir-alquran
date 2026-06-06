
import { useQuery } from "@tanstack/react-query";
import { SurahListResponse, SurahDetailResponse } from "../types/quran";

const API_BASE_URL = "https://equran.id/api/v2";

// Function to fetch the list of surahs
const fetchSurahList = async (): Promise<SurahListResponse> => {
  const response = await fetch(`${API_BASE_URL}/surat`);
  if (!response.ok) {
    throw new Error("Failed to fetch surah list");
  }
  return response.json();
};

// Function to fetch a specific surah detail with tafsir
const fetchSurahDetail = async (surahNumber: number): Promise<SurahDetailResponse> => {
  const [tafsirResponse, surahResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/tafsir/${surahNumber}`),
    fetch(`${API_BASE_URL}/surat/${surahNumber}`),
  ]);

  if (!tafsirResponse.ok) {
    throw new Error(`Failed to fetch tafsir for surah ${surahNumber}`);
  }
  if (!surahResponse.ok) {
    throw new Error(`Failed to fetch surah detail for surah ${surahNumber}`);
  }

  const tafsirData = await tafsirResponse.json();
  const surahData = await surahResponse.json();

  return {
    ...tafsirData,
    data: {
      ...tafsirData.data,
      ayat: surahData.data.ayat,
    },
  };
};

// Custom hook to get the list of surahs
export const useSurahList = () => {
  return useQuery({
    queryKey: ["surahList"],
    queryFn: fetchSurahList,
  });
};

// Custom hook to get a specific surah detail
export const useSurahDetail = (surahNumber: number) => {
  return useQuery({
    queryKey: ["surahDetail", surahNumber],
    queryFn: () => fetchSurahDetail(surahNumber),
    enabled: !!surahNumber,
  });
};
