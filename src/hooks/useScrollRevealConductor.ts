import { useEffect } from "react";

import { useIntroSectionTransitionState } from "../store/transitionStore";
import type { Theme } from "../pages/main_page/MainPage";
const colours: string[] = ["#eb77607c", "#6095eb7f", "#60eb757f", "#db60eb85"];

const text = "PROJECTS";

// power3.out
const powerThreeOut = "cubic-bezier(0.215, 0.61, 0.355, 1)";

interface TweenOptions {
    duration?: number;
    delay?: number;    
    ease?: string;
}

// gsap.to() equivalent: animate from the element's current style to `styles`.
function tween(element: HTMLElement | null, styles: Keyframe, options: TweenOptions = {}) {
    if (!element) return;
    const { duration = 0.5, delay = 0, ease = powerThreeOut } = options;

    const animation = element.animate([styles], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: ease,
        fill: "forwards",
    });

    animation.addEventListener("finish", () => {
        try {
            animation.commitStyles();
        } catch {
            
        }
        animation.cancel();
    });
}


function runInfoCardsRevealTimeline() {
    const container = document.querySelector<HTMLElement>(".card_container");
    const cardElements = Array.from(document.querySelectorAll<HTMLElement>(".info_card"));
    const cardsFrontBehind = Array.from(document.querySelectorAll<HTMLElement>(".card_front_behind"));

    if (!container || cardElements.length === 0) return;

    function infoCardStep1() {
        let gapValue = "3rem";
        if (window.matchMedia("(max-width:1100px)").matches) {
            gapValue = "1.5rem";
        }

        tween(container, { gap: gapValue });

        cardsFrontBehind.forEach((cardBehindElement) => {
            tween(cardBehindElement, { opacity: 1.0 });
        });

        cardElements.forEach((card) => {
            tween(card, {
                borderRadius: "1rem",
                boxShadow: "0rem 0rem 1rem #2f2f2fff",
            });
        });
    }

    function infoCardStep2() {
        cardElements.forEach((card) => {
            tween(card.querySelector<HTMLElement>(".card_back"), {
                opacity: 1.0,
                backgroundColor: "transparent",
            });
        });

        cardsFrontBehind.forEach((cardBehindElement) => {
            tween(cardBehindElement, {
                opacity: 0,
                filter: "blur(10.0rem)",
            });
        });
    }

    function infoCardStep3() {
        cardElements.forEach((card, index) => {
            tween(card, {
                transform: "rotateY(180deg)",
                boxShadow: "0rem 0rem 1rem transparent",
                borderRadius: "1rem",
            }, { duration: 0.85, delay: index * 0.1 });
        });

        cardsFrontBehind.forEach((cardBehindElement, index) => {
            tween(cardBehindElement, {
                backgroundColor: colours[index % colours.length],
            });
        });
    }

    infoCardStep1();
    setTimeout(infoCardStep2, 1000);
    setTimeout(infoCardStep3, 1500);
}


// Buttons start at opacity 0 in css, so every one of them has to be popped in here.
function popIn(element: HTMLElement | null, delay: number) {
    if (!element) return;

    tween(element, { opacity: 1 }, { duration: 0.3, delay: delay });

    element.animate([
        { transform: "scale(0.4)" },
        { transform: "scale(1.12)" },
        { transform: "scale(1)" },
    ], {
        duration: 450,
        delay: delay * 1000,
        easing: powerThreeOut,
    });
}


function runDrawerRevealTimeline() {
    const projectDrawerLabel = document.querySelector<HTMLElement>(".drawer_label_wording");
    const projectDrawerButtonLeft = document.querySelector<HTMLElement>("#select_left");
    const projectDrawerButtonRight = document.querySelector<HTMLElement>("#select_right");
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>(".project_card"));
    const stackButtons = Array.from(document.querySelectorAll<HTMLElement>(".browse_next_stack_button"));

    runDrawerThemeUpdate();

    setTimeout(() => {
        projectCards.forEach((card, index) => {
            tween(card, {
                opacity: 1.0,
                top: "0%",
            }, { duration: 0.01, delay: index * 0.01 });

            card.animate([
                { translate: "0px 0px" },
                { translate: "0px -1000px" },
                { translate: "0px 0px" },
            ], {
                duration: 200,
                delay: index * 50,
                easing: powerThreeOut,
            });
        });
    }, 100);

    stackButtons.forEach((stackButton, index) => {
        popIn(stackButton, 0.7 + index * 0.15);
    });

    if (!projectDrawerLabel || !projectDrawerButtonLeft || !projectDrawerButtonRight) {
        return;
    }

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            projectDrawerLabel.textContent = text.slice(0, i + 1);
        }, 100 * i);
    }

    projectDrawerButtonLeft.textContent = ">";
    tween(projectDrawerButtonLeft, {
        // gsap z: 20, transformPerspective: 100. scaleX(-1) points the arrow left -
        // the old gsap "FlipH" filter is not a real css filter value.
        transform: "perspective(100px) translateZ(20px) scaleX(-1)",
        opacity: 1,
    }, { duration: 0.5, ease: "ease-in-out" });

    setTimeout(() => {
        projectDrawerButtonRight.textContent = ">";
        tween(projectDrawerButtonRight, {
            transform: "perspective(100px) translateZ(20px)",
            opacity: 1,
        }, { duration: 0.5, ease: "ease-in-out" });
    }, 500);
}

function runDrawerThemeUpdate(){
    const projectDrawerSide = document.querySelector<HTMLElement>(".drawer_side");
    const projectDrawerFront = document.querySelector<HTMLElement>(".drawer_front");

    if (!useIntroSectionTransitionState.getState().drawerOpened) {
        projectDrawerSide?.style.removeProperty("box-shadow");
        projectDrawerFront?.style.removeProperty("box-shadow");
        projectDrawerFront?.style.removeProperty("transform");
        return;
    }

    tween(projectDrawerSide, {
        boxShadow: "0rem 0rem 0.1rem 1rem var(--background-color), 1.5rem -1rem 1rem 0.1rem var(--drawer-edge-shadow)",
    });

    tween(projectDrawerFront, {
        boxShadow: "-1rem 0rem 0.1rem 1rem var(--background-color), 0rem -1rem 1rem 0.1rem var(--drawer-edge-shadow)",
        transform: "rotateY(40deg) rotateZ(-10deg) rotateX(-15deg) translate(12%, 33%)",
    });
}


export function useScrollRevealConductor(theme : Theme) {
    useEffect(() => {

        runDrawerThemeUpdate(); //must  run this again to refresh the box shadow themes to use the new updated theme's set values, since everything is within a run-once context.
        //So, even if we reference var(--background-color), this colour gets saved into client-side memory and will get fetched to represent the box shadow colour everytime even 
        //when the theme changes, since the hidden divs have already triggered the transformation. Hence, in the useEffect() we update on theme, and the first line runDrawerThemeUpdate() 
        //is called on every change of theme hence. The second block will get called, the encapsulated methods will only get called if the subscribed state variables change.

        return useIntroSectionTransitionState.subscribe((state, prevState) => {
            if (state.introOpened && !prevState.introOpened) {
                runInfoCardsRevealTimeline();
            }
            if (state.drawerOpened && !prevState.drawerOpened) {
                runDrawerRevealTimeline();
            }
        });
    }, [theme]);
}
