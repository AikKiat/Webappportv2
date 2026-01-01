
import { useEffect, useRef, useState } from "react";
import { ProjectNames, ProjectDescriptions } from "../../../../enums/word_paragraphs";


interface ProjectsDrawerProps{
    closeFromProjectCard : number;
    setCloseFromProjectCard : React.Dispatch<React.SetStateAction<number>>;
    setCurrentIndex : React.Dispatch<React.SetStateAction<number>>;
}


export default function ProjectsDrawer({closeFromProjectCard, setCloseFromProjectCard, setCurrentIndex} : ProjectsDrawerProps){

    const projectNamesArray = Object.keys(ProjectNames) as Array<keyof typeof ProjectNames>;

    const nextIndexRef = useRef<number>(-1);
    const projectCardsRef = useRef<HTMLDivElement[]>([]);


    useEffect(() => {
        
        if(closeFromProjectCard % 2 == 0){ //means close
            nextIndexRef.current = -1;
            raiseCard();
        }

    }, [closeFromProjectCard])

    function selectSpecificCard(index : number){

        if(closeFromProjectCard % 2 == 0){
            setCloseFromProjectCard(prev => prev + 1)
        }
        else{
            setCloseFromProjectCard(prev => prev + 2)
        }
        nextIndexRef.current = index;
        raiseCard();
    }

    function selectNext(direction : number){
        
        if(closeFromProjectCard % 2 == 0){
            setCloseFromProjectCard(prev => prev + 1)
        }
        else{
            setCloseFromProjectCard(prev => prev + 2)
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

    function raiseCard(){
        projectCardsRef.current.forEach((card, index) => {
            if (!card) return;

            if(index !== nextIndexRef.current){
                card.style.top = "0%";
                return;
            }
            card.style.top = "-15%";
        });

        setTimeout(() => {
            setCurrentIndex(nextIndexRef.current);
        }, 500);
    }

    return(
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
    )
}