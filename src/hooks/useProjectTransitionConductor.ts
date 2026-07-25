import { useEffect } from "react";

import { useTransitionStore, getSection } from "../store/transitionStore";

// gsap ease names -> cubic-beziers. elasticOut can't be expressed exactly as a
// cubic-bezier, so it's approximated with a strong overshoot.
const backIn = "cubic-bezier(0.36, 0, 0.66, -0.56)";
const backOut = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const elasticOut = "cubic-bezier(0.22, 1.4, 0.36, 1)";

interface TweenOptions {
    duration?: number; // seconds, like gsap
    delay?: number;    // seconds, like gsap
    ease?: string;
    onFinish?: () => void;
}

// Bake the animation's final values into inline style (like gsap leaves them)
// then release it, so later tweens/inline writes start from the committed value.
function commitAndRelease(animation: Animation, onFinish?: () => void) {
    animation.addEventListener("finish", () => {
        try {
            animation.commitStyles();
        } catch {
            // Element detached mid-animation - nothing to commit.
        }
        animation.cancel();
        onFinish?.();
    });
}

// gsap.to() equivalent: animate current style -> `to`.
function tween(element: HTMLElement | null, to: Keyframe, options: TweenOptions = {}) {
    if (!element) return;
    const { duration = 0.5, delay = 0, ease = backOut, onFinish } = options;

    const animation = element.animate([to], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: ease,
        fill: "forwards",
    });

    commitAndRelease(animation, onFinish);
}

// gsap.fromTo() equivalent: `from` -> `to`. fill "both" holds `from` during the
// delay, matching gsap's immediateRender so the element starts collapsed.
function fromTo(element: HTMLElement | null, from: Keyframe, to: Keyframe, options: TweenOptions = {}) {
    if (!element) return;
    const { duration = 0.5, delay = 0, ease = backOut, onFinish } = options;

    const animation = element.animate([from, to], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: ease,
        fill: "both",
    });

    commitAndRelease(animation, onFinish);
}


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

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    drawer.style.pointerEvents = "none";
    if (skillsWasSentOut && skills) skills.style.pointerEvents = "none";

    tween(drawer, { transform: "translateX(-120vw)", opacity: 0 }, { //Slide out to the left
        duration: 0.6,
        ease: backIn,
    });

    if (skillsWasSentOut && skills) {
        tween(skills, { transform: "translateX(120vw)", opacity: 0 }, { //Slide out to the right
            duration: 0.6,
            ease: backIn,
        });
    }

    //project information itself, scales up from center after the drawer clears.
    fromTo(projectFullInformation,
        { transform: "scale(0)", opacity: 0, zIndex: -1000 },
        { transform: "scale(1)", opacity: 1, zIndex: 1000 },
        {
            duration: 0.7,
            delay: 0.6,
            ease: elasticOut,
            onFinish: () => useTransitionStore.getState().setPhase("open"),
        },
    );
}

function runReturnTimeline() {
    const drawer = getSection("projectsDrawer");
    const hologram = getSection("projectFullInformation");
    if (!drawer || !hologram) return;

    const skills = getSection("skillsSection");

    tween(hologram, { transform: "scale(0)", opacity: 0, zIndex: -1000 }, {
        duration: 0.5,
        ease: backIn,
    });

    // Starts 0.1s before the hologram finishes (gsap "-=0.1").
    tween(drawer, { transform: "translateX(0)", opacity: 1 }, {
        duration: 0.6,
        delay: 0.4,
        ease: backOut,
        onFinish: () => {
            useTransitionStore.getState().setPhase("closed");
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            drawer.style.pointerEvents = "auto";
            if (skillsWasSentOut && skills) skills.style.pointerEvents = "auto";
        },
    });

    if (skillsWasSentOut && skills) {
        tween(skills, { transform: "translateX(0)", opacity: 1 }, {
            duration: 0.1,
            delay: 0.4,
            ease: backOut,
        });
    }
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
