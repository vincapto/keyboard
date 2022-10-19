(()=>{"use strict";console.log(123465464654);var t={1:[{arr:"Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal",type:"num"},{arr:"Backspace",type:"func"}],2:[{arr:"Tab",type:"func"},{arr:"KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP",type:"letter"},{arr:"Delete",type:"func"}],3:[{arr:"CapsLock",type:"func"},{arr:"KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL",type:"letter"},{arr:"Enter",type:"func"}],4:[{arr:"ShiftLeft",type:"func"},{arr:"KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash",type:"letter"},{arr:"ArrowUp ShiftRight",type:"func"}],5:[{arr:"ControlLeft AltLeft Space ArrowLeft ArrowDown ArrowRight AltRight ControlRight",type:"func"}]};function e(t,e,i,s){var n=document.createElement("div");return n.className=i,n.innerHTML=t,n.dataset.type=s,n.dataset.code=e,n.dataset.name=t,n}var i,s={Backspace:"Backspace",Tab:"Tab",Enter:"Enter",ShiftLeft:"Shift",ControlLeft:"Control",ShiftRight:"Shift",ControlRight:"Control",AltLeft:"Alt",AltRight:"Alt",CapsLock:"CapsLock",Escape:"Escape",Space:"Space",ArrowLeft:"Left",ArrowUp:"Up",ArrowRight:"Right",ArrowDown:"Down",Delete:"Delete",Digit0:"0",Digit1:"1",Digit2:"2",Digit3:"3",Digit4:"4",Digit5:"5",Digit6:"6",Digit7:"7",Digit8:"8",Digit9:"9",KeyA:"a",KeyB:"b",KeyC:"c",KeyD:"d",KeyE:"e",KeyF:"f",KeyG:"g",KeyH:"h",KeyI:"i",KeyJ:"j",KeyK:"k",KeyL:"l",KeyM:"m",KeyN:"n",KeyO:"o",KeyP:"p",KeyQ:"q",KeyR:"r",KeyS:"s",KeyT:"t",KeyU:"u",KeyV:"v",KeyW:"w",KeyX:"x",KeyY:"y",KeyZ:"z",Semicolon:";",Quote:"'",Backslash:"\\",Comma:",",Period:".",Slash:"/",Backquote:"`",Minus:"-",Equal:"="},n={Backspace:"Backspace",Tab:"Tab",Enter:"Enter",ShiftLeft:"Shift",ShiftRight:"Shift",ControlLeft:"Control",ControlRight:"Control",AltLeft:"Alt",AltRight:"Alt",CapsLock:"CapsLock",Escape:"Escape",Space:"Space",ArrowLeft:"Left",ArrowUp:"Up",ArrowRight:"Right",ArrowDown:"Down",Delete:"Delete"},a={Backquote:"`",Digit0:"0",Digit1:"1",Digit2:"2",Digit3:"3",Digit4:"4",Digit5:"5",Digit6:"6",Digit7:"7",Digit8:"8",Digit9:"9",Minus:"-",Equal:"="},o={Backquote:"~",Digit0:"!",Digit1:"@",Digit2:"#",Digit3:"$",Digit4:"%",Digit5:"^",Digit6:"&",Digit7:"*",Digit8:"(",Digit9:")",Minus:"_",Equal:"+"},r={KeyA:"a",KeyB:"b",KeyC:"c",KeyD:"d",KeyE:"e",KeyF:"f",KeyG:"g",KeyH:"h",KeyI:"i",KeyJ:"j",KeyK:"k",KeyL:"l",KeyM:"m",KeyN:"n",KeyO:"o",KeyP:"p",KeyQ:"q",KeyR:"r",KeyS:"s",KeyT:"t",KeyU:"u",KeyV:"v",KeyW:"w",KeyX:"x",KeyY:"y",KeyZ:"z",Semicolon:";",Quote:"'",Backslash:"\\",Comma:",",Period:".",Slash:"/",Backquote:"`"},c={KeyA:"ф",KeyB:"и",KeyC:"с",KeyD:"в",KeyE:"у",KeyF:"а",KeyG:"п",KeyH:"р",KeyI:"ш",KeyJ:"о",KeyK:"л",KeyL:"д",KeyM:"ь",KeyN:"т",KeyO:"щ",KeyP:"з",KeyQ:"й",KeyR:"к",KeyS:"ы",KeyT:"е",KeyU:"г",KeyV:"м",KeyW:"ц",KeyX:"ч",KeyY:"н",KeyZ:"я",Semicolon:"ж",Quote:"б",Backslash:"ю",Comma:"х",Period:"ъ",Slash:"э",Backquote:"ё"},h=function(){return h=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},h.apply(this,arguments)},u=function(){function i(){var t=this;this.activeFunctionList=["CapsLock","AltLeft","AltRight","ShiftRight","ShiftLeft","ControlRight","ControlLeft"],this.caretPosition=0,this.keyboardNodes={language:"",nums:"",case:!1},this.isCapsLock=!1,this.isUpper=!1,this.isShift=!1,this.isChanged=!1,this.languageSwitch="eng",this.numSwitch="normal",this.alphabetKeys={arr:r,type:"letters"},this.alphabetKeysAlt={arr:c,type:"letters"},this.numKeys={arr:a,type:"nums"},this.numsKeysShift={arr:o,type:"nums"},this.language={eng:this.alphabetKeys,rus:this.alphabetKeysAlt},this.numbers={normal:this.numKeys,shifted:this.numsKeysShift},this.funcKeys={arr:n,type:"func"},this.funcList=[],this.keys=[this.numKeys,this.alphabetKeys,this.funcKeys],this.commandList={changeLang:["Shift","Alt"]},this.textArea="",this.nodes={},this.funcEvents={CapsLock:function(){t.pressCapsLock()},Shift:function(){t.pressShift()},Alt:function(){t.isChanged=!0},Control:function(){t.isChanged=!0},Win:function(){t.isChanged=!0},Space:function(){t.addLetter(" "),t.isChanged=!0},Left:function(){t.moveCaret(-1)},Right:function(){t.moveCaret(1)},Up:function(){t.isChanged=!0},Down:function(){t.isChanged=!0},Enter:function(){t.addLetter("\r\n"),t.isChanged=!0},Tab:function(){t.textArea+="",t.addLetter("\t"),t.isChanged=!0},Backspace:function(){t.changeTextArea(t.caretPosition-1,1,"",-1),t.isChanged=!0},Delete:function(){t.changeTextArea(t.caretPosition,1,"",0),t.isChanged=!0}}}return i.prototype.addListener=function(t,e){t.forEach((function(t){t.addEventListener("click",e)}))},i.prototype.createKeyboard=function(i){var n=this;return Object.values(t).map((function(t){var a=t.map((function(t){return t.arr.split(" ").map((function(i){var a=e(s[i],i,"key ".concat(t.type),t.type);return n.keyboardNodes[i]=a,a}))}));n.addListener(a.flat(),i);var o,r=("container-keys ",(o=document.createElement("div")).className="container-keys ",o);return r.append.apply(r,a.flat()),r}))},i.prototype.clearFuncList=function(){var t=this;console.log("clear"),this.getTwinList().map((function(e){0!=t.funcList.length&&t.keyboardNodes[e]&&t.keyboardNodes[e].classList.remove("active")})),this.isCapsLock&&!this.keyboardNodes.CapsLock.classList.contains("active")&&this.keyboardNodes.CapsLock.classList.add("active"),this.funcList=[]},i.prototype.pushFunc=function(t){this.funcList.push(t)},i.prototype.toggleActiveClass=function(t,e){t&&!this.keyboardNodes[e].classList.contains("active")&&this.keyboardNodes[e].classList.add("active"),!t&&this.keyboardNodes[e].classList.contains("active")&&this.keyboardNodes[e].classList.remove("active")},i.prototype.getTwinKey=function(t){switch(t){case"Shift":return["ShiftRight","ShiftLeft"];case"Alt":return["AltLeft","AltRight"];case"Control":return["ControlRight","ControlLeft"];default:return[t]}},i.prototype.getTwinList=function(){var t=this;return this.funcList.map((function(e){return t.getTwinKey(e)})).flat()},i.prototype.checkActiveButton=function(){var t=this,e=this.getTwinList();this.activeFunctionList.map((function(i){console.log(e.includes(i)),t.toggleActiveClass(e.includes(i),i)})),this.toggleActiveClass(this.isCapsLock,"CapsLock")},i.prototype.checkLang=function(){var t=this,e=this.commandList.changeLang.every((function(e){return t.funcList.includes(e)}));return!!e&&(this.isShift=!1,this.isChanged=!0,this.clearFuncList(),this.toggleNumSwitch(),this.toggleLanguage(),!0)},i.prototype.checkUpper=function(){return this.isCapsLock&&!this.isShift||this.isShift&&!this.isCapsLock},i.prototype.checkNodes=function(t){var e=[];return this.keyboardNodes.language===this.languageSwitch&&this.keyboardNodes.case===this.checkUpper||(this.keyboardNodes.language=this.languageSwitch,this.updateKeyboard(this.getLetterKeys(),"letter",t),e.push("letter")),this.keyboardNodes.nums!==this.numSwitch&&(this.keyboardNodes.nums=this.numSwitch,this.updateKeyboard(this.getNumKeys(),"num",t),e.push("num")),e},i.prototype.getLetterKeys=function(){var t=this.language[this.languageSwitch];return this.checkUpper()?this.toUpperCaseLetters(t.arr):t},i.prototype.getNumKeys=function(){return this.isShift?this.numbers.shifted:this.numbers.normal},i.prototype.updateKeyboard=function(t,i,s){var n=this,a=Object.entries(t.arr).map((function(s){var a=s[0],o=e(s[1],a,"key ".concat(i," "),t.type);return n.keyboardNodes[a]=o,o}));return this.addListener(a,s),a},i.prototype.toUpperCaseLetters=function(t){var e=Object.entries(t).reduce((function(t,e){var i,s=e[0],n=e[1];return h(h({},t),((i={})[s]=n.toUpperCase(),i))}),{});return{arr:e,type:"letters"}},i.prototype.getLetter=function(t){var e=this.isUpper?t.toUpperCase:t;return this.isShift&&this.toggleUpper(),e},i.prototype.addLetter=function(t){this.changeTextArea(this.caretPosition,0,t,1)},i.prototype.moveCaret=function(t){var e=this.caretPosition;this.caretPosition=t>0?e<=this.textArea.length?e+t:e:e>0?e+t:e},i.prototype.changeTextArea=function(t,e,i,s){var n=this.textArea.split("");n.splice(t,e,i),this.moveCaret(s),this.textArea=n.join("")},i.prototype.toggleNumSwitch=function(){this.numSwitch="normal"===this.numSwitch?"shifted":"normal"},i.prototype.toggleLanguage=function(){this.languageSwitch="rus"===this.languageSwitch?"eng":"rus"},i.prototype.toggleUpper=function(){this.isUpper=!this.isUpper},i.prototype.pressShift=function(){this.isShift=!this.isShift,this.toggleUpper(),this.toggleNumSwitch(),this.isChanged=!0},i.prototype.pressCapsLock=function(){this.toggleUpper(),this.isCapsLock=!this.isCapsLock,this.isChanged=!0},i}(),y=["CapsLock","Shift","Alt","Control"],p=new u,l=document.querySelector(".textArea");function g(t){console.log(t);var e=t.dataset.type;"func"===e&&function(t){y.includes(t.dataset.name)&&function(t){if(p.funcList.includes(t.dataset.name)){var e=p.funcList.indexOf(t.dataset.name);p.funcList.splice(e,1),p.checkActiveButton()}else p.pushFunc(t.dataset.name)}(t),p.funcEvents[t.dataset.name](),p.checkActiveButton(),p.checkLang(),p.isChanged&&d()}(t),"func"!==e&&function(t){p.addLetter(t.dataset.name),l.value=p.textArea,p.funcList.includes("CapsLock")?(p.clearFuncList(),p.pushFunc("CapsLock")):p.clearFuncList(),p.isShift&&p.pressShift(),p.isChanged&&d(),l.value=p.textArea,p.isShift=!1}(t),function(t){t.animate([{transform:"translate3D(0, 0, 0)"},{transform:"translate3D(0, 3px, 0)"}],100)}(t)}function f(t){g(t)}function d(){var t;0!==(t=p.checkNodes(f)).length&&t.map((function(t){document.querySelectorAll("."+t).forEach((function(t){var e=p.keyboardNodes[t.dataset.code];t.parentNode.replaceChild(e,t)}))})),l.value=p.textArea,p.isChanged=!1}d(),(i=document.querySelector(".template")).append.apply(i,p.createKeyboard(f)),document.addEventListener("keydown",(function(t){t.preventDefault,t.stopPropagation,0==t.repeat&&p.keyboardNodes[t.code]&&g(p.keyboardNodes[t.code])}),!1),l.addEventListener("click",(function(){p.caretPosition=l.selectionStart}))})();
//# sourceMappingURL=scripts.a103ad73f92b478a08b8.js.map