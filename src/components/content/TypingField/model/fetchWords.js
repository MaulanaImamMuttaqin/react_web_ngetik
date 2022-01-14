import axios from "axios"

const fetchWords = (url) => {
    return axios(url).
        then(res => res.data.words)
        .catch(err => { throw err })
}

export default fetchWords