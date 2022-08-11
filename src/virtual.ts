import { createContainer, createKeyNode, keyboardTamplate } from './keyboard';
import { alpabet as letters, nums, func, alpabetAlt, numsShift, allCodes } from './keys';

type code = Record<string, string>;
type keys = { arr: code; type: string };
type keyType = Record<string, keys>;
type listener = (element?: KeyboardEvent) => void;

class Virtual {
  activeFunctionList = ['CapsLock', 'AltLeft', 'AltRight', 'ShiftRight', 'ShiftLeft', 'ControlRight', 'ControlLeft'];
  caretPosition = 0;
  keyboardNodes: any = { language: '', nums: '', case: false };
  isCapsLock = false;
  isUpper = false;
  isShift = false;
  isChanged = false;
  languageSwitch = 'eng';
  numSwitch = 'normal';

  alphabetKeys = { arr: letters, type: 'letters' };
  alphabetKeysAlt = { arr: alpabetAlt, type: 'letters' };
  numKeys = { arr: nums, type: 'nums' };
  numsKeysShift = { arr: numsShift, type: 'nums' };

  language: keyType = { eng: this.alphabetKeys, rus: this.alphabetKeysAlt };
  numbers: keyType = { normal: this.numKeys, shifted: this.numsKeysShift };

  funcKeys = {
    arr: func,
    type: 'func',
  };
  funcList: string[] = [];
  keys = [this.numKeys, this.alphabetKeys, this.funcKeys];
  commandList: any = { changeLang: ['Shift', 'Alt'] };
  textArea: any = '';
  nodes: any = {};

  addListener(nodes: HTMLDivElement[], clickListener: listener) {
    nodes.forEach((element: any) => {
      element.addEventListener('click', clickListener);
    });
  }

  createKeyboard(clickListener: listener): HTMLDivElement[] {
    return Object.values(keyboardTamplate).map((a) => {
      const nodes = a.map((b) => {
        return b.arr.split(' ').map((key: string) => {
          const value = allCodes[key];
          const keyNode = createKeyNode(value, key, `key ${b.type}`, b.type);
          this.keyboardNodes[key] = keyNode;
          return keyNode;
        });
      });
      this.addListener(nodes.flat(), clickListener);
      const container = createContainer(`container-keys `);
      container.append(...nodes.flat());
      return container;
    });
  }

  clearFuncList() {
    console.log('clear');
    this.getTwinList().map((a) => {
      if (this.funcList.length != 0) if (this.keyboardNodes[a]) this.keyboardNodes[a].classList.remove('active');
    });
    if (this.isCapsLock && !this.keyboardNodes['CapsLock'].classList.contains('active'))
      this.keyboardNodes['CapsLock'].classList.add('active');
    this.funcList = [];
  }

  pushFunc(func: string) {
    this.funcList.push(func);
  }

  toggleActiveClass(flag: boolean, key: string) {
    if (flag && !this.keyboardNodes[key].classList.contains('active')) this.keyboardNodes[key].classList.add('active');
    if (!flag && this.keyboardNodes[key].classList.contains('active')) {
      this.keyboardNodes[key].classList.remove('active');
    }
  }

  getTwinKey(key: string) {
    switch (key) {
      case 'Shift':
        return ['ShiftRight', 'ShiftLeft'];
      case 'Alt':
        return ['AltLeft', 'AltRight'];
      case 'Control':
        return ['ControlRight', 'ControlLeft'];
      default:
        return [key];
    }
  }

  getTwinList() {
    return this.funcList.map((a: string) => this.getTwinKey(a)).flat();
  }

  checkActiveButton() {
    const activeButtons = this.getTwinList();
    this.activeFunctionList.map((a) => {
      console.log(activeButtons.includes(a));
      this.toggleActiveClass(activeButtons.includes(a), a);
      return;
    });
    this.toggleActiveClass(this.isCapsLock, 'CapsLock');
  }

  checkLang() {
    const check = this.commandList.changeLang.every((a: string) => {
      return this.funcList.includes(a);
    });
    if (check) {
      this.isShift = false;
      this.isChanged = true;
      this.clearFuncList();
      this.toggleNumSwitch();
      this.toggleLanguage();
      return true;
    }
    return false;
  }

