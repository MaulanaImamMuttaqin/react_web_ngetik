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
        default:
            return state;
    }
}

export default typingField;