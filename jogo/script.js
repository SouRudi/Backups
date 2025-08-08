
const player = document.getElementById('player');
let posX = 300;
let posY = 0;
const velocidade = 5;

let andandoDireita = false;
let andandoEsquerda = false;

window.addEventListener('keydown', (e) => {
  if (e.key === 'd') andandoDireita = true;
  if (e.key === 'a') andandoEsquerda = true;
  if (e.key === 'w'){
    player.style.bottom = 67 + '%'; 
  }
  if (e.key === 's'){
    player.style.bottom = 47 + '%';
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'd') andandoDireita = false;
  if (e.key === 'a') andandoEsquerda = false;
});

function atualizar() {
  if (andandoDireita) posX += velocidade;
  if (andandoEsquerda) posX -= velocidade;

  player.style.left = posX + 'px';

  requestAnimationFrame(atualizar);
}

atualizar();

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); });
