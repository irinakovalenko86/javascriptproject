const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const items = ['Tomato', 'Potato', 'Cucumber', 'Cherry', 'Cabbage', 'Watermelon']; //заглушка типа БД
const prices = [300, 60, 980, 360, 34, 80]; //заглушка типа БД
const ids = [0, 1, 2, 3, 4, 5];

const PRODUCTS = fetchData (); //заглушка ответа с сервера
const userCart = [];
var cartBlock = document.querySelector('.cart-block');

class Product
{
	constructor(product)
	{
		this.id = product.id,
		this.name = product.name
		this.img = product.img
		this.price = product.price
	}

	render(){
		return `<div class="product-item" data-id="${this.id}>
						<img src="${this.img}" alt="some image">
						<div class="desc"
							<h3>${this.name}</h3>
							<p>${this.price}</p>
							<button class="buy-btn" 
							data-id="${this.id}"
							data-name="${this.name}"
							data-price="${this.price}">КУПИТЬ</button>
						</div>
					</div>`
	}
}

class ProductList{
	constructor() {
		this.products = []
		this._init();
	}

	_init()
	{
		this.fetchProducts();
		this.render();
	}

	fetchProducts()
	{
		this.products = fetchData();
	}

	render () {
		const block = document.querySelector ('.products')
		this.products.forEach (product => {
			const prod = new Product (product)
			block.insertAdjacentHTML ('beforeend', prod.render ())
		});
	}
}

class Cart{
	constructor(){

	}

	renderCart()
	{
		let allProducts = '';
		userCart.forEach(function(item){
			allProducts += `<div class="cart-item" data-id="${item.id}>
							<div class="product-bio">
								<img src="${item.img}" alt="some image">
								<div class="product-desc"
									<p class="product-title">${item.name}</p>
									<p class="product-quantity">${item.quantity}</p>
									<p class="product-single-price">${item.price}</p>
								</div>
								<div class="right-block">
									<button class="del-btn" data-id="${item.id}">&times;</button>
								</div>
							</div>
						</div>`
		});

		cartBlock.innerHTML = allProducts
	}

	addProduct (product) {
		let productID = +product.dataset['id'];
		let find = userCart.find (element => element.id === productID); //element (true) / false
	
		if (!find) {
			userCart.push ({
				id: productID,
				name: product.dataset['name'],
				price: +product.dataset['price'],
				img: cartImage,
				quantity: 1
			})
		} else {
			find.quantity ++
		}
		this.renderCart();
	}

	removeProduct (product) {
		let productID = +product.dataset['id'];
		let find = userCart.find (element => element.id === productID);
	
		if (find.quantity > 1) {
			find.quantity --
		} else {
			userCart.splice (userCart.indexOf(find), 1)
			document.querySelector (`.cart-item[data-id="${productID}"]`)
		}
		this.renderCart();
	}
}

function fetchData () {
	let arr = [];
	for (let i = 0; i < items.length; i++) {
		arr.push ({
			id: i,
			name: items[i],
			price: prices[i],
			img: image,
		});
	}
	return arr
}



let productList = new ProductList();
let cart = new Cart();
document.querySelector('.btn-cart').addEventListener ('click', () => {
	cartBlock.classList.toggle ('invisible');
})

document.querySelector('.products').addEventListener ('click', (evt) => {
	if (evt.target.classList.contains ('buy-btn')) {
		cart.addProduct (evt.target)
	}
})


document.querySelector('.cart-block').addEventListener ('click', (evt) => {
	if (evt.target.classList.contains ('del-btn')) {
		cart.removeProduct (evt.target)
	}
})

/*function createProduct (i) {
	return {
		id: i,
		name: NAMES [i],
		price: PRICES [i],
		img: image,
		quantity: 0,
		createTemplate: function () {
			return `<div class="product-item" data-id="${this.id}>
						<img src="${this.img}" alt="some image">
						<div class="desc"
							<h3>${this.name}</h3>
							<p>${this.price}</p>
							<button class="buy-btn" 
							data-id="${this.id}"
							data-name="${this.name}"
							data-price="${this.price}">КУПИТЬ</button>
						</div>
					</div>`
		}
	}
}

function renderProducts () {
	let str = ''
	for (let product of PRODUCTS) {
		str += product.createTemplate ()
	}
	document.querySelector('.products').innerHTML = str
}

renderProducts ()

function addProduct (product) {
	let productID = +product.dataset['id'];
	let find = userCart.find (element => element.id === productID); //element (true) / false

	if (!find) {
		userCart.push ({
			id: productID,
			name: product.dataset['name'],
			price: +product.dataset['price'],
			img: cartImage,
			quantity: 1
		})
	} else {
		find.quantity ++
	}
	renderCart () 
}


function renderCart (i) {
	let allProducts = '';
	for (item of userCart) {
		allProducts += `<div class="cart-item" data-id="${item.id}>
							<div class="product-bio">
								<img src="${item.img}" alt="some image">
								<div class="product-desc"
									<p class="product-title">${item.name}</p>
									<p class="product-quantity">${item.quantity}</p>
									<p class="product-single-price">${item.price}</p>
								</div>
								<div class="right-block">
									<button class="del-btn" data-id="${item.id}">&times;</button>
								</div>
							</div>
						</div>`
	}
	cartBlock.innerHTML = allProducts
}


function removeProduct (product) {
	let productID = +product.dataset['id'];
	let find = userCart.find (element => element.id === productID);

	if (find.quantity > 1) {
		find.quantity --
	} else {
		userCart.splice (userCart.indexOf(find), 1)
		document.querySelector (`.cart-item[data-id="${productID}"]`)
	}
	renderCart ()
}*/