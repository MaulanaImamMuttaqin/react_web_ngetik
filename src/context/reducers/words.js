const words = (state, { type, payload }) => {
    switch (type) {
        case "FETCHING":
            return {
                ...state,
                loading: true
            }
        case "WORDS":
            return {
                ...state,
                words: payload,
                loading: false
            }
        case "ERROR":
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default words;