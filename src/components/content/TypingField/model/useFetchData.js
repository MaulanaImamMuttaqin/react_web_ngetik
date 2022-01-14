import axios from "axios"

const useFetchData = (url) => {
    return axios(url).
        then(res => res.data.words)
        .catch(err => { throw err })
}

export default useFetchData