let product;
document.addEventListener("DOMContentLoaded", () => {
    let categories = JSON.parse(sessionStorage.getItem("categories"));
    let categoriesContainer = document.getElementById("categoriesContainer");
    categoriesContainer.innerHTML = "";
    categories.forEach((category, index) => {
        let divLi = document.createElement('li');
        divLi.className = categories.length - 1 === index ? "breadcrumb-item active" : "breadcrumb-item";
        divLi.innerHTML = `<a href="#">${category}</a>`;
        categoriesContainer.appendChild(divLi);
    });
    product = JSON.parse(sessionStorage.getItem("product"));
    document.getElementById("description").innerHTML = product.item.description;
    document.getElementById("price").innerHTML = currencyFormat(product.item.price.amount);
    document.getElementById("decimals").innerHTML = product.item.price.decimals === 0 ? '00' : product.item.price.decimals;
    document.getElementById("condition").innerHTML = product.item.condition == "new"
        ? "Nuevo" : "Usado";
    document.getElementById("sold_quantity").innerHTML = product.item.sold_quantity;
    document.getElementById("title").innerHTML = product.item.title;
    document.getElementById("image").src = product.item.picture;

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
    if (searchText.length > 4) {
        sessionStorage.setItem("searchText", searchText);
        window.location.replace("index.html");
    }
}

let inputSearchBox = document.getElementById("input-search");
inputSearchBox.addEventListener("input", search);