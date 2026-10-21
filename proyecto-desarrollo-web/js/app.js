// Variable acumuladora para el total a pagar
let totalPagar = 0;

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. FUNCIONALIDADES BÁSICAS DE INTERFAZ
  // ==========================================

  // A. Menú Responsive (classList.toggle)
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // B. Modo Claro / Oscuro
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Cambiar texto del botón según el tema
    if (document.body.classList.contains("dark-mode")) {
      themeToggleBtn.textContent = "☀️ Modo Claro";
    } else {
      themeToggleBtn.textContent = "🌙 Modo Oscuro";
    }
  });

  // ==========================================
  // 2. MÓDULO DE CARRITO DE COMPRAS
  // ==========================================

  const cartList = document.getElementById("cartList");
  const cartTotalDisplay = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const addButtons = document.querySelectorAll(".btn-agregar");

  // Capturar evento click en todos los botones "Agregar al Carrito"
  addButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Obtener datos mediante atributos data-
      const id = e.target.getAttribute("data-id");
      const nombre = e.target.getAttribute("data-nombre");
      const precio = parseFloat(e.target.getAttribute("data-precio"));

      agregarAlCarrito(id, nombre, precio);
    });
  });

  // Función para agregar ítem y renderizar dinámicamente
  function agregarAlCarrito(id, nombre, precio) {
    // Crear el nodo HTML para el ítem del carrito
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.dataset.precio = precio; // Guardar precio en el elemento para facilitar restar después

    li.innerHTML = `
      <span>${nombre} - <strong>$${precio.toLocaleString()}</strong></span>
      <button class="btn-eliminar">Eliminar</button>
    `;

    // Evento para el botón 'Eliminar' de este ítem en particular
    const btnEliminar = li.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
      // Restar precio del total
      totalPagar -= precio;
      if (totalPagar < 0) totalPagar = 0;
      
      // Remover el nodo del DOM
      li.remove();

      // Actualizar el total en la UI
      actualizarTotal();
    });

    // Agregar el nodo a la lista en el DOM
    cartList.appendChild(li);

    // Sumar al acumulador numérico
    totalPagar += precio;

    // Actualizar vista
    actualizarTotal();
  }

  // Función para actualizar el DOM del total acumulado
  function actualizarTotal() {
    cartTotalDisplay.textContent = totalPagar.toLocaleString();
  }

  // Vaciar Carrito
  clearCartBtn.addEventListener("click", () => {
    // Eliminar todos los nodos dinámicos
    cartList.innerHTML = "";

    // Reajustar acumulador a 0
    totalPagar = 0;

    // Actualizar vista
    actualizarTotal();
  });

});