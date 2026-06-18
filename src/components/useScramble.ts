"use client";

import { useEffect, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&<>/";

/**
 * Efekt "dekodowania" tekstu znak po znaku — losowe glify stabilizują się
 * w finalny tekst od lewej do prawej. Używany w hero, by sekwencja
 * MATEUSZ / WIEWIÓRA / rola wyglądała jak terminal renderujący dane.
 */
export function useScramble(text: string, delay = 0) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let frame = 0;
    const totalFrames = 22;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        if (frame >= totalFrames) {
          setDisplay(text);
          clearInterval(interval);
          return;
        }
        const revealed = Math.floor((frame / totalFrames) * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
            continue;
          }
          out += i < revealed ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplay(out);
      }, 45);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return display;
}
