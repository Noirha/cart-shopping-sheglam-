let shop = document.getElementById("shop")

let basket = JSON.parse(localStorage.getItem("kok")) || []


let getDataOfObject = () => {

    return (shop.innerHTML = shopData.map((x) => {

        let { id, img, des, price } = x;

        let search = basket.find((x) => x.id === id) || []


        return `
<div id="product-${id}" class="product">

 <img src=${img} >

            <p>${des}</p>
            <div>
                <div class="rate">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
                <div class="buttons">
                    <i class="fa-solid fa-minus" onclick="decremint(${id})"></i>
                    <div id="${id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i class="fa-solid fa-plus" onclick="increment(${id})" ></i>
                    </div>
            </div>
            <p class="price">$ ${price}</p>
        </div>

`

    }).join(""))
}

getDataOfObject()

let increment = (id) => {
    let selesct = id

    let search = basket.find((x) => x.id === selesct.id)

    if (search === undefined) {

        basket.push({
            id: selesct.id,
            item: 1,
        });
    } else {

        search.item += 1

    }
    update(selesct.id)
    localStorage.setItem("kok", JSON.stringify(basket))
}


let decremint = (id) => {
    let selesct = id
    let search = basket.find((x) => x.id === selesct.id)

    if (search === undefined) return;

    else if (search.item === 0) return;
    else if (search === undefined) return


    else {

        search.item -= 1

    }
    update(selesct.id)
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("kok", JSON.stringify(basket));
}

let update = (id) => {

    let search = basket.find((x) => x.id === id)

    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = () => {
    let cartIcon = document.getElementById("quntity");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

}

calculation()


























