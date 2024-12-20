
let currentTranslate = 0; // Initialize currentTranslate

const menuItems = document.getElementById("menu-items");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const itemsToShow = 3; // Number of items visible at a time
const menuItemWidth = 220; // Width of each menu item including margin/gap

// Initialize cart and total price using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseInt(localStorage.getItem('totalPrice')) || 0;

// Update cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceDisplay = document.getElementById('total-price');

    cartItemsList.innerHTML = ''; // Clear current cart items
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.dishName} - ₹${item.price}`;
        cartItemsList.appendChild(li);
    });

    totalPriceDisplay.textContent = `Total: ₹${totalPrice}`;
}

// Function to add dish to cart
function selectDish(dishName, price) {
    // Add selected dish to the cart array
    cart.push({ dishName, price });
    totalPrice += price;
    updateCartDisplay();

    // Store updated cart and total price in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice);
}

// Carousel Code
prevButton.addEventListener("click", () => {
    currentTranslate += menuItemWidth * itemsToShow;
    updateTranslate();
    updateVisibility();
});

nextButton.addEventListener("click", () => {
    currentTranslate -= menuItemWidth * itemsToShow;
    updateTranslate();
    updateVisibility();
});

function updateTranslate() {
    const maxTranslate = 0;
    const minTranslate = -(menuItems.scrollWidth - menuItems.offsetWidth);

    if (currentTranslate > maxTranslate) {
        currentTranslate = maxTranslate;
    } else if (currentTranslate < minTranslate) {
        currentTranslate = minTranslate;
    }

    menuItems.style.transform = `translateX(${currentTranslate}px)`;

    prevButton.disabled = currentTranslate === maxTranslate;
    nextButton.disabled = currentTranslate === minTranslate;
}

function updateVisibility() {
    const menuItemElements = Array.from(menuItems.getElementsByClassName('menu-item'));
    const itemsVisibleStart = Math.abs(currentTranslate / menuItemWidth);
    const itemsVisibleEnd = itemsVisibleStart + itemsToShow;

    menuItemElements.forEach((item, index) => {
        if (index >= itemsVisibleStart && index < itemsVisibleEnd) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Simple function to get dishes from text (no NLP, just basic parsing)
function getDishesFromText(userText) {
    const dishMenu = [
        { name: 'Paneer Tikka', price: 200 },
        { name: 'Veg Biryani', price: 150 },
        { name: 'Pizza', price: 250 },
        { name: 'Salad', price: 100 },
        { name: 'Pasta', price: 200 },
        { name: 'Sushi', price: 300 },
        { name: 'Burger', price: 150 }
    ];

    // Simple parsing based on common dish names
    const foundDishes = dishMenu.filter(dish => userText.toLowerCase().includes(dish.name.toLowerCase()));

    return foundDishes;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    updateTranslate();
    updateVisibility();
});

// Handle the order input for AI-based order suggestion (can be extended further)
function processOrder() {
    const userOrder = document.getElementById('order-input').value;
    if (userOrder.trim() === "") {
        alert("Please enter an order.");
        return;
    }

    const dishes = getDishesFromText(userOrder);

    if (dishes.length === 0) {
        alert("No dishes found in your order.");
    } else {
        dishes.forEach(dish => {
            selectDish(dish.name, dish.price);
        });
    }

    // Clear input field
    document.getElementById('order-input').value = '';
}


// Reservation form submission
document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('customer-name').value;
    const seats = document.getElementById('num-seats').value;
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const phone = document.getElementById('customer-phone').value;
    const instructions = document.getElementById('special-instructions').value;
  
    if (!name || !seats || !date || !time || !phone) {
      alert('Please fill all required fields.');
      return;
    }
  
    // Store reservation details in localStorage
    const reservationDetails = {
      name,
      seats,
      date,
      time,
      phone,
      instructions
    };
  
    localStorage.setItem('reservation', JSON.stringify(reservationDetails));
  
    alert('Reservation confirmed!');
    window.location.href = 'menu.html'; // Redirect to menu page after reservation
});
