const typingField = (state, { type, payload }) => {
    switch (type) {
        case "SPACED":
            return {
                ...state,
                wordPos: state.wordPos - 50,
                HLIndex: state.HLIndex + 1,
            }
        case "TYPED":
            return {
                ...state,
                wordTyped: payload
            }
        case "START":
            return {
                ...state,
                typingStarted: true
            }
        case "STOP":
            return {
                ...state,
                typingStarted: false,
            }
        case "FOCUS":
            return {
                ...state,
                inputIsFocus: true,
                isPaused: false
            }
        case "UNFOCUS":
            return {
                ...state,
                inputIsFocus: false,
                isPaused: true
            }
        case "DECREASE_TIME":
            return {
                ...state,
                timer: state.timer - 1
            }
        case "RESET":
            return {
                wordPos: 150,
                HLIndex: 0,
                wordTyped: '',
                typingStarted: false,
                inputIsFocus: true,
                timer: 60,
                isPaused: false
            }
        default:
            return state;
    }
}

export default typingField;