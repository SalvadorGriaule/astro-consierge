console.log("Hello from testFetch.js");

const url = 'https://api-shopping.p.rapidapi.com/shopping?item=tomatoes';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'Sign Up for Key',
		'x-rapidapi-host': 'api-shopping.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}