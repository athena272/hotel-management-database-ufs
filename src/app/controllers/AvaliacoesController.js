const AvaliacoesRepository = require('../repository/AvaliacoesRepository')
const isEmptyField = require('./CheckEmptyFiedController')

class AvaliacaoController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered avaliacoes
    const avaliacoes = await AvaliacoesRepository.findAll(orderBy)

    res.json(avaliacoes)
  }

  async show(req, res) {
    // Get one registered cliente
    const { id } = req.params
    const avaliacao = await AvaliacoesRepository.findById(id)

    if (!avaliacao) {
      // Not found
      return res.status(404).json({ errorMessage: 'Avaliacao not found' })

    }
    res.json(avaliacao)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new cliente
    const { comentario, classificacao, data_avaliacao, id_cliente, id_hotel } = req.body

    const missingFields = [[comentario, 'comentario'], [classificacao, 'classificacao'], [data_avaliacao, 'data_avaliacao'], [id_cliente, 'id_cliente'], [id_hotel, 'id_hotel']].filter(isEmptyField).map(([field, key]) => key)

    if (!comentario || !classificacao || !data_avaliacao || !id_cliente || !id_hotel) {
      return res.status(400).json({ errorMessage: `Missing field(s): ${missingFields.join(', ')}` })
    }

    const foreignKeyExistsCliente = await AvaliacoesRepository.findByForeignKeyCliente(id_cliente)
    const foreignKeyExistsHotel = await AvaliacoesRepository.findByForeignKeyHotel(id_hotel)

    if (!foreignKeyExistsCliente) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_cliente was NOT FOUND' })
    }

    if (!foreignKeyExistsHotel) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_hotel was NOT FOUND' })
    }

    const avaliacao = await AvaliacoesRepository.create({
      comentario, classificacao, data_avaliacao, id_cliente, id_hotel
    })

    res.json(avaliacao)
  }

  async update(req, res) {
    // Update the avaliacao
    const { id } = req.params
    const { comentario, classificacao, data_avaliacao, id_cliente, id_hotel } = req.body

    const avaliacaoExists = await AvaliacoesRepository.findById(id)
    if (!avaliacaoExists) {
      return res.status(404).json({ errorMessage: 'Avaliacao not found' })
    }

    const missingFields = [[comentario, 'comentario'], [classificacao, 'classificacao'], [data_avaliacao, 'data_avaliacao'], [id_cliente, 'id_cliente'], [id_hotel, 'id_hotel']].filter(isEmptyField).map(([field, key]) => key)
    console.log(req.body)

    if (!comentario || !classificacao || !data_avaliacao || !id_cliente || !id_hotel) {
      return res.status(400).json({ errorMessage: `Missing field(s): ${missingFields.join(', ')}` })
    }

    const foreignKeyExistsCliente = await AvaliacoesRepository.findByForeignKeyCliente(id_cliente)
    const foreignKeyExistsHotel = await AvaliacoesRepository.findByForeignKeyHotel(id_hotel)

    if (!foreignKeyExistsCliente) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_cliente was NOT FOUND' })
    }

    if (!foreignKeyExistsHotel) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_hotel was NOT FOUND' })
    }

    const avaliacao = await AvaliacoesRepository.updateAvaliacao(id, {
      comentario, classificacao, data_avaliacao, id_cliente, id_hotel
    })

    res.json(avaliacao)
  }

  async delete(req, res) {
    // Delete the avaliacao
    const { id } = req.params

    await AvaliacoesRepository.delete(id)
    // Sucessfully without body
    res.sendStatus(204)
  }
}

// Singleton instance
module.exports = new AvaliacaoController()