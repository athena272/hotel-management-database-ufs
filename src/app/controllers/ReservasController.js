const ReservasRepository = require('../repository/ReservasRepository')

class ReservaController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered reservas
    const reservas = await ReservasRepository.findAll(orderBy)

    res.json(reservas)
  }

  async show(req, res) {
    // Get one registered cliente
    const { id } = req.params
    const reserva = await ReservasRepository.findById(id)

    if (!reserva) {
      // Not found
      return res.status(404).json({ errorMessage: 'Reserva not found' })

    }
    res.json(reserva)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new reserva
    const { data_inicio, data_fim, preco, id_usuario, id_hotel } = req.body

    if (!data_inicio || !data_fim || !preco || !id_usuario || !id_hotel) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const foreignKeyExistsUsuario = await ReservasRepository.findByForeignKeyUsuario(id_usuario)
    const foreignKeyExistsHotel = await ReservasRepository.findByForeignKeyHotel(id_hotel)

    if (!foreignKeyExistsUsuario) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_usuario was NOT FOUND' })
    }

    if (!foreignKeyExistsHotel) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_hotel was NOT FOUND' })
    }

    const reserva = await ReservasRepository.create({
      data_inicio, data_fim, preco, id_usuario, id_hotel
    })

    res.json(reserva)
  }

  async update(req, res) {
    // Update the avaliacao
    const { id } = req.params
    const { comentario, classificacao, data_avaliacao, id_usuario, id_hotel } = req.body

    const reservaExists = await ReservasRepository.findById(id)
    if (!reservaExists) {
      return res.status(404).json({ errorMessage: 'Reserva not found' })
    }

    if (!comentario || !classificacao || !data_avaliacao || !id_usuario || !id_hotel) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const foreignKeyExistsUsuario = await ReservasRepository.findByForeignKeyUsuario(id_usuario)
    const foreignKeyExistsHotel = await ReservasRepository.findByForeignKeyHotel(id_hotel)

    if (!foreignKeyExistsUsuario) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_usuario was NOT FOUND' })
    }

    if (!foreignKeyExistsHotel) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_hotel was NOT FOUND' })
    }

    const reserva = await ReservasRepository.updateReserva(id, {
      data_inicio, data_fim, preco, id_usuario, id_hotel
    })

    res.json(reserva)
  }

  async delete(req, res) {
    // Delete the avaliacao
    const { id } = req.params

    await ReservasRepository.delete(id)
    // Sucessfully without body
    res.sendStatus(204)
  }
}

// Singleton instance
module.exports = new ReservaController()