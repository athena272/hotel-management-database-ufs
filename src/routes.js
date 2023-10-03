const { Router } = require('express')
const CategoriasController = require('./app/controllers/CategoriasController')
const UsersController = require('./app/controllers/UsersController')
const ClientesController = require('./app/controllers/ClientesController')
// const { index } = require('./app/controllers/ContactController')

// const route = express.Router()
const router = Router()


//Categorias
router.get('/categorias', CategoriasController.index)
router.get('/categorias/:id', CategoriasController.show)
router.delete('/categorias/:id', CategoriasController.delete)
router.post('/categorias', CategoriasController.store)
router.put('/categorias/:id', CategoriasController.update)

//Usuarios
router.get('/usuarios', UsersController.index)
router.get('/usuarios/:id', UsersController.show)
router.delete('/usuarios/:id', UsersController.delete)
router.post('/usuarios', UsersController.store)
router.put('/usuarios/:id', UsersController.update)

//Clientes
router.get('/clientes', ClientesController.index)
router.get('/clientes/:id', ClientesController.show)
router.delete('/clientes/:id', ClientesController.delete)
router.post('/clientes', ClientesController.store)
router.put('/clientes/:id', ClientesController.update)

module.exports = router