class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre // String
    this.apellido = apellido // String
    this.libros = libros // Object[]
    this.mascotas = mascotas // String[]
  }

  getFullName() {
    console.log(`Hola! yo soy ${this.nombre} ${this.apellido}`)
  }

  addMascota(mascota) {
    this.mascotas.push(mascota)
  }

  countMascotas() {
    const cantidadMascotas = this.mascotas.length
    return cantidadMascotas
  }

  addBook(titulo, autor) {
    this.libros.push({
      autor: autor,
      titulo: titulo
    })
  }

  getBookNames() {
    const bookTitulos = this.libros.map((libro) => {
      return libro.titulo
    })
    return bookTitulos
  }
}


// Creo la clase usuario
const usuario = new Usuario("Leandro","Donato",[],[])

usuario.addMascota("Carpincho") //Agrega una mascota al array mascotas
usuario.addMascota("Guanaco") //Agrega una mascota al array mascotas
usuario.addMascota("Erizo") //Agrega una mascota al array mascotas

usuario.addBook("Toda Mafalda", "Quino") //Agrego libro al array libros
usuario.addBook("Asesinato en el Orient Express", "Agatha Christie") //Agrego libro al array libros
usuario.addBook("El sueño eterno", "Raymond Chandler") //Agrego libro al array libros

usuario.getFullName() //Trae el nombre completo del usuario
console.log("Las mascotas son: ", usuario.mascotas) //Muestra que mascotas hay en el array
console.log("La cantidad de mascotas es de: ", usuario.countMascotas()) //Muestra la cantidad de mascotas del array mascotas
console.log(usuario.getBookNames()) //Muestra los titulos de los libros del array libros