const ContactsRepository = require('../repository/ContactsRepository')

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query
    // List all registered contacts
    const contacts = await ContactsRepository.findAll(orderBy)

    res.json(contacts)
  }

  async show(req, res) {
    // Get one registered contact
    const { id } = req.params
    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      // Not found
      return res.status(404).json({ errorMessage: 'Contact not found' })

    }
    res.json(contact)
    // res.send(req.params)
  }

  async store(req, res) {
    // Create a new contact
    const { name, email, phone, category_id } = req.body

    if (!name) {
      return res.status(400).json({ errorMessage: 'Name is required' })
    }

    const contactExists = await ContactsRepository.findByEmail(email)

    if (contactExists) {
      return res.status(400).json({ errorMessage: 'This e-mail is already in use' })
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    })

    res.json(contact)
  }

  async update(req, res) {
    // Update the contact
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    const contactExists = await ContactsRepository.findById(id)
    if (!contactExists) {
      return res.status(404).json({ errorMessage: 'Contact not found' })
    }

    if (!name) {
      return res.status(400).json({ errorMessage: 'Name is required' })
    }

    const contactByEmail = await ContactsRepository.findByEmail(email)
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ errorMessage: 'This e-mail is already in use' })
    }

    const contact = await ContactsRepository.updateContact(id, {
      name, email, phone, category_id
    })

    res.json(contact)
  }

  async delete(req, res) {
    // Delete the contact
    const { id } = req.params

    await ContactsRepository.delete(id)
    // Sucessfully without body
    res.sendStatus(204)
  }
}

// Singleton instance
module.exports = new ContactController()