const CategoriasRepository = require('../repository/CategoriasRepository')

class CategoriasController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered categorias
    const categorias = await CategoriasRepository.findAll(orderBy)

    res.json(categorias)
  }

  async show(req, res) {
    // Get one registered categoria
    const { id } = req.params
    const categoria = await CategoriasRepository.findById(id)

    if (!categoria) {
      // Not found
      return res.status(404).json({ errorMessage: 'Categoria not found' })

    }
    res.json(categoria)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new categoria
    const { nome, descricao } = req.body

    if (!nome || !descricao) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const nomeExists = await CategoriasRepository.findByName(nome)

    if (nomeExists) {
      return res.status(400).json({ errorMessage: 'This nome is already in use' })
    }

    const categoria = await CategoriasRepository.create({
      nome, descricao
    })

    res.json(categoria)
  }

  async update(req, res) {
    // Update the categoria
    const { id } = req.params
    const { nome, descricao } = req.body

    const categoriaExists = await CategoriasRepository.findById(id)
    if (!categoriaExists) {
      return res.status(404).json({ errorMessage: 'categoria not found' })
    }

    if (!nome || !descricao) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const categoria = await CategoriasRepository.updateCategoria(id, {
      nome, descricao
    })

    res.json(categoria)
  }

  async delete(req, res) {
    // Delete the categoria
    const { id } = req.params

    await CategoriasRepository.delete(id)
    // Sucessfully without body
    return res.status(204).json({ deleteMessage: 'Categoria was deleted' })
  }
}

// Singleton instance
module.exports = new CategoriasController()