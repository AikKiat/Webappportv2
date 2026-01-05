
import { useEffect, useRef, useState } from "react";
import { projects } from "../../../../constants/constants";


interface ProjectsDrawerProps{
    closeFromProjectCard : number;
    setCloseFromProjectCard : React.Dispatch<React.SetStateAction<number>>;
    setCurrentIndex : React.Dispatch<React.SetStateAction<number>>;
    setRefDrawerSide : ( data : HTMLDivElement) => void
    setRefDrawerFront : (data : HTMLDivElement) => void
    setRefProjectCards : (data : HTMLDivElement[]) => void
    setRefDrawerLabel : (data : HTMLDivElement) => void
    setRefButtonLeft : (data : HTMLDivElement) => void
    setRefButtonRight : (data : HTMLDivElement) => void
}


export default function ProjectsDrawer(props : ProjectsDrawerProps){

    // const projectNamesArray = Object.keys(ProjectNames) as Array<keyof typeof ProjectNames>;

    let projectNamesArray : string[] = [];
    projects.map((project) => {
        projectNamesArray = [...projectNamesArray, project.name];
    })

    const nextIndexRef = useRef<number>(-1);
    const projectCardsRef = useRef<HTMLDivElement[]>([]);

    const refDrawerSide = useRef<HTMLDivElement>(null);
    const refDrawerFront = useRef<HTMLDivElement>(null);

    const refDrawerLabel = useRef<HTMLDivElement>(null);
    const refButtonleft = useRef<HTMLDivElement>(null);
    const refButtonRight = useRef<HTMLDivElement>(null);

    const [nextButtonClicked, setNextButtonClicked] = useState<boolean>(false);
    const [beforeButtonClicked, setBeforeButtonClicked] = useState<boolean>(false);

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
    },[])


    useEffect(() => {
        
        if(props.closeFromProjectCard % 2 == 0){ //means close
            nextIndexRef.current = -1;
            raiseCard();
        }

    }, [props.closeFromProjectCard])

    function selectSpecificCard(index : number){

        if(props.closeFromProjectCard % 2 == 0){
            props.setCloseFromProjectCard(prev => prev + 1)
        }
        else{
            props.setCloseFromProjectCard(prev => prev + 2)
        }
        nextIndexRef.current = index;
        raiseCard();
    }

    function selectNext(direction : number){

        if(direction === 1){
            setNextButtonClicked(true);

            setTimeout(() => {
                setNextButtonClicked(false);
            }, 500);
        }
        else if (direction === -1){
            setBeforeButtonClicked(true);

            setTimeout(() => {
                setBeforeButtonClicked(false);
            }, 500);
        }
        
        
        if(props.closeFromProjectCard % 2 == 0){
            props.setCloseFromProjectCard(prev => prev + 1)
        }
        else{
            props.setCloseFromProjectCard(prev => prev + 2)
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
            props.setCurrentIndex(nextIndexRef.current);
        }, 500);
    }

    return(
        <div className="projects_drawer">
            <div className="project_cards_container">
                {projectNamesArray.map((projectName, index) =>{
                    
                    let zPos : number = index * -50;
                    let yPos : number = index * -0;

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
                            key={projectName}
                            id={`drawer_card_${index+1}`}
                            onClick={()=>selectSpecificCard(index)}>
                            
                            <span>{index}</span> 
                            <span className="card_tab"></span>
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