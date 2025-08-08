 const player = document.getElementById('player');
    const gameCont = document.querySelector('.game-cont');
    let posX = 300;
    const velocidade = 5;

    let andandoDireita = false;
    let andandoEsquerda = false;
    let naPrimeira = false;
    let naUltima = false;

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

    // --- Sistema de vidas ---
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
        // Reinicia as vidas e mostra os corações
        vidas = 3;
        hearts.forEach(h => (h.style.visibility = 'visible'));
      }
    }

    // --- Inimigos ---
    const inimigos = [];
    const inimigosImgs = ['fireball.png', 'tnt.png'];

    function criarInimigo() {
      const inimigo = document.createElement('div');
      inimigo.className = 'inimigo';
      const img = inimigosImgs[Math.floor(Math.random() * inimigosImgs.length)];
      inimigo.style.backgroundImage = `url('${img}')`;

      const gameWidth = gameCont.offsetWidth;
      const gameHeight = gameCont.offsetHeight;

      const borda = Math.floor(Math.random() * 4);

      let x, y, velX = 0, velY = 0;
      const speed = 4;

      switch (borda) {
        case 0: // topo -> desce
          x = Math.random() * (gameWidth - 40);
          y = 0;
          velX = 0;
          velY = speed;
          break;
        case 1: // direita -> esquerda
          x = gameWidth - 40;
          y = Math.random() * (gameHeight - 40);
          velX = -speed;
          velY = 0;
          break;
        case 2: // baixo -> cima
          x = Math.random() * (gameWidth - 40);
          y = gameHeight - 40;
          velX = 0;
          velY = -speed;
          break;
        case 3: // esquerda -> direita
          x = 0;
          y = Math.random() * (gameHeight - 40);
          velX = speed;
          velY = 0;
          break;
      }

      inimigo.style.left = x + 'px';
      inimigo.style.top = y + 'px';

      gameCont.appendChild(inimigo);

      inimigos.push({ el: inimigo, x, y, velX, velY, width: 40, height: 40 });
    }

    function colisao(a, b) {
      return !(
        a.x + a.width < b.x ||
        a.x > b.x + b.width ||
        a.y + a.height < b.y ||
        a.y > b.y + b.height
      );
    }

    function atualizarInimigos() {
      for (let i = inimigos.length - 1; i >= 0; i--) {
        let inim = inimigos[i];
        inim.x += inim.velX;
        inim.y += inim.velY;

        // Remove se sair da tela
        if (
          inim.x < -inim.width ||
          inim.x > gameCont.offsetWidth ||
          inim.y < -inim.height ||
          inim.y > gameCont.offsetHeight
        ) {
          inim.el.remove();
          inimigos.splice(i, 1);
          continue;
        }

        inim.el.style.left = inim.x + 'px';
        inim.el.style.top = inim.y + 'px';

        // Calcula posição real do player
        const playerRect = {
          x: posX,
          y:
            gameCont.offsetHeight -
            player.offsetHeight -
            (parseFloat(player.style.bottom) / 100) * gameCont.offsetHeight,
          width: player.offsetWidth,
          height: player.offsetHeight,
        };

        if (colisao(playerRect, inim)) {
          perdeVida();
          inim.el.remove();
          inimigos.splice(i, 1);
        }
      }
    }

    setInterval(criarInimigo, 500); // Cria inimigo a cada 2 segundos

    // --- Loop principal ---
    function atualizar() {
      if (andandoDireita) {
        posX += velocidade;
        player.style.backgroundImage = "url('Walking_SteveR.png')";
      }
      if (andandoEsquerda) {
        posX -= velocidade;
        player.style.backgroundImage = "url('Walking_SteveL.png')";
      }
      if (!andandoDireita && !andandoEsquerda) {
        player.style.backgroundImage = "url('steve.png')";
      }
      if (naUltima && andandoDireita) {
        player.style.backgroundImage = "url('Sneaking_SteveR.png')";
      }
      if (naUltima && andandoEsquerda) {
        player.style.backgroundImage = "url('Sneaking_SteveL.png')";
      }
      if (naUltima && !andandoDireita && !andandoEsquerda) {
        player.style.backgroundImage = "url('Sneaking_SteveR.png')";
      }

      const gameWidth = gameCont.offsetWidth;
      const playerWidth = player.offsetWidth;
      if (posX < 0) posX = 0;
      if (posX > gameWidth - playerWidth) posX = gameWidth - playerWidth;

      player.style.left = posX + 'px';

      if (naPrimeira) {
        player.style.bottom = '53%';
      } else if (naUltima) {
        player.style.bottom = '20%';
      } else {
        player.style.bottom = '37%';
      }

      // Atualiza inimigos e detecta colisões
      atualizarInimigos();

      requestAnimationFrame(atualizar);
    }

    atualizar();

    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });