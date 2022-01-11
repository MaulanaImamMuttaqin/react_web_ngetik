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
    const [focused, setFocused] = useState(true)
    //refs
    const letterRef = useRef(words.map(() => createRef()))
    const inputRef = useRef()

    //keypress
    const spacePressed = useKeyPress(" ")


    //Effects Hooks
    // on space bar pressed
    useEffect(() => {
        if (spacePressed) {
            setTypingState({
                ...typingState,
                wordPos: typingState.wordPos - 50,
                HLIndex: typingState.HLIndex + 1,
                HLword: words[typingState.HLIndex + 1],
            })
            checkTypedWord(typingState.wordTyped.join(""), typingState.HLword)

            // checkTypedWord(typingState)
            inputRef.current.value = ""

        }
        inputRef.current.focus()
    }, [spacePressed])

    // on input focus state changes
    useEffect(() => {

        console.log(focused, focused ? 'input is focus' : 'input is not focus')
    }, [focused])



    // Functions
    // function to manage input 
    const inputHandler = (e) => {
        let letters = letterRef.current[typingState.HLIndex].current.childNodes
        let word = e.target.value.trim()
        let word_arr = word.split("")
        setTypingState({ ...typingState, wordTyped: word_arr })


        letters.forEach((l, i) => {
            if (word_arr[i] === undefined) {
                l.style.color = "white"
            } else {
                if (l.innerText === word_arr[i]) {
                    l.style.color = '#22b005'
                } else {
                    l.style.color = 'red'
                }
            }
        })
    }

    // check Word Wrong Or Correct
    const checkTypedWord = (typed, answer) => {
        if (typed.trim() !== answer) {
            letterRef.current[typingState.HLIndex].current.style.borderBottom = "2px solid #ad070f"

            console.log("wrong", `'${typed}' || ${answer}`)
        } else {
            console.log("correct", `'${typed}' || ${answer}`)
        }
    }

    const focusInput = () => {
        if (!focused) {
            inputRef.current.focus()
        }

    }

    // functions to manage when input is not focus and not
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)




    return (
        <div className='h-screen center bg-dark-blue-gradient flex-col relative'>
            {
                !focused && <div className="h-screen w-screen center absolute z-2 " onClick={focusInput}>
                    <p className='text-2xl font-semibold text-gray-50'>clicked anywhere to continue typing</p>
                </div>
            }
            <div className={`h-[350px] w-[400px] overflow-hidden relative -z-1 ${!focused && 'blur-sm'}`}>
                <div className='flex flex-col font-Courier tracking-[.5em] text-gray-200 relative transition-all' style={{ top: `${typingState.wordPos}px` }}>
                    {
                        words.map((w, i) => {
                            return <div key={i} className={`transition-all text-center h-[50px] center word-${i === typingState.HLIndex ? 'highlight' : 'normal'} font-semibold`}>
                                <div ref={letterRef.current[i]} className="">
                                    {w.split("").map((l, i) => {
                                        return <span key={i}>{l}</span>
                                    })}

                                </div>
                            </div>
                        })

                    }
                </div>
            </div>
            <input className='block h-0' type="text" ref={inputRef} onChange={e => inputHandler(e)} onFocus={onFocus} onBlur={onBlur} />

        </div >
    )
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
