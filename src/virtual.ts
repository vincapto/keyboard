import { arrow } from '@popperjs/core';
import { node } from 'webpack';
import { createContainer } from './keyboard';
import { alpabet, nums, func, alpabetAlt, numsShift, allCodes } from './keys';

const keyboardTamplate = {
  1: [
    { arr: '1 2 3 4 5 6 7 8 9 0 - =', type: 'num' },
    { arr: 'Backspace', type: 'func' },
  ],
  2: [
    { arr: 'Tab', type: 'func' },
    { arr: 'q w e r t y u i o p', type: 'letter' },
  ],
  3: [
    { arr: 'CapsLock', type: 'func' },
    { arr: 'a s d f g h j k l', type: 'letter' },
    { arr: 'Enter', type: 'func' },
  ],
  4: [
    { arr: 'Shift', type: 'func' },
    { arr: 'z x c v b n m', type: 'letter' },
  ],
  5: [{ arr: 'Ctrl Alt Space', type: 'func' }],
};

// function createKeyboard(clickListener: any) {
//   const res = Object.values(keyboardTamplate).map((a) => {
//     const nodes = a.map((b) => {
//       const arr = b.arr.split(' ').map((value: string) => {
//         //@ts-ignore
//         const key = allCodes[value];
//         const keyNode = this.createKeyNode(value, key, `key ${b.type}`, b.type);
//         return keyNode;
//       });
//       console.log('TEMPLATE++++++++++++', arr);
//       return [...arr];
//     });
//     const container = createContainer(`container-keys `);
//     container.append(...nodes);
//     return container;
//   });

// const nodes = this.keys
//   .map((a) => {
//     let keys = Object.entries(a.arr);
//     const activeButton = 'key active';
//     let className = 'key';
//     if (a.type === 'letters' && this.checkUpper()) keys = this.toUpperCase(a.arr);
//     const nodes = keys.map(([key, value]) => {
//       className = active.includes(value) ? activeButton : 'key';
//       const keyNode = this.createKeyNode(value, key, className, a.type);
//       this.nodes[key] = keyNode;
//       return keyNode;
//     });
//     nodes.forEach((element) => {
//       element.addEventListener('click', clickListener);
//     });
//     const container = createContainer(`container-keys ${a.type}`);
//     container.append(...nodes);
//     return container;
//   })
//   .flat();
// return nodes;
// }

class Virtual {
  alphKeys = { arr: alpabet, type: 'letters' };
  // alphKeysSecond = { arr: 'йцукенгшщзхъфывапролджэячсмитьбю'.split(''), type: 'letters' };
  alphKeysAlt = { arr: alpabetAlt, type: 'letters' };
  numKeys = { arr: nums, type: 'nums' };
  numsKeysShift = { arr: numsShift, type: 'nums' };
  // specChar = { arr: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '='], type: 'specChar' };
  funcKeys = {
    arr: func,
    type: 'func',
  };
  funcList: string[] = [];
  keys = [this.numKeys, this.alphKeys, this.funcKeys];
  // keys = [this.alphKeys, this.alphKeysAlt, this.numKeys, this.funcKeys];
  comandList: any = { changeLang: ['18', '16'] };
  textArea: any = '';
  nodes: any = {};
  caretPosition = 0;
  lettersNodes: any = [];
  isCapsLock = false;
  isUpper = false;
  isAlt = false;
  isShift = false;
  isChanged = false;

  createKeyboard(clickListener: any) {
    const res = Object.values(keyboardTamplate).map((a) => {
      const nodes = a.map((b) => {
        const arr = b.arr.split(' ').map((value: string) => {
          //@ts-ignore
          const key = allCodes[value];
          // const alc = allCodes[value];
          //@ts-ignore
          // alert(key);
          const keyNode = this.createKeyNode(value, key, `key ${b.type}`, b.type);
          this.nodes[key] = keyNode;
          return keyNode;
        });
        console.log('NODE ARR STROKA++++++++++++', arr);

        return arr;
      });
      const container = createContainer(`container-keys `);
      //@ts-ignore
      container.append(...nodes.flat());
      console.log('NODE ARR container++++++++++++', container);
      return container;
    });
    return [...res];
  }

  clearFuncList() {
    this.funcList.map((a) => {
      if (this.funcList.length != 0) if (this.nodes[a]) this.nodes[a].classList.remove('active');
    });
    if (this.isCapsLock && !this.nodes[20].classList.contains('active')) this.nodes[20].classList.add('active');
    this.funcList = [];
  }

  addActive() {
    if (this.funcList.length != 0)
      this.funcList.map((a) => {
        if (this.nodes[a] && !this.nodes[a].classList.contains('active')) this.nodes[a].classList.add('active');
      });
    if (this.isCapsLock && !this.nodes[20].classList.contains('active')) this.nodes[20].classList.add('active');
    if (!this.isCapsLock && this.nodes[20].classList.contains('active')) this.nodes[20].classList.remove('active');
  }

  pushFunc(func: string) {
    this.funcList.push(func);
  }

  checkLang() {
    const check = this.comandList.changeLang.every((a: string) => {
      // console.log('EVERY', a);
      return this.funcList.includes(a);
    });
    console.log('CHECKLANG', check);
    if (check) {
      this.isAlt = !this.isAlt;
      // this.funcList = [];
      this.changeLang();
      console.log(this.keys);
      this.isShift = false;
      this.clearFuncList();
      return true;
    }
    return false;
  }

  changeLang() {
    // if (this.isAlt) this.keys = [this.alphKeys, this.numKeys, this.specChar, this.funcKeys];
    // else this.keys = [this.alphKeysAlt, this.numKeys, this.specChar, this.funcKeys];
  }

