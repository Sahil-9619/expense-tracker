
import { ArrowRight } from "lucide-react";
import { ThreeDMarquee } from "../UI/3d-marquee";
import { Link } from "react-router";


export default function ThreeDMarqueeDemo() {
    const images = [
        "/images/dashboard.png",
        "/images/currency.png",
        "/images/wallet.png",
        "/images/mobile.png",
        "/images/charts.png",
        "/images/vault.png",
        "/images/dashboard.png",
        "/images/currency.png",
        "/images/wallet.png",
        "/images/mobile.png",
        "/images/charts.png",
        "/images/vault.png",
        "/images/dashboard.png",
        "/images/currency.png",
        "/images/wallet.png",
        "/images/mobile.png",
        "/images/charts.png",
        "/images/vault.png",
        "/images/dashboard.png",
        "/images/currency.png",
        "/images/wallet.png",
        "/images/mobile.png",
        "/images/charts.png",
        "/images/vault.png",
    ];
    return (
        <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center px-6 py-10 md:translate-y-10 lg:translate-y-16">
            <h2 className="relative z-10 mx-auto max-w-[95%] sm:max-w-2xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-display tracking-tight text-white leading-[1.2] sm:leading-tight">
                Control your spending, own your{" "}
                <span className="relative z-20 inline-block rounded-xl bg-emerald-600/40 px-3 sm:px-6 py-1 text-white underline decoration-lime-500 decoration-[4px] sm:decoration-[6px] underline-offset-[12px] sm:underline-offset-[16px] backdrop-blur-sm">
                    future
                </span>{" "}
                today.
            </h2>
            <p className="relative z-20 mx-auto max-w-[90%] sm:max-w-2xl py-6 sm:py-10 text-center text-base sm:text-lg md:text-xl text-neutral-300 font-medium leading-relaxed opacity-90">
                Experience the most intuitive way to manage your expenses.
                Our protocol provides real-time insights to master your financial life.
            </p>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                <Link to="/auth"
                    className="group relative z-[110] inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-[9px] sm:text-xs font-bold tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                    {/* Glass Base */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40"></span>

                    {/* Gradient Tint */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300"></span>

                    {/* Shine Sweep */}
                    <span className="pointer-events-none absolute top-0 left-[-120%] h-full w-1/2 bg-white/40 blur-md transition-all duration-700 ease-out group-hover:left-[130%]"></span>

                    {/* Text */}
                    <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.28em] text-white flex items-center gap-2">
                        <span>Signup and use for free</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 group-hover:translate-x-1" />
                    </span>
                </Link>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden scale-110 sm:scale-125">
                <ThreeDMarquee
                    className="h-full w-full pointer-events-none"
                    images={images}
                />
            </div>
        </div>
    );
}
