const fruteriaEcommerce = [
  { nombre: "bananas", precio: 1200 },
  { nombre: "ananas", precio: 1500 },
  { nombre: "frutillas", precio: 2000 },
  { nombre: "manzanas", precio: 1700 },
  { nombre: "peras", precio: 1400 },
];

const productos = fruteriaEcommerce.map((e) => e.nombre);

const precio = fruteriaEcommerce.map((e) => e.precio);

for (let i = 0; i < fruteriaEcommerce.length; i++) {
  console.log(`Tenemos el kg de ${productos[i]} a $${precio[i]}`);
}

const indexed = fruteriaEcommerce.reduce(
  (acc, el) => ({
    ...acc,
    [el.nombre]: el,
  }),
  {}
);

const carrito = [];

let clienteComprar = prompt(
  "Bienvenido a la fruteria!! ¿Quieres comprar?"
).trim();

const crearEcommerce = async () => {
  const fragment = document.createDocumentFragment();
  const container = document.createElement("div");
  container.className = "containerfrutas";
  for (let i = 0; i < fruteriaEcommerce.length; i++) {
    const div = document.createElement("div");
    div.className = `${productos[i]}  box`;
    div.toggleAttribute("data-aos");
    div.toggleAttribute("data-aos-duration");
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-duration", "3000");
    div.innerHTML = `<img src="./assets/${productos[i]}.jpg">
                       <p> ${productos[i]}  <p/>
                       <span> Precio: $ ${precio[i]}  kg </span>`;
    container.appendChild(div);
    fragment.appendChild(container);
  }

  document.body.appendChild(fragment);
};

const iniciarCompra = async () => {
  while (
    clienteComprar.toLowerCase() != "si" &&
    clienteComprar.toLowerCase() != "no"
  ) {
    clienteComprar = prompt("Porfavor indicame si quieres comprar o no").trim();
  }
  if (clienteComprar.toLowerCase() == "si") {
    alert("A continuacion te presento los productos que tenemos");

    await crearEcommerce();

    while (clienteComprar.toLowerCase() == "si") {
      const producto = await new Promise((resolve) => {
        setTimeout(() => {
          let productoSeleccionado = prompt("¿Que producto quieres comprar?")
            .toLowerCase()
            .trim();
          while (
            parseInt(productoSeleccionado) ||
            /[^\w\s]/.test(productoSeleccionado) ||
            !fruteriaEcommerce.some(
              (e) =>
                e.nombre.toLowerCase() ===
                productoSeleccionado.toLowerCase().trim()
            )
          ) {
            alert("Ingresa un producto valido");
            productoSeleccionado = prompt("¿Que producto quieres comprar?")
              .toLowerCase()
              .trim();
          }
          resolve(productoSeleccionado);
        }, 1000);
      });

      let precio = null;

      let cantidad = parseInt(prompt("¿Cuantos Kg?"));
      while (!parseInt(cantidad) || cantidad < 0) {
        alert("Ingresa una cantidad valida");
        cantidad = parseInt(prompt("¿Cuantos Kg?"));
      }
      if (
        producto.toLowerCase() === "bananas" ||
        producto.toLowerCase() === "ananas" ||
        producto.toLowerCase() === "frutillas" ||
        producto.toLowerCase() === "manzanas" ||
        producto.toLowerCase() === "peras"
      ) {
        switch (producto) {
          case "bananas":
            precio = indexed["bananas"].precio;
            break;
          case "ananas":
            precio = indexed["ananas"].precio;
            break;
          case "frutillas":
            precio = indexed["frutillas"].precio;
            break;
          case "manzanas":
            precio = indexed["manzanas"].precio;
            break;
          case "peras":
            precio = indexed["peras"].precio;
            break;
          default:
            break;
        }

        totalCompra = cantidad * precio;

        carrito.push({ producto, cantidad, totalCompra });
      }

      clienteComprar = prompt("¿Quieres agregar otro producto?").trim();

      while (
        clienteComprar.toLowerCase() !== "no" &&
        clienteComprar.toLowerCase() !== "si"
      ) {
        clienteComprar = prompt("Porfavor contestame con un si o un no").trim();
      }

      if (clienteComprar.toLowerCase() == "no") {
        const pagar = carrito.reduce((acc, el) => el.totalCompra + acc, 0);
        alert(
          `Gracias por tu visita, el total a pagar por tus productos es $${pagar}`
        );
      }
    }
    console.log(carrito);
  } else if (clienteComprar.toLowerCase() == "no") {
    alert("Gracias por tu visita");
  }
};

iniciarCompra();
