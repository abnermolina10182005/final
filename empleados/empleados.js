const { ipcRenderer } = require('electron')


const boton = document.getElementById('abrir')
const boton1 = document.getElementById('salir')


boton.addEventListener('click', abrirVentanaPrincipal2)
boton1.addEventListener('click', abrirVentanaPrincipal)


function abrirVentanaPrincipal2() {
    ipcRenderer.send('iraprod')
}

function abrirVentanaPrincipal() {
    ipcRenderer.send('iralogin')
}

document.getElementById('empleados')
    .addEventListener('submit', function(event) {
        event.preventDefault()


        var nom = document.getElementById('nombre')
        var cui = document.getElementById('dpi')
        var pass = document.getElementById('clave')

        ipcRenderer.send('guardarempleados', [nom.value, cui.value, pass.value])

    })