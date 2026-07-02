@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');
@import "tailwindcss";

.lithos-root, .lithos-root * { font-family: 'Inter', sans-serif; }
.lithos-root .font-playfair, .lithos-root .font-playfair * { font-family: 'Playfair Display', serif; }

@keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
.hero-anim { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }
.hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }
.hero-fade { animation-name:heroFadeUp; animation-duration:1s; }
.hero-zoom { animation:heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }
@media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }

@theme {
  --font-heading: 'Instrument Serif', serif;
  --font-body: 'Barlow', sans-serif;
}

html {
  scroll-behavior: smooth;
  font-family: 'Helvetica Regular', Helvetica, Arial, sans-serif;
}

body {
  background: #000;
  color: #fff;
  font-family: 'Helvetica Regular', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

/* Custom hide scrollbars but keep scrolling functional if needed */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #000;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}

.liquid-glass-strong::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: none; }
}
.animate-fade-up {
  animation: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.25s; }
.delay-3 { animation-delay: 0.4s; }
.delay-4 { animation-delay: 0.55s; }
.delay-5 { animation-delay: 0.75s; }
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up { animation: none; }
}

/* Scoped View Transition between Section 4 and Section 5 */
.transition-wipe::view-transition-old(root) {
  animation: none;
}

.transition-wipe::view-transition-new(root) {
  animation: wipe-in 0.6s ease-out forwards;
}

