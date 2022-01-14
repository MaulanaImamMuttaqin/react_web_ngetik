import axios from "axios"

const FetchWords = (url) => {
    return axios(url).
        then(res => res.data.words)
        .catch(err => { throw err })
}

export default FetchWords