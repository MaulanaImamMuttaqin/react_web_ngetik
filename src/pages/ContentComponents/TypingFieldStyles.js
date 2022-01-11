import React, { useEffect, useRef, useState, createRef } from 'react'
import words from '../../constant/words'

function TypingField() {
    // states
    const [typingState, setTypingState] = useState({
        wordPos: 150,
        HLIndex: 0,
        HLword: words[0],
        wordTyped: []
    })

    const inputRef = useRef()
    // let HLref = useRef(typingState.HLword.split("").map(() => createRef()))


    const spacePressed = useKeyPress(" ")
    // const alfanumPressed = useKeyPress("abcdefghijklmnopqrstuvwxyz1234567890")


    useEffect(() => {

        if (spacePressed) {
            setTypingState({
                ...typingState,
                wordPos: typingState.wordPos - 50,
                HLIndex: typingState.HLIndex + 1,
                HLword: words[typingState.HLIndex],
            })

            inputRef.current.value = ""
        }
        inputRef.current.focus()

        // console.log(typed)
        // console.log(HLref.current)
        // console.log(HLword)
        // console.log(typingState)
    }, [spacePressed])

    // useEffect(() => {
    //     console.log(HLref.current)
    //     // HLref.current.map((ref) => {
    //     //     console.log(ref.current)
    //     // })
    // }, [typingState.wordTyped])

    const inputHandler = (e) => {
        let word = e.target.value.trim()
        let word_arr = word.split("")
        setTypingState({ ...typingState, wordTyped: word_arr })


        // let regexStr = `^${word}`
        // const regex = new RegExp(regexStr, "gi");
        // let result = regex.test(words[HLindex]);

        // console.log(word, words[HLindex], result)

    }


    return (
        <div className='h-screen center bg-dark-blue-gradient flex-col'>
            <div className="h-[350px] w-[400px] overflow-hidden ">
                <div className='flex flex-col font-Courier tracking-[.5em] text-gray-200 relative transition-all' style={{ top: `${typingState.wordPos}px` }}>
                    {
                        words.map((w, i) => {
                            return <WordtoLetters key={i} index={i} word={w} HLindex={typingState.HLindex} HLref={HLref} />
                        })
                    }
                </div>
            </div>
            <input type="text" ref={inputRef} onChange={e => inputHandler(e)} />
        </div >
    )
}

const WordtoLetters = ({ index, word, HLindex, HLref }) => {
    let letters = word.split("")

    return <div className={`transition-all text-center h-[50px] center word-${index === HLindex ? 'highlight' : 'normal'} font-semibold`}>
        {index === HLindex ?
            <div>
                {letters.map((l, i) => {
                    return <span ref={HLref.current[i]} key={i}>{l}</span>
                })}
            </div> :
            <p>{word}</p>
        }

        {/* {
            letters.map((l, index) => {
                return <span key={index}>{l}</span>
            })
        } */}
    </div>
}

const useKeyPress = targetKey => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
        if (targetKey.includes(key)) setKeyPressed(true);
    };

    const upHandler = ({ key }) => {
        if (targetKey.includes(key)) setKeyPressed(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};

export default TypingField
