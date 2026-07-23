
import React from "react";
import { useMemo } from "react";


interface glowingTextProps{
    text : string;
}

const colours : string[] = ["#eb77607c","#6095eb7f", "#60eb757f", "#db60eb85"];

// Memoised: this component renders one span per word, so re-renders are
// expensive. The underline expand-on-hover is pure CSS (:hover), so nothing
// here ever needs state - hovering no longer re-renders the whole word tree.
const GlowingText = React.memo(function GlowingText({text} : glowingTextProps){
    const lines = useMemo(() => text.split('\n'), [text]);

    // Random underline colours are picked once per text, not once per render,
    // so they no longer reshuffle whenever a parent re-renders.
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
