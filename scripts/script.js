alert(
  "Ayudame a crear un objeto que te represente a ti! No hay edad para aprender a programar!"
);

let nombre = prompt("¿Cual es tu nombre?").trim();

// Validaciones
while (parseInt(nombre) || /[^\w\s]/.test(nombre)) {
  alert("Ingresa un nombre valido");
  nombre = prompt("¿Cual es tu nombre?").trim();
}
let edad = parseInt(prompt("¿Que edad tienes?"));
while (!parseInt(edad)) {
  alert("Ingresa una edad valida");
  edad = parseInt(prompt("¿Que edad tienes?"));
}

let dedicacion = prompt(
  "Si tuvieras que elejir entre backend o frontend ¿Cual seria?"
).trim();
while (
  dedicacion.toLowerCase() !== "frontend" &&
  dedicacion.toLowerCase() !== "backend"
) {
  alert("¿Prefieres el curso de uñas acrilicas? ¿Back-End o Front-End?");
  dedicacion = prompt(
    "Si tuvieras que elejir entre backend o frontend ¿Cual seria?"
  ).trim();
}

// Definiendo la clase
class Desarrollador {
  constructor(nombre, edad, dedicacion) {
    this.nombre = nombre[0].toUpperCase() + nombre.substring(1).toLowerCase();
    this.edad = edad;
    this.dedicacion =
      dedicacion[0].toUpperCase() + dedicacion.substring(1).toLowerCase();
  }

  // Representando de manera literal el objeto
  toString() {
    return `Hola!! mi nombre es ${this.nombre}, tengo ${this.edad} años y me interesa mas el ${this.dedicacion} en la programacion, les deseo mucho exito!`;
  }
}

// Creando el objeto
let usuario = new Desarrollador(nombre, edad, dedicacion);
alert(usuario.toString());

for (const i in usuario) {
  alert(`Las claves y valores de tu objeto son: \n  ${i} : ${usuario[i]}`);
}

// Fin del programa
alert("Gracias por la info !");
