const routes = {
	index: 'index.html',
	create: 'create.html',
	contact: 'contact.html',
	aboutUs: 'about-us.html'
};

window.addEventListener('DOMContentLoaded', async () => {
	for (const route in routes) {
		const element = document.getElementById(`${route}`);
		if (element != null) {
			const response = await fetch(routes[route]);
			const data = await response.text();
			element.innerHTML = data;
		}
	}
});

async function getProducts() {
	const url = '/api/products';
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

async function getTemplate() {
	const response = await fetch('/templates/cards.hbs');
	const source = await response.text();
	const template = Handlebars.compile(source);
	return template;
}

async function displayProducts() {
    console.log('displayProducts called');
    const products = await getProducts();
    console.log('products:', products);
    const template = await getTemplate();
    const productRow = document.querySelector('.product-row');
    products.forEach((product) => {
        const html = template(product);
        productRow.innerHTML += html;
    });
}


let isCartOpen = false;
const cartBtn = document.querySelector('.cart-button');
const cartContainer = document.querySelector('.cart-container');
const closeButton = document.querySelector('.close-btn');

cartBtn.addEventListener('click', () => {
    if (!isCartOpen) {
        console.log('Open cart');
        cartBtn.classList.add('cart-button-pressed');
        cartContainer.classList.add('visible');
        document.addEventListener('click', handleClickOutside);
    } else {
        console.log('Close cart');
        cartBtn.classList.remove('cart-button-pressed');
        cartContainer.classList.remove('visible');
        document.removeEventListener('click', handleClickOutside);
    }
    isCartOpen = !isCartOpen;
});

closeButton.addEventListener('click', function() {
    console.log("Close modal");
    cartContainer.classList.remove("visible");
    document.removeEventListener('click', handleClickOutside);
    isCartOpen = false;
});

window.addEventListener("keydown", function(e) {
    console.log(e.key);
    if (e.key === "Escape") {
    console.log("Close modal");
    cartContainer.classList.remove("visible");
    document.removeEventListener('click', handleClickOutside);
    isCartOpen = false;
    }
});

function handleClickOutside(e) {
    if (!cartContainer.contains(e.target) && !cartBtn.contains(e.target) && e.target.parentElement.className !== 'trash-button') {
    console.log('Click outside modal');
    cartBtn.classList.remove('cart-button-pressed');
    cartContainer.classList.remove('visible');
    document.removeEventListener('click', handleClickOutside);
    isCartOpen = false;
    }
}

const mainTable = document.querySelector('table');

mainTable.addEventListener('click', function(ev) {
    if (ev.target && ev.target.nodeName !== 'IMG' || ev.target.parentElement.className !== 'trash-button') {
    } else {
        const deletedRow = ev.target.closest('tr');
        deletedRow.remove();
        const totalCell = mainTable.querySelector('tfoot td:nth-last-child(2)');
        const subtotalCell = deletedRow.querySelector('td:nth-last-child(2)');
        const parseCurrency = str => parseFloat(str.replace('$', '').replace('.', '').replace(',', '.'), {
            locale: 'en-US',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        const formatCurrency = num => '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const subtotalValue = parseCurrency(subtotalCell.textContent);
        const totalValue = parseCurrency(totalCell.textContent);
        totalCell.textContent = formatCurrency(totalValue - subtotalValue);

        const subtotalCells = itemsTable.querySelectorAll('tbody td:last-child');
        let newSubtotal = 0;
        subtotalCells.forEach(subtotal => {
            newSubtotal += parseCurrency(subtotal.textContent);
        });
        const subtotalCellFooter = mainTable.querySelector('tfoot td:nth-child(2)');
        subtotalCellFooter.textContent = formatCurrency(newSubtotal);
    }
});




