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
                success: true,
                // body: JSON.stringify(response.data)
                data: {
                    foodList: response.data.foods.map(food => {
                        return {
                            "id":food.tags.tag_id,
                            "name": food.tags.item,
                            "qty" : food.tags.quantity,
                            "cal" : food.nf_calories,                          
                            "photo":food.photo.thumb,    
                        }
                    })
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            return { 
                successs: false, 
                body: error.toString() }
        });
}
export default getFoodList;

// getFoodList("3 eggs");
