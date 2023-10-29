import express from 'express'
import RouterLibros from './router/libros.js'

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/libros', new RouterLibros().start())


const server = app.listen(PORT, 
    () => console.log(`Escuchando en el puerto ${PORT}`)
)
