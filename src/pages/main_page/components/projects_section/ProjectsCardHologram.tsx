


import ProjectInformation from "./ProjectInformation";
import type { project } from "../../../../constants/constants";
import { projects } from "../../../../constants/constants";
import { useEffect, useRef} from "react";


interface ProjectsCardHologramProps{
    closeFromProjectCard : number;
    setCloseFromProjectCard : React.Dispatch<React.SetStateAction<number>>;
    currentIndex : number;

}

export function ProjectsCardHologram({closeFromProjectCard, setCloseFromProjectCard, currentIndex} : ProjectsCardHologramProps){

    const emitterPlatformRef = useRef<HTMLDivElement>(null);
    const emitterRef = useRef<HTMLDivElement>(null);
    const emitterRayRef = useRef<HTMLDivElement>(null);
    const projectCardRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        console.log("close", closeFromProjectCard);
        console.log("check timer running!");
        if(closeFromProjectCard % 2 == 0){
            console.log("closing");
            if (projectCardRef.current) {
                projectCardRef.current.style.height = "0%";
                projectCardRef.current.style.opacity = '0';
                projectCardRef.current.style.pointerEvents = "none";
            }
            setTimeout(() => {
                if(emitterRayRef.current){
                    emitterRayRef.current.style.opacity = "0";
                }
            }, 250);

            setTimeout(() => {
                if(emitterRef.current){
                    emitterRef.current.style.boxShadow = "none";
                    emitterRef.current.style.background = "none";
                }
            }, 350);

            setTimeout(() => {
                if(emitterPlatformRef.current){
                    emitterPlatformRef.current.style.boxShadow = "-0.5rem 1.5rem 5rem 4rem var(--background-color)";
                    emitterPlatformRef.current.style.height = "0%";
                }
            }, 500);
        }
        else{
            console.log("opening");
            if(emitterPlatformRef.current){
                emitterPlatformRef.current.style.boxShadow = "-0.7rem 2rem 1rem 3.5rem var(--background-color), 1rem 4rem 1rem 2rem #1e1e1e";
                emitterPlatformRef.current.style.height = "30%";
            }

            setTimeout(() => {
                if(emitterRef.current){
                    emitterRef.current.style.background = "radial-gradient(circle at 55% 55% , transparent 0%,#9cbce6 20%, var(--background-color) 20%)";
                    emitterRef.current.style.boxShadow = "0.5rem 0.5rem 1rem 0.1rem #686868 inset,1rem 1rem 0.3rem 1rem var(--background-color) inset;"
                }
            }, 250);

            setTimeout(() => {
                if(emitterRayRef.current){
                    emitterRayRef.current.style.opacity = "1";
                }
            }, 350);

            setTimeout(() => {
                if(projectCardRef.current){
                    projectCardRef.current.style.height = "80%";
                    projectCardRef.current.style.opacity = '1';
                    projectCardRef.current.style.visibility = 'visible';
                    projectCardRef.current.style.pointerEvents = "auto";
                }
            }, 500);
        }
    },[closeFromProjectCard])


    function handleCloseSignalFromChild(data : number){
        // console.log("closing!!!");
        console.log("close_from card",closeFromProjectCard);
        setCloseFromProjectCard(data);
    }


    return (
        <div className="projects_card_showcase">
            <div className={`project_information_card_holder`} ref={projectCardRef}>
            {projects.map((project : project, index : number) =>{
                if(currentIndex === index){
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
                            sendCloseSignalParent={handleCloseSignalFromChild}
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
            <div className="project_information_card_behind"></div>
            </div>
            {/* <div className="emitter_platform_holder">
                <div className={`emitter_platform`} ref={emitterPlatformRef}>
                    <div className={`emitter`} ref={emitterRef}>
                        <span className={`emitter_ray`} ref={emitterRayRef}></span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}