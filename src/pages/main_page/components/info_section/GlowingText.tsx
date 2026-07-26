
import React, { useEffect, useState } from "react";
import { useMemo } from "react";


interface glowingTextProps{
    text : string;
    typography? : boolean;
    active? : boolean
}

const colours : string[] = ["#eb77607c","#6095eb7f", "#60eb757f", "#db60eb85"];

// Memoised: this component renders one span per word, so re-renders are
// expensive. The underline expand-on-hover is pure CSS (:hover), so nothing
// here ever needs state - hovering no longer re-renders the whole word tree.
const GlowingText = React.memo(function GlowingText({text, typography, active} : glowingTextProps){

    const [letters, setLetters] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (!active) {
            setLetters([]);
            setCurrentIndex(0);
            return; 
          }
          if (currentIndex < text.length) {
            const timer = setTimeout(() => {
              setLetters(prev => [...prev, text.charAt(currentIndex)]);
              setCurrentIndex(prev => prev + 1);
            }, 25);
            return () => clearTimeout(timer);
          }
        }, [active, currentIndex, text]);
    
    let textWindow = typography? letters.join("") : text;
    const lines = useMemo(() => textWindow.split('\n'), [textWindow]);


    const underlineColours = useMemo(() => {
        const byWord: Record<string, string> = {};
        lines.forEach((line, lineIndex) => {
            line.trim().split(" ").forEach((word, wordIndex) => {
                if(word.includes("**")){
                    byWord[`${lineIndex}-${wordIndex}`] = colours[Math.floor(Math.random() * colours.length)];
                }
            });
        });
        return byWord;
    }, [lines]);

    return (
        <div className="intro_desc">
            {lines.map((line, lineIndex) => {

                const words = line.trim().split(" ");
                return (
                    <React.Fragment key={lineIndex}>
                    <div>
                        {words.map((textWord, wordIndex) => {
                            if(textWord.includes("**")){
                                const specialWordUnderlineStyle: React.CSSProperties = {
                                    backgroundImage: `linear-gradient(to right, ${underlineColours[`${lineIndex}-${wordIndex}`]}, transparent)`,
                                };

                                const specialWordHolderWidthStyle : React.CSSProperties = {
                                    width : `${3 * textWord.length / 6}rem`
                                }

                                textWord = textWord.replace("_", ' ');
                                textWord = textWord.replace(/\*\*/g, '');
                                return (
                                    <span key={wordIndex} className="special_word_holder"
                                        style={specialWordHolderWidthStyle}>
                                        <span>{textWord}</span>
                                        <div className="special_word_underline hidden" style={specialWordUnderlineStyle}></div>
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
                    </React.Fragment>
                )
            })}
        </div>
    )
});

export default GlowingText;
