import React, { useEffect, useState, useRef, useCallback, type JSX } from "react";
import {IntroTexts} from "../../constants/constants";



import { personalQualities, type personal } from "../../constants/constants";

import "../../styles/main_page_projects_section.css";
import "../../styles/main_page_intro_section.css";
import "../../styles/main_page_info_section.css";
import "../../styles/main_page_skills_section.css";

import {useBetterScroll} from "../../hooks/useBetterScroll";
import {useAnimateOnScroll} from "../../hooks/useAnimateOnScroll";


//Assets
import knowingYourselfImage from "../../assets/icons/info_img.svg";

//Components for Info section
import InfoCard from "./components/info_section/InfoCard";
import GlowingText from "./components/info_section/GlowingText";

import {skills} from "../../constants/constants";
import type { skill } from "../../constants/constants";



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

    const childRefDrawerSide = useRef<HTMLDivElement>(null);
    const childRefDrawerFront = useRef<HTMLDivElement>(null);
    const childRefProjectCards = useRef<HTMLDivElement[]>(null);
    const childRefDrawerLabel = useRef<HTMLDivElement>(null);
    const childRefButtonleft = useRef<HTMLDivElement>(null);
    const childRefButtonRight = useRef<HTMLDivElement>(null);

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


    function setDrawerFrontRef(data : HTMLDivElement){
        childRefDrawerFront.current = data;
    }
    function setDrawerSideRef(data : HTMLDivElement){
        childRefDrawerSide.current = data;
    }
    function setDrawerLabelRef(data : HTMLDivElement){
        childRefDrawerLabel.current = data;
    }
    function setProjectCardsRef(data : HTMLDivElement[]){
        childRefProjectCards.current = data;
    }
    function setButtonLeftRef(data : HTMLDivElement){
        childRefButtonleft.current = data;
    }
    function setButtonRightRef(data : HTMLDivElement){
        childRefButtonRight.current = data;
    }

    useEffect(()=>{
        useBetterScroll();
    },[])

    useAnimateOnScroll({
        cardContainer: cardContainerRef,
        cardsFrontBehind: cardsFrontBehindRef,
        cards: cardsRef,
        projectDrawerFront: childRefDrawerFront,
        projectDrawerSide : childRefDrawerSide,
        projectCards : childRefProjectCards,
        projectDrawerLabel : childRefDrawerLabel,
        projectDrawerButtonLeft : childRefButtonleft,
        projectDrawerButtonRight : childRefButtonRight,
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

            <div className="info_section">
                <div className="card_container" ref={cardContainerRef}>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Leadership"}
                            index={1}
                            assetImage={null}
                            splashText="Knowing Yourself is"
                            splashText2="of all Wisdom"
                            personalQualities={personalQualities.leadership}
                            >
                        </InfoCard>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Experiences"}
                            index={2}
                            assetImage={knowingYourselfImage}
                            splashText={"the Beginning"}
                            splashText2={null}
                            personalQualities={personalQualities.experiences}>
                        </InfoCard>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Education"}
                            index={3}
                            assetImage={knowingYourselfImage}
                            splashText={null}
                            splashText2={null}
                            personalQualities={personalQualities.education}
                            >
                        </InfoCard>
                </div>
            </div>

            <div className="projects_section">
                <ProjectsDrawer 
                    setCloseFromProjectCard={setCloseFromProjectCard} 
                    closeFromProjectCard={closeFromProjectCard} 
                    setCurrentIndex={setCurrentIndex} 
                    setRefDrawerFront={setDrawerFrontRef} 
                    setRefDrawerSide={setDrawerSideRef}
                    setRefDrawerLabel={setDrawerLabelRef}
                    setRefProjectCards={setProjectCardsRef}
                    setRefButtonLeft={setButtonLeftRef}
                    setRefButtonRight={setButtonRightRef}
                    >
                </ProjectsDrawer>
                <ProjectsCardHologram setCloseFromProjectCard={setCloseFromProjectCard} closeFromProjectCard={closeFromProjectCard} currentIndex={currentIndex}></ProjectsCardHologram>
            </div>

            <div className="skills_section">
                <div className="skills_section_header">
                    <span>Skills</span>
                </div>
                <div className="skills_icons_desc_holder">
                    <div className={`skill_brief_desc ${currentSkillDesc === "" ? "hidden" : "shown"}`}>
                        <GlowingText text={currentSkillDesc}></GlowingText>
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