  createKeyNode(text: string, code: string, className: string, type: string) {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = text;
    div.dataset.type = type;
    div.dataset.code = code;
    div.dataset.name = text;
    return div;
  }
  shiftedPad() {
    const res = this.isShift ? this.numsKeysShift : this.numKeys;
    return res;
  }

  checkUpper() {
    const flag = (this.isCapsLock && !this.isShift) || (this.isShift && !this.isCapsLock);
    return flag;
  }

  getAlphabetKeys() {
    const keys = !this.isAlt ? this.alphKeys : this.alphKeysAlt;
    const buf = { arr: this.toUpperCaseObject(keys.arr), type: keys.type };
    // console.log('============================', buf);
    // console.log('============================', keys);
    return !this.checkUpper() ? keys : buf;
  }
  getNumKeys() {
    return this.shiftedPad();
  }

  updateKeys(obj: any, className: any, clickListener: any): HTMLDivElement[] {
    const rand = Math.random() * 10;
    console.log('RANDOMIZE', rand);
    const nodes = Object.entries(obj.arr).map(([key, value]: any) => {
      const keyNode = this.createKeyNode(value, key, `key ${className} ` + rand, obj.type);
      this.lettersNodes[key] = keyNode;
      console.log(keyNode);
      console.log(this.lettersNodes[key]);
      return keyNode;
    });
    nodes.forEach((element) => {
      element.addEventListener('click', clickListener);
      // this.lettersNodes[element.dataset.code] = element;
    });
    return nodes;
  }

  updateNumKeys(obj: any, className: any, clickListener: any): HTMLDivElement[] {
    const nodes = Object.entries(obj.arr).map(([key, value]: any) => {
      const keyNode = this.createKeyNode(value, key, `key ${className} `, obj.type);
      this.lettersNodes[key] = keyNode;
      return keyNode;
    });
    nodes.forEach((element) => {
      element.addEventListener('click', clickListener);
    });
    return nodes;
  }

  getNodes(clickListener: any, active: any = []) {
    this.changeLang();
    this.updateKeys(this.getAlphabetKeys(), 'letter', clickListener);
    this.updateNumKeys(this.getNumKeys(), 'num', clickListener);
    const nodes = this.keys
      .map((a) => {
        let keys = Object.entries(a.arr);
        const activeButton = 'key active';
        let className = 'key';
        if (a.type === 'letters' && this.checkUpper()) keys = this.toUpperCase(a.arr);
        const nodes = keys.map(([key, value]) => {
          className = active.includes(value) ? activeButton : 'key';
          const keyNode = this.createKeyNode(value, key, className, a.type);
          this.nodes[key] = keyNode;
          return keyNode;
        });
        nodes.forEach((element) => {
          element.addEventListener('click', clickListener);
        });
        const container = createContainer(`container-keys ${a.type}`);
        container.append(...nodes);
        return container;
      })
      .flat();
    this.isChanged = false;
    if (this.isCapsLock) this.nodes[20].classList = 'key active';

    // this.nodes = nodes;
    // this.nodes[70].classList.toggle('active');
    // this.isShift = false;
    return nodes;
  }

  toUpperCaseObject(arr: any): any {
    const obj = {};
    Object.entries(arr).map(([key, value]: any) => {
      // console.log(value.toUpperCase());
      //@ts-ignore
      obj[key] = value.toUpperCase();
      return { [key]: value.toUpperCase() };
    });
    return obj;
  }

  toUpperCase(arr: any): [string, string][] {
    return Object.entries(arr).map(([key, value]: any) => {
      return [key, value.toUpperCase()];
    });
  }

  getLetter(letter: string) {
    const buf = !this.isUpper ? letter : letter.toUpperCase;
    this.isShift ? this.toggleUpper() : 0;
    return buf;
  }

  pressShift() {
    this.toggleShift();
    this.toggleUpper();

    this.isChanged = true;
    return this.isShift;
  }

  pressCapsLock() {
    this.toggleUpper();
    this.toggleCapsLock();
    this.isChanged = true;
    return this.isShift;
  }

  funcEvents = {
    CapsLock: () => {
      this.pressCapsLock();
    },
    Shift: () => {
      this.pressShift();
    },
    Alt: () => {
      return;
    },
    Ctrl: () => {
      return;
    },
    Win: () => {
      return;
    },
    Space: () => {
      this.addLetter(' ');
      this.isChanged = true;
    },
    Left: () => {
      // this.caretPosition -= 1;
      this.moveCaret(-1);
    },
    Right: () => {
      this.moveCaret(1);
      // this.caretPosition += 1;
    },
    Up: () => {
      return;
    },
    Down: () => {
      return;
    },
    Enter: () => {
      // this.textArea += '\r\n';
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

  moveCaret(step: any) {
    const pos = this.caretPosition;
    this.caretPosition = step > 0 ? (pos <= this.textArea.length ? pos + step : pos) : pos > 0 ? pos + step : pos;
  }

  changeTextArea(position: number, count: number, item: string, step: number) {
    const arr = this.textArea.split('');
    // console.log('BEFORE changeTextArea', arr);
    arr.splice(position, count, item);
    // console.log('AFTER changeTextArea', arr);
    this.moveCaret(step);
    this.textArea = arr.join('');
  }

  addLetter(letter: string) {
    this.changeTextArea(this.caretPosition, 0, letter, 1);
  }

  getFunc(key: any) {
    //@ts-ignore
    return Direction[key];
  }

  getType(type: string) {}

  toggleCapsLock() {
    this.isCapsLock = !this.isCapsLock;
  }
  toggleUpper() {
    this.isUpper = !this.isUpper;
  }
  toggleShift() {
    this.isShift = !this.isShift;
  }
}

export { Virtual };
