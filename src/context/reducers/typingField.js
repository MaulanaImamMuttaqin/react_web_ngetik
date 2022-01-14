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
                typingStarted: false
            }
        default:
            return state;
    }
}

export default typingField;