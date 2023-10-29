import fs from 'fs/promises'
const JsonLibros = 'libros.json'

class LibrosMem {

    constructor() { }

    generarID(booksArray) {
        let maxId = 0;
            for (const book of booksArray) {
            const id = parseInt(book.id, 10);
            if (!isNaN(id) && id > maxId) {
                maxId = id;
            }
        }
        return maxId + 1;
    }

    leerArchivo = async (archivo) => {
        try {
            const usuarios = await fs.readFile(archivo, 'utf-8')
            const usuariosJson = JSON.parse(usuarios)
            return usuariosJson
        } catch (error) {console.log(`Error al leer el archivo... ${error}`);}
    }

    escribirArchivo = async (archivo, TextoAEscribir) => {
        try {
            await fs.writeFile(archivo, JSON.stringify(TextoAEscribir,null,'\t'))
        } catch(err) {
            console.error("Error al escribir en el archivo");
        }
    }

    obtenerLibros = async (id) => {
        try {
            const libros = await this.leerArchivo(JsonLibros)
            if (id) {
                const libro = libros.find( item => item.id === id )
                return libro || {}
            } else {
                return libros   
            }
        }
        catch(error) {
            return id? {} : []
        }
    }

    guardarLibro = async libro => {
        try {
            const libros = await this.leerArchivo(JsonLibros);
            const libroNuevo = {
                id: this.generarID(libros).toString(),
                ...libro
            };
            libros.push(libroNuevo);
            await this.escribirArchivo(JsonLibros, libros);
            return libroNuevo;
        } catch (error) {
            console.log(`Error al intentar agregar un nuevo libro... ${error}`);
            return {};
        }
    }
    

    borrarLibro = async id => {
        let libro = {}
        const libros = await this.leerArchivo(JsonLibros)
        const index = libros.findIndex( libro => libro.id === id )
        if(index != -1) {
            libro = libros.splice(index,1)[0]
            await this.escribirArchivo(JsonLibros, libros)
        }
        return libro    
    }

    actualizarlibro = async (id, libro) => {
        libro.id = id
        const libros = await this.leerArchivo(JsonLibros)
        const index = libros.findIndex( libro => libro.id === id )
        if(index != -1) {
            const libroAnt = libros[index]
            const libroNuevo = { ...libroAnt, ...libro }
            libros.splice(index,1,libroNuevo)
            await this.escribirArchivo(JsonLibros, libros)
            return libroNuevo
        }
        else {
            libros.push(libro)
            await this.escribirArchivo(JsonLibros, libros)
            return libro
        }
    }
}

export default LibrosMem