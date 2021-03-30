const { ipcRenderer } = require('electron')

const boton = document.getElementById('regresar')

boton.addEventListener('click', abrirVentana)

function abrirVentana() {
    ipcRenderer.send('anterior1')
}

document.getElementById('pedidos')
.addEventListener('submit', function(event){
    event.preventDefault()


    var nombrep = document.getElementById('nombredeprod')
    var cantp = document.getElementById('cantidad')
    var codprod = document.getElementById('cod_producto')
    var codemp = document.getElementById('cod_empleado')

    
    ipcRenderer.send('guardarpedido', [nombrep.value, cantp.value, codprod.value, codemp.value])

})