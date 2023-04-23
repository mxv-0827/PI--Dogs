const server = require('./src/Server.js');
const { conn } = require('./src/DataBase.js');

conn.sync({force : true}).then(() => {
  server.listen(3001, () => {
    console.log("Escuchando en el puerto 3001");
  })
})

