

import React, { useEffect, useRef, useState } from "react";
import {type certInfo, type personal } from "../../../../constants/constants"
import GlowingText from "./GlowingText";

import {motion, MotionValue, useMotionValue, useTransform} from "motion/react";


interface PersonalCardProps {
    personalQuality: personal;
    onSwipeOut: (index: number, x: MotionValue<number>) => void;
    onReset: () => void;
    firstIndex : number;
    catergory : string
}

const PersonalCard = ({ personalQuality, onSwipeOut, onReset, firstIndex, catergory}: PersonalCardProps) => {
    const x = useMotionValue(0);
    const translateMorph = useTransform(x, [-150, 150], [-18, 18]);

    const innerCardBackRef = useRef<HTMLDivElement>(null);
    const innerCardFrontRef = useRef<HTMLDivElement>(null);
    const showLessButton = useRef<HTMLDivElement>(null);

    function flipCard(frontOrBack : number){
        if(!innerCardBackRef.current || !innerCardFrontRef.current || !showLessButton.current){
            return;
        }
        if(frontOrBack === 0){
            innerCardBackRef.current.style.transform = "rotateY(180deg)" //show back face.
            innerCardFrontRef.current.style.transform = "rotateY(0deg)" //show back face.
            showLessButton.current.style.opacity = "0";
        }
        else{
            innerCardBackRef.current.style.transform = "rotateY(0deg)" //flip to show front face
            innerCardFrontRef.current.style.transform = "rotateY(180deg)" //show back face.
            showLessButton.current.style.opacity = "1";
        }
    }

    let opacityMorph = null;
    if(firstIndex === personalQuality.index){
        opacityMorph = useTransform(x, [-350, 0, 350], [0, 1, 0]);
    }
    else{
        opacityMorph = useTransform(x, [-150, 0, 150], [0, 0, 0]);
    }
    

    return (
            <motion.div
            key={personalQuality.index}
            className={`quality_card ${catergory}`}
            style={{
                x,
                opacity: opacityMorph,
                translate: translateMorph,
            }}
            drag="x"
            dragConstraints={{
                left: 0,
                right: 0
            }}
            onDragEnd={() => onSwipeOut(personalQuality.index, x)}
            id={`personal_card_${personalQuality.index}`}
        >
            <div className="inner_card_front" ref={innerCardFrontRef}>
                <div className="title">
                <span>{`${personalQuality.title}`}</span>
                </div>
                <GlowingText text={personalQuality.description}></GlowingText>
                <div className="toggle_messages">
                    <span className="swipe_message">{"<<"} Swipe Right or Left {">>"}</span>
                    <div className="tap_button_messages">
                        {personalQuality.index !== 0 && <span className="back_to_first_message" onClick={onReset}>Back to First</span>}
                        {personalQuality.longerDescription && <span className="more_info_message" onClick={()=> flipCard(1)}>Tap for More Info</span>}
                    </div>
                </div>
                <div className="cover_layer"></div>
                <div className="background_image">
                    <img src={`${personalQuality.imageSource}`} id={`${personalQuality.uniqueName}`}></img>
                </div>
                {personalQuality.multiDescription && 
                    <div>
                        {personalQuality.multiDescription.map((oneCert : certInfo) => {
                            return (
                                <div>
                                    <span className="cert_title">{oneCert.title}</span>
                                    <a className="cert_share_link" href={`${oneCert.credentialLink}`}></a>
                                    <span className="cert_image">
                                        <img src={`${oneCert.imageSource}`}></img>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                }   
            </div>
            <div className={`inner_card_back`} ref={innerCardBackRef}>
                <div className={`inner_card_back_contents_holder ${catergory.toLowerCase()}`}>
                    {personalQuality.longerDescription && <div className="more_information">
                        <GlowingText text={personalQuality.longerDescription}></GlowingText>  
                    </div>}
                    <span className="less_info_message" onClick={() => flipCard(0)} ref={showLessButton}>Show Less</span>
                </div>
            </div>
            
        </motion.div>
    );
}



interface projectCardProps{
    cardsRef : React.RefObject<HTMLDivElement[]>,
    cardsFrontBehindRef : React.RefObject<HTMLDivElement[]>,
    infoDescription : string,
    index : number,
    assetImage : string | null,
    splashText : string | null, 
    splashText2 : string | null,
    personalQualities : personal[],

}

export default function InfoCard({cardsRef, cardsFrontBehindRef, infoDescription, index, assetImage, splashText, splashText2, personalQualities} : projectCardProps){

    const [currentList, setcurrentList] = useState<personal[]>();

    const originalList = useRef<personal[]>(null);

    const [firstIndex, setFirstIndex] = useState<number>(-1);

    useEffect(()=>{
        setcurrentList(personalQualities);
        originalList.current = personalQualities;
    },[]);

    useEffect(() => {
        if(currentList && currentList.length > 0){
            setFirstIndex(currentList[0].index);
        }

        if(currentList && currentList.length == 0){
            setTimeout(() => {
                    if(!originalList.current){
                    return;
                }
                setcurrentList(originalList.current);
            }, 150);
        }
    }, [currentList]);


    function handleCardSwipedOut(index : number, x : MotionValue<number>){
        console.log("card index", index);
        if(!currentList){
            return;
        }
        if(Math.abs(x.get()) > 50){
            setcurrentList(cards => cards ? cards.filter(card => card.index !== index) : cards)
        }
    }

    function resetCardList(){
        if(!originalList.current){
            return;
        }
        setcurrentList(originalList.current);
    }


    return (
        <div className="info_card" id={`card_${index}`} ref={(el) => { if (el) cardsRef.current[index] = el; }}>
            <div className="card_front">
                {splashText && <span id="splash_text">{splashText}</span>}
                <br></br>
                {splashText2 && <span id="splash_text_2">{splashText2}</span>}
                {assetImage && <img id={`card_${index}_computer_image`} src={assetImage}></img>}
            </div>
            <div className="card_front_behind" id={`behind_${index}`} ref={(el) => { if (el) cardsFrontBehindRef.current[index] = el; }}></div>
            <div className="card_back">
                <div className="card_back_desc">
                    <span>{infoDescription}</span>
                </div>
                <div className="qualities_list">
                    {currentList && [...currentList].reverse().map((personalQuality: personal) => {
                        return (
                        <>
                            <PersonalCard
                                key={personalQuality.index}
                                personalQuality={personalQuality}
                                onSwipeOut={handleCardSwipedOut}
                                onReset={resetCardList}
                                firstIndex={firstIndex}
                                catergory={infoDescription.toLowerCase()}
                            />
                            <div className={`quality_card_behind ${infoDescription.toLowerCase()}`}></div>
                        </>
                        
                    )})}
                </div>
            </div>
        </div>
    )
}