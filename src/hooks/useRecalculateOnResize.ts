import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useMemo, useRef } from "react";

interface AnimationElements {
    cardContainer: React.RefObject<HTMLDivElement | null>;
    cardsFrontBehind: React.RefObject<HTMLDivElement[]>;
    cards: React.RefObject<HTMLDivElement[]>;
}

export const useRecalculateOnResize = (elements: AnimationElements) => {
    //useRef persists the state of this boolean across updates.
    const isGapAnimationComplete = useRef<boolean>(false);
    const isFlipAnimationComplete = useRef<boolean>(false);
    const isColourChangeComplete = useRef<boolean>(false);

    const colours : string[] = ["#eb77607c","#6095eb7f", "#60eb757f", "#db60eb85"];

    const done = useRef<boolean>(false);
    const resizeTimerRef = useRef<number>(0);

    function initAnimations(){
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        
        // Reset gap animation state when reinitializing
        isGapAnimationComplete.current = false;
        isFlipAnimationComplete.current = false;
        isColourChangeComplete.current = false;

        const container = elements.cardContainer.current;
        const cardElements = elements.cards.current;
        const cardsFrontBehind = elements.cardsFrontBehind.current;
        
        if (container && cardElements.length > 0 && cardsFrontBehind.length > 0) {
            ScrollTrigger.create({
                trigger: ".info_section",
                start: "top top",
                end: `+=${window.innerHeight * 4}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                markers: false, // Set to true for debugging
                onUpdate: (self) =>{
                    const progress = self.progress;
                    
                    if (progress <= 0.25){
                        const widthPercentage = gsap.utils.mapRange(
                            0, 
                            0.25,
                            80,
                            75,
                            progress
                        );
                        gsap.set(container, {width: `${widthPercentage}%`});
                    } else {
                        gsap.set(container, {width: "75%"});
                    }

                    if(progress >= 0.35 && !isGapAnimationComplete.current){

                        gsap.to(container, {
                            gap: "5rem",
                            duration: 0.5,
                            ease: "power3.out"
                        });

                        gsap.to(cardsFrontBehind, {
                            opacity: 1.0,
                            duration: 0.5,
                            ease: "power3.out"
                        });

                        gsap.to("#card_2, #card_3, #card_4", {
                            borderRadius: "1rem",
                            boxShadow: "0rem 0rem 1rem #2f2f2fff",
                            duration: 0.5,
                            ease: "power3.out"
                        }); 


                        isGapAnimationComplete.current = true;
                    }


                    
                    if (progress >= 0.5 && !isFlipAnimationComplete.current && !isColourChangeComplete.current){
                        cardElements.map((card, index) => {
                            gsap.to(`#${card.id} .card_back `, {
                                opacity: 1.0,
                                duration: 0.5,
                                background : "transparent",
                                boxShadow: `0rem 0rem 0rem ${colours[index % colours.length]} , 0rem 0rem 3rem ${colours[index % colours.length]} inset`,
                                ease: "power3.out"
                            });
                        });

                        cardsFrontBehind.map((cardBackElement, index) =>{
                            gsap.to(`#${cardBackElement.id}`, {
                                opacity: 1.0,
                                duration: 0.5,
                                filter: "blur(10.0rem)",
                                ease: "power3.out"
                            });
                        });

                        isColourChangeComplete.current = true;
                    }



                    if (progress >= 0.7 && !isFlipAnimationComplete.current && isColourChangeComplete.current){

                        gsap.to(".info_card", {
                            rotationY: 180,
                            duration: 0.85,
                            border : "solid 0.1rem #2d2d2dff",
                            boxShadow: "none",
                            borderRadius : "1rem",
                            ease: "power3.out",
                            stagger: 0.1,
                        });

                        gsap.to("#card_2", {
                            rotationZ: -15,
                            translateY: "5rem",
                            translateX: "-5rem"
                        })

                        gsap.to("#card_4", {
                            rotationZ: 15,
                            translateY: "5rem",
                            translateX: "5rem"
                        })

                        cardsFrontBehind.map((cardBackElement, index) =>{
                            gsap.to(`#${cardBackElement.id}`, {
                                background: `${colours[index % colours.length]}`,
                            });
                        });

                        isFlipAnimationComplete.current = true;
                    }
                }
            });
            
            ScrollTrigger.refresh();
            done.current = true;
        }
    }

    function recalculateScrollTriggers(){
        clearTimeout(resizeTimerRef.current);
        resizeTimerRef.current = setTimeout(() => {
            initAnimations();
        }, 250);
    }


    useEffect(() => {
        initAnimations();
        window.addEventListener("resize", recalculateScrollTriggers);
        
        return () => {
            clearTimeout(resizeTimerRef.current);
            window.removeEventListener("resize", recalculateScrollTriggers);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
    //},[]);

    //Earlier bug--> [elements] causes the useEffect() to trigger on every re-render, which kills and resets scroll triggers and jumps the
    //scroll back to the top. This is because elements is defined as an arbitrary object to hold the 3 refs above^^, but this is an object 
    //nonetheless defined within the functional component MainPage that gets re-rendered with each change of a useState() variable.
    //Conversely, directly referencing the refs themselves --> cardContainer, cards, and cardsFrontBehind means that since these references are stable
    //--> ie: the Ref object does not change although .current changes. So useEffect() does not get called.
    //OR: We can just put [] to make this useEffect() run once on mount, attach the resize listner, and then onUnmount() --> remove listener.
}