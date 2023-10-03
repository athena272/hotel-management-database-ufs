const ClientesRepository = require('../repository/ClientesRepository ')

class ClienteController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered clientes
    const clientes = await ClientesRepository.findAll(orderBy)

    res.json(clientes)
  }

  async show(req, res) {
    // Get one registered cliente
    const { id } = req.params
    const cliente = await ClientesRepository.findById(id)

    if (!cliente) {
      // Not found
      return res.status(404).json({ errorMessage: 'Cliente not found' })

    }
    res.json(cliente)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new cliente
    const { endereco, telefone, id_usuario } = req.body

    if (!endereco || !telefone || !id_usuario) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const telefoneExists = await ClientesRepository.findByTelefone(telefone)

    if (telefoneExists) {
      return res.status(400).json({ errorMessage: 'This telefone is already in use' })
    }

    const foreignKeyExists = await ClientesRepository.findByForeignKey(id_usuario)

    if (!foreignKeyExists) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY was NOT FOUND' })
    }

    const cliente = await ClientesRepository.create({
      endereco, telefone, id_usuario
    })

    res.json(cliente)
  }

  async update(req, res) {
    // Update the cliente
    const { id } = req.params
    const { endereco, telefone, id_usuario } = req.body

    const clienteExists = await ClientesRepository.findById(id)
    if (!clienteExists) {
      return res.status(404).json({ errorMessage: 'Cliente not found' })
    }

    if (!endereco || !telefone || !id_usuario) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const foreignKeyExists = await ClientesRepository.findByForeignKey(id_usuario)

    if (!foreignKeyExists) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY was NOT FOUND' })
    }

    const cliente = await ClientesRepository.updateCliente(id, {
      endereco, telefone, id_usuario
    })

    res.json(cliente)
  }

  async delete(req, res) {
    // Delete the cliente
    const { id } = req.params

    await ClientesRepository.delete(id)
    // Sucessfully without body
    res.sendStatus(204)
  }
}

// Singleton instance
module.exports = new ClienteController()