import express from 'express'
import ControladorLibros from '../controlador/libros.js'

class RouterLibros {

    constructor() {
        this.controladorLibros = new ControladorLibros()
        this.router = express.Router()
    }

    start() {
        this.router.get('/:id?', this.controladorLibros.obtenerLibros)
        this.router.post('/', this.controladorLibros.guardarLibro)
        this.router.delete('/:id', this.controladorLibros.borrarLibro)
        this.router.put('/:id', this.controladorLibros.actualizarlibro)
        return this.router
    }
}

export default RouterLibros