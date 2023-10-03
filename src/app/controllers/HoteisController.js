const HoteisRepository = require('../repository/HoteisRepository')

class HotelController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered hoteis
    const hoteis = await HoteisRepository.findAll(orderBy)

    res.json(hoteis)
  }

  async show(req, res) {
    // Get one registered cliente
    const { id } = req.params
    const hotel = await HoteisRepository.findById(id)

    if (!hotel) {
      // Not found
      return res.status(404).json({ errorMessage: 'Hotel not found' })

    }
    res.json(hotel)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new cliente
    const { nome, endereco, numero_de_quarto, id_categoria } = req.body

    if (!nome || !endereco || !numero_de_quarto || !id_categoria) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const enderecoExists = await HoteisRepository.findByEnderco(endereco)

    if (enderecoExists) {
      return res.status(400).json({ errorMessage: 'This telefone is already in use' })
    }

    const foreignKeyExists = await HoteisRepository.findByForeignKey(id_categoria)

    if (!foreignKeyExists) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_categoria was NOT FOUND' })
    }

    const hotel = await HoteisRepository.create({
      nome, endereco, numero_de_quarto, id_categoria
    })

    res.json(hotel)
  }

  async update(req, res) {
    // Update the hotel
    const { id } = req.params
    const { nome, endereco, numero_de_quarto, id_categoria } = req.body

    const hotelExists = await HoteisRepository.findById(id)
    if (!hotelExists) {
      return res.status(404).json({ errorMessage: 'Hotel not found' })
    }

    if (!nome || !endereco || !numero_de_quarto || !id_categoria) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const foreignKeyExists = await HoteisRepository.findByForeignKey(id_categoria)

    if (!foreignKeyExists) {
      return res.status(400).json({ errorMessage: 'This FOREIGN KEY id_categoria was NOT FOUND' })
    }

    const hotel = await HoteisRepository.updateHotel(id, {
      nome, endereco, numero_de_quarto, id_categoria
    })

    res.json(hotel)
  }

  async delete(req, res) {
    // Delete the hotel
    const { id } = req.params

    await HoteisRepository.delete(id)
    // Sucessfully without body
    res.sendStatus(204)
  }
}

// Singleton instance
module.exports = new HotelController()