import { useEffect, useState, useRef, useCallback } from "react";
import {IntroTexts} from "../enums/word_paragraphs";


import "../styles/main_page_projects_section.css";
import "../styles/main_page_intro_section.css";
import "../styles/main_page_info_section.css";

import {useBetterScroll} from "../hooks/useBetterScroll";
import {useRecalculateOnResize} from "../hooks/useRecalculateOnResize";


//Assets
import knowingYourselfImage from "../assets/infoImage.svg";
import InfoCard from "./components/InfoCard";
import GlowingText from "./components/GlowingText";

//Enum
import { ProjectNames, ProjectDescriptions } from "../enums/word_paragraphs";
import ProjectInformation from "./components/ProjectInformation";

export default function MainPage(){

    const cardContainerRef = useRef<HTMLDivElement>(null);
    const cardsFrontBehindRef = useRef<HTMLDivElement[]>([]);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const [clicked, setClicked] = useState<boolean>(false);


    const projectCardsRef = useRef<HTMLDivElement[]>([]);
    const currentIndexRef = useRef<number>(-1);

    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    const projectNamesArray = Object.keys(ProjectNames) as Array<keyof typeof ProjectNames>;
    const projectDescriptionArray = Object.keys(ProjectDescriptions) as Array<keyof typeof ProjectDescriptions>;

    useEffect(()=>{
        useBetterScroll();
    },[])

    useRecalculateOnResize({
        cardContainer: cardContainerRef,
        cardsFrontBehind: cardsFrontBehindRef,
        cards: cardsRef
    });

    function selectNext(direction : number){
        const maxIndex = projectNamesArray.length-1;
        let newIndex : number = currentIndexRef.current + direction;

        if (newIndex > maxIndex){
            newIndex = 0;
        }
        if (newIndex < 0){
            newIndex = maxIndex;
        }
        currentIndexRef.current = newIndex;
        raiseCard();
    }

    function raiseCard(){
        projectCardsRef.current.forEach((card, index) => {
            if (!card) return;

            if(index !== currentIndexRef.current){
                card.style.top = "0%";
                return;
            }
            card.style.top = "-15%";
            console.log(currentIndexRef.current);
        });
        setClicked(false);
        setCurrentIndex(currentIndexRef.current);
    }

    function selectSpecificCard(index : number){
        currentIndexRef.current = index;
        raiseCard();
    }

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
                <div className="projects_drawer">
                    <div className="project_cards_container">
                        {projectNamesArray.map((projectName, index) =>{
                            
                            let zPos : number = index * -80;
                            let yPos : number = index * -20;

                            const cardStyle : React.CSSProperties = {
                                transform: `translateZ(${zPos}px) translateY(${yPos}px) `,
                            }

                            return (
                                <div 
                                    className="project_card" 
                                    style={cardStyle}
                                    ref={(element) => {
                                        if (element) projectCardsRef.current[index] = element;
                                    }}
                                    key={index}
                                    onClick={()=>selectSpecificCard(index)}>
                                    
                                    <span>{index}</span> 
                                    <span className="card_tab"></span>
                                </div>
                            )
                        })}
                    </div>
                <div className="drawer_side"></div>
                <div className="drawer_front">
                    <div className="drawer_label">
                        <span className="drawer_label_wording">PROJECTS</span>
                        <span className="toggle_button" id="select_right" onClick={() => {selectNext(1);}}>
                            <span>{">"}</span>
                        </span>
                        <span className="toggle_button" id="select_left" onClick={() => {selectNext(-1);}}>
                            <span>{"<"}</span>
                        </span>
                    </div>
                </div>
                </div>
                <div className="project_information_card_holder">
                    {projectNamesArray.map((projectName : string, index : number) =>{
                        
                        let projectDescription :string = projectDescriptionArray[index];
                        if(currentIndex === index){
                                return (
                                <ProjectInformation projectDescription={projectDescription} projectName={projectName} projectImage={knowingYourselfImage}></ProjectInformation>
                            )
                        }
                        else{
                            return (
                                <></>
                            )
                        }
                    })}
                </div>
            </div>
        </div>

    );
}