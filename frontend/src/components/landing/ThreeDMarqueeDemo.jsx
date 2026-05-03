
import { ArrowRight } from "lucide-react";
import { ThreeDMarquee } from "../UI/3d-marquee";

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
        <div className="relative mx-auto my-10 flex h-screen w-full flex-col items-center justify-center">
            <h2 className="relative z-10 pt-5 mx-auto max-w-2xl text-center text-3xl font-black font-display tracking-tight text-white md:text-4xl lg:text-6xl leading-[1.1]">
                Control your spending, own your{" "}
                <span className="relative z-20 inline-block rounded-xl bg-emerald-600/40 px-6 py-1 text-white underline decoration-lime-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
                    future
                </span>{" "}
                today.
            </h2>
            <p className="relative z-20 mx-auto max-w-3xl py-10 text-center text-lg text-neutral-200 md:text-md font-medium leading-relaxed">
                Experience the most intuitive way to manage your expenses.
                Our protocol provides real-time insights to help you get easy managing
                of your financial life.
            </p>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                    onClick={() => {
                        console.log("button clicked");
                    }}
                    className="group relative z-[9999] inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-2 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-300 ease-out
  hover:-translate-y-1 hover:scale-105 active:scale-95"
                >

                    {/* Glass Base */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40"></span>

                    {/* Gradient Tint */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300"></span>

                    {/* Shine Sweep */}
                    <span className="pointer-events-none absolute top-0 left-[-120%] h-full w-1/2 bg-white/40 blur-md transition-all duration-700 ease-out group-hover:left-[130%]"></span>

                    {/* Glow Shadow */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-all duration-300 group-hover:opacity-100 shadow-[0_10px_40px_rgba(255,255,255,0.25)]"></span>

                    {/* Inner Depth */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_1px_8px_rgba(255,255,255,0.25)] group-hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.35)] transition-all duration-300"></span>

                    {/* Text */}
                    <span className="relativet transition-all duration-300 group-hover:tracking-[0.28em] text-white group-hover:text-lime-200">
                        Sign Up and use for free <ArrowRight className="ml-2 inline-block transition-all duration-300 group-hover:translate-x-1" />
                    </span>
                </button>
            </div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <ThreeDMarquee
                    className="h-full w-full pointer-events-none"
                    images={images}
                />
            </div>
        </div>
    );
}
