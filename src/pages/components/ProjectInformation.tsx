
import infoImage from "../../assets/infoImage.svg";
import "../../styles/main_page_projects_section.css";

interface projectInformationProps{
    projectImage : string,
    projectName : string,
    projectDescription : string,
    isPastSelectedProject : boolean,
    sendCloseSignalParent : (data : boolean) => void
}


export default function ProjectInformation(props : projectInformationProps){

    const additionalStyle : React.CSSProperties = {
        animation: `${props.isPastSelectedProject? "spinout_anim 0.05s linear forwards" : "none"}`
    }

    return (
        <div className="project_information_card" style={additionalStyle}>
            <div className="image_holder">
                <img src={props.projectImage}></img>
            </div>
            <div className="text_holder">
                <span id="title">{props.projectName}</span>
                <p id="project_description">{props.projectDescription}</p>
            </div>
            <div className="close_button" onClick={() => {props.sendCloseSignalParent(true)}}>
                <span id="close_left_bar"></span>
                <span id="close_right_bar"></span>
            </div>
        </div>
    )
}