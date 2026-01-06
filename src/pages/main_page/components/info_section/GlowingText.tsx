
import React from "react";
import { useState } from "react";


interface glowingTextProps{
    text : string;
}

export default function GlowingText({text} : glowingTextProps){
    const lines = text.split('\n'); 

    const colours : string[] = ["#eb77607c","#6095eb7f", "#60eb757f", "#db60eb85"];


    const [hoveredWordIndex, setHoveredWordIndex] = useState<string | null>("");

    function handleExpandUnderline(wordIndex : number, lineIndex : number){
        setHoveredWordIndex(`${lineIndex}-${wordIndex}`);
    }

    return (
        <div className="intro_desc">
            {lines.map((line, lineIndex) => {

                const words = line.trim().split(" ");
                return (
                    <>
                    <div key={lineIndex}>
                        {words.map((textWord, wordIndex) => {
                            if(textWord.includes("**")){
                                const specialWordUnderlineStyle: React.CSSProperties = {
                                    backgroundImage: `linear-gradient(to right, ${colours[Math.floor(Math.random() * colours.length)]}, transparent)`,
                                };

                                const specialWordHolderWidthStyle : React.CSSProperties = {
                                    width : `${3 * textWord.length / 6}rem`
                                }

                                let toExpand = `${lineIndex}-${wordIndex}` == hoveredWordIndex;

                                textWord = textWord.replace("_", ' ');
                                textWord = textWord.replace(/\*\*/g, '');
                                return (
                                    <span className="special_word_holder" 
                                        onMouseEnter={() => handleExpandUnderline(wordIndex, lineIndex)} 
                                        onMouseLeave={() => setHoveredWordIndex("")}
                                        style={specialWordHolderWidthStyle}>
                                        <span key={wordIndex}>{textWord}</span>
                                        <div className={`special_word_underline ${toExpand? "expanded" : "hidden" }`} style={specialWordUnderlineStyle}></div>
                                    </span>
                                )
                            }
                            else{
                                return (
                                    <span key={wordIndex} className="normal_word">
                                        {textWord}
                                    </span>
                                )
                            }
                            //use .reduce to combine the spans to be together as once, with spaces.
                        }).reduce((prev, curr) => <>{prev} {curr}</>)} 
                    <span className="line_divider"></span>
                    </div>
                    <br></br>
                    </>
                )
            })}
        </div>
    )
}

