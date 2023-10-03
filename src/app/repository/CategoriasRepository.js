const db = require('../../database/index.js')

class CategoriasRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM categorias ORDER BY nome ${direction}`)
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM categorias WHERE id_categoria = $1', [id])
    return row
  }

  async findByName(nome) {
    const [row] = await db.query('SELECT * FROM categorias WHERE nome = $1', [nome])
    return row
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM categorias WHERE id_categoria = $1', [id])
    return deleteOperation
  }

  async create({ nome, descricao }) {
    const [row] = await db.query(`
      INSERT INTO categorias(nome, descricao)
      VALUES($1, $2)
      RETURNING *
    `, [nome, descricao])

    return row
  }

  async updateCategoria(id, { nome, descricao }) {
    const [row] = await db.query(`
      UPDATE categorias
      SET nome = $1, descricao = $2
      WHERE id_categoria = $3
      RETURNING *
    `, [nome, descricao, id])
    return row
  }
}

module.exports = new CategoriasRepository()