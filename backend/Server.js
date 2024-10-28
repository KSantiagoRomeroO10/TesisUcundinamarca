//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Express = require('express')
const Cors = require('cors')
const Routes = require('./Routes/Index')

const SynchronizeDB = require('./Models/Config/SynchronizeDB')
const { CreatedDB, CreateTables } = SynchronizeDB()

const StartPythonAPI = require('./ApiPython/StartPythonAPI')

const Server = Express()

Server.use(Express.json())

Server.use(Cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

Server.use(Routes)

const Port = 3001

const startServer = async () => {
  Server.listen(Port, async () => {
    await CreatedDB()
    await CreateTables()
    try{
      const result = await StartPythonAPI() 
      console.log(result);
    }
    catch(error){
      console.log(error);
    }
    console.log(`Servidor escuchando en el puerto ${Port}.`)
  })
}

startServer()