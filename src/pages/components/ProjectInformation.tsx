
import infoImage from "../../assets/infoImage.svg";
import "../../styles/main_page_projects_section.css";

interface projectInformationProps{
    projectImage : string,
    projectName : string,
    projectDescription : string
}


export default function ProjectInformation(props : projectInformationProps){
    return (
        <div className="project_information_card">
            <div className="image_holder">
                <img src={props.projectImage}></img>
            </div>
            <div className="text_holder">
                <span id="title">{props.projectName}</span>
                <p id="project_description">{props.projectDescription}</p>
            </div>
        </div>
    )
}