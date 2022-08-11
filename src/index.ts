export {};
import './styles/index.scss';
import './sas';
import { Virtual } from './virtual';

const activeFunctionList = ['CapsLock', 'Shift', 'Alt', 'Ctrl'];
const virtual = new Virtual();
const textArea: any = document.querySelector('.textArea');

document.querySelector('.template').append(...virtual.createKeyboard(clickListener));

function updateFunctionList(element: any) {
  if (!virtual.funcList.includes(element.dataset.code)) {
    virtual.pushFunc(element.dataset.code);
  } else {
    const index = virtual.funcList.indexOf(element.dataset.code);
    virtual.funcList.splice(index, 1);
    virtual.keyboardNodes[element.dataset.code].classList.toggle('active');
  }
}

function funcClick(element: any) {
  if (activeFunctionList.includes(element.dataset.name)) updateFunctionList(element);
  //@ts-ignore
  virtual.funcEvents[element.dataset.name]();
  virtual.checkActiveButton();
  virtual.checkLang();
  if (virtual.isChanged) updateKeyboard();
}

function letterClick(element: any) {
  virtual.addLetter(element.dataset.name);
  textArea.value = virtual.textArea;

  if (!virtual.funcList.includes('CapsLock')) {
    virtual.clearFuncList();
  } else {
    virtual.clearFuncList();
    virtual.pushFunc('CapsLock');
  }
  if (virtual.isShift) {
    virtual.pressShift();
  }
  if (virtual.isChanged) updateKeyboard();
  textArea.value = virtual.textArea;
  virtual.isShift = false;
  animateClick(element);
}

function catchClick(element: any) {
  const type = element.dataset.type;
  if (type === 'func') {
    funcClick(element);
  }
  if (type !== 'func') {
    letterClick(element);
  }
  animateClick(element);
}

function clickListener(element: any) {
  catchClick(element.target);
}

function animateClick(element: any) {
  element.animate([{ transform: 'translate3D(0, 0, 0)' }, { transform: 'translate3D(0, 3px, 0)' }], 100);
}

function updateKeyboard() {
  rewriteNodes();
  textArea.value = virtual.textArea;
  virtual.isChanged = false;
}

function rewriteNodes() {
  const nodes = virtual.checkNodes(clickListener);
  if (nodes.length !== 0) {
    nodes.map((a) => {
      document.querySelectorAll('.' + a).forEach((element: any) => {
        const newElement = virtual.keyboardNodes[element.dataset.code];
        element.parentNode.replaceChild(newElement, element);
      });
    });
  }
}

document.addEventListener(
  'keydown',
  (event) => {
    event.preventDefault;
    event.stopPropagation;
    if (event.repeat == false && virtual.keyboardNodes[event.which]) {
      catchClick(virtual.keyboardNodes[event.which]);
    }
  },
  false
);

function getCaret() {
  return textArea.selectionStart;
}

textArea.addEventListener('click', () => {
  virtual.caretPosition = getCaret();
});
