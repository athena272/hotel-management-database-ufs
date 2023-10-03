const db = require('../../database/index.js')

class ClienteRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM clientes ORDER BY endereco ${direction}`)
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM clientes WHERE id_cliente = $1', [id])
    return row
  }

  async findByForeignKey(foreign_key) {
    const [row] = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [foreign_key])
    return row
  }

  async findByTelefone(tel) {
    const [row] = await db.query('SELECT * FROM clientes WHERE telefone = $1', [tel])
    return row
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM clientes WHERE id_cliente = $1', [id])
    return deleteOperation
  }

  async create({ endereco, telefone, id_usuario }) {
    const [row] = await db.query(`
      INSERT INTO clientes(endereco, telefone, id_usuario)
      VALUES($1, $2, $3)
      RETURNING *
    `, [endereco, telefone, id_usuario])

    return row
  }

  async updateCliente(id, { endereco, telefone, id_usuario }) {
    const [row] = await db.query(`
      UPDATE clientes
      SET endereco = $1, telefone = $2, id_usuario = $3
      WHERE id_cliente = $4
      RETURNING *
    `, [endereco, telefone, id_usuario, id])
    return row
  }
}

module.exports = new ClienteRepository()