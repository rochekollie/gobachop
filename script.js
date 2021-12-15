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
	let shoppingList;
	if (shoppingList === null)
	{
		shoppingList = [];
	} else
	{
		shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
	}
	return shoppingList;
}

// Add each item to the cart when the user clicks on the button and update
// the total number of items in the cart
const updateCartCounter = () => {
	let cartCounter = document.getElementById('cart-counter');

	//Check if shoppingList exists in local storage
	let shoppingList;
	if (localStorage.getItem('shoppingList') === null)
	{
		shoppingList = [];
	} else
	{
		shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
	}

	let totalItems = 0;
	for (let item of shoppingList)
	{
		totalItems += parseInt(item.quantity);
	}

	//cartCounter.innerText = totalItems;

	return totalItems;
}

const count = () => {
	let cartCounter = document.getElementById('cart-counter');
	cartCounter.innerText = updateCartCounter();
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
const getProduct = () => {
	let cards = document.getElementsByClassName('product-card');
	let product = {
		image: '',
		name: '',
		price: '',
		description: '',
		quantity: 0,
	};

	let item;

	for (let btn of cards)
	{
		btn.addEventListener('click', function (e) {
			let button = e.target;
			if (button.tagName === 'BUTTON')
			{
				item = button.parentElement;
				product.image = item.querySelector('img').src;
				product.name = item.querySelector('h3').innerText;
				product.price = item.getElementsByTagName('p')[0].innerText;
				product.description = item.getElementsByTagName('p')[1].innerText;
				product.quantity = 1;
				saveProduct(product);
				updateCartCounter();
				displayNotification(button);
			}

		});
	}
}

const saveProduct = (product) => {

	//Check if shoppingList exists in local storage
	let shoppingList;
	if (localStorage.getItem('shoppingList') === null)
	{
		shoppingList = [{}, {}];
	} else
	{
		shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
	}

	//Check if the product exists in the shopping list. If it does, increase the quantity by 1 and update the total price of the product in the shopping list

	let productExists = false;
	for (let item of shoppingList)
	{
		if (item.name === product.name)
		{
			item.quantity += 1;

			//strip the $ sign from the price
			let price = product.price.replace('$', '');
			item.totalPrice = (item.quantity * price).toFixed(2);
			productExists = true;
		}
	}

	//If the product does not exist in the shopping list, add it to the shopping list
	if (!productExists)
	{
		let newItem = {
			image: product.image,
			name: product.name,
			price: product.price,
			description: product.description,
			quantity: 1,
			totalPrice: product.price,
		};

		//Strips the $ sign from the total price before adding them to the list
		newItem.totalPrice = newItem.totalPrice.replace('$', '');
		shoppingList.push(newItem);
	}

	//Save the shopping list in local storage
	localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}


/**
 * A function that displays the shopping list on the cart page in the element with the id 'shopping-list'
 *
 * @param {string} id The id of the element where the shopping list will be displayed
 * @param {array} shoppingList The shopping list
 * @returns {undefined}
 *
 */
const displayShoppingList = (id, shoppingList) => {
	//create a container for the shopping list
	let shoppingListContainer = document.getElementById(id);
	shoppingListContainer.innerHTML = '';
	let totalPurchaseContainer = '';
	let totalPrice = 0;

	//Check if the shopping list is empty and display a message if it is empty
	if (shoppingList.length === 0)
	{
		shoppingListContainer.innerHTML = '<p>Look, there&apos;s a hole in the bottom of your shopping cart! Your cart is pretty empty!</p><br><br><a href="products.html" class="btn" id="shop-now">Shop now</a>';
	} else
	{


		for (let item of shoppingList)
		{

			//Create a div for each item in the shopping list
			let purchaseItemContainer = document.createElement('div');
			purchaseItemContainer.classList.add('product');
			let image = document.createElement('img');
			image.src = item.image;
			image.classList.add('product-image');
			let name = document.createElement('h3');
			name.innerText = item.name;

			//product price
			let price = document.createElement('p');
			price.style.color = '#02734a';
			price.innerText = item.price;

			//product quantity
			let quantity = document.createElement('p');
			quantity.setAttribute('class', 'quantity');
			quantity.innerText = item.quantity;

			//product total price
			totalPrice = document.createElement('p');
			totalPrice.setAttribute('class', 'item-total');
			totalPrice.innerText = '$' + item.totalPrice;
			totalPrice.style.color = '#02734a';

			//remove product button
			let remove = document.createElement('button');
			remove.innerText = 'Remove';
			remove.classList.add('btn');

			//Create element for the total purchase container
			totalPurchaseContainer = document.createElement('div');
			totalPurchaseContainer.classList.add('total');

			//total purchase label
			let totalPurchaseLabel = document.createElement('h3');
			totalPurchaseLabel.style.fontWeight = '900';
			totalPurchaseLabel.style.fontStyle = 'italic';
			totalPurchaseLabel.style.textTransform = 'capitalize';
			totalPurchaseLabel.innerText = 'Purchase Total:';

			//tax status
			let taxStatus = document.createElement('select');
			taxStatus.setAttribute('id', 'tax-status');
			let taxStatusOption = document.createElement('option');
			taxStatusOption.innerText = 'MD Tax';
			taxStatusOption.disabled = true;
			taxStatusOption.selected = true;
			taxStatus.appendChild(taxStatusOption);

			//tax amount
			let taxAmount = document.createElement('p');
			taxAmount.setAttribute('id', 'tax-amount');
			taxAmount.innerText = '$0.00';
			taxAmount.style.color = '#02734a';
			taxAmount.style.fontWeight = '500';

			//total quantity
			let totalQty = document.createElement('p');
			totalQty.innerText = '0';
			totalQty.style.color = '#02734a';
			totalQty.style.fontWeight = '600';
			totalQty.setAttribute('id', 'total-quantity');

			//total purchase amount
			let totalAmount = document.createElement('p');
			totalAmount.style.color = '#02734a';
			totalAmount.style.fontWeight = '900';
			totalAmount.setAttribute('id', 'total-price');
			totalAmount.innerText = '';

			//checkout button
			let checkout = document.createElement('a');
			checkout.setAttribute('id', 'checkout');
			checkout.href = 'checkout.html';
			checkout.classList.add('btn');
			checkout.innerText = 'Checkout';

			//Append the elements to the product div
			purchaseItemContainer.appendChild(image);
			purchaseItemContainer.appendChild(name);
			purchaseItemContainer.appendChild(price);
			purchaseItemContainer.appendChild(quantity);
			purchaseItemContainer.appendChild(totalPrice);
			purchaseItemContainer.appendChild(remove);

			//Append the elements to the total element
			totalPurchaseContainer.appendChild(totalPurchaseLabel);
			totalPurchaseContainer.appendChild(taxStatus);
			totalPurchaseContainer.appendChild(taxAmount);
			totalPurchaseContainer.appendChild(totalQty);
			totalPurchaseContainer.appendChild(totalAmount);
			totalPurchaseContainer.appendChild(checkout);


			remove.addEventListener('click', function () {
				removeProduct(item);
				updateCartCounter();
			});

			shoppingListContainer.appendChild(purchaseItemContainer);
		}

		shoppingListContainer.appendChild(totalPurchaseContainer);

		// Call the calcTotalPrice function to calculate the total price
		calcTotalPrice();

	}
}


/**
 * Removes a product from the shopping list and updates the shopping list in local storage and the shopping list on the cart page
 *
 * @param {object} item The product to be removed
 * @returns {undefined}
 *
 * @see displayShoppingList
 * @see saveProduct
 * @see getProduct
 * @see updateCartCounter
 * @see displayNotification
 * @see displayShoppingList
 *
 */
const removeProduct = (product) => {

	//Check if shoppingList exists in local storage
	let shoppingList;
	if (localStorage.getItem('shoppingList') === null)
	{
		shoppingList = [{}, {}];
	}
	else
	{
		shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
	}

	for (let item of shoppingList)
	{
		if (item.name === product.name)
		{
			if (item.quantity === 1)
			{
				shoppingList.splice(shoppingList.indexOf(item), 1);
			} else
			{
				item.quantity -= 1;

				//strip the $ sign from the price
				let price = product.price.replace('$', '');
				item.totalPrice = (item.quantity * price).toFixed(2);
			}
		}

		localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
		updateCartCounter();

	}

	displayShoppingList('shopping-list', shoppingList);
	updatePurchaseTotal();

	//reload the page
	//window.location.reload();
}

/**
 * Calculates the total price of all items in the shopping list and updates the shopping list in local storage and the shopping list on the cart page.
 *
 * @returns {undefined}
 */
const calcTotalPrice = () => {
	let shoppingList = document.getElementById('shopping-list');
	let itemsTotal = shoppingList.getElementsByClassName('item-total');
	let totalPrice = 0;

	for (let item of itemsTotal)
	{
		totalPrice += parseFloat(item.innerText.replace('$', ''));
	}

	return parseFloat(totalPrice).toFixed(2);

}

/**
 * A function that receives an amount of money and returns a 6% as taxable amount
 * @param {number} amount The amount of money
 * @returns {number} The amount of money after tax
 * @see calcTotalPrice
 * @see calculateTax
 * @see calcTotalPrice
 *
*/
const calculateTax = (amount) => {
	//check if the amount is a number
	if (isNaN(amount))
	{
		return 'Tax can only be calculated on a number';
	}

	return (amount * 0.06).toFixed(2);
}

/**
 * Calculates the total quantity of all items in the shopping list
 *
 * @returns {number} The total quantity of all items in the shopping list
 *
 */
const calcQty = () => {
	let shoppingList = document.getElementById('shopping-list');
	let itemsTotal = shoppingList.getElementsByClassName('quantity');
	let totalQty = 0;

	for (let item of itemsTotal)
	{
		totalQty += parseInt(item.innerText);
	}

	return totalQty;
}

/**
 * Writes the total values of all items in the shopping list to the cart page
 * @returns {undefined}
 * @see calcTotalPrice
 * */
const updatePurchaseTotal = () => {
	let taxElement = document.getElementById('tax-amount');
	let totalQty = document.getElementById('total-quantity');
	let totalPrice = document.getElementById('total-price');

	totalQty.innerText = calcQty() === 1 ? calcQty() + " item" : calcQty() + " items";
	let purchaseTotal = parseFloat(calcTotalPrice()).toFixed(2);


	let taxAmount = calculateTax(purchaseTotal);

	taxElement.innerText = '$' + taxAmount + ' (6% tax)';
	let amount = parseFloat(purchaseTotal) + parseFloat(taxAmount);
	let totalAmount = amount.toFixed(2);
	totalPrice.innerText = '$' + totalAmount;
	totalAmount = parseFloat(totalAmount).toFixed(2);
	totalPrice.innerText = '$' + totalAmount + ' (tax included)';
}

/**
 * Saves purchase information to the local storage when the user clicks on the checkout button
 *
 * @returns {undefined}
 */
const savePurchase = () => {
	let checkoutButton = document.getElementById('checkout');

	checkoutButton.addEventListener('click', function () {

		let purchase = {};


		if (localStorage.getItem('purchase') === null)
		{
			purchase = {};
		}
		else
		{
			purchase = JSON.parse(localStorage.getItem('purchase'));
		}

		let randomNumber = Math.floor(Math.random() * 1000000);
		let purchaseDate = new Date().toLocaleDateString();
		let purchaseQty = document.getElementById('total-quantity').innerText.replace(' items', '');
		purchaseQty = parseInt(purchaseQty);
		let purchaseTax = document.getElementById('tax-amount').innerText.replace('$', '');
		purchaseTax = parseFloat(purchaseTax).toFixed(2);
		let purchaseTotal = document.getElementById('total-price').innerText.replace('$', '');
		purchaseTotal = parseFloat(purchaseTotal).toFixed(2);
		let purchaseSubtotal = purchaseTotal - purchaseTax;
		purchaseSubtotal = parseFloat(purchaseSubtotal).toFixed(2);

		purchase.orderNumber = randomNumber;
		purchase.orderDate = purchaseDate;
		purchase.orderQty = purchaseQty;
		purchase.orderCost = purchaseSubtotal;
		purchase.orderTax = purchaseTax;
		purchase.orderTotal = purchaseTotal;

		localStorage.setItem('purchase', JSON.stringify(purchase));

	});
}

/**
 * Get the purchase information from the local storage and display it on the checkout page
 * @returns {undefined}
 */
const getPurchase = () => {
	let purchase;

	if (localStorage.getItem('purchase') === null)
	{
		purchase = {};
	}
	else
	{
		purchase = JSON.parse(localStorage.getItem('purchase'));
	}
	return purchase;
}

/**
 * Writes the values of the purchase
 *
 * @returns {undefined}
 */
const updatePurchase = () => {
	let purchase = getPurchase();
	let items = 0;
	if (purchase.orderQty === 1)
	{
		items = 'item';
	} else
	{
		items = 'items';
	}
	document.getElementById('order-number').innerText = purchase.orderNumber;
	document.getElementById('order-date').innerText = purchase.orderDate;
	document.getElementById('order-quantity').innerText = `${purchase.orderQty} ${items}`;
	document.getElementById('order-cost').innerText = `$${purchase.orderCost}`;
	document.getElementById('order-tax').innerText = `$${purchase.orderTax}`;
	document.getElementById('order-total').innerText = `$${purchase.orderTotal}`;
}

/**
 * Submits the purchase information to the to to the order confirmation page
 *
 * @returns {undefined}
 */
const submitPayment = () => {
	let submitPurchase = document.getElementById('submit-payment');

	submitPurchase.addEventListener('click', function () {

		let customerName = document.getElementById('customer-name').value;
		let customerEmail = document.getElementById('customer-email').value;
		let orderNumber = document.getElementById('order-number').innerText;

		//write confirmation values on the confirmation page
		document.getElementById('confirmation-customer-name').innerText = customerName;
		document.getElementById('confirmation-order-number').innerText = orderNumber;
		document.getElementById('confirmation-customer-email').innerText = customerEmail;

		//reset the local storage
		//localStorage.removeItem('shoppingList');
		//localStorage.removeItem('purchase');
	});
}

window.onload = function () {
	toggleMenu();
	swapIcons('menu-icon', 'primary-menu');
	getProduct();
	updateCartCounter();


	//call these methods only on the cart page
	if (window.location.href.indexOf('cart.html') > -1)
	{
		displayShoppingList('shopping-list', getShoppingList());
		updatePurchaseTotal();
		savePurchase();
	}

	//call these methods only on the checkout page
	if (window.location.href.indexOf('checkout.html') > -1)
	{
		getPurchase();
		updatePurchase();
	}

	//call these methods only on the confirmation page
	if (window.location.href.indexOf('checkout.html') > -1)
	{
		submitPayment();
	}
};
