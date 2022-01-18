import typingPerformanceStates from "../inisitalStates/typingPerformanceStates"
const typingPerformance = (state, { type, payload }) => {
    switch (type) {
        case "CORRECT":
            return {
                ...state,
                wordCorrect: state.wordCorrect + 1,
                wordCount: state.wordCount + 1,
                charWrong: state.charWrong + payload
            }
        case "INCORRECT":
            return {
                ...state,
                wordWrong: state.wordWrong + 1,
                wordCount: state.wordCount + 1,
                charWrong: state.charWrong + payload
            }
        case "CHAR":
            return {
                ...state,
                charCount: state.charCount + 1,
            }
        case "CALCULATE":
            return {
                ...state,
                speed: payload.net,
                accuracy: payload.accuracy
            }
        case "SHOW":
            return {
                ...state,
                showPerformance: true
            }
        case "RESET":
            return {
                ...typingPerformanceStates
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