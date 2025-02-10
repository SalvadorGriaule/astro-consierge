import jwt from "jsonwebtoken"

const getSession = async (sessionID) => {
    try {
        const clearID = sessionID?.slice(sessionID?.indexOf(":") + 1, sessionID?.indexOf("."));
        const response = await fetch(`http://localhost:3000/session/${clearID}`);
        const json = await response.json();
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
        return decoded == userID ? true : false
    })
    return id;
}

const guard = (user, cred) => {
    return user.hasOwnProperty("role") && user.role == cred ? true : false;
}

const checkSession = async (sessionID, userID, cred) => {
    const session = await getSession(sessionID)
    if (session) {
        const guard = guard(session.role, cred)
        const check = jwtCheck(session.jwt, userID)
        if (guard && check) {
            return session
        } else {
            return { error: true }
        }
    }
    return { error: true }
}

export { getSession, getID , jwtCheck , guard , checkSession , publicKey , privateKey}
