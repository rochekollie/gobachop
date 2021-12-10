//Add active class to the current page
const addActiveClass = () => {
	const path = window.location.pathname;
	const menuLinks = document.querySelectorAll('header nav ul li a');
	menuLinks.forEach(link => {
		if (link.pathname === path)
		{
			link.classList.add('active');
		} else
		{
			link.classList.remove('active');
		}
	});
}

const toggleMenu = () => {
	if (document.body.clientWidth < 1000)
	{
		document.getElementById('primary-menu').style.display = 'none';
	} else
	{
		document.getElementById('primary-menu').style.display = 'block';
	}
}

//Hide the mobile menu when window is resize
window.addEventListener('resize', function () {
	toggleMenu();
	let icon = document.getElementById('menu-icon');
	icon.innerText = 'menu';
});


//Toggle the menu on click
const swapIcons = (id, target) => {
	document.getElementById(id).addEventListener('click', function () {
		let newTarget = document.getElementById(target);
		let icon = document.getElementById('menu-icon');
		if (icon.innerText === 'menu')
		{
			icon.innerText = 'menu_open';
			newTarget.style.display = 'block';
		} else
		{
			icon.innerText = 'menu';
			newTarget.style.display = 'none';
			newTarget.classList.add('show-menu');
		}
	});
}

//A function that gets the shoppingList from the local storage and returns it
const getShoppingList = () => {
	let shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
	if (shoppingList === null)
	{
		shoppingList = [];
	}
	return shoppingList;
}

// Add each item to the cart when the user clicks on the button and update
// the total number of items in the cart
const updateCartCounter = () => {
	let cartItems = document.getElementById('cart-counter');
	cartItems.innerText = getShoppingList().length;
}

const displayNotification = (button) => {
	button.innerHTML = 'Added to cart';
	button.style.color = 'yellow';
	button.style.backgroundColor = '#02734a';
	setTimeout(function () {
		button.style.color = 'green';
		button.style.backgroundColor = 'transparent';
		button.innerHTML = 'Add to cart';
		button.addEventListener('mouseover', function () {
			button.innerHTML = 'Add again';
			button.style.backgroundColor = '#02734a';
			button.style.color = 'yellow';
		});
		button.addEventListener('mouseout', function () {
			button.innerHTML = 'Add to cart';
			button.style.backgroundColor = 'transparent';
			button.style.color = 'green';
		});
	}, 1000);
}

//Update shopping
const updateShopping = () => {
	let cards = document.getElementsByClassName('product-card');
	let shoppingList = [];

	for (let btn of cards)
	{
		btn.addEventListener('click', function (e) {
			let button = e.target;
			if (button.tagName === 'BUTTON')
			{
				let product = button.parentElement;
				shoppingList.push(product);

				//Update the local storage
				if (localStorage.getItem('shoppingList') === null)
				{
					localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
				}
				else
				{
					let oldList = JSON.parse(localStorage.getItem('shoppingList'));
					oldList.push(product);
					localStorage.setItem('shoppingList', JSON.stringify(oldList));
				}

				//Update the cart counter
				updateCartCounter();

				//Display the notification
				displayNotification(button);

			}
		});
	}
}

//Display the shopping list on the cart page
const displayShoppingList = () => {
	let shoppingList = getShoppingList();
	let cart = document.getElementById('cart-lists');
	let total = 0;
	for (let product of shoppingList)
	{
		let item = document.createElement('li');
		item.classList.add('cart-item');
		item.innerHTML = `
			<div class="cart-item-img">
				<img src="${product.querySelector('img').src}" alt="${product.querySelector('img').alt}">
			</div>
			<div class="cart-item-info">
				<h3>${product.querySelector('h3').innerText}</h3>
				<p>${product.querySelector('p').innerText}</p>
			</div>
			<div class="cart-item-price">
				<p>${product.querySelector('span').innerText}</p>
			</div>
		`;
		cart.appendChild(item);
		total += parseInt(product.querySelector('span').innerText);
	}
	document.getElementById('cart-total').innerText = total;
}


//Displey the current number of items in the cart
const displayCartCounter = () => {
	let cartItems = document.getElementById('cart-list');
	let emptyCart = document.createElement('p');
	cartItems.appendChild(emptyCart);
	emptyCart.style.fontWeight = 'bold';

	//display a message if the cart is empty
	if (getShoppingList().length === 0)
	{
		emptyCart.innerText = 'Your cart is currently empty.';

	} else if (getShoppingList().length === 1){
		emptyCart.innerText = 'There is currently ' + getShoppingList().length + ' item in your cart.';
	} else
	{
		emptyCart.innerText = 'There are currently ' + getShoppingList().length + ' items in your cart.';
	}
}


window.onload = function () {
	//addActiveClass();
	updateCartCounter();
	toggleMenu();
	swapIcons('menu-icon', 'primary-menu');
	updateShopping();
	//displayShoppingList();
	displayCartCounter();
};
