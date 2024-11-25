// Array para almacenar los productos en el carrito
let carrito = [];

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    cartItems.innerHTML = ""; // Limpiar el contenido actual del carrito

    let total = 0;

    // Mostrar cada producto en el carrito
    carrito.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-details">
                <h3>${item.nombre}</h3>
                <p>Precio: $${item.precio}</p>
                <p>Cantidad: <input type="number" value="${item.cantidad}" min="1" data-index="${index}" class="cantidad-input"></p>
                <p>Total: $${item.precio * item.cantidad}</p>
            </div>
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.precio * item.cantidad;
    });

    // Actualizar el total
    totalAmount.textContent = `$${total}`;
}

// Función para agregar un producto al carrito
function agregarProducto(nombre, precio, imagen) {
    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está, agregar un nuevo producto
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para manejar el cambio de cantidad
function cambiarCantidad(index, nuevaCantidad) {
    carrito[index].cantidad = nuevaCantidad;
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Event listener para inputs de cantidad y botones de eliminar
document.getElementById("cart-items").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        eliminarProducto(index);
    } else if (event.target.classList.contains("cantidad-input")) {
        const index = event.target.getAttribute("data-index");
        const nuevaCantidad = parseInt(event.target.value);
        cambiarCantidad(index, nuevaCantidad);
    }
});


agregarProducto("Mate Clásico", 25000, "imagenes/mate1.jpg");
agregarProducto("Bombilla de Acero", 5000, "imagenes/mate1.jpg");
agregarProducto("Combo RETRUCO", 25000, "combo1.jpg");

