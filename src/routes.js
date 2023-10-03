const { Router } = require('express')
const CategoriasController = require('./app/controllers/CategoriasController')
// const { index } = require('./app/controllers/ContactController')

// const route = express.Router()
const router = Router()


//Categorias
router.get('/categorias', CategoriasController.index)
router.get('/categorias/:id', CategoriasController.show)
router.delete('/categorias/:id', CategoriasController.delete)
router.post('/categorias', CategoriasController.store)
router.put('/categorias/:id', CategoriasController.update)

// //Usuarios
// router.get('/usuarios', ContactController.index)
// router.get('/usuarios/:id', ContactController.show)
// router.delete('/usuarios/:id', ContactController.delete)
// router.post('/usuarios', ContactController.store)
// router.put('/usuarios/:id', ContactController.update)


module.exports = router