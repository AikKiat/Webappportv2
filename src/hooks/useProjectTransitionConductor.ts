import { useEffect } from "react";
import gsap from "gsap";

import { useTransitionStore, getSection } from "../store/transitionStore";
import { getLenis } from "./useBetterScroll";

// Tracks whether the skills section actually took part in the current exit,
// so the return animation only pulls back in what was actually sent away.
let skillsWasSentOut = false;

function isOnScreen(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
}

function runExitTimeline() {
    const drawer = getSection("projectsDrawer");
    const projectFullInformation = getSection("projectFullInformation");
    if (!drawer || !projectFullInformation) return;

    const skills = getSection("skillsSection");
    skillsWasSentOut = Boolean(skills && isOnScreen(skills));

    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
        onComplete: () => {
            useTransitionStore.getState().setPhase("open");
        },
    });

    const exitingTargets = skillsWasSentOut && skills ? [drawer, skills] : [drawer];
    tl.set(exitingTargets, { pointerEvents: "none" });

    tl.to(drawer, { //Slide out to the left
        x: "-120vw",
        opacity: 0,
        duration: 0.6,
        ease: "back.in(1.5)",
    });

    if (skillsWasSentOut && skills) {
        tl.to(skills, { //SLide out to the right
            x: "120vw",
            opacity: 0,
            duration: 0.6,
            ease: "back.in(1.5)",
        }, "<");
    }

    tl.fromTo(projectFullInformation, //project information itself, scales up from center.
        { scale: 0, opacity: 0, zIndex: -1000 },
        { scale: 1, opacity: 1, zIndex: 1000, duration: 0.7, ease: "elastic.out(1, 0.6)" }
    );
}

function runReturnTimeline() {
    const drawer = getSection("projectsDrawer");
    const hologram = getSection("projectFullInformation");
    if (!drawer || !hologram) return;

    const skills = getSection("skillsSection");

    const tl = gsap.timeline({
        onComplete: () => {
            useTransitionStore.getState().setPhase("closed");
            getLenis()?.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        },
    });

    tl.to(hologram, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        zIndex: -1000,
        ease: "back.in(1.4)",
    });

    tl.to(drawer, {
        x: "0vw",
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
    }, "-=0.1");

    if (skillsWasSentOut && skills) {
        tl.to(skills, {
            x: "0vw",
            opacity: 1,
            duration: 0.1,
            ease: "back.out(1.5)",
        }, "<");
    }

    const returningTargets = skillsWasSentOut && skills ? [drawer, skills] : [drawer];
    tl.set(returningTargets, { pointerEvents: "auto" });
}

export function useProjectTransitionConductor() {
    useEffect(() => {
        return useTransitionStore.subscribe((state, prevState) => {
            if (state.phase === prevState.phase) return;

            if (state.phase === "exiting") {
                runExitTimeline();
            } else if (state.phase === "returning") {
                runReturnTimeline();
            }
        });
    }, []);
}
