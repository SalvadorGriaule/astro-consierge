export const getSession = async (sessionID) => {
    try {
        const clearID = sessionID?.slice(sessionID?.indexOf(":") + 1, sessionID?.indexOf("."));
        const response = await fetch(`http://localhost:3000/session/${clearID}`);
        const json = await response.json();
        return json
    } catch (e) {
        return { error: e }
    }
}

