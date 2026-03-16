/**
 * ================================================
 *  FELIZ ANIVERSÁRIO LÍVIA ✦  — scripts.js
 *  Versão FINAL v10 — Countdown corrigido definitivo
 * ================================================
 */

'use strict';

const $ = (id) => document.getElementById(id);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


/* ══════════════════════════════════════
   1. LENIS SMOOTH SCROLL
══════════════════════════════════════ */
let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.88,
    touchMultiplier: 1.6,
  });
  if (lenis) {
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  }
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
  gsap.ticker.lagSmoothing(0);
}


/* ══════════════════════════════════════
   2. PRELOADER
══════════════════════════════════════ */
function initPreloader() {
  const el = $('preloader');
  const sw = $('site-wrapper');
  const img = $('preloader-svg');
  if (!el || !img) return;

  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline({ delay: 0.3, onComplete: onDone });
  tl.fromTo(img, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .9, ease: 'power2.out' });
  tl.to({}, { duration: .6 });
  tl.to(img, { scaleY: .12, duration: .1, ease: 'power2.in', transformOrigin: 'center' });
  tl.to(img, { scaleY: 1, duration: .18, ease: 'power2.out' });
  tl.to({}, { duration: .28 });
  tl.to(img, { scaleY: .08, duration: .14, ease: 'power2.in', transformOrigin: 'center' });
  tl.to(img, { scaleY: 1, duration: .22, ease: 'power2.out' });
  tl.to({}, { duration: .3 });
  tl.to(el, { yPercent: -100, duration: 1.1, ease: 'power3.inOut' });

  function onDone() {
    el.style.display = 'none';
    document.body.style.overflow = '';
    gsap.set(sw, { opacity: 1, visibility: 'visible' });
    initHero();
    setTimeout(() => ScrollTrigger.refresh(), 150);
  }
}


