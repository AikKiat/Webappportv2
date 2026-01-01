

interface projectInformationProps{
    projectImage : string,
    projectName : string,
    projectDescription : string,
    isPastSelectedProject : boolean,
    closeFromProjectCardCurrentVal : number,
    sendCloseSignalParent : (data : number) => void
}


export default function ProjectInformation(props : projectInformationProps){

    const additionalStyle : React.CSSProperties = {
        animation: `${props.isPastSelectedProject? "spinout_anim 0.05s linear forwards" : "none"}`
    }

    function handleCloseFromProjectCardState(){
        if(props.closeFromProjectCardCurrentVal % 2 == 1){ //odd number, means open
            props.sendCloseSignalParent(props.closeFromProjectCardCurrentVal + 1);
        }
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
            <div className="close_button" onClick={() => {handleCloseFromProjectCardState()}}>
                <span id="close_left_bar"></span>
                <span id="close_right_bar"></span>
            </div>
        </div>
    )
}