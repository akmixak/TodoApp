import { useState, useEffect } from "react";

export default function useColors() {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    let controller;
    const getColors = async () => {
      controller = new AbortController();
      const resp = await fetch(
        "https://api.sampleapis.com/csscolornames/colors",
        {
          signal: controller.signal,
        }
      );
      const json = await resp.json();

      setColors(json);
    };
    getColors();
    return () => {
      controller.abort();
    };
  }, []);
  return colors;
}
