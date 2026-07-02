/* Cubes.css */
.default-animation {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.default-animation--scene {
  display: grid;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  box-sizing: border-box;
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  transform-style: preserve-3d;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border: var(--cube-face-border, 1px solid #fff);
  background-color: var(--cube-face-bg, #120F17);
  box-shadow: var(--cube-face-shadow, none);
  backface-visibility: visible;
  box-sizing: border-box;
}

/* 3D rotations based on cube percentage size. 
   We translate by half of the cube size to make it a perfect cube. */
.cube-face--front {
  transform: rotateY(0deg) translateZ(calc(var(--cube-size, 60px) / 2));
}
.cube-face--back {
  transform: rotateY(180deg) translateZ(calc(var(--cube-size, 60px) / 2));
}
.cube-face--left {
  transform: rotateY(-90deg) translateZ(calc(var(--cube-size, 60px) / 2));
}
.cube-face--right {
  transform: rotateY(90deg) translateZ(calc(var(--cube-size, 60px) / 2));
}
.cube-face--top {
  transform: rotateX(90deg) translateZ(calc(var(--cube-size, 60px) / 2));
}
.cube-face--bottom {
  transform: rotateX(-90deg) translateZ(calc(var(--cube-size, 60px) / 2));
}
