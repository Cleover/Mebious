import { useEffect, useState } from "react";

import { getVisualNovelData } from "@/API/VN";
import { getReleasesData } from "@/API/Releases";

import type { APIType } from "@/Definitions/APIType";
import type { VNResponseType } from "@/Definitions/VNType";
import type { ReleaseResponseType } from "@/Definitions/ReleaseType";

// Custom hook to fetch visual novel data
export const useFetchVisualNovelData = (options: APIType) => {
  return fetchData<VNResponseType>(options, getVisualNovelData);
};

// Custom hook to fetch release data
export const useFetchReleaseData = (options: APIType) => {
  return fetchData<ReleaseResponseType>(options, getReleasesData);
};

// Generic fetchData function
export const fetchData = <T,>(
  options: APIType,
  method: (options: APIType, someFlag: boolean) => Promise<T>
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
        const data = await method(options, false);
        setState({ data, loading: false });
      } catch (error) {
        console.error(`Error fetching data:`, error);
        setState({ data: null, loading: false });
      }
    };

    fetchData();
  }, [options, method]);

  return state;
};
