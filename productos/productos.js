const { ipcRenderer } = require('electron')

const boton = document.getElementById('nuevo')
const boton1 = document.getElementById('irempleados')

boton.addEventListener('click', abrirVentanaPrincipal)
boton1.addEventListener('click', abrirVentanaPrincipal1)

function abrirVentanaPrincipal() {
    ipcRenderer.send('pedido')
}

function abrirVentanaPrincipal1() {
    ipcRenderer.send('iraempleados')
}

document.getElementById('productos')
.addEventListener('submit', function(event){
    event.preventDefault()

    var nomp = document.getElementById('nombre')
    var descp = document.getElementById('descripcion')
    var catep = document.getElementById('categoria')
    var exisp = document.getElementById('existencia')
    
    ipcRenderer.send('guardarproductos', [nomp.value, descp.value, catep.value, exisp.value])
})



