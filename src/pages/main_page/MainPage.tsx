import React, { useEffect, useState, useRef, useCallback, type JSX } from "react";
import {IntroTexts} from "../../enums/word_paragraphs";



import "../../styles/main_page_projects_section.css";
import "../../styles/main_page_intro_section.css";
import "../../styles/main_page_info_section.css";
import "../../styles/main_page_skills_section.css";

import {useBetterScroll} from "../../hooks/useBetterScroll";
import {useRecalculateOnResize} from "../../hooks/useRecalculateOnResize";


//Assets
import knowingYourselfImage from "../../assets/infoImage.svg";

//Components for Info section
import InfoCard from "./components/info_section/InfoCard";
import GlowingText from "./components/info_section/GlowingText";

import {skills} from "../../enums/word_paragraphs";
import type { skill } from "../../enums/word_paragraphs";



//Components for Projects Section
import ProjectsDrawer from "./components/projects_section/ProjectsDrawer";
import { ProjectsCardHologram } from "./components/projects_section/ProjectsCardHologram";

export default function MainPage(){


    //Info Section
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const cardsFrontBehindRef = useRef<HTMLDivElement[]>([]);
    const cardsRef = useRef<HTMLDivElement[]>([]);


    //Projects Section
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [closeFromProjectCard, setCloseFromProjectCard] = useState<number>(2); //even means open, odd means close

    const skillIndexFocusedRef = useRef(-1);

    //Skills Section
    const glowingTextRef = useRef<HTMLDivElement>(null);
    const [currentSkillDesc, setCurrentSkillDesc] = useState<string>("");
    
    function handleSkillFocused(index : number){
        skillIndexFocusedRef.current = index
        showSkillDescription();
    }

    function showSkillDescription(){
        let left : number = 0;
        let right : number = skills.length;
        while (left < right){
            console.log("running!");
            let middle : number = Math.floor((left + right) / 2);
            if (skillIndexFocusedRef.current > middle){
                left = middle;
            }
            else if (skillIndexFocusedRef.current < middle){
                right = middle;
            }
            else{
                //we found it
                console.log(middle);
                setCurrentSkillDesc(skills[middle].description);
                return;
            }
        }
    }

    useEffect(()=>{
        useBetterScroll();
    },[])

    useRecalculateOnResize({
        cardContainer: cardContainerRef,
        cardsFrontBehind: cardsFrontBehindRef,
        cards: cardsRef
    });

    return (
        <div className="main_page_holder">
            <div className="intro_section">
                <div className="intro_header">{IntroTexts.IntroHeading}</div>

                <div className="intro_desc_holder">
                    <GlowingText text={IntroTexts.BodyParagraph}></GlowingText>
                    <span className="intro_desc_after"></span>
                </div>
                
            </div>

            <div className="info_section"><div className="card_container" ref={cardContainerRef}>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Leadership"}
                            index={1}
                            assetImage={knowingYourselfImage}>
                        </InfoCard>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Experiences"}
                            index={2}
                            assetImage={knowingYourselfImage}>
                        </InfoCard>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Education"}
                            index={3}
                            assetImage={knowingYourselfImage}>
                        </InfoCard>
                    </div>
            </div>

            <div className="projects_section">
                <ProjectsDrawer setCloseFromProjectCard={setCloseFromProjectCard} closeFromProjectCard={closeFromProjectCard} setCurrentIndex={setCurrentIndex}></ProjectsDrawer>
                <ProjectsCardHologram setCloseFromProjectCard={setCloseFromProjectCard} closeFromProjectCard={closeFromProjectCard} currentIndex={currentIndex}></ProjectsCardHologram>
            </div>

            <div className="skills_section">
                <div className="skills_section_header">
                    <span>Skills</span>
                </div>
                <div className="skills_icons_desc_holder">
                    <div className={`skill_brief_desc ${currentSkillDesc === "" ? "hidden" : "shown"}`}>
                        <GlowingText text={currentSkillDesc} ref={glowingTextRef}></GlowingText>
                    </div>
                    <div className="skills_grid">
                    {skills.map((skill : skill, index : number) => {
                        const style : React.CSSProperties = {
                            background: skill.color
                        }
                        return (
                            <div className="skill_item_holder" onMouseEnter={() =>handleSkillFocused(index)} onMouseLeave={() => setCurrentSkillDesc("")
                                }>
                                 <div className={`skill_item`}>
                                    <span className={`description`}>{skill.name}</span>
                                    <div className={`skill_image`}>
                                        <img src={skill.logo}></img>
                                    </div>
                                    <div className="skill_image_behind" style={style}></div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}