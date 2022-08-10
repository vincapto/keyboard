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

function createKeyNode(text: string, className: string) {
  const div = document.createElement('div');
  div.className = className;
  div.innerHTML = text;
  div.dataset.type = text;
  div.dataset.name = text;
  return div;
}
function createKey(text: string) {
  return `
  <div class='key btn'>${text}</div>
  `;
}
export { createKey, createKeyboard, createKeyNode, createKeyboardNode, createContainer };
