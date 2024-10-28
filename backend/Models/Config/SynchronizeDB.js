const sequelize = require('./Cardinalidad')
const mysql = require('mysql2/promise')

const config = require('./ConfigDB')
const ConfigDB = config[process.env.NODE_ENV]

const SynchronizeDB = () => {

  const CreatedDB = async () => {
    let connection
    await mysql.createConnection({
      user: ConfigDB.username,
      password: ConfigDB.password
    })
    .then(conn => {
      connection = conn
      return connection.query(`CREATE DATABASE IF NOT EXISTS ${ConfigDB.database}`)
    })
    .then(() => {
      console.log('Base de datos creada.')
    })
    .catch(error => {
      console.error('Error al crear la base de datos.', error.message)
    })
    .finally(() => {
      if (connection) {
        connection.end()
        console.log('Base de datos creada y se procede a cerrar la conexión.')        
      }
    })
  }

  const CreateTables = async () => {
    await sequelize.authenticate()
    .then(() => {
      console.log('Autenticación realizada.')
    })
    .catch(error => {
      console.log('Error al autenticar.', error.message)
    })

    await sequelize.sync({ force: false })
    .then(() => {
      console.log('Sincronización de tablas realizada.')
    })
    .catch(error => {
      console.log('Error al sincronizar tablas.', error.message)
    })
    // .finally(() => {
    //   sequelize.close()
    //   console.log('Conexión a la base de datos cerrada.')
    // })
  }

  return { CreatedDB, CreateTables }

}

module.exports = SynchronizeDB
