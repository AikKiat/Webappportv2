import ProjectInformation from "./ProjectInformation";
import type { project } from "../../../../constants/constants";
import { projects } from "../../../../constants/constants";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTransitionStore, registerSection } from "../../../../store/transitionStore";

export function ProjectsCardHologram(){

    const phase = useTransitionStore((state) => state.phase);
    const activeProjectId = useTransitionStore((state) => state.activeProjectId);
    const closeProject = useTransitionStore((state) => state.closeProject);

    const projectCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(projectCardRef.current){
            registerSection("projectFullInformation", projectCardRef.current);
        }
        return () => registerSection("projectFullInformation", null);
    }, [])

    function handleClose(){
        closeProject();
    }

    return createPortal(
        <div className={`projects_card_showcase ${phase === "closed" ? "hidden" : "opened"}`} ref={projectCardRef}>
            <div className={`project_information_card_holder`}>
            {projects.map((project : project) =>{
                if(project.uniqueIdName === activeProjectId){
                        return (
                        <ProjectInformation
                            key={project.uniqueIdName}
                            projectName={project.name}
                            projectLongerDescription={project.longerDescription}
                            projectImage={project.imageSource}
                            videoSource={project.videoSource}
                            imageCollage={project.imageCollage}
                            videoCollage={project.videoCollage}
                            techstack={project.techstack}
                            githubLink={project.githubLink}
                            checkItOutLinks={project.checkItOutLinks}
                            checkItOutMsgs={project.checkItOutMsgs}
                            isPastSelectedProject={true}
                            closeFromProjectCardCurrentVal={0}
                            uniqueIdName={project.uniqueIdName}
                            handleClose={handleClose}
                            >
                        </ProjectInformation>
                    )
                }
                else{
                    return null;
                }
            })}
            </div>
        </div>,
        document.body
    )
}
