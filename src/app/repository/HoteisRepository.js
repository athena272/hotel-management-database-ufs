const db = require('../../database/index.js')

class HotelRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM hoteis ORDER BY nome ${direction}`)
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM hoteis WHERE id_hotel = $1', [id])
    return row
  }

  async findByForeignKey(foreign_key) {
    const [row] = await db.query('SELECT * FROM categorias WHERE id_categoria = $1', [foreign_key])
    return row
  }

  async findByEnderco(endereco) {
    const [row] = await db.query('SELECT * FROM hoteis WHERE endereco = $1', [endereco])
    return row
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM hoteis WHERE id_hotel = $1', [id])
    return deleteOperation
  }

  async create({ nome, endereco, numero_de_quartos, id_categoria }) {
    const [row] = await db.query(`
      INSERT INTO hoteis(nome, endereco, numero_de_quartos, id_categoria)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [nome, endereco, numero_de_quartos, id_categoria])

    return row
  }

  async updateHotel(id, { nome, endereco, numero_de_quartos, id_categoria }) {
    const [row] = await db.query(`
      UPDATE usuarios
      SET nome = $1, endereco = $2, numero_de_quartos = $3, id_categoria = $4
      WHERE id_hotel = $5
      RETURNING *
    `, [nome, endereco, numero_de_quartos, id_categoria, id])
    return row
  }
}

module.exports = new HotelRepository()