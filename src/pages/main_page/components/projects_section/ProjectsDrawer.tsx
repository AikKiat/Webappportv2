
import { useEffect, useRef, useState } from "react";
import { projects } from "../../../../constants/constants";
import type { project } from "../../../../constants/constants";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useTransitionStore, registerSection } from "../../../../store/transitionStore";


interface ProjectsDrawerProps{
    setRefDrawerSide : ( data : HTMLDivElement) => void;
    setRefDrawerFront : (data : HTMLDivElement) => void;
    setRefProjectCards : (data : HTMLDivElement[]) => void;
    setRefDrawerLabel : (data : HTMLDivElement) => void;
    setRefButtonLeft : (data : HTMLDivElement) => void;
    setRefButtonRight : (data : HTMLDivElement) => void;
}


export default function ProjectsDrawer(props : ProjectsDrawerProps){

    const isMobile = useMediaQuery(`(min-width: 320px) and (max-width:700px)`);

    const phase = useTransitionStore((state) => state.phase);
    const openProject = useTransitionStore((state) => state.openProject);

    const drawerRootRef = useRef<HTMLDivElement>(null);

    let projectNamesArray : string[] = [];
    projects.map((project) => {
        projectNamesArray = [...projectNamesArray, project.name];
    })

    let projectsArrays : project[] = [];
    projects.map((project)=> {
        projectsArrays = [...projectsArrays, project];
    })

    const nextIndexRef = useRef<number>(-1);
    const projectCardsRef = useRef<HTMLDivElement[]>([]);
    const cardTabsRef = useRef<HTMLSpanElement[]>([]);
    const cardLineHoldersRef = useRef<HTMLDivElement[]>([]);
    const internalContentsRef = useRef<HTMLDivElement[]>([]);
    const cardNumbersRef = useRef<HTMLSpanElement[]>([]);

    const overrideMinimiseAll = useRef<boolean>(false);

    const refDrawerSide = useRef<HTMLDivElement>(null);
    const refDrawerFront = useRef<HTMLDivElement>(null);

    const refDrawerLabel = useRef<HTMLDivElement>(null);
    const refButtonleft = useRef<HTMLDivElement>(null);
    const refButtonRight = useRef<HTMLDivElement>(null);

    const [nextButtonClicked, setNextButtonClicked] = useState<boolean>(false);
    const [beforeButtonClicked, setBeforeButtonClicked] = useState<boolean>(false);

    const transformStyles = useRef<Record<number, string>>({});

    useEffect(() =>{
        if(refDrawerFront.current){
            props.setRefDrawerFront(refDrawerFront.current);
        }
        if(refDrawerSide.current){
            props.setRefDrawerSide(refDrawerSide.current);
        }
        if(projectCardsRef.current){
            props.setRefProjectCards(projectCardsRef.current);
        }
        if(refDrawerLabel.current){
            props.setRefDrawerLabel(refDrawerLabel.current); 
        }
        if(refButtonRight.current){
            props.setRefButtonRight(refButtonRight.current);
        }
        if(refButtonleft.current){
            props.setRefButtonLeft(refButtonleft.current);
        }
        if(drawerRootRef.current){
            registerSection("projectsDrawer", drawerRootRef.current);
        }
        return () => registerSection("projectsDrawer", null);
    },[])


    useEffect(() => {
        // Once the fullscreen project view has fully closed, drop the raised
        // card back down. Fires on every phase change (harmless - enableAllTabs
        // is idempotent) so it also covers the initial mount.
        if(phase === "closed"){
            nextIndexRef.current = -1;
            raiseCard();
        }

        enableAllTabs();

    }, [phase])

    function selectSpecificCard(index : number){
        if(overrideMinimiseAll.current === false){
            nextIndexRef.current = index;
            raiseCard();
        }
    }

    function toggleProjectCardShowcase(projectId : string){
        openProject(projectId);
    }

    function minimize(){
        nextIndexRef.current = -1;
        overrideMinimiseAll.current = true;
        raiseCard();

        setTimeout(() => {
            overrideMinimiseAll.current = false;
            enableAllTabs();
        }, 100);
    }

    function selectNext(direction : number){

        if(direction === 1){
            setNextButtonClicked(true);

            setTimeout(() => {
                setNextButtonClicked(false);
            }, 100);
        }
        else if (direction === -1){
            setBeforeButtonClicked(true);

            setTimeout(() => {
                setBeforeButtonClicked(false);
            }, 100);
        }

        const maxIndex = projectNamesArray.length-1;

        let newIndex : number = nextIndexRef.current + direction;

        if (newIndex > maxIndex){
            newIndex = 0;
        }
        if (newIndex < 0){
            newIndex = maxIndex;
        }
        nextIndexRef.current = newIndex;
        raiseCard();
    }

    function enableAllTabs(){
        for (let i = 0; i < projectCardsRef.current.length; i ++){
            cardLineHoldersRef.current[i].style.opacity = "0.5";
            cardTabsRef.current[i].style.opacity = "0.5"
            cardTabsRef.current[i].style.pointerEvents = "auto";
            cardLineHoldersRef.current[i].style.pointerEvents = "auto";
        }
    }

    function raiseCard(){
        projectCardsRef.current.forEach((card, index) => {
            if (!card) return;

            if(index !== nextIndexRef.current){
                card.style.top = "0%";
                card.style.zIndex = "0";
                card.style.transform = `${transformStyles.current[index]} rotateY(0deg)`;

                let internalContentRef : HTMLDivElement = internalContentsRef.current[index];

                if (internalContentRef)
                {
                    internalContentRef.style.opacity = "0";
                }
                cardLineHoldersRef.current[index].style.opacity = "0";
                cardTabsRef.current[index].style.opacity = "0";
                cardTabsRef.current[index].style.pointerEvents = "none";
                cardLineHoldersRef.current[index].style.pointerEvents = "none";

                if (cardNumbersRef.current[index]){
                    cardNumbersRef.current[index].style.opacity = "1";
                }
            }

            else{
                card.style.top = "-140%";
                card.style.zIndex = "999";
                card.style.transform = `${transformStyles.current[index]} rotateY(-40deg)`;

                let internalContentRef : HTMLDivElement = internalContentsRef.current[index];

                if (internalContentRef)
                {
                    internalContentRef.style.opacity = "1.0";
                }
                cardLineHoldersRef.current[index].style.opacity = "1";
                cardTabsRef.current[index].style.opacity = "1";

                if (cardNumbersRef.current[index]){
                    cardNumbersRef.current[index].style.opacity = "0";
                }
            }
        });
    }

    return(
        <div className="projects_drawer" ref={drawerRootRef}>
            <div className="project_cards_container">
                {projectsArrays.map((project, index) =>{
                    
                    let zPos : number = index * -40;
                    let yPos : number = index * -1;

                    let yPos2 : number = isMobile? (index * -0.5 - 3) : (index * -0.5 - 1.0) ;
                    let yPos3 : number = isMobile? (index * -0.45 - 2) : (index * -0.5 - 5);

                    transformStyles.current[index] = `translateZ(${zPos}px) translateY(${yPos}px) `

                    const cardStyle : React.CSSProperties = {
                        transform: `translateZ(${zPos}px) translateY(${yPos}px) `,
                    }
                    const cardTabStyle : React.CSSProperties = {
                        transform: `translateX(${isMobile? "0" :"11.7"}rem) translateY(${yPos2}rem) `,
                
                    }
                    const lineHolderStyle : React.CSSProperties = {
                        transform: `translateY(${yPos3}rem) translateZ(-1rem) translateX(${isMobile? `${-2.0 - (2-index * 0.5)}`: "1.4"}rem)`,
                        height : `${isMobile? (2 + index * 0.45) : (5 + index * 0.5)}rem`
                    
                    }
                    const lineStyle : React.CSSProperties = {
                        width : `${isMobile? (index * 1.0 + 10) : (index * 1.2 + 7)}rem`,
                        transform : `translateY(${isMobile? (0) : (6.0 + index * 0.2)}rem) rotate(${isMobile? "-70": "-30"}deg) translateX(2rem)`
                    }

                    return (
                        <div 
                            className="project_card" 
                            style={cardStyle}
                            ref={(element) => {
                                if (element) projectCardsRef.current[index] = element;
                            }}
                            key={project.name}
                            id={`drawer_card_${index+1}`}
                            onClick={() =>selectSpecificCard(index)}>
                            
                            <span
                                className="card_number"
                                ref={(element) => {if (element) cardNumbersRef.current[index] = element;}}
                                >{index}</span>
                            <div className="internal_contents" ref={(element) => {if (element) internalContentsRef.current[index] = element}}>
                                <span className="title_desc">{project.titleDesc}</span>
                                {project.titleThumbnail && <div className="title_thumbnail">
                                    <img src={`${project.titleThumbnail}`} loading="lazy" decoding="async"></img>
                                </div>}
                                <div className="buttons">
                                    <button className="expand" onClick={() => toggleProjectCardShowcase(project.uniqueIdName)}>View More</button>
                                    <button className="minimize" onClick={minimize}>Minimise</button>
                                </div>
                            </div>
                                <span 
                                    className="card_tab" 
                                    style={cardTabStyle} 
                                    ref={(element) => {if (element) cardTabsRef.current[index] = element;}}
                                    onClick={raiseCard}
                                    >{`${project.timeFrame}`}
                                </span>
                                <div 
                                    className="line_holder" 
                                    style={lineHolderStyle}
                                    ref={(element) => {if (element) cardLineHoldersRef.current[index] = element;}}
                                    >
                                    <span className="line" style={lineStyle}></span>
                                </div>
                        </div>
                    )
                })}
            </div>
            <div className="drawer_side" ref={refDrawerSide}>
            </div>
            <div className="drawer_front" ref={refDrawerFront}>
                <div className="drawer_label">
                    <span className="drawer_label_wording" ref={refDrawerLabel}></span>
                    <span className={`toggle_button ${nextButtonClicked ? "selected_right" : "unselected"}`} id="select_right" onClick={() => {selectNext(1);}} ref={refButtonRight}></span>
                    <span className={`toggle_button ${beforeButtonClicked ? "selected_left" : "unselected"}`} id="select_left" onClick={() => {selectNext(-1);}} ref={refButtonleft}></span>
                </div>
            </div>
        </div>
    )
}