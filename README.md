<div align="center">

# 🎂 Feliz Aniversário, Lívia ✦

**Site-surpresa personalizado entregue em mãos no dia do aniversário — 15/03/2026.**

![Preview Desktop](./assets/preview-desktop.png)

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Lenis-000000?style=for-the-badge)](https://lenis.darkroom.engineering/)

</div>

---

## 📌 Sobre o projeto

O **Feliz Aniversário, Lívia** é um site-surpresa desenvolvido do zero para presentear uma amiga no dia do seu aniversário. Não é um projeto de portfólio criado para fins técnicos — foi construído com um objetivo real e humano: gerar impacto emocional genuíno, e funcionou.

O site guia o visitante por oito seções em sequência: hero com collage de fotos, slider horizontal de mensagens, galeria de polaroids com linha SVG animada, carta pessoal, seção de surpresa com confetes, quote palavra a palavra, seção final com faíscas douradas e um countdown em tempo real até o próximo aniversário.

---

## 🎬 Demonstração

| Desktop | Mobile |
|---|---|
| ![Desktop](./assets/preview-desktop.png) | ![Mobile](./assets/preview-mobile.jpg) |

---

## ✨ Funcionalidades

- **Hero com collage de fotos reais** — fundo com fotos da aniversariante compostas em grid, tipografia mista (Playfair Display + Great Vibes + Cormorant Garamond) e parallax de scroll na imagem de fundo via GSAP
- **Slider horizontal pinado** — 3 cards de mensagens pessoais com navegação por scroll, seção com `height: 300vh`, container pintado via ScrollTrigger e conteúdo injetado via JS a partir de um array de dados
- **Galeria memorial com SVG path** — linha desenhada via `strokeDashoffset` sincronizada com o scroll, 5 polaroids com rotações fixas por `data-key` e entrada com `back.out(1.4)` no GSAP
- **Carta pessoal com entrada escalonada** — envelope e linhas da carta revelados progressivamente via `scrollTrigger`, cada `<p>` com delay calculado por índice
- **Countdown em tempo real** — calcula anos, meses, semanas, dias, horas, minutos e segundos até o próximo aniversário usando `requestAnimationFrame`, com detecção de "hoje é o aniversário" que zera tudo e exibe mensagem especial
- **Preloader com efeito de piscada** — dois blinks animados via timeline GSAP com `scaleY` antes do slide de saída em `yPercent: -100`, e `overflow: hidden` no `<body>` durante o carregamento

---

## 🧱 Stack

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | 8 seções, SVGs inline, canvas, tipografia Google Fonts |
| CSS3 | Layout responsivo desktop/mobile, glassmorphism na carta, polaroids com bordas e sombras |
| JavaScript vanilla | Toda a lógica de animação, canvas, countdown e geração de conteúdo do slider |
| GSAP 3 + ScrollTrigger | Animações de entrada, parallax, slider horizontal pinado, reveal de polaroids e carta |
| Lenis | Smooth scroll integrado ao ticker do GSAP via `gsap.ticker.add` |

---

## 🗂️ Estrutura do projeto

```
feliz-aniversario-livia/
├── index.html         # 8 seções, SVG paths mobile/desktop, canvas, HTML estático
├── scripts.js         # 10 módulos init + sistema CELEBRACAO + countdown
├── styles.css         # Layout responsivo, tipografia, polaroids, glassmorphism
└── assets/
    ├── preloader-rosa-claro.svg
    ├── liviafs-polaroid01.jpg … polaroid05.png
    ├── preview-desktop.png
    └── preview-mobile.jpg
```

---

## 🧠 Decisões técnicas

### Conteúdo do slider injetado via JS, não escrito no HTML

Os três cards do slider horizontal existem no HTML como elementos vazios com `data-card="01/02/03"`. O texto, ícone SVG e label de cada card são definidos em um array de objetos no JS e injetados via `innerHTML` no `DOMContentLoaded`:

```javascript
const CONTEUDOS = [
  { label: '01 / 03', titulo: 'O seu jeito único de ser', texto: '...', icon: `<svg...>` },
  // ...
];

cards.forEach((card, i) => {
  card.innerHTML = `
    <span class="card__number">${num}</span>
    <div class="card__content">...</div>`;
});
```

Isso significa que editar qualquer mensagem é uma mudança em um único objeto no JS, sem mexer no HTML. Para um projeto pessoal onde o conteúdo pode mudar até o momento de entrega, essa separação entre estrutura e dados foi a decisão certa.

---

### SVG path duplo: versão mobile e desktop separadas no HTML

A seção memorial tem dois SVGs completos no HTML — um para mobile (`max-width: 767px`) e outro para desktop — em vez de um único SVG responsivo. O JS detecta qual está ativo via `window.matchMedia` e aplica a animação de `strokeDashoffset` no path correto:

```javascript
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const pathEl = isMobile
  ? document.querySelector('#memorial-path-mobile')
  : document.querySelector('#memorial-path-desktop');
```

A razão é que os dois paths têm formas, proporções e curvas completamente diferentes — um SVG único com viewBox responsivo deformaria as curvas ou desalinharia os polaroids. Ter dois paths separados permite controle total sobre o traçado em cada breakpoint.

---

### Sistema CELEBRACAO como objeto literal com estado próprio

O sistema de confetes e faíscas não é uma função isolada — é um objeto literal com métodos e estado interno (`canvas`, `ctx`, `particles`, `running`, `stopAt`):

```javascript
const CELEBRACAO = {
  canvas: null, ctx: null, particles: [], running: false, stopAt: 0,
  init() { /* cria canvas fixo */ },
  resize() { /* atualiza dimensões */ },
  disparar() { /* lança 180 confetes + 8 bursts */ },
  loop() { /* rAF loop com alpha decay */ },
};
```

Isso permite chamar `CELEBRACAO.disparar()` de qualquer ponto do código sem precisar passar referências. O `resize()` é chamado tanto no init quanto no evento de `resize` da janela — o canvas fixo precisa acompanhar mudanças de orientação no mobile.

---

### Auto-celebração via ScrollTrigger com `once: true`

A versão final removeu os botões "Abrir Surpresa" e "Celebrar de Novo" — a celebração dispara automaticamente quando o polaroid da seção final entra na viewport:

```javascript
ScrollTrigger.create({
  trigger: wrap,       // #final-portrait-wrap
  start: 'top 65%',
  once: true,
  onEnter() {
    setTimeout(() => { CELEBRACAO.disparar(); }, 700);
  },
});
```

O delay de 700ms existe para que a animação de entrada dos elementos da seção comece antes de os confetes cobrirem a tela. `once: true` garante que a explosão não repete a cada vez que o usuário rola para cima e para baixo — dispara uma vez e pronto. Essa foi uma mudança deliberada de UX: o impacto emocional é maior quando a surpresa acontece sozinha, sem precisar de um botão.

---

### Countdown com `requestAnimationFrame` e detecção do dia atual

O countdown não usa `setInterval` — usa `requestAnimationFrame` com uma verificação de segundo para evitar recálculos desnecessários:

```javascript
let ultimoSegundo = -1;

function tick() {
  const seg = new Date().getSeconds();
  if (seg === ultimoSegundo) { requestAnimationFrame(tick); return; }
  ultimoSegundo = seg;
  // recalcula e atualiza o DOM
  requestAnimationFrame(tick);
}
```

A lógica também detecta se hoje é o dia do aniversário: se `getMonth() === 2 && getDate() === 15`, todos os campos mostram `00` e a mensagem muda para "Feliz 17° Aniversário, Lívia!". Para qualquer outro dia, o alvo é calculado para o próximo 15/03 — com incremento automático de ano se a data já passou.

---

## ⚙️ Como usar

1. Clone o repositório e abra o `index.html` no navegador
2. Substitua as imagens em `assets/` pelas fotos da pessoa
3. Edite o array `CONTEUDOS` em `scripts.js` para alterar as mensagens dos cards
4. Atualize o texto da carta diretamente no HTML na seção `#carta`
5. Ajuste `ANO_NASC`, `MES_NASC` e `DIA_NASC` no `initCountdown()` para a data correta

---

## 📈 Processo de desenvolvimento

| Etapa | O que foi feito |
|---|---|
| 01 | Estrutura HTML das 8 seções com tipografia mista e SVG paths |
| 02 | Layout CSS responsivo: hero collage, polaroids, carta glassmorphism |
| 03 | Preloader com timeline GSAP e efeito de piscada em `scaleY` |
| 04 | Hero com parallax e entrada escalonada dos elementos |
| 05 | Slider horizontal pinado com conteúdo injetado via JS |
| 06 | Memorial: `strokeDashoffset` sincronizado com scroll + reveal dos polaroids |
| 07 | Carta com entrada escalonada por linha via `delay: i * 0.11` |
| 08 | Sistema CELEBRACAO: canvas fixo, confetes, faíscas, loop com decay |
| 09 | Faíscas douradas no hover da foto final em segundo canvas |
| 10 | Auto-celebração por ScrollTrigger substituindo os botões |
| 11 | Countdown em tempo real com detecção do dia do aniversário |
| 12 | Integração Lenis + GSAP ticker + ScrollTrigger.update |

---

## 💡 O que eu aprenderia diferente

- A detecção de breakpoint para o SVG path (`window.matchMedia`) é feita uma única vez no `DOMContentLoaded` — se o usuário girar o celular ou redimensionar a janela depois, o path errado continua animado. Teria adicionado um listener de `resize` que recalcula qual path usar e recria o ScrollTrigger correspondente
- O sistema de confetes usa `setTimeout` aninhados para espaçar o lançamento dos 180 confetes em 3,5s. Teria substituído por um único `requestAnimationFrame` que verifica o tempo decorrido — evita acúmulo de timers e é mais alinhado com o loop já existente
- As rotações dos polaroids são definidas em um objeto literal com chaves manuais (`'01': -2.5, '02': 2`). Teria gerado as rotações com `Math.random()` dentro de um intervalo pequeno na inicialização — mais fácil de escalar se mais polaroids fossem adicionados

---

## 👨‍💻 Autor

**TULIO VITOR**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tuliovitor)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tuliovitor)

---

<div align="center">

Feito com muito ☕ e muito 💛 — entregue em mãos no dia 15/03/2026

</div>
