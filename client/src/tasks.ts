import Axios from 'axios';

const axios = Axios.create({
    baseURL: '/',
})

export async function sendString(data: string) {
    await axios({
        method: "POST",
        url: "/go/sha256",
        data: data,
    })
}
