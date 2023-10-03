const { Router } = require('express')
const CategoriasController = require('./app/controllers/CategoriasController')
const UsersController = require('./app/controllers/UsersController')
const ClientesController = require('./app/controllers/ClientesController')
const HoteisController = require('./app/controllers/HoteisController')
const AvaliacoesController = require('./app/controllers/AvaliacoesController')
const ReservasController = require('./app/controllers/ReservasController')
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

//Hoteis
router.get('/hoteis', HoteisController.index)
router.get('/hoteis/:id', HoteisController.show)
router.delete('/hoteis/:id', HoteisController.delete)
router.post('/hoteis', HoteisController.store)
router.put('/hoteis/:id', HoteisController.update)

//Avaliações
router.get('/avaliacoes', AvaliacoesController.index)
router.get('/avaliacoes/:id', AvaliacoesController.show)
router.delete('/avaliacoes/:id', AvaliacoesController.delete)
router.post('/avaliacoes', AvaliacoesController.store)
router.put('/avaliacoes/:id', AvaliacoesController.update)

//Reservas
router.get('/reservas', ReservasController.index)
router.get('/reservas/:id', ReservasController.show)
router.delete('/reservas/:id', ReservasController.delete)
router.post('/reservas', ReservasController.store)
router.put('/reservas/:id', ReservasController.update)

module.exports = router