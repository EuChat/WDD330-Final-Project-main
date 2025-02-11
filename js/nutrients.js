
const url = 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?nutrition-type=cooking';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b2c6bd28c4mshedaf2868b74e715p13117cjsn99ea633c26c6',
        'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
} catch (error) {
    console.error(error);
}