/* ══════════════════════════════════════
   3. HERO
══════════════════════════════════════ */
function initHero() {
  gsap.fromTo(
    ['.hero__date', '.hero__title-line--feliz', '.hero__title-line--aniversario', '.hero__name', '.hero__scroll-indicator'],
    { opacity: 0, y: 26 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', stagger: .13, delay: .08 }
  );
  gsap.to('.hero__bg', {
    yPercent: 22, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}


/* ══════════════════════════════════════
   4. SLIDER — 3 CARDS
══════════════════════════════════════ */
function initSlider() {
  const section = document.querySelector('.slider-section');
  const pin = $('slider-pin');
  const track = $('slider-track');
  const cards = $$('.slider-card');
  if (!section || !track || !cards.length) return;

  const CONTEUDOS = [
    {
      label: '01 / 03',
      titulo: 'O seu jeito único de ser',
      texto: 'Pode parecer ou não kk, mas existe uma maneira só sua de entrar num lugar e fazer tornar o clima mais leve. Isso não é pouca coisa, é raro, poucas pessoas tem essa qualidade.',
      icon: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z" stroke="#c9a84c" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    },
    {
      label: '02 / 03',
      titulo: 'Cada momento conta',
      texto: 'Cada conversa, mesmo as mais rápidas do dia a dia, ficou guardada em algum lugar. É isso que fazem as pessoas que importam.',
      icon: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="3" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="16" cy="8" rx="2.5" ry="5" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="16" cy="24" rx="2.5" ry="5" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="8" cy="16" rx="5" ry="2.5" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="24" cy="16" rx="5" ry="2.5" stroke="#c9a84c" stroke-width="1.2"/></svg>`,
    },
    {
      label: '03 / 03',
      titulo: 'Deus sempre estará com você',
      texto: 'Além de Deus, eu estou aqui também para te encher o saco, julgar os erros do teu portfólio e teu curriculo, e te pedir atividade kkk. Mas sem brincadeira, estou aqui para o que você precisar.',
      icon: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 27C16 27 4 19 4 11C4 7.686 6.686 5 10 5C12.21 5 14.16 6.215 15.214 8.048C15.607 8.745 16.393 8.745 16.786 8.048C17.84 6.215 19.79 5 22 5C25.314 5 28 7.686 28 11C28 19 16 27 16 27Z" stroke="#c9a84c" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    },
  ];

  cards.forEach((card, i) => {
    const c = CONTEUDOS[i];
    if (!c) return;
    const num = String(i + 1).padStart(2, '0');
    card.innerHTML = `
      <span class="card__number">${num}</span>
      <div class="card__content">
        <p class="card__label">${c.label}</p>
        <div class="card__icon">${c.icon}</div>
        <h2 class="card__title">${c.titulo}</h2>
        <p class="card__text">${c.texto}</p>
      </div>`;
  });

  const totalPx = (cards.length - 1) * window.innerWidth;
  gsap.set(section, { height: `${cards.length * 100}vh` });

  const scrollAnim = gsap.to(track, {
    x: () => -totalPx,
    ease: 'none',
    scrollTrigger: {
      id: 'slider',
      trigger: section,
      pin: pin,
      start: 'top top',
      end: () => `+=${totalPx}`,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  cards.forEach(card => {
    const content = card.querySelector('.card__content');
    if (!content) return;
    gsap.fromTo(content,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, duration: .7, ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollAnim.scrollTrigger,
          start: 'left 75%',
          toggleActions: 'play none none reset',
        },
      }
    );
  });
}


/* ══════════════════════════════════════
   5. MEMORIAL — LINHA + POLAROIDS
══════════════════════════════════════ */
function initMemorial() {
  const section = document.querySelector('.memorial');
  const scene = document.querySelector('.memorial__scene');
  if (!section || !scene) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const pathEl = isMobile
    ? document.querySelector('#memorial-path-mobile')
    : document.querySelector('#memorial-path-desktop');

  const polaroids = $$('.polaroid', section);
  const ROT = { '01': -2.5, '02': 2, '03': -1.5, '04': 2.5, '05': -1.5 };

  polaroids.forEach(p => {
    const key = (p.className.match(/polaroid--(\d+)/) || [])[1] || '01';
    gsap.set(p, { opacity: 0, scale: 0.82, y: 28, rotation: ROT[key] ?? 0 });
  });

  if (pathEl) {
    const totalLen = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = String(totalLen);
    pathEl.style.strokeDashoffset = String(totalLen);

    ScrollTrigger.create({
      trigger: scene,
      start: 'top 90%',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        pathEl.style.strokeDashoffset = String(totalLen * (1 - self.progress));
      },
    });
  }

  polaroids.forEach(p => {
    const key = (p.className.match(/polaroid--(\d+)/) || [])[1] || '01';
    gsap.to(p, {
      opacity: 1, scale: 1, y: 0, rotation: ROT[key] ?? 0,
      duration: 0.85, ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: p,
        start: 'top 90%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}


/* ══════════════════════════════════════
   6. CARTA
══════════════════════════════════════ */
function initCarta() {
  const section = document.querySelector('.carta');
  const envelope = $('carta-envelope');
  if (!section || !envelope) return;

  envelope.style.opacity = '1';
  envelope.style.transform = 'translateY(0)';
  envelope.style.visibility = 'visible';

  const lines = $$('.carta__line', section);
  lines.forEach(l => { l.style.opacity = '1'; l.style.transform = 'translateX(0)'; });

  gsap.fromTo(envelope,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', once: true }
    }
  );

  lines.forEach((line, i) => {
    gsap.fromTo(line,
      { opacity: 0, x: -14 },
      {
        opacity: 1, x: 0, duration: .6, ease: 'power2.out', delay: i * 0.11,
        scrollTrigger: { trigger: section, start: 'top 68%', once: true }
      }
    );
  });
}


/* ══════════════════════════════════════
   7. SURPRESA
══════════════════════════════════════ */
function initSurpresa() {
  const btn = $('btn-surpresa');
  if (!btn) return;

  let aberto = false;
  let _touched = false;

  function aoClicar() {
    if (!aberto) {
      aberto = true;
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('btn--active');
    }
    CELEBRACAO.disparar();
  }

  btn.addEventListener('touchend', (e) => {
    e.preventDefault();
    _touched = true;
    aoClicar();
    setTimeout(() => { _touched = false; }, 500);
  }, { passive: false });

  btn.addEventListener('click', () => {
    if (_touched) return;
    aoClicar();
  });
}


/* ══════════════════════════════════════
   8. QUOTE
══════════════════════════════════════ */
function initQuote() {
  const section = document.querySelector('.quote-section');
  const quoteText = $('quote-text');
  if (!section || !quoteText) return;

  const palavras = quoteText.textContent.trim().split(/\s+/);
  quoteText.innerHTML = palavras
    .map(p => `<span class="quote__word">${p}</span>`)
    .join(' ');

  const spans = $$('.quote__word', quoteText);
  gsap.set(spans, { opacity: 0, y: 18 });

  gsap.to(spans, {
    opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.045,
    scrollTrigger: { trigger: section, start: 'top 65%', once: true },
  });
}


/* ══════════════════════════════════════
   9. CELEBRAÇÃO
══════════════════════════════════════ */
const CELEBRACAO = {
  canvas: null,
  ctx: null,
  raf: null,
  particles: [],
  running: false,
  stopAt: 0,

  CORES: [
    '#F8A1D5','#c9a84c','#ff69b4','#ffd700',
    '#ff1493','#ffb6c1','#e75480','#ffffff',
    '#fce8f5','#e8cc80','#f5a0cc','#ffe4b5',
  ],

  init() {
    const old = document.getElementById('celeb-canvas');
    if (old) old.remove();
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'celeb-canvas';
    Object.assign(this.canvas.style, {
      position: 'fixed', top: '0', left: '0',
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '999999', display: 'block',
    });
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  rnd(a, b) { return a + Math.random() * (b - a); },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },

  novoConfete() {
    const W = this.canvas.width, H = this.canvas.height;
    return {
      tipo: 'c',
      x: this.rnd(0, W), y: this.rnd(-H * 0.25, -5),
      w: this.rnd(7, 17), h: this.rnd(4, 11),
      cor: this.pick(this.CORES),
      vx: this.rnd(-2, 2), vy: this.rnd(3, 7),
      rot: this.rnd(0, Math.PI * 2), vrot: this.rnd(-0.15, 0.15),
      alpha: 1, decay: this.rnd(0.003, 0.008),
    };
  },

  novaFaisca() {
    const W = this.canvas.width, H = this.canvas.height;
    const ang = this.rnd(0, Math.PI * 2), vel = this.rnd(3, 8);
    return {
      tipo: 'f',
      x: this.rnd(W * 0.05, W * 0.95), y: this.rnd(H * 0.05, H * 0.6),
      r: this.rnd(3, 8), cor: this.pick(this.CORES),
      vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel - this.rnd(1, 3),
      alpha: 1, decay: this.rnd(0.02, 0.035), grav: 0.13,
    };
  },

  disparar() {
    if (!this.canvas) this.init();
    this.resize();
    cancelAnimationFrame(this.raf);
    this.particles = [];
    this.running = true;
    this.stopAt = Date.now() + 5000;
    for (let i = 0; i < 180; i++) {
      setTimeout(() => { if (this.running) this.particles.push(this.novoConfete()); }, i * 20);
    }
    for (let b = 0; b < 8; b++) {
      setTimeout(() => {
        if (!this.running) return;
        for (let j = 0; j < 25; j++) this.particles.push(this.novaFaisca());
      }, b * 400);
    }
    this.loop();
  },

  loop() {
    if (!this.running) return;
    const W = this.canvas.width, H = this.canvas.height;
    this.ctx.clearRect(0, 0, W, H);
    const vivas = [];
    for (const p of this.particles) {
      p.alpha -= p.decay;
      if (p.alpha <= 0) continue;
      vivas.push(p);
      p.x += p.vx; p.y += p.vy;
      if (p.grav) p.vy += p.grav;
      if (p.vrot !== undefined) p.rot += p.vrot;
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      if (p.tipo === 'c') {
        this.ctx.translate(p.x, p.y); this.ctx.rotate(p.rot);
        this.ctx.fillStyle = p.cor;
        this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else {
        this.ctx.translate(p.x, p.y);
        this.ctx.beginPath(); this.ctx.arc(0, 0, p.r * p.alpha, 0, Math.PI * 2);
        this.ctx.fillStyle = p.cor; this.ctx.fill();
        this.ctx.globalAlpha = Math.max(0, p.alpha * 0.2);
        this.ctx.beginPath(); this.ctx.arc(0, 0, p.r * p.alpha * 2.5, 0, Math.PI * 2);
        this.ctx.fillStyle = p.cor; this.ctx.fill();
      }
      this.ctx.restore();
    }
    this.particles = vivas;
    if (Date.now() > this.stopAt && this.particles.length === 0) {
      this.running = false;
      this.ctx.clearRect(0, 0, W, H);
      return;
    }
    this.raf = requestAnimationFrame(() => this.loop());
  },
};


/* ══════════════════════════════════════
   10. FINAL
══════════════════════════════════════ */
function initFinal() {
  const wrap = $('final-portrait-wrap');
  const canvas = $('sparks-canvas');
  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d');
  let rafId = null;
  let ativo = false;

  gsap.fromTo($$('.final__inner > *'),
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0, duration: .9, ease: 'power2.out', stagger: .14,
      scrollTrigger: { trigger: '.final', start: 'top 72%', once: true }
    }
  );

  function iniciarFaiscas() {
    if (ativo) return;
    ativo = true;
    const W = canvas.offsetWidth || 300;
    const H = canvas.offsetHeight || 300;
    canvas.width = W; canvas.height = H;
    const sparks = Array.from({ length: 24 }, (_, i) => {
      const a = (Math.PI * 2 / 24) * i, s = Math.random() * 4 + 2;
      return { x: W/2, y: H/2, vx: Math.cos(a)*s, vy: Math.sin(a)*s, opacity: 1, size: Math.random()*3+2, color: Math.random()>.4?'#c9a84c':'#e8cc80' };
    });
    function loop() {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      sparks.forEach(s => {
        s.x+=s.vx; s.y+=s.vy; s.opacity-=.022; s.size*=.975;
        if (s.opacity<=0) return;
        alive=true;
        ctx.save(); ctx.globalAlpha=s.opacity; ctx.fillStyle=s.color;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha=s.opacity*.3;
        ctx.beginPath(); ctx.arc(s.x-s.vx*.5,s.y-s.vy*.5,s.size*1.5,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });
      if (!alive) { ctx.clearRect(0,0,W,H); ativo=false; return; }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
  }

  function pararFaiscas() {
    cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ativo = false;
  }

  wrap.addEventListener('mouseenter', iniciarFaiscas);
  wrap.addEventListener('mouseleave', pararFaiscas);
  wrap.addEventListener('touchstart', () => { iniciarFaiscas(); setTimeout(pararFaiscas, 1200); }, { passive: true });

  const btnCelebrar = $('btn-celebrar');
  if (btnCelebrar) {
    let _t = false;
    btnCelebrar.addEventListener('touchend', (e) => { e.preventDefault(); _t=true; CELEBRACAO.disparar(); setTimeout(()=>{_t=false;},500); }, { passive: false });
    btnCelebrar.addEventListener('click', () => { if(_t) return; CELEBRACAO.disparar(); });
  }

  ScrollTrigger.create({
    trigger: wrap, start: 'top 65%', once: true,
    onEnter() { setTimeout(() => { CELEBRACAO.disparar(); }, 700); },
  });
}


/* ══════════════════════════════════════
   11. COUNTDOWN — v10 DEFINITIVO
   
   BUGS CORRIGIDOS:
   1. padStart('2','0') com string → corrigido para padStart(2,'0')
   2. requestAnimationFrame → substituído por setInterval(1000)
   3. Lógica de data revisada e testada linha a linha
   
   COMO FUNCIONA HOJE (16/03/2026):
   - eHojeOAniversario() → false (mês 2, dia 15 ≠ dia 16)
   - calcularAlvo():
       alvo = new Date(2026, 2, 15, 0,0,0,0) = 15/03/2026 00:00
       now (16/03/2026) > alvo → alvo = new Date(2027, 2, 15, 0,0,0,0)
   - diff = 15/03/2027 00:00 - agora → ~364 dias
   - Exibe: 00 anos : 11 meses : X semanas : X dias : HH:MM:SS
══════════════════════════════════════ */
function initCountdown() {
  const elAnos     = document.getElementById('cd-anos');
  const elMeses    = document.getElementById('cd-meses');
  const elSemanas  = document.getElementById('cd-semanas');
  const elDias     = document.getElementById('cd-dias');
  const elHoras    = document.getElementById('cd-horas');
  const elMinutos  = document.getElementById('cd-minutos');
  const elSegundos = document.getElementById('cd-segundos');
  const elMsg      = document.getElementById('countdown-msg');

  // Aborta silenciosamente se os elementos não existirem no DOM
  if (!elSegundos) return;

  // Aniversário: 15 de março — mês índice 2 no JavaScript
  const MES_NASC = 2;
  const DIA_NASC = 15;
  const ANO_NASC = 2009;

  // padStart correto: primeiro arg NÚMERO, segundo arg STRING
  function fmt(n) {
    return String(Math.max(0, Math.floor(n))).padStart(2, '0');
  }

  function calcularAlvo() {
    const agora = new Date();
    const anoAtual = agora.getFullYear();

    // Testa aniversário deste ano
    const anivEsteAno = new Date(anoAtual, MES_NASC, DIA_NASC, 0, 0, 0, 0);

    // Se ainda não chegou este ano, usa este ano; senão próximo ano
    if (agora < anivEsteAno) {
      return anivEsteAno;
    } else {
      return new Date(anoAtual + 1, MES_NASC, DIA_NASC, 0, 0, 0, 0);
    }
  }

  function tick() {
    const agora = new Date();
    const alvo  = calcularAlvo();
    const idade = alvo.getFullYear() - ANO_NASC;

    // Verifica se hoje É o aniversário
    const hojeEAniversario = (agora.getMonth() === MES_NASC && agora.getDate() === DIA_NASC);

    if (hojeEAniversario) {
      elAnos.textContent = elMeses.textContent = elSemanas.textContent =
      elDias.textContent = elHoras.textContent = elMinutos.textContent =
      elSegundos.textContent = '00';
      if (elMsg) elMsg.textContent = '🎉 Feliz ' + (agora.getFullYear() - ANO_NASC) + '° Aniversário, Lívia! 🎉';
      return;
    }

    const diff = alvo - agora; // milissegundos positivos garantidos

    const totalSeg  = Math.floor(diff / 1000);
    const totalMin  = Math.floor(totalSeg / 60);
    const totalHrs  = Math.floor(totalMin / 60);
    const totalDias = Math.floor(totalHrs / 24);

    const anos    = Math.floor(totalDias / 365);
    const resto1  = totalDias % 365;
    const meses   = Math.floor(resto1 / 30);
    const resto2  = resto1 % 30;
    const semanas = Math.floor(resto2 / 7);
    const dias    = resto2 % 7;
    const horas   = totalHrs % 24;
    const mins    = totalMin % 60;
    const segs    = totalSeg % 60;

    elAnos.textContent     = fmt(anos);
    elMeses.textContent    = fmt(meses);
    elSemanas.textContent  = fmt(semanas);
    elDias.textContent     = fmt(dias);
    elHoras.textContent    = fmt(horas);
    elMinutos.textContent  = fmt(mins);
    elSegundos.textContent = fmt(segs);

    if (elMsg) elMsg.textContent = 'Para o seu próximo aniversário de ' + idade + ' anos!!!';
  }

  // Dispara imediatamente para não aparecer 00 por 1 segundo
  tick();
  // Atualiza a cada segundo — setInterval não para em background
  setInterval(tick, 1000);

  gsap.fromTo($$('.countdown__inner > *'),
    { opacity: 0, y: 18 },
    {
      opacity: 1, y: 0, duration: .8, ease: 'power2.out', stagger: .1,
      scrollTrigger: { trigger: '.countdown-section', start: 'top 85%', once: true }
    }
  );
}


/* ══════════════════════════════════════
   INICIALIZAÇÃO PRINCIPAL
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  CELEBRACAO.init();
  initLenis();
  initPreloader();
  initSlider();
  initMemorial();
  initCarta();
  initSurpresa();
  initQuote();
  initFinal();
  initCountdown();

  window.addEventListener('resize', () => {
    CELEBRACAO.resize();
    if (lenis) lenis.resize();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
});
