import { fetchJwt } from "../../../db/admin";
import { getID, getSession } from "../../../db/session";
import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/'})

const openDataSearch = async (...param) => {
    const searchParam = param.toString().replaceAll(",","/")
    console.log(searchParam);
    
    const clearParam = await fetch (`https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/${searchParam}`);
    const jsonSearch = await clearParam.json()
    return jsonSearch
}

const paramMap = () => {
    const url = new URL(window.location.href).searchParams
    const interest = url.get("interest")
    return interest 
}

const getSessionData = async () => {
    const sessionID = cookies.get("connect.sid")
    const session = await getSession("connect.sid")
    const idUser = getID(session.jwt)
    const user = await fetchJwt(`/allUser/${idUser}`,sessionID)
    console.log(user.data)
}

export { openDataSearch, paramMap, getSessionData}