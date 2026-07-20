
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const useBetterScroll = () =>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    lenisInstance = lenis;
    lenis.on("scroll",  ScrollTrigger.update);
    gsap.ticker.add((time) =>{
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return lenis;
}

// Lets the transition conductor pause/resume scroll from outside this hook,
// since Lenis otherwise only lives as a local variable here.
export function getLenis(): Lenis | null {
    return lenisInstance;
}