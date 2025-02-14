import jwt from "jsonwebtoken"
import { fetchJwt } from "./admin.js";

import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

const getSession = async (sessionID) => {
    try {
        const clearID = sessionID?.slice(sessionID?.indexOf(":") + 1, sessionID?.indexOf("."));
        const response = await fetch(`http://localhost:3000/session/${clearID}`);
        const json = await response.json();
        console.log("getSession",json);
        
        return json
    } catch (e) {
        return { error: e }
    }
}

const getID = (jwtCheck) => {
    const id = jwt.verify(jwtCheck, rsaKey.privateKey, (err, decoded) => { 
        return decoded
    })  
    return id
}

const jwtCheck = (jwtIn, userID) => {
    const id = jwt.verify(jwtIn, rsaKey.privateKey, (err, decoded) => {
        console.log("jwtCheck",jwtIn,decoded,err)
        return decoded.user == userID ? true : false
    })
    return id;
}

const guard = (user, cred) => {
    return user.hasOwnProperty("role") && user.role == cred ? true : false;
}

const checkSession = async (sessionID, userID, cred) => {
    const session = await getSession(sessionID)
    console.log("checkSession",session, cred);
    if (session) {
        
        const checkGuard = guard(session, cred)
        const check = jwtCheck(session.jwt, userID)      
        if (checkGuard && check) {
            return session
        } else {
            return { error: true }
        }
    }
    return { error: true }
}

const getSessionData = async () => {

    const sessionID = cookies.get("connect.sid");
    const session = await getSession("connect.sid");
    const idUser = getID(session.jwt);
    const user = await fetchJwt(`/allUser/${idUser}`, sessionID);
    console.log(user.data);
}


export { getSession, getID , jwtCheck , guard , checkSession ,getSessionData}
