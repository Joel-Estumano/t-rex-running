document.getElementById("action").innerHTML = 'Pressione espaço para iniciar'
let cenario = document.getElementById('cenario')
let tRex = document.getElementById("rex")
let saltou = false
let morreu = false
let pontos = 0
let start = false

/*  */
const grid = document.querySelector('.grid')

time()

function saltar() {
    if (tRex.className != "salto") {
        tRex.classList.add("salto")
        up();
        saltou = true
        setTimeout(() => {
            tRex.classList.remove("salto")
            saltou = false
        }, 500)
    }
}

function geraCactos() {
    let tempoAleatorio = Math.random() * 6000

    let posicaoCacto = parseInt(window.getComputedStyle(cenario).getPropertyValue('width')) - 60;
    let cacto = document.createElement('div')
    if (!morreu) cacto.classList.add('cacto')
    grid.appendChild(cacto)
    cacto.style.left = posicaoCacto + 'px'

}

/*  */

document.addEventListener("keydown", function(event) {
    if (start == false) {
        start = true;
        document.getElementById("action").innerHTML = 'Running...'
    }
    saltar();
});



function up() {
    document.getElementById('up').play()
}


function death() {
    document.getElementById('death').play()
}


function time() {
    setInterval(function() {
        if (!morreu && start) {
            document.getElementById("placar").innerHTML = (pontos = pontos + 1);
        }
    }, 100);
}