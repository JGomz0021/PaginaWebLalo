/**
 * script.js – Partículas flotantes para el póster del Gavilán
 * Simula polvo dorado y pequeñas hojas flotando
 */

(function () {
  const canvas  = document.getElementById('particles-canvas');
  const poster  = document.querySelector('.poster');
  if (!canvas || !poster) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  /* ── Ajusta tamaño del canvas al poster ── */
  function resize() {
    const rect = poster.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
  }

  /* ── Clase partícula ── */
  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : H + 10;
      this.r    = Math.random() * 2.5 + 0.5;
      this.vx   = (Math.random() - 0.5) * 0.4;
      this.vy   = -(Math.random() * 0.5 + 0.15);   // sube lentamente
      this.alpha = Math.random() * 0.55 + 0.15;
      this.life  = 1;
      this.decay = Math.random() * 0.0008 + 0.0003;
      // dorado o verde claro
      const hue  = Math.random() < 0.6 ? `47, ${Math.floor(Math.random()*20+149)}, 42` : `90, ${Math.floor(Math.random()*30+130)}, 50`;
      this.color = hue;
    }

    update() {
      this.x    += this.vx + Math.sin(Date.now() * 0.001 + this.y * 0.02) * 0.2;
      this.y    += this.vy;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < -10) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * this.life;
      ctx.fillStyle   = `rgb(${this.color})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Inicializa partículas ── */
  function init() {
    resize();
    particles = Array.from({ length: 65 }, () => new Particle());
  }

  /* ── Loop de animación ── */
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  /* ── Resize observer ── */
  const ro = new ResizeObserver(() => {
    resize();
    particles.forEach(p => p.reset(true));
  });
  ro.observe(poster);

  /* ── Arranca ── */
  init();
  loop();
})();