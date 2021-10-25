import Axios from "axios";

const axios = Axios.create({
    baseURL: "/",
});

export async function shaRequest(shaInput: string, server: "go" | "node") {
    return (
        await axios({
            method: "GET",
            url: `/${server}/sha256`,
            params: {
                shaInput,
            },
        })
    ).data as string;
}

export async function stringRequest(data: StringRequest, server: "go" | "node") {
    return (
        await axios({
            method: "POST",
            url: `/${server}/sha256`,
            data: data,
        })
    ).data as string;
}

export interface StringRequest {
    InputString: string;
}
