// Crear el navbar
const nav = document.createElement("nav");
nav.classList.add("navegacion-container");
const fragment = document.createDocumentFragment();
nav.innerHTML = `
 <ul class="nav">
 <li id="home">HOME</li>
 <li id="carrito">🛒<span id="contador">0</span></li>
</ul>
`;
const node = nav.cloneNode(true);
fragment.appendChild(node);
document.body.append(fragment);
if (node.isConnected) {
  console.log("El header esta conectado al DOM", node);
}
// Animate Javascript
const home = document.getElementById("home");
const keyframes = [
  { transform: "translate(0, 0)" },
  { transform: "translate(50px, 0)" },
  { transform: "translate(50px, 50px)" },
  { transform: "translate(0, 50px)", opacity: 0 },
  { transform: "translate(0, 0)" },
];
home.animate(keyframes, 3500);
// Consumir el JSON a traves de la API mediante http get

(async () => {
  try {
    const respuesta = await fetch(
      "https://devcloudengineering.github.io/coderJavascript/data/data.json",
      { method: "GET" }
    );
    if (respuesta.status === 200) {
      console.log(
        `Se ha establecido una conexion con status : ${respuesta.status}, en estado: ${respuesta.ok}, desde la url: ${respuesta.url}`
      );
    } else {
      console.log(`Ha ocurrido un problema`, respuesta.status);
    }
    const data = await respuesta.json();
    crearProductos(data);
  } catch (err) {
    console.error("Ha ocurrido un error en la lectura :", err);
  }
})();

// Declarar y inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoSet = document.getElementById("carrito");
carritoSet.addEventListener("click", (e) => {
  if (carrito) {
    ingresarCarrito(carrito);
  }
});

// Actualizar contador del carrito al cargar la página
document.getElementById("contador").textContent = carrito.length;

// Crear el template string para enlistar los productos
const crearProductos = (data) => {
  const fragment = document.createDocumentFragment();
  const contenedorDeProductos = document.createElement("div");
  contenedorDeProductos.toggleAttribute("id");
  contenedorDeProductos.setAttribute("id", "container-productos");
  data.forEach((e) => {
    const productoUnitario = document.createElement("div");
    productoUnitario.classList.add("producto");
    productoUnitario.toggleAttribute("data-id");
    productoUnitario.toggleAttribute("data-name");
    productoUnitario.toggleAttribute("data-price");
    productoUnitario.toggleAttribute("data-img");
    productoUnitario.setAttribute("data-id", e.id);
    productoUnitario.setAttribute("data-name", e.nombre);
    productoUnitario.setAttribute("data-price", e.precio);
    productoUnitario.setAttribute("data-img", e.img);
    productoUnitario.innerHTML = `
    <h2>${e.nombre}</h2>
    <img src=${e.img} alt=${e.nombre}>
    <p>Precio: $${e.precio}</p>
    <button class="btn-comprar">Comprar</button>
    `;
    fragment.appendChild(productoUnitario);
  });
  contenedorDeProductos.appendChild(fragment);
  document.body.appendChild(contenedorDeProductos);

  // Incorporar Toastify
  const btn = Array.from(document.querySelectorAll(".btn-comprar"));
  btn.forEach((e) => {
    e.addEventListener("click", () => {
      Toastify({
        text: "Agregaste un elemento al carrito",
        style: {
          background: "green",
        },
        duration: 1500,
      }).showToast();
    });
  });

  // Dar interaccion y utilidad a las cantidades y botones
  const productos = document.getElementById("container-productos");
  productos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-comprar")) {
      const productElement = e.target.closest(".producto");
      const productId = productElement.getAttribute("data-id");
      const productName = productElement.getAttribute("data-name");
      const productPrecio = productElement.getAttribute("data-price");
      const productImg = productElement.getAttribute("data-img");

      // Funcionalidad de captura
      const elementoCarrito = {
        id: productId,
        nombre: productName,
        precio: productPrecio,
        imagen: productImg,
        cantidad: 0,
        totalCompra: 0,
      };

      // Añadir al carrito
      carrito.push(elementoCarrito);

      // Manejar cantidades cuando los id coinciden con el target
      carrito.find((e) => {
        if (e.id === productId) {
          e.cantidad++;
        }
      });

      // Filtrar elementos repetidos en el carrito
      carrito = carrito.filter(
        (obj, index, array) => index === array.findIndex((t) => t.id === obj.id)
      );

      // Setear total compra
      carrito.forEach((e) => {
        e.totalCompra = parseInt(e.cantidad * e.precio);
      });

      // Manejar totales y subtotales
      const subtotal = document.getElementById("dcto");
      const calculoSubtotal = parseInt(
        carrito.reduce((acc, el) => el.totalCompra + acc, 0)
      );
      subtotal.textContent = calculoSubtotal;

      const total = document.getElementById("total");
      const calculoTotal = parseInt(calculoSubtotal - calculoSubtotal * 0.15);
      total.textContent = calculoTotal;

      // Ejecutar funcionalidad de pintura
      const contador = document.getElementById("contador");
      contador.textContent = carrito.length;

      // Integrar al LocalStorare como memoria temporal del usuario frente a sus productos
      // El carrito almacenarlo en localstorage
      // Al cerrar el browser el carrito debe permanecer donde estaba segun la ultima compra
      localStorage.setItem("carrito", JSON.stringify(carrito));

      const carritoLocal = JSON.parse(localStorage.getItem("carrito"));

      ingresarCarrito(carrito);
    }
  });
};

