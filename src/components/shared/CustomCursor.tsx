"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
{/* Glow */}
<motion.div
  className="pointer-events-none fixed left-0 top-0 z-[9997] h-16 w-16 rounded-full bg-[#E96A3D]/20 blur-xl"
  animate={{
    x: mouse.x - 32,
    y: mouse.y - 32,
  }}
  transition={{
    type: "spring",
    stiffness: 150,
    damping: 18,
  }}
/>

{/* Outer Ring */}
<motion.div
  className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-[#E96A3D]"
  animate={{
    x: mouse.x - 20,
    y: mouse.y - 20,
    scale: clicked ? 0.8 : 1,
  }}
  transition={{
    type: "spring",
    stiffness: 250,
    damping: 20,
  }}
/>

{/* Inner Dot */}
<motion.div
  className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-[#0EA5B8]"
  animate={{
    x: mouse.x - 6,
    y: mouse.y - 6,
    scale: clicked ? 1.8 : 1,
  }}
  transition={{
    type: "spring",
    stiffness: 800,
    damping: 25,
  }}
/>
    </>
  );
}