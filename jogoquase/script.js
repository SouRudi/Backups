
const player = document.getElementById('player');
let posX = 300;
let posY = 0;
const velocidade = 5;


let andandoDireita = false;
let andandoEsquerda = false;
let naPrimeira = false;
let naUltima = false;






let vidas = 3;
const hearts = [
  document.getElementById('hh1'),
  document.getElementById('hh2'),
  document.getElementById('hh3')
];

function perdeVida() {
  vidas--;
  if (vidas >= 0 && hearts[vidas]) {
    hearts[vidas].style.visibility = 'hidden'; // Esconde um coração
  }
  if (vidas <= 0) {
    alert('Game Over!');
    // Reinicia vida e mostra os corações
    vidas = 3;
    hearts.forEach(h => h.style.visibility = 'visible');
  }
}





window.addEventListener('keydown', (e) => {
  if (e.key === 'd') andandoDireita = true;
  if (e.key === 'a') andandoEsquerda = true;
  if (e.key === 'w') naPrimeira = true;
  if (e.key === 's') naUltima = true;
});


window.addEventListener('keyup', (e) => {
  if (e.key === 'd') andandoDireita = false;
  if (e.key === 'a') andandoEsquerda = false;
  if (e.key === 'w') naPrimeira = false;
  if (e.key === 's') naUltima = false;
});

function atualizar() {


  if (andandoDireita){
    posX += velocidade;
    player.style.backgroundImage = "url('Walking_SteveR.png')";}
  if (andandoEsquerda){
    posX -= velocidade;
    player.style.backgroundImage = "url('Walking_SteveL.png')";}
  if (!andandoDireita && !andandoEsquerda) {
    player.style.backgroundImage = "url('steve.png')";}
  if( naUltima && andandoDireita) {
    player.style.backgroundImage = "url('Sneaking_SteveR.png')";}
  if( naUltima && andandoEsquerda) {
    player.style.backgroundImage = "url('Sneaking_SteveL.png')";}
  if( naUltima && !andandoDireita && !andandoEsquerda) {
    player.style.backgroundImage = "url('Sneaking_SteveR.png')";}


  // Limites da área do jogo
  const gameCont = document.querySelector('.game-cont');
  const gameWidth = gameCont.offsetWidth;
  const playerWidth = player.offsetWidth;
  // Limite esquerdo
  if (posX < 0) posX = 0;
  // Limite direito
  if (posX > gameWidth - playerWidth) posX = gameWidth - playerWidth;

  player.style.left = posX + 'px';

  // Atualiza a posição vertical do player conforme o estado das teclas
  if (naPrimeira) {
    player.style.bottom = '53%';
  } else if (naUltima) {
    player.style.bottom = '20%';
  } else {
    player.style.bottom = '37%'; // Volta para a plataforma do meio ao soltar 'w' ou 's'
  }


  requestAnimationFrame(atualizar);
}

atualizar();

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); });







