
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const useBetterScroll = () =>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    lenisInstance = lenis;
    lenis.on("scroll",  ScrollTrigger.update);
    const onTick = (time : number) =>{
        lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Without this cleanup, every re-mount (e.g. React StrictMode's double
    // effect run in dev) leaks a live Lenis instance that keeps handling
    // every wheel/touch event and ticking every frame.
    return () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
        if (lenisInstance === lenis) {
            lenisInstance = null;
        }
    };
}

// Lets the transition conductor pause/resume scroll from outside this hook,
// since Lenis otherwise only lives as a local variable here.
export function getLenis(): Lenis | null {
    return lenisInstance;
}