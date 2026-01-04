
import { tr } from "motion/react-client";
import GlowingText from "../info_section/GlowingText";
import { useState } from "react";


interface projectInformationProps{
    uniqueIdName : string,
    projectImage : string,
    projectName : string,
    projectDescription : string,
    projectLongerDescription : string,
    videoSource : string | null,
    imageCollage : string[] | null,
    videoCollage : string[] | null,
    techstack : string[] | null,
    isPastSelectedProject : boolean,
    closeFromProjectCardCurrentVal : number,
    sendCloseSignalParent : (data : number) => void
}


export default function ProjectInformation(props : projectInformationProps){

    const [currentGraphicElementIndex, setCurrentGraphicElementIndex] = useState<number>(0);

    const [selectNextClicked, setSelectNextClicked] = useState<boolean>(false);
    const [selectBeforeClicked, setSelectBeforeClicked] = useState<boolean>(false);

    const additionalStyle : React.CSSProperties = {
        animation: `${props.isPastSelectedProject? "spinout_anim 0.05s linear forwards" : "none"}`
    }

    function handleCloseFromProjectCardState(){
        if(props.closeFromProjectCardCurrentVal % 2 == 1){ //odd number, means open
            props.sendCloseSignalParent(props.closeFromProjectCardCurrentVal + 1);
        }
    }

    let imageVideoCollage : string[] | null = null;
    if(props.imageCollage && props.videoCollage){
        imageVideoCollage = props.imageCollage.concat(props.videoCollage);
    }
    else if (props.imageCollage){
        imageVideoCollage = props.imageCollage;
    }
    else if(props.videoCollage){
        imageVideoCollage = props.videoCollage;
    }

    function handleSelectNext(){
        if(!imageVideoCollage){
            return;
        }
        setCurrentGraphicElementIndex(prev => (prev+1 > imageVideoCollage.length-1 ? 0 : prev+1));
        setSelectNextClicked(true);
        setTimeout(() => {
            setSelectNextClicked(false);
        }, 100);
    }

    function handleSelectBefore(){
        if(!imageVideoCollage){
            return;
        }
        setCurrentGraphicElementIndex(prev => (prev-1 < 0 ? imageVideoCollage.length-1 : prev-1));
        setSelectBeforeClicked(true);
        setTimeout(() => {
            setSelectBeforeClicked(false);
        }, 100);
    }

    return (
        <div className={`project_information_card ${props.uniqueIdName}`} style={additionalStyle}>
                {imageVideoCollage && <div className="image_holder">
                    <div className={`select_next ${selectNextClicked? "selected" : "unselected"}`} onClick={()=> handleSelectNext()}>
                        <span>{">"}</span>
                    </div>
                    <div className={`select_before ${selectBeforeClicked? "selected" : "unselected"}`}onClick={() => handleSelectBefore()}>
                        <span>{"<"}</span>
                    </div>
                    <div  className={`graphic_element ${props.uniqueIdName}`}>
                        { (() => {
                            console.log(imageVideoCollage);
                            let currentGraphicElement : string = imageVideoCollage[currentGraphicElementIndex];
                            if(currentGraphicElement.slice(0,3) === "htt"){
                                return (
                                    <iframe
                                    src={`${currentGraphicElement}`} id={`id_${currentGraphicElementIndex}`}>
                                    </iframe>
                                )
                            }  
                            else{
                                return (
                                    <img className={`image`}src={`${currentGraphicElement}`} id={`id_${currentGraphicElementIndex}`}></img>
                                )
                            }
                        })()
                        }
                    </div>
                </div>}
            <div className="text_holder">
                <span className="title">{props.projectName}</span>
                <GlowingText text={props.projectDescription}></GlowingText>
                {props.uniqueIdName === "pv1" &&  <a href="https://aikkiat.github.io/webappport/">Check it out here!</a>}
            </div>
            <div className="close_button" onClick={() => {handleCloseFromProjectCardState()}}>
                <span id="close_left_bar"></span>
                <span id="close_right_bar"></span>
            </div>
            {props.techstack && <div className="techstack">
                {props.techstack.map((technology : string, index : number) => {
                    return (
                        <img src={`${technology}`}></img>
                    )
                })}
            </div>}
        </div>
    )
}