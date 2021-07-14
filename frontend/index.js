let url = "http://localhost:4004/api/items";
const meliKey = "m3l1K3y2021*?";
let categories = [];
let inputSearchBox = document.getElementById("input-search");

document.addEventListener("DOMContentLoaded", () => {
    let searchText = sessionStorage.getItem("searchText");
    if (searchText) {
        document.getElementById("input-search").value = searchText;
        document.getElementById("input-search").focus();
        sessionStorage.removeItem("searchText");
        search();
    }
});
const currencyFormat = (number) => {
    var floor = Math.floor(number);
    if (floor > 999) {
        var hundred;
        if (number - (Math.floor(floor / 1000) * 1000) < 100) {
            hundred = '0' + (number - (Math.floor(floor / 1000) * 1000)).toFixed(2).replace('.', ',');
        } else {
            hundred = (number - (Math.floor(floor / 1000) * 1000)).toFixed(2).replace('.', ',');
        }
        number = Math.floor(floor / 1000) + '.' + hundred;
    } else {
        number = number.toString().replace('.', ',');
    }
    number = number.toString().split(",")[0];
    return number;
}

const search = async () => {
    const searchText = document.getElementById("input-search").value;
    let productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";
    let categoriesContainer = document.getElementById("categoriesContainer");
    categoriesContainer.innerHTML = "";
    categories = [];
    if (searchText.length > 4) {
        const data = await fetch(url + "?searchText=" + searchText, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                meliKey
            },
        });
        const response = await data.json();
        categoriesContainer.innerHTML = "";
        categories = [];
        categories = response.data.categories.splice(0,4);
        sessionStorage.setItem("categories", JSON.stringify(categories));
        categories.forEach((category, index) => {
            let divLi = document.createElement('li');
            divLi.className = categories.length - 1 === index ? "breadcrumb-item active" : "breadcrumb-item";
            divLi.innerHTML = `<a href="#">${category}</a>`;
            categoriesContainer.appendChild(divLi);
        });

        response.data.items.forEach((item) => {
            let divProduct = document.createElement('div');
            divProduct.className = "card producto col-10";
            divProduct.innerHTML = `<div class="content-producto span-8">
                <div class="img-producto">
                    <img src="${item.picture}" alt="Producto">
                </div>
                <div class="descripcion-producto">
                        <h4 class="title-producto">$ ${currencyFormat(item.price.amount)} 
                        ${item.free_shipping ? '<span><img src="./assets/ic_shipping.png" class="shipping" alt="Producto"></span>' : ''} </h4>
                    <p class="text-producto">${item.title}</p>
                </div>
            </div>
            <div class="detail-country span-2">
                Capital Federal
            </div>`;
            productsContainer.appendChild(divProduct);
            divProduct.addEventListener("click", async () => {
                const dataProduct = await fetch(url + "/" + item.id, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        meliKey
                    },
                });
                const responseProduct = await dataProduct.json();
                sessionStorage.setItem("product", JSON.stringify(responseProduct.data));
                window.location.replace("detail-product.html");
            })
        });
    }
}

inputSearchBox.addEventListener("input", search);

