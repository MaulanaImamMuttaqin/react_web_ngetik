const typingPerformance = (state, { type, payload }) => {
    switch (type) {
        case "CORRECT":
            return {
                ...state,
                wordCorrect: state.wordCorrect + 1,
                wordCount: state.wordCount + 1
            }
        case "INCORRECT":
            return {
                ...state,
                wordWrong: state.wordWrong + 1,
                wordCount: state.wordCount + 1
            }
        case "SHOW":
            return {
                ...state,
                showPerformance: true
            }
        case "RESET":
            return {
                charCount: 0,
                wordCount: 0,
                wordWrong: 0,
                wordCorrect: 0,
                speed: 0,
                showPerformance: false
            }
        case "UPLOAD":
            return {
                ...state,
                upload: true
            }
        case "STOP_UPLOAD":
            return {
                ...state,
                upload: false
            }
        default:
            return state;
    }
}

export default typingPerformance;