"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TilesProps {
  className?: string;
  rows?: number;
  cols?: number;
  tileClassName?: string;
  tileSize?: "sm" | "md" | "lg";
}

const tileSizes = {
  sm: "h-5 w-5",
  md: "h-6 w-6 md:h-8 md:w-8",
  lg: "h-8 w-8 md:h-10 md:w-10",
};

export function Tiles({
  className,
  rows = 100,
  cols = 10,
  tileClassName,
  tileSize = "md",
}: TilesProps) {
  const rowsArray = new Array(rows).fill(1);
  const colsArray = new Array(cols).fill(1);

  return (
    <div
      className={cn(
        "relative z-0 flex h-full w-full flex-row justify-center",
        className
      )}
    >
      {rowsArray.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className={cn(
            tileSizes[tileSize],
            "relative border-l border-neutral-200 dark:border-neutral-900",
            tileClassName
          )}
        >
          {colsArray.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              whileHover={{
                backgroundColor: "var(--tile)",
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              className={cn(
                tileSizes[tileSize],
                "relative border-r border-t border-neutral-200 dark:border-neutral-900",
                tileClassName
              )}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
