"use client";

import { useEffect, useState } from "react";

interface UsePreloadImagesReturn {
  progress: number;
  isLoaded: boolean;
  images: HTMLImageElement[];
}

export function usePreloadImages(
  basePath: string,
  count: number,
  format: string = "png"
): UsePreloadImagesReturn {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];
    const imagePool: HTMLImageElement[] = [];
    let loadedCount = 0;

    setProgress(0);
    setIsLoaded(false);
    setImages([]);

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        imagePool.push(img);
        const filename = `ezgif-frame-${String(index).padStart(3, "0")}.${format}`;
        const src = `${basePath}/${filename}`;

        img.onload = () => {
          if (isCancelled) return;
          loadedCount++;
          setProgress((loadedCount / count) * 100);
          resolve(img);
        };

        img.onerror = () => {
          if (isCancelled) return;
          console.error(`Failed to load image: ${img.src}`);
          loadedCount++;
          setProgress((loadedCount / count) * 100);
          reject(new Error(`Failed to load ${filename}`));
        };

        img.src = src;
      });
    };

    const loadAllImages = async () => {
      const promises: Promise<HTMLImageElement>[] = [];

      for (let i = 1; i <= count; i++) {
        promises.push(loadImage(i));
      }

      try {
        const results = await Promise.allSettled(promises);
        if (isCancelled) return;

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            loadedImages.push(result.value);
          }
        });

        setImages(loadedImages);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoaded(true);
      }
    };

    loadAllImages();

    // Cleanup
    return () => {
      isCancelled = true;
      imagePool.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
    };
  }, [basePath, count, format]);

  return { progress, isLoaded, images };
}
