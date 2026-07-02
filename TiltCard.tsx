.target-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 9999;
}

.target-cursor-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: background-color 0.15s ease;
}

.target-cursor-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transform: translate(0, 0);
  will-change: transform, border-color, border-width;
}

.corner-tl {
  border-right: none;
  border-bottom: none;
  transform: translate(-18px, -18px);
}

.corner-tr {
  border-left: none;
  border-bottom: none;
  transform: translate(6px, -18px);
}

.corner-br {
  border-left: none;
  border-top: none;
  transform: translate(6px, 6px);
}

.corner-bl {
  border-right: none;
  border-top: none;
  transform: translate(-18px, 6px);
}

/* Ensure default cursor is hidden everywhere for non-mobile if target selector demands it */
@media (min-width: 769px) {
  .cursor-target {
    cursor: none !important;
  }
}
