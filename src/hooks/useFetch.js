import { useEffect, useState } from "react";

export function useFetch(url, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getAllCurrencyList() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(url, params, { signal: controller.signal });

        if (!res.ok) throw new Error("Something Went Wrong 🔥");

        const data = await res.json();
        setError("");
        setLoading(false);
        setData(data);
      } catch (error) {
        if (error.message === "Abort") return;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getAllCurrencyList();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
