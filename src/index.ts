export {};
import './styles/index.scss';
import './sas';
// import './keyboard';
import { createKeyboardNode, createKeyNode, createContainer } from './keyboard';
import { Virtual } from './virtual';

const keyboard = createKeyboardNode();
const virtual = new Virtual();
// const nodesVirtual = virtual.getNodes(clickListener);
const textArea: any = document.querySelector('.textArea');
// keyboard.append(...nodesVirtual);
// document.querySelector('.keyboardContainer').appendChild(keyboard);

document.querySelector('.template').append(...virtual.createKeyboard(''));

function appendElement(containerName: any, element: any) {
  const container = createContainer(containerName);
  container.append(...element);
  return container;
}
updateKeyboard();

function funcClick(element: any) {
  // virtual.caretPosition = getCaret();
  if (!virtual.funcList.includes(element.dataset.code)) {
    virtual.pushFunc(element.dataset.code);
  } else {
    const index = virtual.funcList.indexOf(element.dataset.code);
    virtual.funcList.splice(index, 1);
    virtual.nodes[element.dataset.code].classList.toggle('active');
  }
  console.log('FUNCTIONS', virtual.funcList);
  //@ts-ignore
  virtual.funcEvents[element.dataset.name]();
  // console.log('UPPER', virtual.isUpper);
  // element.target.classList.toggle('active');
  // virtual.funcList.map((a) => {
  //   console.log('FUNCTRION++++++++++++++++++++++++++++++++++', a);
  //   if (virtual.funcList.length != 0) if (virtual.nodes[a]) virtual.nodes[a].classList.add('active');
  // });
  // if (this.isShift)

  virtual.addActive();
  // animateClick(element);
  if (virtual.isChanged) updateKeyboard();
  if (virtual.checkLang()) {
    updateKeyboard();
  }
}

function letterClick(element: any) {
  // virtual.caretPosition = getCaret();
  console.log('FUNCTIONS', virtual.funcList);
  // console.log('isShift', virtual.isShift);
  // virtual.textArea += element.target.dataset.name;
  // virtual.textArea = 'dasdads';
  virtual.addLetter(element.dataset.name);
  // console.log('POSITION+++++++++++++', virtual.caretPosition);
  textArea.value = virtual.textArea;
  // virtual.clearFuncList();
  if (!virtual.funcList.includes('CapsLock')) {
    virtual.clearFuncList();
  } else {
    virtual.clearFuncList();
    virtual.pushFunc('CapsLock');
  }
  if (virtual.isShift) {
    virtual.toggleShift();
    virtual.toggleUpper();
    virtual.isChanged = true;
  }
  console.log('ISCHANGES', virtual.isChanged);
  if (virtual.isChanged) updateKeyboard();
  textArea.value = virtual.textArea;
  virtual.isShift = false;
  animateClick(element);
}

function catchClick(element: any) {
  const type = element.dataset.type;
  console.log('=============================');
  console.log(element);
  if (type === 'func') {
    funcClick(element);
  }
  if (type !== 'func') {
    letterClick(element);
  }
  animateClick(element);
}

function clickListener(element: any) {
  // animateClick(element);
  console.log('=============================');
  console.log(element);
  catchClick(element.target);
}

function animateClick(element: any) {
  console.log('ANIMATION', element);
  element.animate([{ transform: 'translate3D(0, 0, 0)' }, { transform: 'translate3D(0, 3px, 0)' }], 100);
}

function updateKeyboard() {
  // keyboard.append(...virtual.getNodes(clickListener, active));
  // let letterKeys = document.querySelector('.letters');
  // const numsKeys = document.querySelector('.nums');

  // numsKeys.innerHTML = '';
  // const nums = virtual.getNumKeys();
  // const alphabet = virtual.getAlphabetKeys();
  // const lettersNodes = virtual.updateKeys(alphabet, clickListener);
  // const keysNodes = virtual.updateNumKeys(nums, clickListener);
  // virtual.lettersNodes = lettersNodes;

  // const container = createContainer(`container-keys letters`);

  // container.append(...lettersNodes);
  // letterKeys.outerHTML = container.outerHTML;

  // rewriteNodes('.letters');
  // rewriteNodesByClass();
  rewriteNodesByClassKeyboard('letter');
  rewriteNodesByClassKeyboardNum('.num');
  // rewriteNodesByClassKeyboard('.num');
  // numsKeys.append(...keysNodes);
  textArea.value = virtual.textArea;
  virtual.isChanged = false;
}