  checkUpper() {
    return (this.isCapsLock && !this.isShift) || (this.isShift && !this.isCapsLock);
  }

  checkNodes(clickListener: listener) {
    const selector = [];
    if (this.keyboardNodes.language !== this.languageSwitch || this.keyboardNodes.case !== this.checkUpper) {
      this.keyboardNodes.language = this.languageSwitch;
      this.updateKeyboard(this.getLetterKeys(), 'letter', clickListener);
      selector.push('letter');
    }
    if (this.keyboardNodes.nums !== this.numSwitch) {
      this.keyboardNodes.nums = this.numSwitch;
      this.updateKeyboard(this.getNumKeys(), 'num', clickListener);
      selector.push('num');
    }
    return selector;
  }

  getLetterKeys() {
    const lang = this.language[this.languageSwitch];
    return !this.checkUpper() ? lang : this.toUpperCaseLetters(lang.arr);
  }

  getNumKeys() {
    return this.isShift ? this.numbers.shifted : this.numbers.normal;
  }

  updateKeyboard(obj: keys, className: string, clickListener: listener): HTMLDivElement[] {
    const nodes = Object.entries(obj.arr).map(([key, value]: any) => {
      const keyNode = createKeyNode(value, key, `key ${className} `, obj.type);
      this.keyboardNodes[key] = keyNode;
      return keyNode;
    });
    this.addListener(nodes, clickListener);
    return nodes;
  }

  toUpperCaseLetters(arr: code): keys {
    const letters = Object.entries(arr).reduce((acc, [key, value]: any) => {
      return { ...acc, [key]: value.toUpperCase() };
    }, {});
    return { arr: letters, type: 'letters' };
  }

  getLetter(letter: string) {
    const buf = !this.isUpper ? letter : letter.toUpperCase;
    this.isShift ? this.toggleUpper() : 0;
    return buf;
  }

  addLetter(letter: string) {
    this.changeTextArea(this.caretPosition, 0, letter, 1);
  }

  moveCaret(step: number) {
    const pos = this.caretPosition;
    this.caretPosition = step > 0 ? (pos <= this.textArea.length ? pos + step : pos) : pos > 0 ? pos + step : pos;
  }

  changeTextArea(position: number, count: number, item: string, step: number) {
    const arr = this.textArea.split('');
    arr.splice(position, count, item);
    this.moveCaret(step);
    this.textArea = arr.join('');
  }

  toggleNumSwitch() {
    this.numSwitch = this.numSwitch === 'normal' ? 'shifted' : 'normal';
  }
  toggleLanguage() {
    this.languageSwitch = this.languageSwitch === 'rus' ? 'eng' : 'rus';
  }

  toggleUpper() {
    this.isUpper = !this.isUpper;
  }

  pressShift() {
    this.isShift = !this.isShift;
    this.toggleUpper();
    this.toggleNumSwitch();
    this.isChanged = true;
  }

  pressCapsLock() {
    this.toggleUpper();
    this.isCapsLock = !this.isCapsLock;
    this.isChanged = true;
  }

  funcEvents = {
    CapsLock: () => {
      this.pressCapsLock();
    },
    Shift: () => {
      this.pressShift();
    },
    Alt: () => {
      this.isChanged = true;
    },
    Control: () => {
      this.isChanged = true;
    },
    Win: () => {
      this.isChanged = true;
    },
    Space: () => {
      this.addLetter(' ');
      this.isChanged = true;
    },
    Left: () => {
      this.moveCaret(-1);
    },
    Right: () => {
      this.moveCaret(1);
    },
    Up: () => {
      this.isChanged = true;
    },
    Down: () => {
      this.isChanged = true;
    },
    Enter: () => {
      this.addLetter('\r\n');
      this.isChanged = true;
    },
    Tab: () => {
      this.textArea += '';
      this.addLetter('\t');
      this.isChanged = true;
    },
    Backspace: () => {
      this.changeTextArea(this.caretPosition - 1, 1, '', -1);
      this.isChanged = true;
    },
    Delete: () => {
      this.changeTextArea(this.caretPosition, 1, '', 0);
      this.isChanged = true;
    },
  };
}

export { Virtual };
