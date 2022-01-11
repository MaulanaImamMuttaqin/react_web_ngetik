const auth = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: true
            }
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false
            }
        case "SET_USER":
            return {
                ...state,
                userData: payload
            }
        default:
            return state;
    }
}

export default auth;