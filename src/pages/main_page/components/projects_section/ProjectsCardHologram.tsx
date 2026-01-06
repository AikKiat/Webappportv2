


import ProjectInformation from "./ProjectInformation";
import type { project } from "../../../../constants/constants";
import { projects } from "../../../../constants/constants";
import { useEffect, useRef} from "react";


interface ProjectsCardHologramProps{
    closeFromProjectCard : number;
    setCloseFromProjectCard : React.Dispatch<React.SetStateAction<number>>;
    currentIndex : number;
    sendCloseFromProjectCard : (data: number) => void;
    showFullInfo : boolean;
    sendShowCardProjectDetails : React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProjectsCardHologram({closeFromProjectCard, currentIndex, sendCloseFromProjectCard, showFullInfo, sendShowCardProjectDetails} : ProjectsCardHologramProps){

    const projectCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("close", closeFromProjectCard);
        console.log("check timer running!");
        if(closeFromProjectCard % 2 == 0){
            console.log("closing");
            if (projectCardRef.current) {
                projectCardRef.current.style.height = "0%";
                projectCardRef.current.style.opacity = '0';
                projectCardRef.current.style.zIndex = "0";
                projectCardRef.current.style.pointerEvents = "none";
            }
        }
        else{
            setTimeout(() => {
                if(projectCardRef.current){
                    projectCardRef.current.style.height = "80%";
                    projectCardRef.current.style.opacity = '1';
                    projectCardRef.current.style.zIndex = "1";
                    projectCardRef.current.style.visibility = 'visible';
                    projectCardRef.current.style.pointerEvents = "auto";
                }
            }, 200);
        }
    },[closeFromProjectCard])

    function handleClose(){
        console.log("Closing from hologram!!");
        sendCloseFromProjectCard(closeFromProjectCard + 1);
        sendShowCardProjectDetails(false);
    }


    return (
        <div className={`projects_card_showcase ${closeFromProjectCard % 2 == 0 ? "hidden" : "opened"}`}>
            <div className={`project_information_card_holder`} ref={projectCardRef}>
            {projects.map((project : project, index : number) =>{
                if(currentIndex === index && showFullInfo){
                        return (
                        <ProjectInformation 
                            projectDescription={project.description} 
                            projectName={project.name} 
                            projectLongerDescription={project.longerDescription}
                            projectImage={project.imageSource} 
                            videoSource={project.videoSource}
                            imageCollage={project.imageCollage}
                            videoCollage={project.videoCollage}
                            techstack={project.techstack}
                            githubLink={project.githubLink}
                            isPastSelectedProject={currentIndex===index} 
                            closeFromProjectCardCurrentVal={closeFromProjectCard}
                            uniqueIdName={project.uniqueIdName}
                            >
                        </ProjectInformation>
                    )
                }
                else{
                    return (
                        <></>
                    )
                }
            })}
            </div>
            <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
    )
}