const db = require('../../database/index.js')

class AvaliacaoRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM avaliacoes ORDER BY comentario ${direction}`)
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM avaliacoes WHERE id_avaliacao = $1', [id])
    return row
  }

  async findByForeignKeyCliente(foreign_key) {
    const [row] = await db.query('SELECT * FROM clientes WHERE id_cliente = $1', [foreign_key])
    return row
  }

  async findByForeignKeyHotel(foreign_key) {
    const [row] = await db.query('SELECT * FROM hoteis WHERE id_hotel = $1', [foreign_key])
    return row
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM avaliacoes WHERE id_avaliacao = $1', [id])
    return deleteOperation
  }

  async create({ comentario, classificacao, data_avaliacao, id_cliente, id_hotel }) {
    const [row] = await db.query(`
      INSERT INTO avaliacoes(comentario, classificacao, data_avaliacao, id_cliente, id_hotel)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [comentario, classificacao, data_avaliacao, id_cliente, id_hotel])

    return row
  }

  async updateAvaliacao(id, { comentario, classificacao, data_avaliacao, id_cliente, id_hotel }) {
    const [row] = await db.query(`
      UPDATE avaliacoes
      SET comentario = $1, classificacao = $2, data_avaliacao = $3, id_cliente = $4, id_hotel = $5 
      WHERE id_avaliacao = $6
      RETURNING *
    `, [comentario, classificacao, data_avaliacao, id_cliente, id_hotel, id])
    return row
  }
}

module.exports = new AvaliacaoRepository()