// Crear interfaz para enlistar los productos comprados (carrito) --> POO

const ingresarCarrito = (carrito) => {
  const productosCarrito = document.getElementById("productos-carrito");
  // Actualiza carrito para evitar acumulacion en el DOM
  if (productosCarrito) {
    productosCarrito.innerHTML = "";
  }

  // Se actualiza LocalStorage
  const fragmentProductosCarrito = document.createDocumentFragment();
  localStorage.setItem("carrito", JSON.stringify(carrito));

  carrito.forEach((e) => {
    const producto = document.createElement("div");
    producto.classList.add("producto-car");
    producto.innerHTML = `
    <img src = ${e.imagen} alt = ${e.nombre}>
    <p> Precio: $${e.precio} c/u kg</p>
    <div id = "control-cantidad" data-id = ${e.id} data-cantidad = ${e.cantidad}>
        <span class = "menos"> ➖ </span>
        <span id = "cantidad"> ${e.cantidad} </span>
        <span class = "mas"> ➕ </span>
    </div>
    `;
    fragmentProductosCarrito.appendChild(producto);
  });

  productosCarrito.appendChild(fragmentProductosCarrito);
};

// Control sobre cantidades en prompt ui
const productosCarrito = document.getElementById("productos-carrito");
productosCarrito.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("mas") ||
    e.target.classList.contains("menos")
  ) {
    const controlId = e.target
      .closest("#control-cantidad")
      .getAttribute("data-id");

    if (e.target.classList.contains("mas")) {
      carrito.find((e) => {
        if (e.id === controlId) {
          e.cantidad++;
        }
      });
    } else if (e.target.classList.contains("menos")) {
      carrito.find((e) => {
        if (e.id === controlId) {
          e.cantidad--;
          Toastify({
            text: "Eliminaste un articulo",
            style: {
              background: "red",
            },
            duration: 1500,
          }).showToast();
          if (e.cantidad === 0) {
            carrito = carrito.filter((e) => e.id !== controlId);
            ingresarCarrito(carrito);
            if (carrito.length === 0) {
              const contenedor = document.getElementById("container-compra");
              contenedor.style.display = "none";
            }
          }
        }
      });
    }

    carrito.forEach((e) => {
      e.totalCompra = e.cantidad * e.precio;
    });

    // Manejar totales y subtotales Reflow
    const subtotal = document.getElementById("dcto");
    const calculoSubtotal = parseInt(
      carrito.reduce((acc, el) => el.totalCompra + acc, 0)
    );
    subtotal.textContent = parseInt(calculoSubtotal);

    const total = document.getElementById("total");
    const calculoTotal = parseInt(calculoSubtotal - calculoSubtotal * 0.15);
    total.textContent = calculoTotal;

    const contador = document.getElementById("contador");
    contador.textContent = carrito.length;

    ingresarCarrito(carrito);
  }
});

// Manejar funcionalidad de mostrar el menu de compra
const cerrar = document.getElementById("cerrar");
cerrar.addEventListener("click", () => {
  const contenedor = document.getElementById("container-compra");
  contenedor.style.display = "none";
});

const menuCar = document.getElementById("carrito");
menuCar.addEventListener("click", () => {
  const contenedor = document.getElementById("container-compra");
  contenedor.style.display = "flex";
});
