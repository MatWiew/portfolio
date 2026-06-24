"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&<>/";

export function useScramble(text: string, delay = 0) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let frame = 0;
    // Zmniejszamy liczbę klatek z 22 do 12 — efekt nadal jest świetny,
    // ale tekst stabilizuje się niemal natychmiast, co drastycznie obniża LCP.
    const totalFrames = 12; 

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
        
        // Zoptymalizowana pętla omijająca zbędne alokacje pamięci
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
          } else if (i < revealed) {
            out += text[i];
          } else {
            out += CHARS[(Math.random() * CHARS.length) | 0]; // Szybsze zaokrąglenie bitowe zamiast Math.floor
          }
        }
        setDisplay(out);
      }, 35); // Lekko przyspieszony interwał dla płynności
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return display;
}