import axios from "axios"

function getFoodList(keyword) {
    var data = JSON.stringify({
        "query": keyword,
        "num_servings": 0,
        "line_delimited": false,
        "use_raw_foods": false,
        "include_subrecipe": false,
        "lat": 0,
        "lng": 0,
        "meal_type": 0,
        "use_branded_foods": false,
        "locale": "en_US",
        "taxonomy": false,
        "ingredient_statement": false,
        "last_modified": false
    });

    var config = {
        method: 'post',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
            'accept': 'application/json',
            'x-app-id': 'ce37d2c9',
            'x-app-key': '683597201bdbd81d447cead9f95b47cb',
            'x-remote-user-id': '0',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return {
                statusCode: 200,
                body: JSON.stringify(response.data)                
            }
        })
        .catch(function (error) {
            console.log(error);
            return { 
                statusCode: 500, 
                body: err.toString() }
        });
}


getFoodList("3 eggs");