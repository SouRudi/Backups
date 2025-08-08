const player = document.getElementById('player');
let posX = 0;
const velocidade = 5;

let andandoDireita = false;
let andandoEsquerda = false;

// Detecta quando tecla é pressionada
window.addEventListener('keydown', (e) => {
  if (e.key === 'd') andandoDireita = true;
  if (e.key === 'a') andandoEsquerda = true;
});

// Detecta quando tecla é solta
window.addEventListener('keyup', (e) => {
  if (e.key === 'd') andandoDireita = false;
  if (e.key === 'a') andandoEsquerda = false;
});

// Função que atualiza o movimento do player continuamente
function atualizar() {
  if (andandoDireita) posX += velocidade;
  if (andandoEsquerda) posX -= velocidade;

  player.style.left = posX + 'px';

  requestAnimationFrame(atualizar);
}

// Começa o loop
atualizar();
