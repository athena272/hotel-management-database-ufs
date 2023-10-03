const db = require('../../database/index.js')

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM usuarios ORDER BY nome ${direction}`)
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id])
    return row
  }

  async findByEmail(nome) {
    const [row] = await db.query('SELECT * FROM usuarios WHERE email = $1', [nome])
    return row
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM usuarios WHERE id_usuario = $1', [id])
    return deleteOperation
  }

  async create({ nome, email, senha }) {
    const [row] = await db.query(`
      INSERT INTO usuarios(nome, email, senha)
      VALUES($1, $2, $3)
      RETURNING *
    `, [nome, email, senha])

    return row
  }

  async updateUser(id, { nome, email, senha }) {
    const [row] = await db.query(`
      UPDATE usuarios
      SET nome = $1, email = $2, senha = $3
      WHERE id_usuario = $4
      RETURNING *
    `, [nome, email, senha, id])
    return row
  }
}

module.exports = new UsersRepository()