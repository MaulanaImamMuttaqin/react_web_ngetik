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
    const exessElContainer = useRef(words.map(() => createRef()))


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




    // Functions
    // function to manage input 
    const inputHandler = (e) => {
        let element = letterRef.current[typingState.HLIndex].current
        let letters = element.childNodes
        let word = e.target.value.trim()
        let word_arr = word.split("")
        setTypingState({ ...typingState, wordTyped: word_arr })

        typingState.HLword.split("").forEach((l, i) => {
            if (word_arr[i] === undefined) {
                letters[i].style.color = "white"
            } else {
                if (letters[i].innerText === word_arr[i]) {
                    letters[i].style.color = '#22b005'
                } else {
                    letters[i].style.color = '#eb4034'
                }
            }
        })


        if (word_arr.length >= typingState.HLword.length) {
            let exessCont = exessElContainer.current[typingState.HLIndex].current
            exessCont.innerHTML = ""

            word_arr.slice(typingState.HLword.length, word_arr.length).forEach((w, i) => {
                let newEl = document.createElement("SPAN")
                let text = document.createTextNode(w)
                newEl.setAttribute("style", "color: rgb(235, 64, 52);")
                newEl.appendChild(text)
                exessCont.appendChild(newEl)
            })

        }
    }

    // check Word Wrong Or Correct
    const checkTypedWord = (typed, answer) => {
        if (typed.trim() !== answer) {
            letterRef.current[typingState.HLIndex].current.style.borderBottom = "2px solid #ad070f"

            // console.log("wrong", `'${typed}' || ${answer}`)
        }
        // else {
        //     console.log("correct", `'${typed}' || ${answer}`)
        // }
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
                                    <span ref={exessElContainer.current[i]} id="excessive"></span>
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