@keyframes wipe-in {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

/* Style for the main section */
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* ==========================================
   BRANDED LOADING ANIMATIONS FOR AKAD WEB
   ========================================== */

.pl {
  --bg: #091708;
  --primary1: #10b981; /* Emerald Green */
  --primary2: #f59e0b; /* Golden Amber */
  --fg-t: #a7f3d0;     /* Mint Accent */
  --trans-dur: 0.3s;
  box-shadow: 2em 0 2em rgba(0, 0, 0, 0.4) inset, -2em 0 2em rgba(16, 185, 129, 0.1) inset;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transform: rotateX(30deg) rotateZ(45deg);
  width: 13em;
  height: 13em;
  color: white;
  background: rgba(2, 28, 21, 0.35);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.pl, .pl__dot {
  border-radius: 50%;
}

.pl__dot {
  animation-name: shadow724;
  box-shadow: 0.1em 0.1em 0 0.1em rgba(0, 0, 0, 0.8), 0.3em 0 0.3em rgba(16, 185, 129, 0.3);
  top: calc(50% - 0.75em);
  left: calc(50% - 0.75em);
  width: 1.5em;
  height: 1.5em;
}

.pl__dot, .pl__dot:before, .pl__dot:after {
  animation-duration: 2s;
  animation-iteration-count: infinite;
  position: absolute;
}

.pl__dot:before, .pl__dot:after {
  content: "";
  display: block;
  left: 0;
  width: inherit;
  transition: background-color var(--trans-dur);
}

.pl__dot:before {
  animation-name: pushInOut1724;
  background-color: var(--bg);
  border-radius: inherit;
  box-shadow: 0.05em 0 0.1em rgba(255, 255, 255, 0.2) inset;
  height: inherit;
  z-index: 1;
}

.pl__dot:after {
  animation-name: pushInOut2724;
  background-color: var(--primary1);
  border-radius: 0.75em;
  box-shadow: 0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4) inset, 0 -0.4em 0.2em #162419 inset, 0 -1em 0.25em rgba(0, 0, 0, 0.5) inset;
  bottom: 0;
  clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
  height: 3em;
  transform: rotate(-45deg);
  transform-origin: 50% 2.25em;
}

.pl__dot:nth-child(1) {
  transform: rotate(0deg) translateX(4.5em) rotate(0deg);
  z-index: 5;
}

.pl__dot:nth-child(1), .pl__dot:nth-child(1):before, .pl__dot:nth-child(1):after {
  animation-delay: 0s;
}

.pl__dot:nth-child(2) {
  transform: rotate(-30deg) translateX(4.5em) rotate(30deg);
  z-index: 4;
}

.pl__dot:nth-child(2), .pl__dot:nth-child(2):before, .pl__dot:nth-child(2):after {
  animation-delay: -0.1666666667s;
}

.pl__dot:nth-child(3) {
  transform: rotate(-60deg) translateX(4.5em) rotate(60deg);
  z-index: 3;
}

.pl__dot:nth-child(3), .pl__dot:nth-child(3):before, .pl__dot:nth-child(3):after {
  animation-delay: -0.3333333333s;
}

.pl__dot:nth-child(4) {
  transform: rotate(-90deg) translateX(4.5em) rotate(90deg);
  z-index: 2;
}

.pl__dot:nth-child(4), .pl__dot:nth-child(4):before, .pl__dot:nth-child(4):after {
  animation-delay: -0.5s;
}

.pl__dot:nth-child(5) {
  transform: rotate(-120deg) translateX(4.5em) rotate(120deg);
  z-index: 1;
}

.pl__dot:nth-child(5), .pl__dot:nth-child(5):before, .pl__dot:nth-child(5):after {
  animation-delay: -0.6666666667s;
}

.pl__dot:nth-child(6) {
  transform: rotate(-150deg) translateX(4.5em) rotate(150deg);
  z-index: 1;
}

.pl__dot:nth-child(6), .pl__dot:nth-child(6):before, .pl__dot:nth-child(6):after {
  animation-delay: -0.8333333333s;
}

.pl__dot:nth-child(7) {
  transform: rotate(-180deg) translateX(4.5em) rotate(180deg);
  z-index: 2;
}

.pl__dot:nth-child(7), .pl__dot:nth-child(7):before, .pl__dot:nth-child(7):after {
  animation-delay: -1s;
}

.pl__dot:nth-child(8) {
  transform: rotate(-210deg) translateX(4.5em) rotate(210deg);
  z-index: 3;
}

.pl__dot:nth-child(8), .pl__dot:nth-child(8):before, .pl__dot:nth-child(8):after {
  animation-delay: -1.1666666667s;
}

.pl__dot:nth-child(9) {
  transform: rotate(-240deg) translateX(4.5em) rotate(240deg);
  z-index: 4;
}

.pl__dot:nth-child(9), .pl__dot:nth-child(9):before, .pl__dot:nth-child(9):after {
  animation-delay: -1.3333333333s;
}

.pl__dot:nth-child(10) {
  transform: rotate(-270deg) translateX(4.5em) rotate(270deg);
  z-index: 5;
}

.pl__dot:nth-child(10), .pl__dot:nth-child(10):before, .pl__dot:nth-child(10):after {
  animation-delay: -1.5s;
}

.pl__dot:nth-child(11) {
  transform: rotate(-300deg) translateX(4.5em) rotate(300deg);
  z-index: 6;
}

.pl__dot:nth-child(11), .pl__dot:nth-child(11):before, .pl__dot:nth-child(11):after {
  animation-delay: -1.6666666667s;
}

.pl__dot:nth-child(12) {
  transform: rotate(-330deg) translateX(4.5em) rotate(330deg);
  z-index: 6;
}

.pl__dot:nth-child(12), .pl__dot:nth-child(12):before, .pl__dot:nth-child(12):after {
  animation-delay: -1.8333333333s;
}

.pl__text {
  font-size: 0.75em;
  font-family: var(--font-mono), monospace;
  max-width: 6rem;
  position: relative;
  text-shadow: 0 0 0.25em rgba(16, 185, 129, 0.7);
  transform: rotateZ(-45deg);
  color: #a7f3d0;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-align: center;
}

/* Animations for PL */
@keyframes shadow724 {
  from {
    animation-timing-function: ease-in;
    box-shadow: 0.1em 0.1em 0 0.1em rgba(0, 0, 0, 0.7), 0.3em 0 0.3em rgba(16, 185, 129, 0.2);
  }

  25% {
    animation-timing-function: ease-out;
    box-shadow: 0.1em 0.1em 0 0.1em rgba(0, 0, 0, 0.9), 0.8em 0 0.8em rgba(16, 185, 129, 0.5);
  }

  50%, to {
    box-shadow: 0.1em 0.1em 0 0.1em rgba(0, 0, 0, 0.7), 0.3em 0 0.3em rgba(16, 185, 129, 0.2);
  }
}

@keyframes pushInOut1724 {
  from {
    animation-timing-function: ease-in;
    background-color: var(--bg);
    transform: translate(0, 0);
  }

  25% {
    animation-timing-function: ease-out;
    background-color: var(--primary2);
    transform: translate(-71%, -71%);
  }

  50%, to {
    background-color: var(--bg);
    transform: translate(0, 0);
  }
}

@keyframes pushInOut2724 {
  from {
    animation-timing-function: ease-in;
    background-color: var(--bg);
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
  }

  25% {
    animation-timing-function: ease-out;
    background-color: var(--primary1);
    clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
  }

  50%, to {
    background-color: var(--bg);
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
  }
}


/* ==========================================
   LOADER 2: CYLINDRICAL TEXT WAVE
   ========================================== */

.loader {
  --main-size: 2.2em;
  --text-color: #ffffff;
  --shine-color: rgba(16, 185, 129, 0.45);
  --shadow-color: #10b981;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  user-select: none;
  position: relative;
  font-size: var(--main-size);
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text-color);
  width: 7.3em;
  height: 1.4em;
  filter: drop-shadow(0 0 0.15em var(--shine-color));
}

