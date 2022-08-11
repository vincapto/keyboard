function createKeyboard(keys: string) {
  return `
  <div class='keyboard'>${keys}</div>
  <textarea class="textArea" rows="4" cols="50">
  `;
}
function createKeyboardNode() {
  const div = document.createElement('div');
  div.className = 'keyboard';
  return div;
}
function createContainer(panelName: string) {
  const div = document.createElement('div');
  div.className = panelName;
  return div;
}

const keyboardTamplate = {
  1: [
    { arr: 'Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal', type: 'num' },
    { arr: 'Backspace', type: 'func' },
  ],
  2: [
    { arr: 'Tab', type: 'func' },
    { arr: 'KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP', type: 'letter' },
    { arr: 'Delete', type: 'func' },
  ],
  3: [
    { arr: 'CapsLock', type: 'func' },
    { arr: 'KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL', type: 'letter' },
    { arr: 'Enter', type: 'func' },
  ],
  4: [
    { arr: 'ShiftLeft', type: 'func' },
    { arr: 'KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash', type: 'letter' },
    { arr: 'ArrowUp ShiftRight', type: 'func' },
  ],
  5: [{ arr: 'ControlLeft AltLeft Space ArrowLeft ArrowDown ArrowRight AltRight ControlRight', type: 'func' }],
};

function createKeyNode(text: string, code: string, className: string, type: string) {
  const div = document.createElement('div');
  div.className = className;
  div.innerHTML = text;
  div.dataset.type = type;
  div.dataset.code = code;
  div.dataset.name = text;
  return div;
}
function createKey(text: string) {
  return `
  <div class='key btn'>${text}</div>
  `;
}
export { createKey, createKeyboard, createKeyNode, createKeyboardNode, createContainer, keyboardTamplate };
