import { useEffect, useState } from "react";

import { getVisualNovelData } from "@/API/VN";
import { getReleasesData } from "@/API/Releases";

import type { APIType } from "@/Definitions/APIType";
import type { VNResponseType } from "@/Definitions/VNType";
import type { ReleaseResponseType } from "@/Definitions/ReleaseType";

// Custom hook to fetch visual novel data
export const useFetchVisualNovelData = (options: APIType, fetchAll: boolean = false) => {
  return fetchData<VNResponseType>(options, getVisualNovelData, fetchAll);
};

// Custom hook to fetch release data
export const useFetchReleaseData = (options: APIType, fetchAll: boolean = false) => {
  return fetchData<ReleaseResponseType>(options, getReleasesData, fetchAll);
};

// Generic fetchData function
export const fetchData = <T,>(
  options: APIType,
  method: (options: APIType, fetchAll: boolean) => Promise<T>,
  fetchAll: boolean
) => {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await method(options, fetchAll);
        setState({ data, loading: false });
      } catch (error) {
        console.error(`Error fetching data:`, error);
        setState({ data: null, loading: fetchAll });
      }
    };

    fetchData();
  }, [options, method]);

  return state;
};
