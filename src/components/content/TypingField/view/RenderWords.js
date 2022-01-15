import React, { useEffect, useRef, useState, createRef, useContext } from 'react'
import { GlobalContext } from '../../../../context/Provider'
import InputFocusCover from './InputFocusCover'
import useKeyPress from '../../../../customHooks/useKeyPress'
import { ChevronRight, Restart } from '../../../reusables/Logo'
// import words from '../../../constant/words'

function RenderWords() {
    const {
        typingFieldState: {
            wordPos,
            HLIndex,
            wordTyped,
            typingStarted,
            inputIsFocus,
            timer
        },
        wordsState: {
            words,
            loading
        },

        typingDispatch,
        performanceDispatch,
        wordsDispatch

    } = useContext(GlobalContext)



    //refs
    const letterRef = useRef([])
    const inputRef = useRef()
    const exessElContainer = useRef([])

    //keypress
    const spacePressed = useKeyPress(" ", "key")
    const mousePressed = useKeyPress("mouse", "mouse")
    //Effects Hooks
    // on space bar pressed

    useEffect(() => {
        if (spacePressed && timer !== 0 && inputIsFocus) {

            typingDispatch({ type: "SPACED" })
            checkTypedWord(wordTyped, words[HLIndex])
            inputRef.current.value = ""
        }
    }, [spacePressed])

    useEffect(() => {
        if (mousePressed && !inputIsFocus) {
            inputRef.current.focus()
        }
    }, [mousePressed])

    useEffect(() => {
        if (typingStarted && timer === 0) {
            inputRef.current.blur()
        }

    }, [typingStarted])

    useEffect(() => {
        inputRef.current.focus()
    }, [])



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
            letterRef.current[HLIndex].style.borderBottom = "none"
            performanceDispatch({ type: "CORRECT" })
        }

    }

    const restart = (new_test) => {
        if (new_test) {
            wordsDispatch({ type: "UPDATE" })
        }
        restart_letter_styles(HLIndex)
        inputRef.current.value = ""
        inputRef.current.focus()
        typingDispatch({ type: "RESET" })
        performanceDispatch({ type: "RESET" })

    }

    const restart_letter_styles = (index) => {
        for (let a = 0; a <= index; a++) {
            letterRef.current[a].childNodes.forEach((l, i) => {
                l.style.color = "white"
            })
        }

    }

    // functions to manage when input is not focus and not
    const onFocus = () => typingDispatch({ type: 'FOCUS' })
    const onBlur = () => typingDispatch({ type: 'UNFOCUS' })




    return (
        <div className=''>
            {/* render component ini kalau inputnya sudah gak focus lagi trus componentnya kalau di tekan bisa memfocuskan inputannya lagi */}
            {(!inputIsFocus && timer !== 0) && <InputFocusCover />}

            <div className={`${(!inputIsFocus && timer !== 0) && 'blur-md'}`}>
                <div className=" font-semibold tracking-[.1em] text-xl border-b border-white text-blue-500 flex justify-between px-5 mb-5">
                    <span>{timer}</span>
                    <span onClick={() => restart()}> <Restart /></span>
                </div>
                <div className='relative h-[350px] w-[400px]'>
                    {(timer === 0 && !typingStarted) &&
                        <div className="absolute h-full w-full center z-10 flex gap-5">
                            <button className="bg-blue-500 text-white  h-[50px] w-[70px] center rounded-full text-4xl font-bold transition hover:bg-blue-700" onClick={() => restart(false)}><Restart /></button>
                            <button className="bg-blue-500 text-white  h-[50px] w-[70px] center rounded-full text-4xl font-bold transition hover:bg-blue-700" onClick={() => restart(true)}><ChevronRight /></button>
                        </div>}
                    {
                        !loading ?

                            <div className={` h-full w-full overflow-hidden ${timer === 0 && 'blur-md'} `}>
                                <div className='flex flex-col  tracking-[.5em] text-gray-200  transition-all ' style={{ transform: `translateY(${wordPos}px` }}>
                                    {
                                        words.map((w, i) => {
                                            return <div key={i} className={`transition-all text-center  h-[50px] center word-${i === HLIndex ? 'highlight' : 'normal'} font-semibold`}>
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

                            : <div className="h-full w-full center text-white text-3xl">
                                <p>Loading...</p>
                            </div>
                    }

                </div>

                <input className='block h-0' type="text" ref={inputRef} onChange={e => inputHandler(e)} onFocus={onFocus} onBlur={onBlur} />
            </div>

        </div >
    )
}






export default RenderWords
