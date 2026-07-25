import React, { useEffect, useRef, createContext, useState} from "react";

import { introTexts } from "../../constants/constants";



import {personalQualities} from "../../constants/constants";

import "../../styles/main_page_projects_section.css";
import "../../styles/main_page_intro_section.css";
import "../../styles/main_page_info_section.css";
import "../../styles/main_page_skills_section.css";
import "../../styles/theme_toggle.css";

import ThemeToggle from "../../components/ThemeToggle";

import {useAnimateOnScroll} from "../../hooks/useAnimateOnScroll";
import {useProjectTransitionConductor} from "../../hooks/useProjectTransitionConductor";
import {useScrollRevealConductor} from "../../hooks/useScrollRevealConductor";
import {registerSection} from "../../store/transitionStore";


//Assets
import knowingYourselfImage from "/icons/info_img.svg";
import profileImage from "/images/ncs.webp";

//Components for Info section
import InfoCard from "./components/info_section/InfoCard";
import GlowingText from "./components/info_section/GlowingText";

import {skills} from "../../constants/constants";
import type { skill } from "../../constants/constants";



//Components for Projects Section
import ProjectsDrawer from "./components/projects_section/ProjectsDrawer";
import { ProjectsCardHologram } from "./components/projects_section/ProjectsCardHologram";


export type Theme = "light" | "dark";

export const ThemeContext = createContext('dark');

export default function MainPage(){


    //Info Section
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const cardsFrontBehindRef = useRef<HTMLDivElement[]>([]);
    const cardsRef = useRef<HTMLDivElement[]>([]);


    //Hidden scroll-reveal divs: entering the viewport --> trigger zustand state change (useScrollRevealConductor)
    const infoCardsSentinelRef = useRef<HTMLDivElement>(null);
    const projectsDrawerSentinelRef = useRef<HTMLDivElement>(null);

    //Projects Section
    const skillsSectionRef = useRef<HTMLDivElement>(null);

    const childRefDrawerSide = useRef<HTMLDivElement>(null);
    const childRefDrawerFront = useRef<HTMLDivElement>(null);
    const childRefProjectCards = useRef<HTMLDivElement[]>(null);
    const childRefDrawerLabel = useRef<HTMLDivElement>(null);
    const childRefButtonleft = useRef<HTMLDivElement>(null);
    const childRefButtonRight = useRef<HTMLDivElement>(null);


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


    //Theme
    function getInitialTheme(): Theme {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            return stored;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function toggleTheme() {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    }

    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        if(skillsSectionRef.current){
            registerSection("skillsSection", skillsSectionRef.current);
        }
        return () => registerSection("skillsSection", null);
    },[])

    useProjectTransitionConductor();
    useScrollRevealConductor(theme);

    useAnimateOnScroll({
        infoCardsSentinel: infoCardsSentinelRef,
        projectsDrawerSentinel: projectsDrawerSentinelRef,
    });


    return (
        <div className="main_page_holder">
            <ThemeContext value={theme}>
                <ThemeToggle toggleTheme={toggleTheme} />
            </ThemeContext> 
            <div className="intro_section">
                    <div className="screen_1_holder">
                        <div className="image_holder">
                            <div className="personal_image">
                                <img src={profileImage}></img>
                            </div>
                        </div>
                        <div className="intro_desc_holder">
                            <GlowingText text={introTexts.bodyParagraph}></GlowingText>
                            <span className="intro_desc_after"></span>
                        </div>
                        <div className="know_more_buttons">
                            {introTexts.github && (
                                <a href={introTexts.github} target="_blank" rel="noopener noreferrer" className="github">
                                    <img src={`${introTexts.githubIcon}`}></img>
                                </a>
                            )}
                            {introTexts.linkedin && (
                                <a href={introTexts.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                                    <img src={`${introTexts.linkedinIcon}`}></img>
                                </a>
                            )}
                            {introTexts.resume && (
                                <a href={introTexts.resume} target="_blank" rel="noopener noreferrer" className="resume">
                                    <span>Resume</span>
                                </a>
                            )}
                        </div>
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
                            splashText="Knowing Yourself is the"
                            splashText2="Beginning of all Wisdom"
                            personalQualities={personalQualities.leadership}
                            >
                        </InfoCard>
                        <InfoCard
                            cardsRef={cardsRef}
                            cardsFrontBehindRef={cardsFrontBehindRef}
                            infoDescription={"Experiences"}
                            index={2}
                            assetImage={knowingYourselfImage}
                            splashText={null}
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
                        <div className="cover_box_1"></div>
                        <div className="cover_box_2"></div>
                </div>
                <div className="reveal_sentinel" ref={infoCardsSentinelRef}></div>
            </div>
            <ThemeContext value={theme}>
                <div className="projects_section">
                    <ProjectsDrawer
                        setRefDrawerFront={setDrawerFrontRef}
                        setRefDrawerSide={setDrawerSideRef}
                        setRefDrawerLabel={setDrawerLabelRef}
                        setRefProjectCards={setProjectCardsRef}
                        setRefButtonLeft={setButtonLeftRef}
                        setRefButtonRight={setButtonRightRef}
                        >
                    </ProjectsDrawer>
                    <ProjectsCardHologram />
                    <div className="reveal_sentinel reveal_sentinel_bottom" ref={projectsDrawerSentinelRef}></div>
                </div>
            </ThemeContext>

            <div className="skills_section" ref={skillsSectionRef}>
                <div className="skills_section_header">
                    <span>Skills</span>
                </div>
                <div className="skills_icons_desc_holder">
                    <div className="skills_grid">
                    {skills.map((skill : skill) => {
                        const style : React.CSSProperties = {
                            background: skill.color
                        }
                        return (
                            <div className="skill_item_holder" key={skill.name}>
                                 <div className={`skill_item`}>
                                    <span className={`description`}>{skill.name}</span>
                                    <div className={`skill_image`}>
                                        <img src={skill.logo} loading="lazy" decoding="async"></img>
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