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
    { arr: '1 2 3 4 5 6 7 8 9 0 - =', type: 'num' },
    { arr: 'Backspace', type: 'func' },
  ],
  2: [
    { arr: 'Tab', type: 'func' },
    { arr: 'q w e r t y u i o p', type: 'letter' },
    { arr: 'Delete', type: 'func' },
  ],
  3: [
    { arr: 'CapsLock', type: 'func' },
    { arr: 'a s d f g h j k l', type: 'letter' },
    { arr: 'Enter', type: 'func' },
  ],
  4: [
    { arr: 'Shift', type: 'func' },
    { arr: 'z x c v b n m', type: 'letter' },
    { arr: 'Up Shift', type: 'func' },
  ],
  5: [{ arr: 'Ctrl Alt Space Left Down Right', type: 'func' }],
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
