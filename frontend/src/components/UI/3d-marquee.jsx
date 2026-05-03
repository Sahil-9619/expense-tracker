"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const ThreeDMarquee = ({ images = [], className }) => {
    if (!images || images.length === 0) return null;

    // Split images into 4 columns for a denser, more complex 3D grid
    const columns = [
        images.slice(0, Math.ceil(images.length / 4)),
        images.slice(Math.ceil(images.length / 4), Math.ceil(images.length / 2)),
        images.slice(Math.ceil(images.length / 2), Math.ceil((3 * images.length) / 4)),
        images.slice(Math.ceil((3 * images.length) / 4)),
    ];

    return (
        <div
            className={cn(
                "pointer-events-none select-none relative flex h-[600px] w-full items-center justify-center overflow-hidden [perspective:1500px] [transform-style:preserve-3d]",
                className
            )}
        >
            <div
                className="flex h-full w-[120%] justify-center gap-6 [transform:rotateX(25deg)_rotateZ(-10deg)_skewX(5deg)]"
            >
                {columns.map((columnImages, idx) => (
                    <MarqueeColumn
                        key={idx}
                        images={columnImages}
                        speed={40 + (idx * 5)} // Varied speeds for depth
                        reverse={idx % 2 === 0} // Alternating directions
                        offset={idx * 100} // Initial offset for variety
                    />
                ))}
            </div>

            {/* Premium Gradient Overlays for Depth and Focus */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-70" />
        </div>
    );
};

const MarqueeColumn = ({ images, speed = 40, reverse = false, offset = 0 }) => {
    return (
        <div className="flex flex-col gap-6">
            <motion.div
                style={{ pointerEvents: "none" }}
                initial={{ y: reverse ? "-50%" : "0%" }}
                animate={{ y: reverse ? "0%" : "-50%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-col gap-6"
            >
                {[...images, ...images].map((img, idx) => (
                    <div
                        key={idx}
                        className="pointer-events-none group relative h-48 w-72 flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-slate-900 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-emerald-500/50 hover:shadow-emerald-500/20"
                    >
                        <img
                            src={img}
                            className="pointer-events-none h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
