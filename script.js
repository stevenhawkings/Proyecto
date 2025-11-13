
const form = document.getElementById("loginForm");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (form) {
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Completa todos los campos 😅");
      return;
    }
    window.location.href = "home.html";
  });
}


const homeBtn = document.getElementById("goToStore");
const offersBtn = document.getElementById("goToOffers");

if (homeBtn) {
  homeBtn.addEventListener("click", () => {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("storePage").style.display = "block";
    mostrarProductos(productos);
  });
}
if (offersBtn) {
  offersBtn.addEventListener("click", () => {
    window.location.href = "ofertas.html";
  });
}


const productos = [
  { id: 1, nombre: "Laptop Lenovo", precio: 15000, imagen: "images/LaptopLenovo.png", oferta: true, descuento: 20 },
  { id: 2, nombre: "Smartphone Samsung", precio: 8000, imagen: "images/SmartphoneSamsung.png", oferta: false },
  { id: 3, nombre: "Audífonos Bluetooth", precio: 1200, imagen: "images/Audifonos.png", oferta: true, descuento: 15 },
  { id: 4, nombre: "Smartwatch", precio: 2500, imagen: "images/Smartwatch.png", oferta: false },
  { id: 5, nombre: "Monitor Gamer", precio: 5000, imagen: "images/MonitorGamer.png", oferta: false },
  { id: 6, nombre: "Teclado Mecánico", precio: 1800, imagen: "images/TecladoMecanico.png", oferta: true, descuento: 10 },
  { id: 7, nombre: "Mouse Logitech", precio: 950, imagen: "images/Mouse.png", oferta: false }
];

let carrito = [];

const contenedor = document.getElementById("productos");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");
const inputBusqueda = document.getElementById("busqueda");

function mostrarProductos(lista) {
  if (!contenedor) return;
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    if (mensajeBusqueda) mensajeBusqueda.textContent = "🔍 No se encontraron productos con ese nombre.";
    return;
  } else if (mensajeBusqueda) {
    mensajeBusqueda.textContent = "";
  }

  lista.forEach((p) => {
    const precioFinal = p.oferta ? (p.precio * (1 - (p.descuento || 0) / 100)).toFixed(2) : p.precio;
    const textoPrecio = p.oferta
      ? `<p><span style="text-decoration:line-through;color:#999;">$${p.precio}</span> 💰 <strong>$${precioFinal}</strong> (-${p.descuento}%)</p>`
      : `<p>💰 $${p.precio}</p>`;

    contenedor.innerHTML += `
      <div class="producto">
        ${p.oferta ? '<span class="oferta-tag">OFERTA 💥</span>' : ""}
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        ${textoPrecio}
        <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      </div>
    `;
  });
}

if (inputBusqueda) {
  inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.trim();
    const filtrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    mostrarProductos(filtrados);
  });
}


function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  const precioFinal = producto.oferta
    ? producto.precio * (1 - (producto.descuento || 0) / 100)
    : producto.precio;

  const ahorro = producto.oferta ? producto.precio - precioFinal : 0;

  carrito.push({ ...producto, precioFinal, ahorro });
  actualizarCarrito();
  alert(`${producto.nombre} agregado al carrito ✅`);
}

function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;
  let ahorroTotal = 0;

  carrito.forEach((p, index) => {
    lista.innerHTML += `
      <li style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
        <img src="${p.imagen}" alt="${p.nombre}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
        <span style="flex:1">${p.nombre} - $${p.precioFinal.toFixed(2)}</span>
        <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; cursor:pointer;">❌</button>
      </li>`;
    total += p.precioFinal;
    ahorroTotal += p.ahorro || 0;
  });

  document.getElementById("total").textContent = total.toFixed(2);

  
  let ahorroElemento = document.getElementById("ahorro");
  if (!ahorroElemento) {
    const p = document.createElement("p");
    p.id = "ahorro";
    p.style.color = "#388e3c";
    p.style.fontWeight = "bold";
    document.getElementById("carrito").appendChild(p);
    ahorroElemento = p;
  }

  ahorroElemento.textContent =
    ahorroTotal > 0 ? `Ahorro total: $${ahorroTotal.toFixed(2)} 🎉` : "";
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function comprar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }
  alert("Compra realizada con éxito 🧾");
  carrito = [];
  actualizarCarrito();
}


const btnRegresar = document.getElementById("btnRegresar");

if (btnRegresar) {
  btnRegresar.addEventListener("click", () => {
    document.getElementById("storePage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
  });
}


const btnLogout = document.getElementById("btnLogout");

if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    const confirmar = confirm("¿Seguro que deseas cerrar sesión?");
    if (confirmar) {
      window.location.href = "index.html"; 
    }
  });
}
