let menus = ['Tantan Ramen','Teriyaki Don','Gyoza'];
let description = ['Nudelsuppe mit Hühnerbrühe, Sesam, Chili, Hackfleisch und Hähnchen Teriyaki','Teriyaki Hähnchen mit Kimchi und Mayonnaise','Frittierte Teigtaschen mit Hähnchen und Gemüse']
let amounts = [1,1,1];
let prices = [17.80,8.50,7.00];
let shoppingBasketMenu = [];
let shoppingBasketprices = [];
let sum = amounts.reduce(function (a, b) {
    return a + b;
  }, 0);

function loadMenu() {
    let menu = document.getElementById('speisekarte')
    for (let i = 0; i < menus.length; i++) {
        const food = menus[i];
        const descriptions = description[i];
        const price = prices[i].toFixed(2);

        menu.innerHTML += generateMenuHtml(food,descriptions,price);
        
    }
}

function generateMenuHtml(food,descriptions,price) {
    
    return `
    <div class="menubox"> 
    <h2>${food}</h2>
    <p>${descriptions}</p>
    <div class="menubox-under">
    <p>${price} €</p>
    <img onclick="addMenu('${food}',${price})" src="./img/plus.png" alt="">
    </div>
    </div>
    `
}

function addMenu(food,price) {
    
    const menuIndex = getMenuIndex(food);
    if (menuIndex === -1) {
        shoppingBasketMenu.push(food);
        shoppingBasketprices.push(price);
        amounts.push(1);
        
    } else {
        amounts[menuIndex]++;
    }
    loadShoppingBasket()
}

function getMenuIndex(food) {
    return shoppingBasketMenu.indexOf(food);
}

function loadShoppingBasket() {
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.innerHTML =''
    for (let i = 0; i < shoppingBasketMenu.length; i++) {
        const basketmenu = shoppingBasketMenu[i];
        const basketprices = shoppingBasketprices[i].toFixed(2);
        const basketamounts = amounts[i];
        
        
        shoppingBasket.innerHTML += `
        <div class="basketmenu">
        <p>${basketamounts}</p>
        <p>${basketmenu}<p>
        <p>${basketprices}€</p>
        
        ${menuSum(basketprices,basketamounts)}€
        </div>
        <button onclick="decreaseQuantity(${i})">-</button>
                <button onclick="increaseQuantity(${i})">+</button>
                <button onclick="removeItem(${i})">Remove</button>
        `
        shoppingBasket.innerHTML += ``;
       
    }
    
    shoppingBasket.innerHTML += `
        <div class="total-sum">
            <h2>Total Sum</h2>
            <p>${finalSum()}€</p>
        </div>
    `;
}

function menuSum(basketprices,basketamounts) {
let final = basketamounts*basketprices
return final.toFixed(2)
}

function finalSum() {
    let totalSum = 0;

    for (let i = 0; i < shoppingBasketMenu.length; i++) {
        const itemTotal = shoppingBasketprices[i] * amounts[i];
        totalSum += itemTotal;
    }

    return totalSum.toFixed(2);
}

function decreaseQuantity(index) {
    if (amounts[index] > 1) {
        amounts[index]--;
        loadShoppingBasket();
    }
}

function increaseQuantity(index) {
    amounts[index]++;
    loadShoppingBasket();
}

function removeItem(index) {
    shoppingBasketMenu.splice(index, 1);
    shoppingBasketprices.splice(index, 1);
    amounts.splice(index, 1);
    loadShoppingBasket();
}
