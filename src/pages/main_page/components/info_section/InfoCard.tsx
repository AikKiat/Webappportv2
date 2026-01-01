

interface projectCardProps{
    cardsRef : React.RefObject<HTMLDivElement[]>,
    cardsFrontBehindRef : React.RefObject<HTMLDivElement[]>,
    infoDescription : string,
    index : number,
    assetImage : string | null,

}

export default function InfoCard({cardsRef, cardsFrontBehindRef, infoDescription, index, assetImage} : projectCardProps){
    return (
        <div className="info_card" id={`card_${index+1}`} ref={(el) => { if (el) cardsRef.current[index] = el; }}>
            <div className="card_front">
                {assetImage && <img id={`card_${index+1}_computer_image`} src={assetImage}></img>}
            </div>
            <div className="card_front_behind" id={`behind_${index+1}`} ref={(el) => { if (el) cardsFrontBehindRef.current[index] = el; }}></div>
            <div className="card_back">
                <span>{infoDescription}</span>
            </div>
        </div>
    )
}