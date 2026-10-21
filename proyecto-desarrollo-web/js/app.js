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

  // ==========================================
  // 3. MÓDULO DE REGISTRO DE USUARIOS
  // ==========================================

  const registerForm = document.getElementById("registerForm");
  const regNameInput = document.getElementById("regName");
  const regEmailInput = document.getElementById("regEmail");
  const regPasswordInput = document.getElementById("regPassword");
  const formMessage = document.getElementById("formMessage");
  const welcomeContainer = document.getElementById("welcomeContainer");
  const userDisplayName = document.getElementById("userDisplayName");
  const logoutBtn = document.getElementById("logoutBtn");

  // Verificar si ya hay un usuario registrado en la sesión actual o localStorage
  const usuarioGuardado = localStorage.getItem("usuarioRegistrado");
  if (usuarioGuardado) {
    mostrarBienvenida(usuarioGuardado);
  }

  // Manejar el envío del formulario de registro
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    const nombre = regNameInput.value.trim();
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value;

    // Validación básica
    if (password.length < 6) {
      formMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
      formMessage.className = "form-message error";
      return;
    }

    // Guardar datos en localStorage para persistencia básica
    localStorage.setItem("usuarioRegistrado", nombre);

    // Mostrar mensaje de éxito y ocultar formulario
    formMessage.textContent = "";
    mostrarBienvenida(nombre);
    
    // Limpiar campos
    registerForm.reset();
  });

  function mostrarBienvenida(nombre) {
    userDisplayName.textContent = nombre;
    registerForm.style.display = "none";
    welcomeContainer.style.display = "block";
  }

  // Botón para cerrar sesión / registrar otro usuario
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioRegistrado");
    welcomeContainer.style.display = "none";
    registerForm.style.display = "flex";
  });

});