function rewriteNodesByClassKeyboardNum(className = '.num') {
  const nodes = document.querySelectorAll(className);
  console.log('NODES TEMPLATE', virtual.lettersNodes);
  const nums = virtual.getNumKeys();
  const lettersNodes = virtual.updateNumKeys(nums, 'num', clickListener);

  // console.log(' VIRTUAL NODE', virtual.lettersNodes[65]);
  // console.log('LETTER NODE', lettersNodes[0]);
  nodes.forEach((element: any, key: number) => {
    const newElement = virtual.lettersNodes[element.dataset.code];
    // element.addEventListener('click', () => alert(''));
    element.parentNode.replaceChild(newElement, element);
    // console.log('3====', element);
  });
}

function rewriteNodesByClassKeyboard(className = 'letter') {
  const nodes = document.querySelectorAll('.' + className);
  // console.log('NODES TEMPLATE', virtual.lettersNodes);
  const alphabet = virtual.getAlphabetKeys();
  console.log(alphabet);
  const lettersNodes = virtual.updateKeys(alphabet, className, clickListener);

  // console.log(' VIRTUAL NODE', virtual.lettersNodes[65]);
  // console.log('LETTER NODE', lettersNodes[0]);
  nodes.forEach((element: any, key: number) => {
    const newElement = virtual.lettersNodes[element.dataset.code];
    // element.addEventListener('click', () => alert(''));
    element.parentNode.replaceChild(newElement, element);
    // console.log('3====', element);
  });
}
// function rewriteNodesByClass(className = '.change') {
//   const nodes = document.querySelectorAll(className);

//   const alphabet = virtual.getAlphabetKeys();
//   const lettersNodes = virtual.updateKeys(alphabet, clickListener);

//   // console.log(' VIRTUAL NODE', virtual.lettersNodes[65]);
//   // console.log('LETTER NODE', lettersNodes[0]);
//   nodes.forEach((element: any, key: number) => {
//     const newElement = virtual.lettersNodes[element.dataset.code];
//     element.parentNode.replaceChild(newElement, element);
//     // console.log('3====', element);
//   });
// }
function rewriteNodes(name: any) {
  const nodes = document.querySelector(name).childNodes;
  nodes.forEach((element: any) => {
    element.addEventListener('click', clickListener);
    //@ts-ignore
    virtual.lettersNodes[element.dataset.code] = element;
  });
}

// document.addEventListener('keypress', (event) => {
//   const keyName = event.key;
//   alert('asd' + event.keyCode);
//   catchClick(virtual.lettersNodes[event.which]);
//   // alert('keypress event\n\n' + 'key: ' + keyName);
// });

document.addEventListener(
  'keydown',
  (event) => {
    event.preventDefault;
    event.stopPropagation;
    if (event.repeat == false) {
      const type = virtual.nodes[event.which].dataset.type;
      if (type !== 'func') catchClick(virtual.lettersNodes[event.which]);
      else catchClick(virtual.nodes[event.which]);
    }
    // document.querySelector('body').classList.add('actvie');
    // console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\', virtual.lettersNodes[event.which]);
  },
  false
);

function getCaret() {
  return textArea.selectionStart;
}

textArea.addEventListener('click', () => {
  virtual.caretPosition = getCaret();
});

// function createNodes(elements: string[], className: string) {
//   const arr: HTMLElement[] = elements.map((a) => createKeyNode(a, className));
//   arr.forEach((element) => {
//     element.addEventListener('click', clickListener);
//   });
//   return arr;
// }

// const aContainer = createContainer('alphabet-container');
// const alphabetNodes = appendElement('alphabet-container', createNodes(alphabet, 'key'));
// const numsNodes = appendElement('nums-container', createNodes(nums, 'key'));
// const funcNodes = appendElement('functional-container', createNodes(functional, 'key'));
// aContainer.append(...alphabetArr);
// keyboard.append(numsNodes);
// keyboard.append(alphabetNodes);
// keyboard.append(funcNodes);
// console.log(b);
