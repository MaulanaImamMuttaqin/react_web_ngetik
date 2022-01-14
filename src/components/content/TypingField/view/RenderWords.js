import React, { useEffect, useRef, useState, createRef, useContext } from 'react'
import { GlobalContext } from '../../../../context/Provider'
// import words from '../../../constant/words'

function RenderWords({ timer }) {
    const {
        typingFieldState: {
            wordPos,
            HLIndex,
            wordTyped,
            typingStarted
        },
        wordsState: {
            words
        },
        performance: {
            wordCount,
            wordWrong,
            wordCorrect
        },
        typingDispatch,
        performanceDispatch

    } = useContext(GlobalContext)


    const [focused, setFocused] = useState(true)

    //refs
    const letterRef = useRef([])
    const inputRef = useRef()
    const exessElContainer = useRef([])

    //keypress
    const spacePressed = useKeyPress(" ")
    //Effects Hooks
    // on space bar pressed

    useEffect(() => {
        if (spacePressed) {
            console.log(wordCount, wordCorrect, wordWrong)
            typingDispatch({ type: "SPACED" })
            checkTypedWord(wordTyped, words[HLIndex])
            inputRef.current.value = ""

        }
        inputRef.current.focus()
    }, [spacePressed])

    useEffect(() => {
        if (typingStarted && timer === 0) {
            inputRef.current.blur()
        }
    }, [typingStarted])


    // on input focus state changes


    // Functions
    // function to manage input 
    const inputHandler = (e) => {
        typingDispatch({ type: 'START' })
        let element = letterRef.current[HLIndex]
        let letters = element.childNodes
        let word = e.target.value.trim()
        let word_arr = word.split("")
        typingDispatch({ type: "TYPED", payload: word })
        words[HLIndex].split("").forEach((l, i) => {
            if (word_arr[i] === undefined) {
                letters[i].style.color = "white"
            } else {
                if (letters[i].innerText === word_arr[i]) {
                    letters[i].style.color = '#3b82f6'
                } else {
                    letters[i].style.color = '#eb4034'
                }
            }
        })


        if (word_arr.length >= words[HLIndex].length) {
            let exessCont = exessElContainer.current[HLIndex]
            exessCont.innerHTML = ""

            word_arr.slice(words[HLIndex].length, word_arr.length).forEach((w, i) => {
                let newEl = document.createElement("SPAN")
                let text = document.createTextNode(w)
                newEl.setAttribute("style", "color: rgb(235, 64, 52);")
                newEl.appendChild(text)
                exessCont.appendChild(newEl)
            })

        } else {
            exessElContainer.current[HLIndex].innerHTML = ""
        }
    }

    // check Word Wrong Or Correct
    const checkTypedWord = (typed, answer) => {
        if (typed.trim() !== answer) {
            letterRef.current[HLIndex].style.borderBottom = "2px solid #ad070f"
            performanceDispatch({ type: "INCORRECT" })
        } else {
            performanceDispatch({ type: "CORRECT" })
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
        <div className=''>
            <div className="text-white font-semibold tracking-[.1em] text-xl border-b border-white text-blue-500 flex justify-between px-5"><span>{timer} </span> <span>&#8634;</span></div>
            {/* {
                !focused && <div className="h-screen w-screen center fixed top-0 left-0 z-2 border border-black" onClick={focusInput}>
                    <p className='text-2xl font-semibold text-gray-50'>clicked anywhere to continue typing</p>
                </div>
            } */}
            {/* <div className={` h-[350px] w-[400px] overflow-hidden relative -z-1 ${!focused && 'blur-sm'}`}> */}
            <div className={` h-[350px] w-[400px] overflow-hidden relative`}>
                <div className='flex flex-col font-Courier tracking-[.5em] text-gray-200 relative transition-all' style={{ top: `${wordPos}px` }}>
                    {
                        words.map((w, i) => {
                            return <div key={i} className={`transition-all text-center h-[50px] center word-${i === HLIndex ? 'highlight' : 'normal'} font-semibold`}>
                                <div ref={(el) => (letterRef.current[i] = el)} className="">
                                    {w.split("").map((l, i) => {
                                        return <span key={i}>{l}</span>
                                    })}
                                    <span ref={(el) => exessElContainer.current[i] = el} id="excessive"></span>
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



const useKeyPress = (targetKey) => {
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

export default RenderWords
