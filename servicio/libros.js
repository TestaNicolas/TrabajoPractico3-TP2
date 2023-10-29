import LibrosMem from '../model/DAOs/librosModel.js'

class ServicioLibros {

    constructor() {
        this.librosMem = new LibrosMem()
    }

    async obtenerLibros(id) { 
        let libros = await this.librosMem.obtenerLibros(id)
        return libros
    }

    async guardarLibro(libro) { 
        return await this.librosMem.guardarLibro(libro)
    }

    async borrarLibro(id) { 
        return await this.librosMem.borrarLibro(id)
    }

    async actualizarlibro(id, libro) { 
        return await this.librosMem.actualizarlibro(id, libro)
    }
}

export default ServicioLibros
