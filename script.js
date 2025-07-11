// selecione o canva da pagina onde o jogo vai acontecer
const canvas = document.getElementById('game');

//pega o contexto do 2d do camba para desenhar as nosas formas, imagens e todo o que vossa criatividade precisar 
const ctx = canvas.getContext('2d');
 
// selepciona el elmente html que va a mostrar la puntuacion del jugador
const scoreDisplay = document.getElementById('score');

//bjeto que representa a raquete que o jogador controla 
const raquete = {
    x: 10,
    y: canvas.height /2 - 40,
    largura: 10,
    altura: 100,
    velocidade: 18,
}
//Objeto que representa a  bola de jogar 
const bola = {
    x: canvas.width / 2,  // Poiciona horizontal inicil (no meio do canvas)
    y: canvas.height / 2, // na vertical tambem 
    raio: 10,             //tamanho de bola (raio de circulo)
    dx: 6, 
    dy: 6
};

let pontuacao = 0;

let jogoAcabou = false;

const tecla = {
    ArrowUp: false,
    ArrowDown: false 
}
// Adicionamos um "ouvinte" para quando a tcla for precionada 
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowUp') tecla.ArrowUp = true      // 
    if (evento.key === 'ArrowDown') tecla.ArrowDown = true  // 
})  

// Adiciona um "uivinte" para quando a tecla for solta 
document.addEventListener('keyup', (evento) => {
    if (evento.key === 'ArrowUp') tecla.ArrowUp = false     // "seta para cima" quando for precionada 
    if (evento.key === 'ArrowDown') tecla.ArrowDown = false // "seta para abaixo" quando for precionada
})

//Função que atualiza a logica do jogo em cada franme 
function atualizar() {
    if (jogoAcabou) return; // Se o jogo acabou, para a atualização 

    // move a raquete para cima se a tecla reta para cimas estiver precionada 
    if(tecla.ArrowUp) raquete.y -= raquete.velocidade

    // mover a raquete para abaixo se a tecla seta para abaixo estiver presionada 
    if(tecla.ArrowDown) raquete.y += raquete.velocidade

    //impede que a raquete ultripasse o limite superior da tela
    if (raquete.y < 0) raquete.y = 0;

    //impede que a raquete ultrapassa o limite inferior da tela
    if (raquete.y + raquete.altura > canvas.height) {
        raquete.y = canvas.height - raquete.altura;
    }

    // atualiza a posição horizontal da bola e somando a velocidades dx 
    bola.x += bola.dx;
    //fazemos isso para a posição vertical tambem
    bola.y += bola.dy;
    //vertical se a bola vateu no topo da tela 
    if (bola.y - bola.raio < 0) {
        bola.dy *= -1; // Inverte a direção vertical da bola pra baixo 
    }
    //verifica se a bola vateu na parte inferior da tela
    if (bola.y + bola.raio > canvas.height) {
        bola.dy *= -1; // Inverte a direção vertical da bola para cima 
    }
    //Verifica se a bola esta colindo a raquete
    if(
        bola.x - bola.raio < raquete.x + raquete.largura && //a bola chegou na largura da raquete 
        bola.y > raquete.y &&                               //a bola esta abaixo do topo da raquete
        bola.y < raquete.y + raquete.altura                 // a bola esta acima da base da raquete
    ) {
        bola.dx *= -1; // inverte a direção horizontal da bola (rebate para a direita)
        pontuacao++; // incremente a pontuação do jogador 
        scoreDisplay.textContent = pontuacao; // atualiça a pntuação da tela
    } 
    //verifique se a bola saio pela esquerda da tela (perdeu cara)

    if (bola.x - bola.raio < 0) {
        jogoAcabou = true;  // marca que o jogo terminou
        //espera um poquinho antes de mostrar o alerta para o jogador 
        setTimeout(() => {
            alert('Fim do jogo! Perdeu cara ❌. Sua pontuação é: ' + pontuacao)
            document.location.reload(); // recarrega a pagina reacionar o jogo 
        }, 100);

    }
    //verifica se a bola vateu na parede direita da tela
    if (bola.x + bola.raio > canvas.width) {
        bola.dx *= -1; // inverta a direção horizontal da bola (rebate para a esquerda)
    }
}

// função que desenha todo os elementos da tela
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // limpa a tela para desenhar o proximo frama
    // desenha a raquete retangular 
    ctx.fillStyle = 'white' // define a cor do prenchimenton
    ctx.fillRect(raquete.x, raquete.y, raquete.largura, raquete.altura)
    //desenhandoa bola
    ctx.beginPath()
    ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2)
    ctx.fillStyle = 'red' 
    ctx.fill()
    ctx.closePath()
}

// função qu8e roda o loop do jogo 
function loopDoJogo() {
    atualizar(); // Atualiza a lógica do jogo 
    desenhar();  // Desenha os elementos na tela
    //continia o looop enquanto o jogo não acabou
    if (!jogoAcabou){
        requestAnimationFrame(loopDoJogo) // chama o loop novamente no novo frama 
    }
}
// começa p jogo chamando o loop pela primeira vez  
loopDoJogo(); 
