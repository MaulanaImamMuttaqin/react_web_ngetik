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

        default:
            return state;
    }
}

export default typingPerformance;