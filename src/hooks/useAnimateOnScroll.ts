import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { delay } from "motion";
import React, { useEffect, useMemo, useRef } from "react";

interface AnimationElements {
    cardContainer: React.RefObject<HTMLDivElement | null>;
    cardsFrontBehind: React.RefObject<HTMLDivElement[]>;
    cards: React.RefObject<HTMLDivElement[]>;

    projectDrawerSide : React.RefObject<HTMLDivElement | null>;
    projectDrawerFront : React.RefObject<HTMLDivElement | null>;
    projectCards : React.RefObject<HTMLDivElement[] | null>;
    projectDrawerLabel : React.RefObject<HTMLDivElement | null>;
    projectDrawerButtonLeft : React.RefObject<HTMLDivElement | null>;
    projectDrawerButtonRight : React.RefObject<HTMLDivElement | null>;
    

}

export const useAnimateOnScroll = (elements: AnimationElements) => {
    //useRef persists the state of this boolean across updates.
    const isProjectBounceComplete = useRef<boolean>(false);

    const colours : string[] = ["#eb77607c","#6095eb7f", "#60eb757f", "#db60eb85"];

    const resizeTimerRef = useRef<number>(0);

    const text = "PROJECTS";

    function initAnimations(){
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        
        isProjectBounceComplete.current = false;

        const container = elements.cardContainer.current;
        const cardElements = elements.cards.current;
        const cardsFrontBehind = elements.cardsFrontBehind.current;

        const projectDrawerSide = elements.projectDrawerSide.current;
        const projectDrawerFront = elements.projectDrawerFront.current;
        const projectCards = elements.projectCards.current;
        const projectDrawerLabel = elements.projectDrawerLabel.current;
        const projectDrawerButtonLeft = elements.projectDrawerButtonLeft.current;
        const projectDrawerButtonRight = elements.projectDrawerButtonRight.current;



        function infoCardStep1(){

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

            gsap.to("#card_1, #card_2, #card_3", {
                borderRadius: "1rem",
                boxShadow: "0rem 0rem 1rem #2f2f2fff",
                duration: 0.5,
                ease: "power3.out"
            }); 

        }

        function infoCardStep2(){
            cardElements.map((card, index) => {
            gsap.to(`#${card.id} .card_back `, {
                opacity: 1.0,
                duration: 0.5,
                background : "transparent",
                // boxShadow: `0rem 0rem 0rem ${colours[index % colours.length]} , 0rem 0rem 3rem ${colours[index % colours.length]} inset`,
                // boxShadow : "0.5rem 0.5rem 1rem #1f1f1fff inset, -0.5rem -0.5rem #fef8e2ff inset",
                ease: "power3.out"
            });
            });

            cardsFrontBehind.map((cardBackElement, index) =>{
                gsap.to(`#${cardBackElement.id}`, {
                    opacity: 0,
                    duration: 0.5,
                    filter: "blur(10.0rem)",
                    ease: "power3.out"
                });
            });
            
        }

        function infoCardStep3(){
            gsap.to(".info_card", {
                rotationY: 180,
                duration: 0.85,
                border : "solid 0.1rem #2d2d2dff",
                boxShadow: "none",
                borderRadius : "1rem",
                ease: "power3.out",
                stagger: 0.1,
            });

            // gsap.to("#card_1", {
            //     rotationZ: -15,
            //     translateY: "5rem",
            //     translateX: "-5rem"
            // })

            // gsap.to("#card_3", {
            //     rotationZ: 15,
            //     translateY: "5rem",
            //     translateX: "5rem"
            // })

            cardsFrontBehind.map((cardBackElement, index) =>{
                gsap.to(`#${cardBackElement.id}`, {
                    background: `${colours[index % colours.length]}`,
                });
            });
        }



        
        if (container && cardElements.length > 0 && cardsFrontBehind.length > 0) {
            ScrollTrigger.create({
                trigger: ".info_section",
                start: "top top",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                markers: false, // Set to true for debugging
                onUpdate: (self) =>{
                    const progress = self.progress;

                    if(progress < 0.2){
                        infoCardStep1();
                        setTimeout(() => {
                            infoCardStep2();
                        }, 1000);

                        setTimeout(() => {
                            infoCardStep3();
                        }, 1500);
                    }

                }
            });
            
            ScrollTrigger.refresh();
        }

        if(!projectCards){
            return;
        }

        ScrollTrigger.create({
            trigger: ".projects_section",
            start: "top top",
            onUpdate: (self) =>{
                const progress = self.progress
                if(progress <=0.4 && !isProjectBounceComplete.current){


                    gsap.to(projectDrawerSide, {
                    boxShadow: "0rem 0rem 0.1rem 1rem var(--background-color), 1.5rem -1rem 1rem 0.1rem #363535"
                    });
                    gsap.to(projectDrawerFront,{
                        boxShadow: "-1rem 0rem 0.1rem 1rem var(--background-color), 0rem -1rem 1rem 0.1rem #363535",
                        transform: "rotateY(40deg) rotateZ(-10deg) rotateX(-15deg) translate(12%, 33%)"
                    });


                    setTimeout(() => {
                        projectCards.forEach((card, index) => {
                        gsap.to(card, {
                            opacity: 0.5,
                            top: "0%",
                            duration: 0.01,
                            ease: "power3.out",
                            delay: index * 0.01
                        });
                        
                        gsap.fromTo(card, 
                            { y: 0 },
                            {
                                y: -1000,
                                duration: 0.1,
                                ease: "power3.out",
                                yoyo: true,
                                repeat: 1,
                                delay: index * 0.05
                            }
                            );
                        });
                    }, 100);

                    if(!projectDrawerButtonLeft){
                        return;
                    }

                    if(!projectDrawerButtonRight){
                        return;
                    }

                    
                    let previous : string = "";
                    for(let i = 0; i < text.length; i++){
                        setTimeout(() => {
                            gsap.fromTo(projectDrawerLabel, 
                                {
                                    textContent : previous
                                },
                                {
                                    textContent : previous + text[i]
                                }
                            );
                            previous += text[i];
                        }, 100 * i);
                    }


                    gsap.fromTo(`#${projectDrawerButtonLeft.id}`, 
                        { 
                            textContent: "",
                            z: 0,
                            boxShadow: "-0.5rem -0.3rem 0.5rem var(--background-color) , -0.5rem 0rem 1rem #1e1e1e",
                        },
                        {
                            textContent : "<",
                            z: 20,
                            transformPerspective: 100,
                            duration: 0.5,
                            ease: "sine.inOut",
                        });

                    setTimeout(() => {
                        gsap.fromTo(`#${projectDrawerButtonRight.id}`, 
                            { 
                                textContent: "",
                                z: 0,
                                boxShadow: "-0.5rem -0.3rem 0.5rem var(--background-color) , -0.5rem 0rem 1rem #1e1e1e"
                            },
                            {
                                textContent : ">",
                                z: 20,
                                transformPerspective: 100,
                                duration: 0.5,
                                ease: "sine.inOut",
                            }
                        );
                    }, 100);
                    
                    
                    isProjectBounceComplete.current = true;            
                }
            }
        })
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
    
    // Return the initAnimations function so it can be called from outside
    return initAnimations;
    //},[]);

    //Earlier bug--> [elements] causes the useEffect() to trigger on every re-render, which kills and resets scroll triggers and jumps the
    //scroll back to the top. This is because elements is defined as an arbitrary object to hold the 3 refs above^^, but this is an object 
    //nonetheless defined within the functional component MainPage that gets re-rendered with each change of a useState() variable.
    //Conversely, directly referencing the refs themselves --> cardContainer, cards, and cardsFrontBehind means that since these references are stable
    //--> ie: the Ref object does not change although .current changes. So useEffect() does not get called.
    //OR: We can just put [] to make this useEffect() run once on mount, attach the resize listner, and then onUnmount() --> remove listener.
}