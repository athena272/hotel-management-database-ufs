const db = require('../../database/index.js')

class ReservasRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM reservas ORDER BY data_inicio ${direction}`)
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM reservas WHERE id_reserva = $1', [id])
    return row
  }

  async findByForeignKeyUsuario(foreign_key) {
    const [row] = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [foreign_key])
    return row
  }

  async findByForeignKeyHotel(foreign_key) {
    const [row] = await db.query('SELECT * FROM hoteis WHERE id_hotel = $1', [foreign_key])
    return row
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM reservas WHERE id_reserva = $1', [id])
    return deleteOperation
  }

  async create({ data_inicio, data_fim, preco, id_usuario, id_hotel }) {
    const [row] = await db.query(`
      INSERT INTO reservas(data_inicio, data_fim, preco, id_usuario, id_hotel)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [data_inicio, data_fim, preco, id_usuario, id_hotel])

    return row
  }

  async updateReserva(id, { data_inicio, data_fim, preco, id_usuario, id_hotel }) {
    const [row] = await db.query(`
      UPDATE reservas
      SET data_inicio = $1, data_fim = $2, preco = $3, id_usuario = $4, id_hotel = $5 
      WHERE id_reserva = $6
      RETURNING *
    `, [data_inicio, data_fim, preco, id_usuario, id_hotel, id])
    return row
  }
}

module.exports = new ReservasRepository()