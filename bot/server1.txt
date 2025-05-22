// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulación de usuarios
const usuarios = [
    { usuario: 'mesero', contrasena: '1234', rol: 'mesero' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin' }
];

// Ruta de login
app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    const user = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);
    
    if (user) {
        res.json({ success: true, rol: user.rol });
    } else {
        res.status(401).json({ success: false, mensaje: 'Usuario o contraseña incorrectos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





























































// server.js
//const express = require('express');
//const bodyParser = require('body-parser');
//const cors = require('cors');
//const { Usuario } = require('./models');  // Importa el modelo de Usuario
//const app = express();
//const PORT = 3000;

// Middleware
//app.use(cors());
//app.use(bodyParser.json());

// Ruta de login
//app.post('/login', async (req, res) => {
//    const { usuario, contrasena } = req.body;

 //   try {
        // Busca al usuario en la base de datos
 //       const user = await Usuario.findOne({
 //           where: {
  //              email: usuario,  // Usamos el email como campo para login
  //              passwordHash: contrasena,  // Asegúrate de que la contraseña esté cifrada en la base de datos
//            },
 //       });
//
  //      if (user) {
    //        // Si el usuario existe y la contraseña es correcta
      //      res.json({ success: true, rol: user.rol });
        //} else {
          //  // Si no se encuentra el usuario o la contraseña es incorrecta
            //res.status(401).json({ success: false, mensaje: 'Usuario o contraseña incorrectos' });
//        }
 //   } catch (error) {
   //     console.error('Error al verificar el login:', error);
     //   res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
    //}
//});

// Inicia el servidor
//app.listen(PORT, () => {
 //   console.log(`Servidor corriendo en http://localhost:${PORT}`);
//});








// Requiere la configuración de la conexión a la base de datos (configuración Sequelize)
//const sequelize = require('./config/database');

// Requiere los modelos de las tablas que se van a utilizar
//const Usuario = require('./models/Usuario');
//const Mesa = require('./models/Mesa');
//const ClientePedido = require('./models/ClientePedido');
//const Pedido = require('./models/Pedido');
//const Producto = require('./models/Producto');
//const DetallePedido = require('./models/DetallePedido');
//const Inventario = require('./models/Inventario');
//const ReporteVenta = require('./models/ReporteVenta');

// Sincroniza la base de datos con los modelos definidos en Sequelize
// force: false significa que no se eliminará ni se reseteará la base de datos si ya existe
//sequelize.sync({ force: false }) // Si quieres resetear la base de datos, cambia a force: true
//  .then(() => {
    // Mensaje que indica que la base de datos se ha sincronizado correctamente
 //   console.log('Base de datos sincronizada');
 // })
 // .catch((error) => {
    // Si ocurre un error durante la sincronización, se captura y se muestra
  //  console.error('Error al sincronizar la base de datos:', error);
 // });
