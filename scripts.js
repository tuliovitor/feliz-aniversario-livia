/**
 * ================================================
 *  FELIZ ANIVERSÁRIO LÍVIA ✦  — scripts.js
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
      icon: '<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z" stroke="#c9a84c" stroke-width="1.2" stroke-linejoin="round"/></svg>',
    },
    {
      label: '02 / 03',
      titulo: 'Cada momento conta',
      texto: 'Cada conversa, mesmo as mais rápidas do dia a dia, ficou guardada em algum lugar. É isso que fazem as pessoas que importam.',
      icon: '<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="3" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="16" cy="8" rx="2.5" ry="5" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="16" cy="24" rx="2.5" ry="5" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="8" cy="16" rx="5" ry="2.5" stroke="#c9a84c" stroke-width="1.2"/><ellipse cx="24" cy="16" rx="5" ry="2.5" stroke="#c9a84c" stroke-width="1.2"/></svg>',
    },
    {
      label: '03 / 03',
      titulo: 'Deus sempre estará com você',
      texto: 'Além de Deus, eu estou aqui também para te encher o saco, julgar os erros do teu portfólio e teu curriculo, e te pedir atividade kkk. Mas sem brincadeira, estou aqui para o que você precisar.',
      icon: '<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 27C16 27 4 19 4 11C4 7.686 6.686 5 10 5C12.21 5 14.16 6.215 15.214 8.048C15.607 8.745 16.393 8.745 16.786 8.048C17.84 6.215 19.79 5 22 5C25.314 5 28 7.686 28 11C28 19 16 27 16 27Z" stroke="#c9a84c" stroke-width="1.2" stroke-linejoin="round"/></svg>',
    },
  ];

  cards.forEach((card, i) => {
    const c = CONTEUDOS[i];
    if (!c) return;
    const num = String(i + 1).padStart(2, '0');
    card.innerHTML =
      '<span class="card__number">' + num + '</span>' +
      '<div class="card__content">' +
        '<p class="card__label">' + c.label + '</p>' +
        '<div class="card__icon">' + c.icon + '</div>' +
        '<h2 class="card__title">' + c.titulo + '</h2>' +
        '<p class="card__text">' + c.texto + '</p>' +
      '</div>';
  });

  const totalPx = (cards.length - 1) * window.innerWidth;
  gsap.set(section, { height: (cards.length * 100) + 'vh' });

  const scrollAnim = gsap.to(track, {
    x: function() { return -totalPx; },
    ease: 'none',
    scrollTrigger: {
      id: 'slider',
      trigger: section,
      pin: pin,
      start: 'top top',
      end: function() { return '+=' + totalPx; },
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  cards.forEach(function(card) {
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

  polaroids.forEach(function(p) {
    const key = (p.className.match(/polaroid--(\d+)/) || [])[1] || '01';
    gsap.set(p, { opacity: 0, scale: 0.82, y: 28, rotation: ROT[key] != null ? ROT[key] : 0 });
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
      onUpdate: function(self) {
        pathEl.style.strokeDashoffset = String(totalLen * (1 - self.progress));
      },
    });
  }

  polaroids.forEach(function(p) {
    const key = (p.className.match(/polaroid--(\d+)/) || [])[1] || '01';
    gsap.to(p, {
      opacity: 1, scale: 1, y: 0, rotation: ROT[key] != null ? ROT[key] : 0,
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
  lines.forEach(function(l) { l.style.opacity = '1'; l.style.transform = 'translateX(0)'; });

  gsap.fromTo(envelope,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 75%', once: true }
    }
  );

  lines.forEach(function(line, i) {
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
   7. SURPRESA — botão Abrir Surpresa
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

  btn.addEventListener('touchend', function(e) {
    e.preventDefault();
    _touched = true;
    aoClicar();
    setTimeout(function() { _touched = false; }, 500);
  }, { passive: false });

  btn.addEventListener('click', function() {
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
    .map(function(p) { return '<span class="quote__word">' + p + '</span>'; })
    .join(' ');

  const spans = $$('.quote__word', quoteText);
  gsap.set(spans, { opacity: 0, y: 18 });

  gsap.to(spans, {
    opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.045,
    scrollTrigger: { trigger: section, start: 'top 65%', once: true },
  });
}


/* ══════════════════════════════════════
   9. CELEBRAÇÃO — Canvas fixo na tela
   Confetes + faíscas coloridas.
══════════════════════════════════════ */
var CELEBRACAO = {
  canvas: null,
  ctx: null,
  raf: null,
  particles: [],
  running: false,
  stopAt: 0,

  CORES: [
    '#F8A1D5','#c9a84c','#ff69b4','#ffd700',
    '#ff1493','#ffb6c1','#e75480','#ffffff',
    '#fce8f5','#e8cc80','#f5a0cc','#ffe4b5'
  ],

  init: function() {
    var old = document.getElementById('celeb-canvas');
    if (old) old.remove();
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'celeb-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '999999';
    this.canvas.style.display = 'block';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  },

  resize: function() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  rnd: function(a, b) { return a + Math.random() * (b - a); },
  pick: function(arr) { return arr[Math.floor(Math.random() * arr.length)]; },

  novoConfete: function() {
    var W = this.canvas.width, H = this.canvas.height;
    return {
      tipo: 'c',
      x: this.rnd(0, W), y: this.rnd(-H * 0.25, -5),
      w: this.rnd(7, 17), h: this.rnd(4, 11),
      cor: this.pick(this.CORES),
      vx: this.rnd(-2, 2), vy: this.rnd(3, 7),
      rot: this.rnd(0, Math.PI * 2), vrot: this.rnd(-0.15, 0.15),
      alpha: 1, decay: this.rnd(0.003, 0.008)
    };
  },

  novaFaisca: function() {
    var W = this.canvas.width, H = this.canvas.height;
    var ang = this.rnd(0, Math.PI * 2), vel = this.rnd(3, 8);
    return {
      tipo: 'f',
      x: this.rnd(W * 0.05, W * 0.95), y: this.rnd(H * 0.05, H * 0.6),
      r: this.rnd(3, 8), cor: this.pick(this.CORES),
      vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel - this.rnd(1, 3),
      alpha: 1, decay: this.rnd(0.02, 0.035), grav: 0.13
    };
  },

  disparar: function() {
    var self = this;
    if (!this.canvas) this.init();
    this.resize();
    cancelAnimationFrame(this.raf);
    this.particles = [];
    this.running = true;
    this.stopAt = Date.now() + 5000;

    for (var i = 0; i < 180; i++) {
      (function(idx) {
        setTimeout(function() {
          if (self.running) self.particles.push(self.novoConfete());
        }, idx * 20);
      })(i);
    }
    for (var b = 0; b < 8; b++) {
      (function(bi) {
        setTimeout(function() {
          if (!self.running) return;
          for (var j = 0; j < 25; j++) self.particles.push(self.novaFaisca());
        }, bi * 400);
      })(b);
    }
    this.loop();
  },

  loop: function() {
    var self = this;
    if (!this.running) return;
    var W = this.canvas.width, H = this.canvas.height;
    this.ctx.clearRect(0, 0, W, H);
    var vivas = [];
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
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
    this.raf = requestAnimationFrame(function() { self.loop(); });
  }
};


