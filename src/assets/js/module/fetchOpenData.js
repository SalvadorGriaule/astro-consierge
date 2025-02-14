const openDataSearch = async (...param) => {
    const searchParam = param.toString().replaceAll(",","/");    
    const clearParam = await fetch (`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/${searchParam}`);
    const jsonSearch = await clearParam.json();
    return jsonSearch
}

// Fonction renvoyant la valeur de "interest" sur la plage où l'on se trouve
const paramMap = () => {
    const url = new URL(window.location.href).searchParams
    const interest = url.get("interest")
    return interest 
}

export { openDataSearch, paramMap }