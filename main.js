const { app, BrowserWindow, ipcRenderer } = require('electron')
const { ipcMain } = require('electron')
const { MongoClient } = require('mongodb')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')

let ventana

function ventanaPrincipal() {
    ventana = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: ({
            nodeIntegration: true
        })
    })

    ventana.loadFile('./formulario/formulario.html')

}



let ventana2

function ventanaSecundaria() {
    ventana2 = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: ({
            nodeIntegration: true
        })
    })

    ventana2.loadFile('./empleados/empleados.html')
}

let ventana3

function ventanaTercera() {
    ventana3 = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: ({
            nodeIntegration: true
        })
    })

    ventana3.loadFile('./productos/productos.html')
}



let ventana4

function ventanaCuarta() {
    ventana4 = new BrowserWindow({
        width: 700,
        height: 700,
        webPreferences: ({
            nodeIntegration: true
        })
    })

    ventana4.loadFile('./pedidos/pedidos.html')
}


app.whenReady().then(ventanaPrincipal)

//conexion a mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'super_mercadopa'
})


ipcMain.on('guardarempleados', function(event, args) {
    console.log(args)
    let nombre = args[0]
    let numero_identificacion = args[1]
    let contraseña = args[2]

    bcrypt.hash(contraseña, 10, function(err, contraseña_hash) {
        connection.query('INSERT INTO empleados(nombre,numero_identificacion,contraseña) VALUES(?,?,?)', [nombre, numero_identificacion, contraseña_hash], )
    })
})

ipcMain.on('guardarproductos', function(event, args) {
    console.log(args)
    connection.query('INSERT INTO productos(nombre,descripcion,categoria,existencia) VALUES(?,?,?,?)',
        args, )
})

ipcMain.on('mostrar', function(event, args) {
    console.log(args)
    connection.query('select * from productos',
        args,
    )
})

ipcMain.on('guardarpedido', function(event, args) {
    console.log(args)
    connection.query('INSERT INTO pedidos(nombre,cantidad,cod_producto,cod_empleado) VALUES(?,?,?,?)',
        args, )
})


ipcMain.on('error-formulario', function(event, args) {
    var lineas = parseInt(args)
    var alto = 215 + (lineas * 20)
    ventana.setSize(400, alto)
})

ipcMain.on('formulario-valido', (event, args) => {
    console.log(args)
    crearUsuario()
})

ipcMain.on('registro', (event, args) => {
    ventanaSecundaria()
    ventana.close()
})

ipcMain.on('cambiar', (event, args) => {
    ventanaTercera()
    ventana2.close()
})

ipcMain.on('pedido', (event, args) => {
    ventanaCuarta()
    ventana3.close()
})

ipcMain.on('iraprod', (event, args) => {
    ventanaTercera()
    ventana2.close()
})


ipcMain.on('anterior1', (event, args) => {
    ventanaTercera()
    ventana4.close()
})

ipcMain.on('iraempleados', (event, args) => {
    ventanaSecundaria()
    ventana3.close()
})

//ipcMain.on('nuevopedido', (event, args) => {
//alert('Se ha grabado pedido')
//})

ipcMain.on('iralogin', (event, args) => {
    ventanaPrincipal()
    ventana2.close()
})


app.on('window-all-closed', function() {

    if (process.platform !== 'darwin') {
        app.quit()
    }
})