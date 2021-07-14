const Response = require('../utils/response');
const fetch = require('node-fetch');

async function getItems(req, res) {
    try {
        const data = await fetch(process.env.URLAPIMELI + "sites/MLA/search?q=" + req.query.searchText, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        let response = await data.json();
        response = getResponseObject("total", response);
        return Response.success(res, 'Data ', response);
    } catch (error) {
        return Response.error(res, `Internal Server Error`, []);
    }
}

async function getItemDescription(req, res) {
    let url = process.env.URLAPIMELI + "items/" + req.params.id;
    try {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        let response = await data.json();
        const descriptionData = await fetch(url + "/description", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const description = await descriptionData.json();
        response.description = description.plain_text;
        response = getResponseObject("specific", response);
        return Response.success(res, 'Data ', response);
    } catch (error) {
        return Response.error(res, `Internal Server Error`, []);
    }
}

function getResponseObject(type, data) {
    const author = JSON.parse(process.env.AUTHOR);
    let responseObject = {
        author
    }
    if (type === "total") {
        responseObject.categories = data.available_filters[0].values.map((category) => {
            return category.name;
        });
        responseObject.items = data.results.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Number(item.price.toString().split(".")[0]),
                    decimals: item.price.toString().split(".")[1]
                        ? Number(item.price.toString().split(".")[1]) : 0,
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping
            };
        });
    } else {
        responseObject.item = {
            id: data.id,
            title: data.title,
            price: {
                currency: data.currency_id,
                amount: Number(data.price.toString().split(".")[0]),
                decimals: data.price.toString().split(".")[1]
                    ? Number(data.price.toString().split(".")[1]) : 0
            },
            picture: data.pictures[0].secure_url,
            condition: data.condition,
            free_shipping: data.shipping.free_shipping,
            sold_quantity: data.sold_quantity,
            description: data.description
        }
    }
    return responseObject;
}

module.exports = {
    getItems,
    getItemDescription
}