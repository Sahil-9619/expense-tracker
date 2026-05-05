"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { GridPattern } from "./grid-pattern";

export function Boxes({ className }) {
  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none", className)}>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 fill-[var(--card-border)] stroke-[var(--card-border)] opacity-80"
        )}
      />
    </div>
  );
}
