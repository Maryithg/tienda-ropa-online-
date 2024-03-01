// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () { 
    // Selecciona todos los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.agregar-carrito');
    // Selecciona el contenedor de los elementos del carrito
    const cartItemsContainer = document.querySelector('#lista-carrito tbody');
    // Selecciona el botón para vaciar el carrito
    const emptyCartButton = document.querySelector('#vaciar-carrito');
    // Selecciona el elemento que muestra el número de artículos en el carrito
    const numArticulosSpan = document.getElementById('num-articulos');
    // Selecciona el elemento que muestra la suma total de los productos en el carrito
    const totalSumSpan = document.getElementById('total-sum');
    // Variable global para almacenar la suma total
    let totalSum = 0;

    // Función para agregar un producto al carrito
    function addToCart(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        const product = event.target.parentElement.parentElement; // Obtiene el elemento del producto
        const productName = product.querySelector('h3').textContent; // Obtiene el nombre del producto
        const productPrice = parseFloat(product.querySelector('.precio').textContent.replace('$', '')); // Obtiene el precio del producto y lo convierte a número flotante

        // Busca si el producto ya está en el carrito
        const existingCartItem = Array.from(cartItemsContainer.children).find(row => row.querySelector('td:nth-child(2)').textContent === productName);

        if (existingCartItem) {
            // Si el producto ya está en el carrito, aumentar la cantidad en 1
            const quantityCell = existingCartItem.querySelector('.cantidad');
            let quantity = parseInt(quantityCell.textContent);
            quantity++;
            quantityCell.textContent = quantity;
        } else {
            // Si el producto no está en el carrito, agregar una nueva fila
            const productImage = product.querySelector('img').src;

            // Crear la fila del carrito
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${productImage}" width="50" alt="Producto"></td>
                <td>${productName}</td>
                <td class="precio">$${productPrice.toFixed(2)}</td>  
                <td class="cantidad">1</td>
                <td><a href="#" class="eliminar-item btn-2">Eliminar</a></td>
            `;
            cartItemsContainer.appendChild(row);
        }

        // Actualizar el número de artículos en el carrito
        updateCartItemCount();

        // Sumar el precio del producto al total
        totalSum += productPrice;
        updateTotalSum();
    }

    // Función para actualizar el número de artículos en el carrito
    function updateCartItemCount() {
        const numArticulos = cartItemsContainer.querySelectorAll('tr').length;
        numArticulosSpan.textContent = numArticulos;
    }

    // Función para actualizar la suma total
    function updateTotalSum() {
        totalSumSpan.textContent = `$${totalSum.toFixed(2)}`;
    }

    // Función para eliminar un producto del carrito
    function removeCartItem(event) {
        if (event.target.classList.contains('eliminar-item')) {
            const row = event.target.parentElement.parentElement;
            const productPrice = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('$', '')); // Obtiene el precio del producto a eliminar
            row.remove();

            // Actualizar el número de artículos en el carrito
            updateCartItemCount();

            // Restar el precio del producto eliminado del total
            totalSum -= productPrice;
            updateTotalSum();
        }
    }

    // Función para vaciar el carrito
    function emptyCart() {
        while (cartItemsContainer.firstChild) {
            cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }

        // Reiniciar la suma total
        totalSum = 0;
        updateTotalSum();

        // Actualizar el número de artículos en el carrito
        updateCartItemCount();
    }

    // Agrega un event listener a cada botón "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Agrega un event listener para el evento "click" en el contenedor de elementos del carrito
    cartItemsContainer.addEventListener('click', removeCartItem);

    // Agrega un event listener para el evento "click" en el botón para vaciar el carrito
    emptyCartButton.addEventListener('click', emptyCart);
});
