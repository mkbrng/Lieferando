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
    loadShoppingBasketpreview();
    loadShoppingbasketSmall()
}

function getMenuIndex(food) {
    return shoppingBasketMenu.indexOf(food);
}

function loadShoppingBasket() {
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.innerHTML =''
    if (shoppingBasketMenu.length == 0) {
        document.getElementById('shoppingBasket').innerHTML = `<h3>Warenkorb</h3>
        <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>`
    } else {
        for (let i = 0; i < shoppingBasketMenu.length; i++) {
            const basketmenu = shoppingBasketMenu[i];
            const basketprices = shoppingBasketprices[i].toFixed(2);
            const basketamounts = amounts[i];
            
            
            shoppingBasket.innerHTML += `
            <div class="basketmenu">
            <p>${basketamounts}x</p>
            <p>${basketmenu}<p>
            
            
           <p> ${menuSum(basketprices,basketamounts)}€</p>
            <img src="./img/minus.png" onclick="decreaseQuantity(${i})" alt="">
            <img src="./img/add.png" onclick="increaseQuantity(${i})" alt="">
            <img src="./img/trash.png" onclick="removeItem(${i})" alt="">
            </div>
            
            `
            shoppingBasket.innerHTML += ``;
           
        }
        
        shoppingBasket.innerHTML += `
            <div class="total-sum">
                <h2>Bezahlen</h2>
                <p>${finalSum()}€</p>
            </div>
        `;
    }
    
    
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
        loadShoppingBasketpreview()
        loadShoppingbasketSmall()
    }
    
}

function increaseQuantity(index) {
    amounts[index]++;
    loadShoppingBasket();
    loadShoppingBasketpreview();
    loadShoppingbasketSmall()
}

function removeItem(index) {
    shoppingBasketMenu.splice(index, 1);
    shoppingBasketprices.splice(index, 1);
    amounts.splice(index, 1);
    loadShoppingBasket();
    loadShoppingBasketpreview();
    loadShoppingbasketSmall()
    
}

function loadShoppingBasketpreview() {
    let shoppingBasketpreview = document.getElementById('shoppingBasketpreview');
    
    shoppingBasketpreview.innerHTML = `<div class="shoppingBasketpreviewAmount">Warenkorb ${finalSum()}€</div>`;
}

function showShoppingbasketSmall() {
    document.getElementById('shoppingBasketSmall').classList.remove('d-none');
}

function closeShoppingbasketSmall() {
    document.getElementById('shoppingBasketSmall').classList.add('d-none');
}

function loadShoppingbasketSmall() {
    let shoppingBasket = document.getElementById('shoppingBasketSmall');
    shoppingBasket.innerHTML =''
    
        for (let i = 0; i < shoppingBasketMenu.length; i++) {
            const basketmenu = shoppingBasketMenu[i];
            const basketprices = shoppingBasketprices[i].toFixed(2);
            const basketamounts = amounts[i];
            
            
            shoppingBasket.innerHTML += `
            <div class="smallbasketmenu">
            <p>${basketamounts}x</p>
            <p>${basketmenu}<p>
            
            
           <p> ${menuSum(basketprices,basketamounts)}€</p>
            <img src="./img/minus.png" onclick="decreaseQuantity(${i})" alt="">
            <img src="./img/add.png" onclick="increaseQuantity(${i})" alt="">
            <img src="./img/trash.png" onclick="removeItem(${i})" alt="">
            </div>
            
            `
            shoppingBasket.innerHTML += ``;
           
        }
        
        shoppingBasket.innerHTML += `
            <div class="small-total-sum">
                <h2>Bezahlen</h2>
                <p>${finalSum()}€</p>
            </div>
            <img class="close-btn" onclick=${"closeShoppingbasketSmall()"} src="./img/close.png"/>
        `;
    }
    
