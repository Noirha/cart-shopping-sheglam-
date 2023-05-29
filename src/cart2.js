
let label = document.getElementById("label")

let shopinngCart = document.getElementById("shopinng-cart");


let basket = JSON.parse(localStorage.getItem("kok")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("quntity");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

}

calculation()

let generaCartItem = () => {
    if (basket.length !== 0) {
        return shopinngCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopData.find((y) => y.id === id) || []

            return `<div class="cart-item">
<img src="${search.img}">
<div class="dets">
<p class="named">${search.des} <span class="cart-item-plus">$ ${search.price}</span></p>
<div class="buttons">
<i class="fa-solid fa-minus" onclick="decremint(${id})"></i>
<div id=${id}  class="quantity">${item}</div>
<i class="fa-solid fa-plus" onclick="increment(${id})" ></i>

</div>
<h3>$ ${Math.round(item * search.price)}</h3>
</div>

<i class="fa-solid fa-xmark" onclick="removeItem(${id})" ></i>
</div>
`
        }).join("")

    } else {
        shopinngCart.innerHTML = ``
        label.innerHTML = `
<p>your basket is empty, <a href="index.html">Continue Shopping</a></p>

</a>

`
    }
}
generaCartItem()


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
    generaCartItem()
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
    generaCartItem()
    localStorage.setItem("kok", JSON.stringify(basket));
}

let update = (id) => {

    let search = basket.find((x) => x.id === id)

    document.getElementById(id).innerHTML = search.item
    calculation()
    total()
}

let removeItem = (id) => {

    let selesct = id;
    basket = basket.filter((x) => x.id !== selesct.id)
    generaCartItem()

    calculation()
    total()
    localStorage.setItem("kok", JSON.stringify(basket));
}

let clearall = () => {
    basket = [];
    generaCartItem()
    calculation()
    localStorage.setItem("kok", JSON.stringify(basket));
}

let total = () => {
    if (basket.length !== 0) {
        let quantity = basket.map((x) => {
            let { item, id } = x;
            let search = shopData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);



        label.innerHTML = `
            <button onclick="clearall()" class="clear">clear</button>
             <h2>subtotal : <span> $${Math.round(quantity)}</span></h2>
            `

    } else return
}

total()


