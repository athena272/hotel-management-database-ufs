const UsersRepository = require('../repository/UsersRepository')
const isEmptyField = require('./CheckEmptyFiedController')

class UsersController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered users
    const users = await UsersRepository.findAll(orderBy)

    res.json(users)
  }

  async show(req, res) {
    // Get one registered user
    const { id } = req.params
    const user = await UsersRepository.findById(id)

    if (!user) {
      // Not found
      return res.status(404).json({ errorMessage: 'User not found' })

    }
    res.json(user)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new user
    const { nome, email, senha } = req.body

    const missingFields = [[nome, 'nome'], [email, 'email'], [senha, 'senha']].filter(isEmptyField).map(([field, key]) => key)

    if (!nome || !email || !senha) {
      return res.status(400).json({ errorMessage: `Missing field(s): ${missingFields.join(', ')}` })
    }

    const emailExists = await UsersRepository.findByEmail(email)

    if (emailExists) {
      return res.status(400).json({ errorMessage: 'This e-mail is already in use' })
    }

    const user = await UsersRepository.create({
      nome, email, senha
    })

    res.json(user)
  }

  async update(req, res) {
    // Update the user
    const { id } = req.params
    const { nome, email, senha } = req.body

    const userExists = await UsersRepository.findById(id)
    if (!userExists) {
      return res.status(404).json({ errorMessage: 'User not found' })
    }

    if (!nome || !email || !senha) {
      return res.status(400).json({ errorMessage: 'Field is required' })
    }

    const user = await UsersRepository.updateUser(id, {
      nome, email, senha
    })

    res.json(user)
  }

  async delete(req, res) {
    // Delete the user
    const { id } = req.params

    await UsersRepository.delete(id)
    // Sucessfully without body
    res.sendStatus(204)
  }
}

// Singleton instance
module.exports = new UsersController()