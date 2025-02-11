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

export { openDataSearch, paramMap}