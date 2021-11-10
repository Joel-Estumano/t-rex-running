let cenario = document.getElementById('cenario')
let grid = document.getElementById('grid')
let tRex = document.getElementById("rex")
let saltou = false
let morreu = false
let pontos = 0
let start = false

load()

function saltar() {
    if (!morreu) {
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
}

function geraCactos() {
    let tempoAleatorio = Math.random() * 6000

    /* recupero o cenario, planto o cacto */
    let posicaoCacto = parseInt(window.getComputedStyle(cenario).getPropertyValue('width')) - 60;
    let cacto = document.createElement('div')
    if (!morreu) {
        cacto.classList.add('cacto')
        grid.appendChild(cacto)
        cacto.style.left = posicaoCacto + 'px'
    }


    let timerId = setInterval(function() {

        let rexTop = parseInt(window.getComputedStyle(tRex).getPropertyValue("top"));

        if (!morreu) {
            posicaoCacto = posicaoCacto - 4;
            cacto.style.left = posicaoCacto + 'px'
            if (posicaoCacto < 0) {
                grid.removeChild(cacto)
                clearInterval(timerId)
            }
            if ((saltou == false && posicaoCacto > 20 && posicaoCacto < 100) ||
                (saltou == true && rexTop >= 100 && posicaoCacto > 20 && posicaoCacto < 60)) {
                clearInterval(timerId)

                cenario.classList.remove("moveCenario")
                morreu = true
                death()

                document.getElementById("placar").innerHTML = 'Game over!' + ' Score: ' + pontos
                document.getElementById("action").innerHTML = 'Recarregue a página para tentar novamente'
            }

        }

    }, 8)
    if (!morreu) { setTimeout(geraCactos, tempoAleatorio) }
}

document.addEventListener("keydown", function(event) {
    if (start == false) {
        start = true;
        document.getElementById("action").innerHTML = 'Running...'
        cenario.classList.add("moveCenario")
        geraCactos()
    }
    saltar();
});

function up() {
    document.getElementById('up').play()
}

function death() {
    document.getElementById('death').play()
}

function load() {
    document.getElementById("action").innerHTML = 'Pressione espaço para iniciar'
    setInterval(function() {
        if (!morreu && start) {
            document.getElementById("placar").innerHTML = (pontos = pontos + 1);
        }
    }, 100);
}