/* ══════════════════════════════════════
   10. FINAL — Faíscas hover + Auto-celebração por scroll
══════════════════════════════════════ */
function initFinal() {
  var wrap = $('final-portrait-wrap');
  var canvas = $('sparks-canvas');
  if (!wrap || !canvas) return;

  var ctx = canvas.getContext('2d');
  var rafId = null;
  var ativo = false;

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
    var W = canvas.offsetWidth || 300;
    var H = canvas.offsetHeight || 300;
    canvas.width = W; canvas.height = H;
    var sparks = [];
    for (var i = 0; i < 24; i++) {
      var a = (Math.PI * 2 / 24) * i;
      var s = Math.random() * 4 + 2;
      sparks.push({
        x: W / 2, y: H / 2, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        opacity: 1, size: Math.random() * 3 + 2,
        color: Math.random() > .4 ? '#c9a84c' : '#e8cc80'
      });
    }
    function loop() {
      ctx.clearRect(0, 0, W, H);
      var alive = false;
      for (var j = 0; j < sparks.length; j++) {
        var sp = sparks[j];
        sp.x += sp.vx; sp.y += sp.vy; sp.opacity -= .022; sp.size *= .975;
        if (sp.opacity <= 0) continue;
        alive = true;
        ctx.save();
        ctx.globalAlpha = sp.opacity; ctx.fillStyle = sp.color;
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = sp.opacity * .3;
        ctx.beginPath(); ctx.arc(sp.x - sp.vx * .5, sp.y - sp.vy * .5, sp.size * 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
      if (!alive) { ctx.clearRect(0, 0, W, H); ativo = false; return; }
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
  wrap.addEventListener('touchstart', function() {
    iniciarFaiscas();
    setTimeout(pararFaiscas, 1200);
  }, { passive: true });

  var btnCelebrar = $('btn-celebrar');
  if (btnCelebrar) {
    var _touched = false;
    btnCelebrar.addEventListener('touchend', function(e) {
      e.preventDefault(); _touched = true;
      CELEBRACAO.disparar();
      setTimeout(function() { _touched = false; }, 500);
    }, { passive: false });
    btnCelebrar.addEventListener('click', function() {
      if (_touched) return;
      CELEBRACAO.disparar();
    });
  }

  ScrollTrigger.create({
    trigger: wrap,
    start: 'top 65%',
    once: true,
    onEnter: function() {
      setTimeout(function() { CELEBRACAO.disparar(); }, 700);
    }
  });
}


/* ══════════════════════════════════════
   11. COUNTDOWN — CORRIGIDO v9
   
   PROBLEMA: requestAnimationFrame para quando a aba fica
   em background no mobile. O browser suspende o rAF,
   e ao retornar o "ultimoSegundo" pode coincidir com
   o segundo atual, travando o tick para sempre em 00:00.
   
   SOLUÇÃO: setInterval(atualizar, 1000) — robusto,
   funciona em background, atualiza a cada 1 segundo real.
   
   LÓGICA DE DATAS (JavaScript Date — mês 0-indexed):
   - MES_NASC = 2 → março
   - Hoje 16/03/2026: not aniversário → conta para 15/03/2027 (18 anos)
   - Em 15/03/2027: mostra 00:00... e msg de parabéns
══════════════════════════════════════ */
function initCountdown() {
  var EL = {
    anos:     $('cd-anos'),
    meses:    $('cd-meses'),
    semanas:  $('cd-semanas'),
    dias:     $('cd-dias'),
    horas:    $('cd-horas'),
    minutos:  $('cd-minutos'),
    segundos: $('cd-segundos'),
    msg:      $('countdown-msg')
  };
  if (!EL.segundos) return;

  var ANO_NASC = 2009;
  var MES_NASC = 2;   // março: jan=0, fev=1, mar=2
  var DIA_NASC = 15;

  function p2(n) {
    return String(Math.max(0, n)).padStart('2', '0');
  }

  function eHojeOAniversario() {
    var now = new Date();
    return now.getMonth() === MES_NASC && now.getDate() === DIA_NASC;
  }

  function calcularAlvo() {
    var now = new Date();
    var ano = now.getFullYear();
    if (eHojeOAniversario()) {
      return new Date(ano + 1, MES_NASC, DIA_NASC, 0, 0, 0, 0);
    }
    var alvo = new Date(ano, MES_NASC, DIA_NASC, 0, 0, 0, 0);
    if (now >= alvo) {
      alvo = new Date(ano + 1, MES_NASC, DIA_NASC, 0, 0, 0, 0);
    }
    return alvo;
  }

  function atualizar() {
    var now = new Date();

    if (eHojeOAniversario()) {
      var idadeHoje = now.getFullYear() - ANO_NASC;
      EL.anos.textContent     = '00';
      EL.meses.textContent    = '00';
      EL.semanas.textContent  = '00';
      EL.dias.textContent     = '00';
      EL.horas.textContent    = '00';
      EL.minutos.textContent  = '00';
      EL.segundos.textContent = '00';
      if (EL.msg) EL.msg.textContent = '🎉 Feliz ' + idadeHoje + '° Aniversário, Lívia! 🎉';
      return;
    }

    var alvo = calcularAlvo();
    var diff = alvo - now;
    var idade = alvo.getFullYear() - ANO_NASC;

    if (diff <= 0) {
      EL.anos.textContent = EL.meses.textContent = EL.semanas.textContent =
      EL.dias.textContent = EL.horas.textContent = EL.minutos.textContent =
      EL.segundos.textContent = '00';
      return;
    }

    var totalSegundos = Math.floor(diff / 1000);
    var totalMinutos  = Math.floor(totalSegundos / 60);
    var totalHoras    = Math.floor(totalMinutos / 60);
    var totalDias     = Math.floor(totalHoras / 24);

    var anos         = Math.floor(totalDias / 365);
    var diasAposAnos = totalDias % 365;
    var meses        = Math.floor(diasAposAnos / 30);
    var diasAposMeses = diasAposAnos % 30;
    var semanas      = Math.floor(diasAposMeses / 7);
    var diasSob      = diasAposMeses % 7;
    var horas        = totalHoras % 24;
    var minutos      = totalMinutos % 60;
    var segundos     = totalSegundos % 60;

    EL.anos.textContent     = p2(anos);
    EL.meses.textContent    = p2(meses);
    EL.semanas.textContent  = p2(semanas);
    EL.dias.textContent     = p2(diasSob);
    EL.horas.textContent    = p2(horas);
    EL.minutos.textContent  = p2(minutos);
    EL.segundos.textContent = p2(segundos);

    if (EL.msg) EL.msg.textContent = 'Para o seu próximo aniversário de ' + idade + ' anos!!!';
  }

  // Executa imediatamente + a cada 1 segundo via setInterval (robusto em background)
  atualizar();
  setInterval(atualizar, 1000);

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
document.addEventListener('DOMContentLoaded', function() {
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

  window.addEventListener('resize', function() {
    CELEBRACAO.resize();
    if (lenis) lenis.resize();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
});