.loader .text {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  letter-spacing: 0.15em;
  font-family: var(--font-sans), sans-serif;
}

.loader .text:nth-child(1) {
  clip-path: polygon(0% 0%, 11.11% 0%, 11.11% 100%, 0% 100%);
  font-size: calc(var(--main-size) / 20);
  margin-left: -2.1em;
  opacity: 0.5;
}

.loader .text:nth-child(2) {
  clip-path: polygon(11.11% 0%, 22.22% 0%, 22.22% 100%, 11.11% 100%);
  font-size: calc(var(--main-size) / 16);
  margin-left: -0.98em;
  opacity: 0.65;
}

.loader .text:nth-child(3) {
  clip-path: polygon(22.22% 0%, 33.33% 0%, 33.33% 100%, 22.22% 100%);
  font-size: calc(var(--main-size) / 13);
  margin-left: -0.33em;
  opacity: 0.8;
}

.loader .text:nth-child(4) {
  clip-path: polygon(33.33% 0%, 44.44% 0%, 44.44% 100%, 33.33% 100%);
  font-size: calc(var(--main-size) / 11);
  margin-left: -0.05em;
  opacity: 0.9;
}

.loader .text:nth-child(5) {
  clip-path: polygon(44.44% 0%, 55.55% 0%, 55.55% 100%, 44.44% 100%);
  font-size: calc(var(--main-size) / 10);
  margin-left: 0em;
  opacity: 1;
}

.loader .text:nth-child(6) {
  clip-path: polygon(55.55% 0%, 66.66% 0%, 66.66% 100%, 55.55% 100%);
  font-size: calc(var(--main-size) / 11);
  margin-left: 0.05em;
  opacity: 0.9;
}

.loader .text:nth-child(7) {
  clip-path: polygon(66.66% 0%, 77.77% 0%, 77.77% 100%, 66.66% 100%);
  font-size: calc(var(--main-size) / 13);
  margin-left: 0.33em;
  opacity: 0.8;
}

.loader .text:nth-child(8) {
  clip-path: polygon(77.77% 0%, 88.88% 0%, 88.88% 100%, 77.77% 100%);
  font-size: calc(var(--main-size) / 16);
  margin-left: 0.98em;
  opacity: 0.65;
}

.loader .text:nth-child(9) {
  clip-path: polygon(88.88% 0%, 100% 0%, 100% 100%, 88.88% 100%);
  font-size: calc(var(--main-size) / 20);
  margin-left: 2.1em;
  opacity: 0.5;
}

.loader .text span {
  animation:
    scrolling 2s cubic-bezier(0.1, 0.6, 0.9, 0.4) infinite,
    shadow 2s cubic-bezier(0.1, 0.6, 0.9, 0.4) infinite;
}

.loader .text:nth-child(1) span {
  background: linear-gradient(
    to right,
    var(--text-color) 4%,
    var(--shadow-color) 7%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(2) span {
  background: linear-gradient(
    to right,
    var(--text-color) 9%,
    var(--shadow-color) 13%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(3) span {
  background: linear-gradient(
    to right,
    var(--text-color) 15%,
    var(--shadow-color) 18%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(4) span {
  background: linear-gradient(
    to right,
    var(--text-color) 20%,
    var(--shadow-color) 23%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(6) span {
  background: linear-gradient(
    to right,
    var(--shadow-color) 29%,
    var(--text-color) 32%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(7) span {
  background: linear-gradient(
    to right,
    var(--shadow-color) 34%,
    var(--text-color) 37%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(8) span {
  background: linear-gradient(
    to right,
    var(--shadow-color) 39%,
    var(--text-color) 42%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .text:nth-child(9) span {
  background: linear-gradient(
    to right,
    var(--shadow-color) 45%,
    var(--text-color) 48%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.loader .line {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 0.05em;
  width: calc(var(--main-size) / 2);
  margin-top: 0.9em;
  border-radius: 0.05em;
}

.loader .line::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: var(--text-color);
  opacity: 0.3;
}

.loader .line::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: var(--text-color);
  border-radius: 0.05em;
  transform: translateX(-90%);
  animation: wobble 2s cubic-bezier(0.5, 0.8, 0.5, 0.2) infinite;
}

@keyframes wobble {
  0% {
    transform: translateX(-90%);
  }
  50% {
    transform: translateX(90%);
  }
  100% {
    transform: translateX(-90%);
  }
}

@keyframes scrolling {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes shadow {
  0% {
    background-position: -98% 0;
  }
  100% {
    background-position: 102% 0;
  }
}



