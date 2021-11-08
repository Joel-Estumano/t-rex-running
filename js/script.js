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
    if (!morreu) { cacto.classList.add('cacto') }
    grid.appendChild(cacto)
    cacto.style.left = posicaoCacto + 'px'

    /*  */
    let timerId = setInterval(function() {


        let rexTop = parseInt(window.getComputedStyle(tRex).getPropertyValue("top"));

        if (!morreu) {
            if ((saltou == false && posicaoCacto > 20 && posicaoCacto < 100) ||
                (saltou == true && rexTop >= 100 && posicaoCacto > 20 && posicaoCacto < 60)) {
                clearInterval(timerId)

                cenario.classList.remove("moveCenario")
                morreu = true
                death()

                document.getElementById("placar").innerHTML = 'Game over!' + ' Score: ' + pontos
                document.getElementById("action").innerHTML = 'Recarregue a página para tentar novamente'
            }
            posicaoCacto = posicaoCacto - 10;
            cacto.style.left = posicaoCacto + 'px'
            if (posicaoCacto < 0) {
                cacto.classList.remove('cacto')
            }
        }



    }, 20)
    if (!morreu) { setTimeout(geraCactos, tempoAleatorio) }
}

document.addEventListener("keydown", function(event) {
    if (start == false) {
        start = true;
        cenario.classList.add("moveCenario")
        document.getElementById("action").innerHTML = 'Running...'
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


function time() {
    setInterval(function() {
        if (!morreu && start) {
            document.getElementById("placar").innerHTML = (pontos = pontos + 1);
        }
    }, 100);
}