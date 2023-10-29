import ServicioLibros from '../servicio/libros.js'

class ControladorLibros {

    constructor() {
        this.servicioLibros = new ServicioLibros()
    }

    obtenerLibros = async (req,res) => {
        const id = req.params.id
        const libros = await this.servicioLibros.obtenerLibros(id)
        res.json(libros)
    }

    guardarLibro = async (req,res) => {
        try {
            let libro = req.body
            await this.servicioLibros.guardarLibro(libro)
            res.redirect('/')
        }
        catch(error) {
            console.log(`ERROR al intentar guardar el libro... ${error}`)
        }
    }

    borrarLibro = async (req,res) => {
        try {
            const { id } = req.params
            const libroBorrado = await this.servicioLibros.borrarLibro(id)
            res.json(libroBorrado)
        }
        catch(error) {
            console.log(`ERROR al intentar eliminar el libro... ${error}`)
        }
    }

    actualizarlibro = async (req,res) => {
        try {
            const { id } = req.params
            const libro = req.body
            const libroActualizado = await this.servicioLibros.actualizarlibro(id, libro)
            res.json(libroActualizado)
        }
        catch(error) {
            console.log(`ERROR al intentar actualizar el libro... ${error}`)
        }
    }
}

export default ControladorLibros
