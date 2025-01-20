/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/editor-adapter/index.js":
/*!**********************************************!*\
  !*** ./node_modules/editor-adapter/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AceEditor: () => (/* binding */ AceEditor),
/* harmony export */   CodeMirror6Editor: () => (/* binding */ CodeMirror6Editor),
/* harmony export */   CodeMirrorEditor: () => (/* binding */ CodeMirrorEditor),
/* harmony export */   GenericAbstractEditor: () => (/* binding */ GenericAbstractEditor),
/* harmony export */   MonacoEditor: () => (/* binding */ MonacoEditor),
/* harmony export */   TextareaEditor: () => (/* binding */ TextareaEditor),
/* harmony export */   computeSelector: () => (/* binding */ computeSelector),
/* harmony export */   executeInPage: () => (/* binding */ executeInPage),
/* harmony export */   getEditor: () => (/* binding */ getEditor),
/* harmony export */   unwrap: () => (/* binding */ unwrap),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
class GenericAbstractEditor {
    constructor(_e, _options) { }
    ;
    static matches(_) {
        throw new Error("Matches function not overriden");
    }
    ;
}
/* istanbul ignore next */
class AceEditor extends GenericAbstractEditor {
    constructor(e, _options) {
        super(e, _options);
        // This function will be stringified and inserted in page context so we
        // can't instrument it.
        /* istanbul ignore next */
        this.getAce = (selec) => {
        };
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            return wrap(ace.getValue());
        };
        this.getCursor = async (selector, wrap, unwrap) => {
            let position;
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            if (ace.getCursorPosition !== undefined) {
                position = ace.getCursorPosition();
            }
            else {
                position = ace.selection.cursor;
            }
            return [wrap(position.row) + 1, wrap(position.column)];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            return wrap(ace.session.$modeId).split("/").slice(-1)[0];
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            return wrap(ace.setValue(text, 1));
        };
        this.setCursor = async (selector, wrap, unwrap, line, column) => {
            const elem = document.querySelector(selector);
            const ace = elem.aceEditor || unwrap(window).ace.edit(elem);
            const selection = ace.getSelection();
            return wrap(selection.moveCursorTo(line - 1, column, false));
        };
        this.elem = e;
        // Get the topmost ace element
        let parent = this.elem.parentElement;
        while (AceEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/ace_editor/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
/* istanbul ignore next */
class CodeMirror6Editor extends GenericAbstractEditor {
    constructor(e, options) {
        super(e, options);
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).cmView.view.state.doc.toString());
        };
        this.getCursor = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const position = unwrap(elem).cmView.view.state.selection.main.head;
            return [wrap(position.line), wrap(position.ch)];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).dataset.language);
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = unwrap(document.querySelector(selector));
            let length = elem.cmView.view.state.doc.length;
            return wrap(elem.cmView.view.dispatch({ changes: { from: 0, to: length, insert: text } }));
        };
        this.setCursor = async (selector, wrap, unwrap, line, column) => {
            const elem = unwrap(document.querySelector(selector));
            return wrap(elem.vmView.view.dispatch({
                selection: {
                    anchor: elem.cmView.view.doc.line(line) + column
                }
            }));
        };
        this.elem = e;
        // Get the topmost CodeMirror element
        let parent = this.elem.parentElement;
        while (CodeMirror6Editor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/^(.* )?cm-content/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
/* istanbul ignore next */
class CodeMirrorEditor extends GenericAbstractEditor {
    constructor(e, options) {
        super(e, options);
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.getValue());
        };
        this.getCursor = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const position = unwrap(elem).CodeMirror.getCursor();
            return [wrap(position.line) + 1, wrap(position.ch)];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.getMode().name);
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.setValue(text));
        };
        this.setCursor = async (selector, wrap, unwrap, line, column) => {
            const elem = document.querySelector(selector);
            return wrap(unwrap(elem).CodeMirror.setCursor({ line: line - 1, ch: column }));
        };
        this.elem = e;
        // Get the topmost CodeMirror element
        let parent = this.elem.parentElement;
        while (CodeMirrorEditor.matches(parent)) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 3; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/^(.* )?CodeMirror/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
/* istanbul ignore next */
class MonacoEditor extends GenericAbstractEditor {
    constructor(e, options) {
        super(e, options);
        this.getContent = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const uri = elem.getAttribute("data-uri");
            const model = unwrap(window).monaco.editor.getModel(uri);
            return wrap(model.getValue());
        };
        // It's impossible to get Monaco's cursor position:
        // https://github.com/Microsoft/monaco-editor/issues/258
        this.getCursor = async (selector, wrap, unwrap) => {
            return [1, 0];
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async (selector, wrap, unwrap) => {
            const elem = document.querySelector(selector);
            const uri = elem.getAttribute("data-uri");
            const model = unwrap(window).monaco.editor.getModel(uri);
            return wrap(model.getModeId());
        };
        this.setContent = async (selector, wrap, unwrap, text) => {
            const elem = document.querySelector(selector);
            const uri = elem.getAttribute("data-uri");
            const model = unwrap(window).monaco.editor.getModel(uri);
            return wrap(model.setValue(text));
        };
        // It's impossible to set Monaco's cursor position:
        // https://github.com/Microsoft/monaco-editor/issues/258
        this.setCursor = async (_selector, _wrap, _unwrap, _line, _column) => {
            return undefined;
        };
        this.elem = e;
        // Find the monaco element that holds the data
        let parent = this.elem.parentElement;
        while (!(this.elem.className.match(/monaco-editor/gi)
            && this.elem.getAttribute("data-uri").match("file://|inmemory://|gitlab:"))) {
            this.elem = parent;
            parent = parent.parentElement;
        }
    }
    static matches(e) {
        let parent = e;
        for (let i = 0; i < 4; ++i) {
            if (parent !== undefined && parent !== null) {
                if ((/monaco-editor/gi).test(parent.className)) {
                    return true;
                }
                parent = parent.parentElement;
            }
        }
        return false;
    }
}
// TextareaEditor sort of works for contentEditable elements but there should
// really be a contenteditable-specific editor.
/* istanbul ignore next */
class TextareaEditor {
    constructor(e, options) {
        this.getContent = async () => {
            if (this.elem.value !== undefined) {
                return Promise.resolve(this.elem.value);
            }
            if (this.options.preferHTML) {
                return Promise.resolve(this.elem.innerHTML);
            }
            else {
                return Promise.resolve(this.elem.innerText);
            }
        };
        this.getCursor = async () => {
            return this.getContent().then(text => {
                let line = 1;
                let column = 0;
                const selectionStart = this.elem.selectionStart !== undefined
                    ? this.elem.selectionStart
                    : 0;
                // Sift through the text, counting columns and new lines
                for (let cursor = 0; cursor < selectionStart; ++cursor) {
                    column += text.charCodeAt(cursor) < 0x7F ? 1 : 2;
                    if (text[cursor] === "\n") {
                        line += 1;
                        column = 0;
                    }
                }
                return [line, column];
            });
        };
        this.getElement = () => {
            return this.elem;
        };
        this.getLanguage = async () => {
            if (this.options.preferHTML) {
                return Promise.resolve('html');
            }
            return Promise.resolve(undefined);
        };
        this.setContent = async (text) => {
            if (this.elem.value !== undefined) {
                this.elem.value = text;
            }
            else {
                if (this.options.preferHTML) {
                    this.elem.innerHTML = text;
                }
                else {
                    this.elem.innerText = text;
                }
            }
            return Promise.resolve();
        };
        this.setCursor = async (line, column) => {
            return this.getContent().then(text => {
                let character = 0;
                // Try to find the line the cursor should be put on
                while (line > 1 && character < text.length) {
                    if (text[character] === "\n") {
                        line -= 1;
                    }
                    character += 1;
                }
                // Try to find the character after which the cursor should be moved
                // Note: we don't do column = columnn + character because column
                // might be larger than actual line length and it's better to be on
                // the right line but on the wrong column than on the wrong line
                // and wrong column.
                // Moreover, column is a number of UTF-8 bytes from the beginning
                // of the line to the cursor. However, javascript uses UTF-16,
                // which is 2 bytes per non-ascii character. So when we find a
                // character that is more than 1 byte long, we have to remove that
                // amount from column, but only two characters from CHARACTER!
                while (column > 0 && character < text.length) {
                    // Can't happen, but better be safe than sorry
                    /* istanbul ignore next */
                    if (text[character] === "\n") {
                        break;
                    }
                    const code = text.charCodeAt(character);
                    if (code <= 0x7f) {
                        column -= 1;
                    }
                    else if (code <= 0x7ff) {
                        column -= 2;
                    }
                    else if (code >= 0xd800 && code <= 0xdfff) {
                        column -= 4;
                        character++;
                    }
                    else if (code < 0xffff) {
                        column -= 3;
                    }
                    else {
                        column -= 4;
                    }
                    character += 1;
                }
                if (this.elem.setSelectionRange !== undefined) {
                    this.elem.setSelectionRange(character, character);
                }
                return undefined;
            });
        };
        this.options = options;
        this.elem = e;
    }
    static matches(_) {
        return true;
    }
}
// Computes a unique selector for its argument.
function computeSelector(element) {
    function uniqueSelector(e) {
        // Only matching alphanumeric selectors because others chars might have special meaning in CSS
        if (e.id && e.id.match("^[a-zA-Z0-9_-]+$")) {
            const id = e.tagName + `[id="${e.id}"]`;
            if (document.querySelectorAll(id).length === 1) {
                return id;
            }
        }
        // If we reached the top of the document
        if (!e.parentElement) {
            return "HTML";
        }
        // Compute the position of the element
        const index = Array.from(e.parentElement.children)
            .filter(child => child.tagName === e.tagName)
            .indexOf(e) + 1;
        return `${uniqueSelector(e.parentElement)} > ${e.tagName}:nth-of-type(${index})`;
    }
    return uniqueSelector(element);
}
// Runs CODE in the page's context by setting up a custom event listener,
// embedding a script element that runs the piece of code and emits its result
// as an event.
/* istanbul ignore next */
function executeInPage(code) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const eventId = `${Math.random()}`;
        script.innerHTML = `(async (evId) => {
            try {
                let unwrap = x => x;
                let wrap = x => x;
                let result;
                result = await ${code};
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: {
                        success: true,
                        result,
                    }
                }));
            } catch (e) {
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: { success: false, reason: e },
                }));
            }
        })(${JSON.stringify(eventId)})`;
        window.addEventListener(eventId, ({ detail }) => {
            script.parentNode.removeChild(script);
            if (detail.success) {
                return resolve(detail.result);
            }
            return reject(detail.reason);
        }, { once: true });
        document.head.appendChild(script);
    });
}
function unwrap(x) {
    if (window.wrappedJSObject) {
        return x.wrappedJSObject;
    }
    return x;
}
function wrap(x) {
    if (window.XPCNativeWrapper) {
        return window.XPCNativeWrapper(x);
    }
    return x;
}
;
/* WARNING: codeMirror6 only works in chrome based browsers for now. Leave it
 * to false or undefined in Firefox. */
function getEditor(elem, options) {
    let editor;
    let classes = [AceEditor, CodeMirrorEditor, MonacoEditor];
    if (options.codeMirror6Enabled) {
        classes.push(CodeMirror6Editor);
    }
    for (let clazz of classes) {
        if (clazz.matches(elem)) {
            editor = clazz;
            break;
        }
    }
    if (editor === undefined) {
        return new TextareaEditor(elem, options);
    }
    let ed = new editor(elem, options);
    let result;
    if (window.wrappedJSObject) {
        result = new Proxy(ed, {
            get: (target, prop) => (...args) => {
                return target[prop](computeSelector(target.getElement()), wrap, unwrap, ...args);
            }
        });
    }
    else {
        result = new Proxy(ed, {
            get: (target, prop) => {
                if (prop === "getElement") {
                    return target[prop];
                }
                return (...args) => {
                    /* istanbul ignore next */
                    return executeInPage(`(${target[prop]})(${JSON.stringify(computeSelector(target.getElement()))}, x => x, x => x, ...${JSON.stringify(args)})`);
                };
            }
        });
    }
    return result;
}


/***/ }),

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/

browser = undefined;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.10.0 - Fri Aug 12 2022 19:42:44 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!globalThis.chrome?.runtime?.id) {
    throw new Error("This script should only be loaded in a browser extension.");
  }

  if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received."; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    }; // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map



/***/ }),

/***/ "./src/EventEmitter.ts":
/*!*****************************!*\
  !*** ./src/EventEmitter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(event, handler) {
        let handlers = this.listeners.get(event);
        if (handlers === undefined) {
            handlers = [];
            this.listeners.set(event, handlers);
        }
        handlers.push(handler);
    }
    emit(event, ...data) {
        const handlers = this.listeners.get(event);
        if (handlers !== undefined) {
            const errors = [];
            handlers.forEach((handler) => {
                try {
                    handler(...data);
                }
                catch (e) {
                    /* istanbul ignore next */
                    errors.push(e);
                }
            });
            /* Error conditions here are impossible to test for from selenium
             * because it would arise from the wrong use of the API, which we
             * can't ship in the extension, so don't try to instrument. */
            /* istanbul ignore next */
            if (errors.length > 0) {
                throw new Error(JSON.stringify(errors));
            }
        }
    }
}


/***/ }),

/***/ "./src/FirenvimElement.ts":
/*!********************************!*\
  !*** ./src/FirenvimElement.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirenvimElement: () => (/* binding */ FirenvimElement)
/* harmony export */ });
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var editor_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! editor-adapter */ "./node_modules/editor-adapter/index.js");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");



class FirenvimElement {
    // elem is the element that received the focusEvent.
    // Nvimify is the function that listens for focus events. We need to know
    // about it in order to remove it before focusing elem (otherwise we'll
    // just grab focus again).
    constructor(elem, listener, onDetach) {
        // focusInfo is used to keep track of focus listeners and timeouts created
        // by FirenvimElement.focus(). FirenvimElement.focus() creates these
        // listeners and timeouts in order to work around pages that try to grab
        // the focus again after the FirenvimElement has been created or after the
        // underlying element's content has changed.
        this.focusInfo = {
            finalRefocusTimeouts: [],
            refocusRefs: [],
            refocusTimeouts: [],
        };
        // resizeReqId keeps track of the number of resizing requests that are sent
        // to the iframe. We send and increment it for every resize requests, this
        // lets the iframe know what the most recently sent resize request is and
        // thus avoids reacting to an older resize request if a more recent has
        // already been processed.
        this.resizeReqId = 0;
        // relativeX/Y is the position the iframe should have relative to the input
        // element in order to be both as close as possible to the input element
        // and fit in the window without overflowing out of the viewport.
        this.relativeX = 0;
        this.relativeY = 0;
        // firstPutEditorCloseToInputOrigin keeps track of whether this is the
        // first time the putEditorCloseToInputOrigin function is called from the
        // iframe. See putEditorCloseToInputOriginAfterResizeFromFrame() for more
        // information.
        this.firstPutEditorCloseToInputOrigin = true;
        // bufferInfo: a [url, selector, cursor, lang] tuple indicating the page
        // the last iframe was created on, the selector of the corresponding
        // textarea and the column/line number of the cursor.
        // Note that these are __default__ values. Real values must be created with
        // prepareBufferInfo(). The reason we're not doing this from the
        // constructor is that it's expensive and disruptive - getting this
        // information requires evaluating code in the page's context.
        this.bufferInfo = Promise.resolve(["", "", [1, 1], undefined]);
        // cursor: last known cursor position. Updated on getPageElementCursor and
        // setPageElementCursor
        this.cursor = [1, 1];
        this.originalElement = elem;
        this.nvimify = listener;
        this.onDetach = onDetach;
        this.editor = (0,editor_adapter__WEBPACK_IMPORTED_MODULE_2__.getEditor)(elem, {
            preferHTML: (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_0__.getConf)().content == "html",
            codeMirror6Enabled: (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isChrome)()
        });
        this.span = elem
            .ownerDocument
            .createElementNS("http://www.w3.org/1999/xhtml", "span");
        // Make non-focusable, as otherwise <Tab> and <S-Tab> in the page would
        // focus the iframe at the end of the page instead of focusing the
        // browser's UI. The only way to <Tab>-focus the frame is to
        // <Tab>-focus the corresponding input element.
        this.span.setAttribute("tabindex", "-1");
        this.iframe = elem
            .ownerDocument
            .createElementNS("http://www.w3.org/1999/xhtml", "iframe");
        // Make sure there isn't any extra width/height
        this.iframe.style.padding = "0px";
        this.iframe.style.margin = "0px";
        this.iframe.style.border = "0px";
        // We still need a border, use a shadow for that
        this.iframe.style.boxShadow = "0px 0px 1px 1px black";
    }
    attachToPage(fip) {
        this.frameIdPromise = fip.then((f) => {
            this.frameId = f;
            // Once a frameId has been acquired, the FirenvimElement would die
            // if its span was removed from the page. Thus there is no use in
            // keeping its spanObserver around. It'd even cause issues as the
            // spanObserver would attempt to re-insert a dead frame in the
            // page.
            this.spanObserver.disconnect();
            return this.frameId;
        });
        // We don't need the iframe to be appended to the page in order to
        // resize it because we're just using the corresponding
        // input/textarea's size
        let rect = this.getElement().getBoundingClientRect();
        this.resizeTo(rect.width, rect.height, false);
        this.relativeX = 0;
        this.relativeY = 0;
        this.putEditorCloseToInputOrigin();
        // Use a ResizeObserver to detect when the underlying input element's
        // size changes and change the size of the FirenvimElement
        // accordingly
        this.resizeObserver = new (window.ResizeObserver)(((self) => async (entries) => {
            const entry = entries.find((ent) => ent.target === self.getElement());
            if (self.frameId === undefined) {
                await this.frameIdPromise;
            }
            if (entry) {
                const newRect = this.getElement().getBoundingClientRect();
                if (rect.width === newRect.width && rect.height === newRect.height) {
                    return;
                }
                rect = newRect;
                self.resizeTo(rect.width, rect.height, false);
                self.putEditorCloseToInputOrigin();
                self.resizeReqId += 1;
                browser.runtime.sendMessage({
                    args: {
                        frameId: self.frameId,
                        message: {
                            args: [self.resizeReqId, rect.width, rect.height],
                            funcName: ["resize"],
                        }
                    },
                    funcName: ["messageFrame"],
                });
            }
        })(this));
        this.resizeObserver.observe(this.getElement(), { box: "border-box" });
        this.iframe.src = browser.runtime.getURL("/index.html");
        this.span.attachShadow({ mode: "closed" }).appendChild(this.iframe);
        // So pages (e.g. Jira, Confluence) remove spans from the page as soon
        // as they're inserted. We don't want that, so for the 5 seconds
        // following the insertion, detect if the span is removed from the page
        // by checking visibility changes and re-insert if needed.
        let reinserts = 0;
        this.spanObserver = new MutationObserver((self => (mutations, observer) => {
            const span = self.getSpan();
            for (const mutation of mutations) {
                for (const node of mutation.removedNodes) {
                    if (node === span) {
                        reinserts += 1;
                        if (reinserts >= 10) {
                            console.error("Firenvim is trying to create an iframe on this site but the page is constantly removing it. Consider disabling Firenvim on this website.");
                            observer.disconnect();
                        }
                        else {
                            setTimeout(() => self.getElement().ownerDocument.body.appendChild(span), reinserts * 100);
                        }
                        return;
                    }
                }
            }
        })(this));
        this.spanObserver.observe(this.getElement().ownerDocument.body, { childList: true });
        let parentElement = this.getElement().ownerDocument.body;
        // We can't insert the frame in the body if the element we're going to
        // replace the content of is the body, as replacing the content would
        // destroy the frame.
        if (parentElement === this.getElement()) {
            parentElement = parentElement.parentElement;
        }
        parentElement.appendChild(this.span);
        this.focus();
        // It is pretty hard to tell when an element disappears from the page
        // (either by being removed or by being hidden by other elements), so
        // we use an intersection observer, which is triggered every time the
        // element becomes more or less visible.
        this.intersectionObserver = new IntersectionObserver((self => () => {
            const elem = self.getElement();
            // If elem doesn't have a rect anymore, it's hidden
            if (elem.getClientRects().length === 0) {
                self.hide();
            }
            else {
                self.show();
            }
        })(this), { root: null, threshold: 0.1 });
        this.intersectionObserver.observe(this.getElement());
        // We want to remove the FirenvimElement from the page when the
        // corresponding element is removed. We do this by adding a
        // mutationObserver to its parent.
        this.pageObserver = new MutationObserver((self => (mutations) => {
            const elem = self.getElement();
            mutations.forEach(mutation => mutation.removedNodes.forEach(node => {
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
                while (walker.nextNode()) {
                    if (walker.currentNode === elem) {
                        setTimeout(() => self.detachFromPage());
                    }
                }
            }));
        })(this));
        this.pageObserver.observe(document.documentElement, {
            subtree: true,
            childList: true
        });
    }
    clearFocusListeners() {
        // When the user tries to `:w | call firenvim#focus_page()` in Neovim,
        // we have a problem. `:w` results in a call to setPageElementContent,
        // which calls FirenvimElement.focus(), because some pages try to grab
        // focus when the content of the underlying element changes.
        // FirenvimElement.focus() creates event listeners and timeouts to
        // detect when the page tries to grab focus and bring it back to the
        // FirenvimElement. But since `call firenvim#focus_page()` happens
        // right after the `:w`, focus_page() triggers the event
        // listeners/timeouts created by FirenvimElement.focus()!
        // So we need a way to clear the timeouts and event listeners before
        // performing focus_page, and that's what this function does.
        this.focusInfo.finalRefocusTimeouts.forEach(t => clearTimeout(t));
        this.focusInfo.refocusTimeouts.forEach(t => clearTimeout(t));
        this.focusInfo.refocusRefs.forEach(f => {
            this.iframe.removeEventListener("blur", f);
            this.getElement().removeEventListener("focus", f);
        });
        this.focusInfo.finalRefocusTimeouts.length = 0;
        this.focusInfo.refocusTimeouts.length = 0;
        this.focusInfo.refocusRefs.length = 0;
    }
    detachFromPage() {
        this.clearFocusListeners();
        const elem = this.getElement();
        this.resizeObserver.unobserve(elem);
        this.intersectionObserver.unobserve(elem);
        this.pageObserver.disconnect();
        this.spanObserver.disconnect();
        this.span.remove();
        this.onDetach(this.frameId);
    }
    focus() {
        // Some inputs try to grab the focus again after we appended the iframe
        // to the page, so we need to refocus it each time it loses focus. But
        // the user might want to stop focusing the iframe at some point, so we
        // actually stop refocusing the iframe a second after it is created.
        const refocus = ((self) => () => {
            self.focusInfo.refocusTimeouts.push(setTimeout(() => {
                // First, destroy current selection. Some websites use the
                // selection to force-focus an element.
                const sel = document.getSelection();
                sel.removeAllRanges();
                const range = document.createRange();
                // There's a race condition in the testsuite on chrome that
                // results in self.span not being in the document and errors
                // being logged, so we check if self.span really is in its
                // ownerDocument.
                if (self.span.ownerDocument.contains(self.span)) {
                    range.setStart(self.span, 0);
                }
                range.collapse(true);
                sel.addRange(range);
                self.iframe.focus();
            }, 0));
        })(this);
        this.focusInfo.refocusRefs.push(refocus);
        this.iframe.addEventListener("blur", refocus);
        this.getElement().addEventListener("focus", refocus);
        this.focusInfo.finalRefocusTimeouts.push(setTimeout(() => {
            refocus();
            this.iframe.removeEventListener("blur", refocus);
            this.getElement().removeEventListener("focus", refocus);
        }, 100));
        refocus();
    }
    focusOriginalElement(addListener) {
        document.activeElement.blur();
        this.originalElement.removeEventListener("focus", this.nvimify);
        const sel = document.getSelection();
        sel.removeAllRanges();
        const range = document.createRange();
        if (this.originalElement.ownerDocument.contains(this.originalElement)) {
            range.setStart(this.originalElement, 0);
        }
        range.collapse(true);
        this.originalElement.focus();
        sel.addRange(range);
        if (addListener) {
            this.originalElement.addEventListener("focus", this.nvimify);
        }
    }
    getBufferInfo() {
        return this.bufferInfo;
    }
    getEditor() {
        return this.editor;
    }
    getElement() {
        return this.editor.getElement();
    }
    getPageElementContent() {
        return this.getEditor().getContent();
    }
    getPageElementCursor() {
        const p = this.editor.getCursor().catch(() => [1, 1]);
        p.then(c => this.cursor = c);
        return p;
    }
    getOriginalElement() {
        return this.originalElement;
    }
    getSelector() {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.computeSelector)(this.getElement());
    }
    getSpan() {
        return this.span;
    }
    hide() {
        this.iframe.style.display = "none";
    }
    isFocused() {
        return document.activeElement === this.span
            || document.activeElement === this.iframe;
    }
    prepareBufferInfo() {
        this.bufferInfo = (async () => [
            document.location.href,
            this.getSelector(),
            await this.getPageElementCursor(),
            await (this.editor.getLanguage().catch(() => undefined))
        ])();
    }
    pressKeys(keys) {
        const focused = this.isFocused();
        keys.forEach(ev => this.originalElement.dispatchEvent(ev));
        if (focused) {
            this.focus();
        }
    }
    putEditorCloseToInputOrigin() {
        const rect = this.editor.getElement().getBoundingClientRect();
        // Save attributes
        const posAttrs = ["left", "position", "top", "zIndex"];
        const oldPosAttrs = posAttrs.map((attr) => this.iframe.style[attr]);
        // Assign new values
        this.iframe.style.left = `${rect.left + window.scrollX + this.relativeX}px`;
        this.iframe.style.position = "absolute";
        this.iframe.style.top = `${rect.top + window.scrollY + this.relativeY}px`;
        // 2139999995 is hopefully higher than everything else on the page but
        // lower than Vimium's elements
        this.iframe.style.zIndex = "2139999995";
        // Compare, to know whether the element moved or not
        const posChanged = !!posAttrs.find((attr, index) => this.iframe.style[attr] !== oldPosAttrs[index]);
        return { posChanged, newRect: rect };
    }
    putEditorCloseToInputOriginAfterResizeFromFrame() {
        // This is a very weird, complicated and bad piece of code. All calls
        // to `resizeEditor()` have to result in a call to `resizeTo()` and
        // then `putEditorCloseToInputOrigin()` in order to make sure the
        // iframe doesn't overflow from the viewport.
        // However, when we create the iframe, we don't want it to fit in the
        // viewport at all cost. Instead, we want it to cover the underlying
        // input as much as possible. The problem is that when it is created,
        // the iframe will ask for a resize (because Neovim asks for one) and
        // will thus also accidentally call putEditorCloseToInputOrigin, which
        // we don't want to call.
        // So we have to track the calls to putEditorCloseToInputOrigin that
        // are made from the iframe (i.e. from `resizeEditor()`) and ignore the
        // first one.
        if (this.firstPutEditorCloseToInputOrigin) {
            this.relativeX = 0;
            this.relativeY = 0;
            this.firstPutEditorCloseToInputOrigin = false;
            return;
        }
        return this.putEditorCloseToInputOrigin();
    }
    // Resize the iframe, making sure it doesn't get larger than the window
    resizeTo(width, height, warnIframe) {
        // If the dimensions that are asked for are too big, make them as big
        // as the window
        let cantFullyResize = false;
        let availableWidth = window.innerWidth;
        if (availableWidth > document.documentElement.clientWidth) {
            availableWidth = document.documentElement.clientWidth;
        }
        if (width >= availableWidth) {
            width = availableWidth - 1;
            cantFullyResize = true;
        }
        let availableHeight = window.innerHeight;
        if (availableHeight > document.documentElement.clientHeight) {
            availableHeight = document.documentElement.clientHeight;
        }
        if (height >= availableHeight) {
            height = availableHeight - 1;
            cantFullyResize = true;
        }
        // The dimensions that were asked for might make the iframe overflow.
        // In this case, we need to compute how much we need to move the iframe
        // to the left/top in order to have it bottom-right corner sit right in
        // the window's bottom-right corner.
        const rect = this.editor.getElement().getBoundingClientRect();
        const rightOverflow = availableWidth - (rect.left + width);
        this.relativeX = rightOverflow < 0 ? rightOverflow : 0;
        const bottomOverflow = availableHeight - (rect.top + height);
        this.relativeY = bottomOverflow < 0 ? bottomOverflow : 0;
        // Now actually set the width/height, move the editor where it is
        // supposed to be and if the new iframe can't be as big as requested,
        // warn the iframe script.
        this.iframe.style.width = `${width}px`;
        this.iframe.style.height = `${height}px`;
        if (cantFullyResize && warnIframe) {
            this.resizeReqId += 1;
            browser.runtime.sendMessage({
                args: {
                    frameId: this.frameId,
                    message: {
                        args: [this.resizeReqId, width, height],
                        funcName: ["resize"],
                    }
                },
                funcName: ["messageFrame"],
            });
        }
    }
    sendKey(key) {
        return browser.runtime.sendMessage({
            args: {
                frameId: this.frameId,
                message: {
                    args: [key],
                    funcName: ["frame_sendKey"],
                }
            },
            funcName: ["messageFrame"],
        });
    }
    setPageElementContent(text) {
        const focused = this.isFocused();
        this.editor.setContent(text);
        [
            new Event("keydown", { bubbles: true }),
            new Event("keyup", { bubbles: true }),
            new Event("keypress", { bubbles: true }),
            new Event("beforeinput", { bubbles: true }),
            new Event("input", { bubbles: true }),
            new Event("change", { bubbles: true })
        ].forEach(ev => this.originalElement.dispatchEvent(ev));
        if (focused) {
            this.focus();
        }
    }
    setPageElementCursor(line, column) {
        let p = Promise.resolve();
        this.cursor[0] = line;
        this.cursor[1] = column;
        if (this.isFocused()) {
            p = this.editor.setCursor(line, column);
        }
        return p;
    }
    show() {
        this.iframe.style.display = "initial";
    }
}


/***/ }),

/***/ "./src/autofill.ts":
/*!*************************!*\
  !*** ./src/autofill.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autofill: () => (/* binding */ autofill)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
async function autofill() {
    const textarea = document.getElementById("issue_body");
    if (!textarea) {
        return;
    }
    const platInfoPromise = browser.runtime.sendMessage({
        args: {
            args: [],
            funcName: ["browser", "runtime", "getPlatformInfo"],
        },
        funcName: ["exec"],
    });
    const manifestPromise = browser.runtime.sendMessage({
        args: {
            args: [],
            funcName: ["browser", "runtime", "getManifest"],
        },
        funcName: ["exec"],
    });
    const nvimPluginPromise = browser.runtime.sendMessage({
        args: {},
        funcName: ["getNvimPluginVersion"],
    });
    const issueTemplatePromise = fetch(browser.runtime.getURL("ISSUE_TEMPLATE.md")).then(p => p.text());
    const browserString = navigator.userAgent.match(/(firefox|chrom)[^ ]+/gi);
    let name;
    let version;
    // Can't be tested, as coverage is only recorded on firefox
    /* istanbul ignore else */
    if (browserString) {
        [name, version] = browserString[0].split("/");
    }
    else {
        name = "unknown";
        version = "unknown";
    }
    const vendor = navigator.vendor || "";
    const [platInfo, manifest, nvimPluginVersion, issueTemplate,] = await Promise.all([platInfoPromise, manifestPromise, nvimPluginPromise, issueTemplatePromise]);
    // Can't happen, but doesn't cost much to handle!
    /* istanbul ignore next */
    if (textarea.value.replace(/\r/g, "") !== issueTemplate.replace(/\r/g, "")) {
        return;
    }
    textarea.value = issueTemplate
        .replace("OS Version:", `OS Version: ${platInfo.os} ${platInfo.arch}`)
        .replace("Browser Version:", `Browser Version: ${vendor} ${name} ${version}`)
        .replace("Browser Addon Version:", `Browser Addon Version: ${manifest.version}`)
        .replace("Neovim Plugin Version:", `Neovim Plugin Version: ${nvimPluginVersion}`);
}


/***/ }),

/***/ "./src/page.ts":
/*!*********************!*\
  !*** ./src/page.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageEventEmitter: () => (/* binding */ PageEventEmitter),
/* harmony export */   getActiveContentFunctions: () => (/* binding */ getActiveContentFunctions),
/* harmony export */   getNeovimFrameFunctions: () => (/* binding */ getNeovimFrameFunctions),
/* harmony export */   getPageProxy: () => (/* binding */ getPageProxy),
/* harmony export */   getTabFunctions: () => (/* binding */ getTabFunctions)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _utils_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/keys */ "./src/utils/keys.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");




/////////////////////////////////////////////
// Functions running in the content script //
/////////////////////////////////////////////
function _focusInput(global, firenvim, addListener) {
    if (addListener) {
        // Only re-add event listener if input's selector matches the ones
        // that should be autonvimified
        const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)();
        if (conf.selector && conf.selector !== "") {
            const elems = Array.from(document.querySelectorAll(conf.selector));
            addListener = elems.includes(firenvim.getElement());
        }
    }
    firenvim.focusOriginalElement(addListener);
}
function getFocusedElement(firenvimElems) {
    return Array
        .from(firenvimElems.values())
        .find(instance => instance.isFocused());
}
// Tab functions are functions all content scripts should react to
function getTabFunctions(global) {
    return {
        getActiveInstanceCount: () => global.firenvimElems.size,
        registerNewFrameId: (frameId) => {
            global.frameIdResolve(frameId);
        },
        setDisabled: (disabled) => {
            global.disabled = disabled;
        },
        setLastFocusedContentScript: (frameId) => {
            global.lastFocusedContentScript = frameId;
        }
    };
}
function isVisible(e) {
    const rect = e.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
// ActiveContent functions are functions only the active content script should react to
function getActiveContentFunctions(global) {
    return {
        forceNvimify: () => {
            let elem = document.activeElement;
            const isNull = elem === null || elem === undefined;
            const pageNotEditable = document.documentElement.contentEditable !== "true";
            const bodyNotEditable = (document.body.contentEditable === "false"
                || (document.body.contentEditable === "inherit"
                    && document.documentElement.contentEditable !== "true"));
            if (isNull
                || (elem === document.documentElement && pageNotEditable)
                || (elem === document.body && bodyNotEditable)) {
                elem = Array.from(document.getElementsByTagName("textarea"))
                    .find(isVisible);
                if (!elem) {
                    elem = Array.from(document.getElementsByTagName("input"))
                        .find(e => e.type === "text" && isVisible(e));
                }
                if (!elem) {
                    return;
                }
            }
            global.nvimify({ target: elem });
        },
        sendKey: (key) => {
            const firenvim = getFocusedElement(global.firenvimElems);
            if (firenvim !== undefined) {
                firenvim.sendKey(key);
            }
            else {
                // It's important to throw this error as the background script
                // will execute a fallback
                throw new Error("No firenvim frame selected");
            }
        },
    };
}
function focusElementBeforeOrAfter(global, frameId, i) {
    let firenvimElement;
    if (frameId === undefined) {
        firenvimElement = getFocusedElement(global.firenvimElems);
    }
    else {
        firenvimElement = global.firenvimElems.get(frameId);
    }
    const originalElement = firenvimElement.getOriginalElement();
    const tabindex = (e) => ((x => isNaN(x) ? 0 : x)(parseInt(e.getAttribute("tabindex"))));
    const focusables = Array.from(document.querySelectorAll("input, select, textarea, button, object, [tabindex], [href]"))
        .filter(e => e.getAttribute("tabindex") !== "-1")
        .sort((e1, e2) => tabindex(e1) - tabindex(e2));
    let index = focusables.indexOf(originalElement);
    let elem;
    if (index === -1) {
        // originalElement isn't in the list of focusables, so we have to
        // figure out what the closest element is. We do this by iterating over
        // all elements of the dom, accepting only originalElement and the
        // elements that are focusable. Once we find originalElement, we select
        // either the previous or next element depending on the value of i.
        const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
            acceptNode: n => ((n === originalElement || focusables.indexOf(n) !== -1)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT)
        });
        const firstNode = treeWalker.currentNode;
        let cur = firstNode;
        let prev;
        while (cur && cur !== originalElement) {
            prev = cur;
            cur = treeWalker.nextNode();
        }
        if (i > 0) {
            elem = treeWalker.nextNode();
        }
        else {
            elem = prev;
        }
        // Sanity check, can't be exercised
        /* istanbul ignore next */
        if (!elem) {
            elem = firstNode;
        }
    }
    else {
        elem = focusables[(index + i + focusables.length) % focusables.length];
    }
    index = focusables.indexOf(elem);
    // Sanity check, can't be exercised
    /* istanbul ignore next */
    if (index === -1) {
        throw "Oh my, something went wrong!";
    }
    // Now that we know we have an element that is in the focusable element
    // list, iterate over the list to find one that is visible.
    let startedAt;
    let style = getComputedStyle(elem);
    while (startedAt !== index && (style.visibility !== "visible" || style.display === "none")) {
        if (startedAt === undefined) {
            startedAt = index;
        }
        index = (index + i + focusables.length) % focusables.length;
        elem = focusables[index];
        style = getComputedStyle(elem);
    }
    document.activeElement.blur();
    const sel = document.getSelection();
    sel.removeAllRanges();
    const range = document.createRange();
    if (elem.ownerDocument.contains(elem)) {
        range.setStart(elem, 0);
    }
    range.collapse(true);
    elem.focus();
    sel.addRange(range);
}
function getNeovimFrameFunctions(global) {
    return {
        evalInPage: (_, js) => (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.executeInPage)(js),
        focusInput: (frameId) => {
            let firenvimElement;
            if (frameId === undefined) {
                firenvimElement = getFocusedElement(global.firenvimElems);
            }
            else {
                firenvimElement = global.firenvimElems.get(frameId);
            }
            _focusInput(global, firenvimElement, true);
        },
        focusPage: (frameId) => {
            const firenvimElement = global.firenvimElems.get(frameId);
            firenvimElement.clearFocusListeners();
            document.activeElement.blur();
            document.documentElement.focus();
        },
        focusNext: (frameId) => {
            focusElementBeforeOrAfter(global, frameId, 1);
        },
        focusPrev: (frameId) => {
            focusElementBeforeOrAfter(global, frameId, -1);
        },
        getEditorInfo: (frameId) => global
            .firenvimElems
            .get(frameId)
            .getBufferInfo(),
        getElementContent: (frameId) => global
            .firenvimElems
            .get(frameId)
            .getPageElementContent(),
        hideEditor: (frameId) => {
            const firenvim = global.firenvimElems.get(frameId);
            firenvim.hide();
            _focusInput(global, firenvim, true);
        },
        killEditor: (frameId) => {
            const firenvim = global.firenvimElems.get(frameId);
            const isFocused = firenvim.isFocused();
            firenvim.detachFromPage();
            const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)();
            if (isFocused) {
                _focusInput(global, firenvim, conf.takeover !== "once");
            }
            global.firenvimElems.delete(frameId);
        },
        pressKeys: (frameId, keys) => {
            global.firenvimElems.get(frameId).pressKeys((0,_utils_keys__WEBPACK_IMPORTED_MODULE_3__.keysToEvents)(keys));
        },
        resizeEditor: (frameId, width, height) => {
            const elem = global.firenvimElems.get(frameId);
            elem.resizeTo(width, height, true);
            elem.putEditorCloseToInputOriginAfterResizeFromFrame();
        },
        setElementContent: (frameId, text) => {
            return global.firenvimElems.get(frameId).setPageElementContent(text);
        },
        setElementCursor: (frameId, line, column) => {
            return global.firenvimElems.get(frameId).setPageElementCursor(line, column);
        },
    };
}
class PageEventEmitter extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
    constructor() {
        super();
        browser.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
            switch (request.funcName[0]) {
                case "pause_keyhandler":
                case "frame_sendKey":
                case "resize":
                    this.emit(request.funcName[0], request.args);
                    break;
                case "get_buf_content":
                    return new Promise(resolve => this.emit(request.funcName[0], resolve));
                case "evalInPage":
                case "resizeEditor":
                case "getElementContent":
                case "getEditorInfo":
                    // handled by frame function handler
                    break;
                default:
                    console.error("Unhandled page request:", request);
            }
        });
    }
}
function getPageProxy(frameId) {
    const page = new PageEventEmitter();
    let funcName;
    for (funcName in getNeovimFrameFunctions({})) {
        // We need to declare func here because funcName is a global and would not
        // be captured in the closure otherwise
        const func = funcName;
        page[func] = ((...arr) => {
            return browser.runtime.sendMessage({
                args: {
                    args: [frameId].concat(arr),
                    funcName: [func],
                },
                funcName: ["messagePage"],
            });
        });
    }
    return page;
}


/***/ }),

/***/ "./src/utils/configuration.ts":
/*!************************************!*\
  !*** ./src/utils/configuration.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   confReady: () => (/* binding */ confReady),
/* harmony export */   getConf: () => (/* binding */ getConf),
/* harmony export */   getConfForUrl: () => (/* binding */ getConfForUrl),
/* harmony export */   getGlobalConf: () => (/* binding */ getGlobalConf),
/* harmony export */   mergeWithDefaults: () => (/* binding */ mergeWithDefaults)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let conf = undefined;
function mergeWithDefaults(os, settings) {
    function makeDefaults(obj, name, value) {
        if (obj[name] === undefined) {
            obj[name] = value;
        }
        else if (typeof obj[name] !== typeof value
            || Array.isArray(obj[name]) !== Array.isArray(value)) {
            console.warn(`User config entry ${name} does not match expected type. Overriding.`);
            obj[name] = value;
        }
    }
    function makeDefaultLocalSetting(sett, site, obj) {
        makeDefaults(sett.localSettings, site, {});
        for (const key of Object.keys(obj)) {
            makeDefaults(sett.localSettings[site], key, obj[key]);
        }
    }
    if (settings === undefined) {
        settings = {};
    }
    makeDefaults(settings, "globalSettings", {});
    // "<KEY>": "default" | "noop"
    // #103: When using the browser's command API to allow sending `<C-w>` to
    // firenvim, whether the default action should be performed if no neovim
    // frame is focused.
    makeDefaults(settings.globalSettings, "<C-n>", "default");
    makeDefaults(settings.globalSettings, "<C-t>", "default");
    makeDefaults(settings.globalSettings, "<C-w>", "default");
    // Note: <CS-*> are currently disabled because of
    // https://github.com/neovim/neovim/issues/12037
    // Note: <CS-n> doesn't match the default behavior on firefox because this
    // would require the sessions API. Instead, Firefox's behavior matches
    // Chrome's.
    makeDefaults(settings.globalSettings, "<CS-n>", "default");
    // Note: <CS-t> is there for completeness sake's but can't be emulated in
    // Chrome and Firefox because this would require the sessions API.
    makeDefaults(settings.globalSettings, "<CS-t>", "default");
    makeDefaults(settings.globalSettings, "<CS-w>", "default");
    // #717: allow passing keys to the browser
    makeDefaults(settings.globalSettings, "ignoreKeys", {});
    // #1050: cursor sometimes covered by command line
    makeDefaults(settings.globalSettings, "cmdlineTimeout", 3000);
    // "alt": "all" | "alphanum"
    // #202: Only register alt key on alphanums to let swedish osx users type
    //       special chars
    // Only tested on OSX, where we don't pull coverage reports, so don't
    // instrument function.
    /* istanbul ignore next */
    if (os === "mac") {
        makeDefaults(settings.globalSettings, "alt", "alphanum");
    }
    else {
        makeDefaults(settings.globalSettings, "alt", "all");
    }
    makeDefaults(settings, "localSettings", {});
    makeDefaultLocalSetting(settings, ".*", {
        // "cmdline": "neovim" | "firenvim"
        // #168: Use an external commandline to preserve space
        cmdline: "firenvim",
        content: "text",
        priority: 0,
        renderer: "canvas",
        selector: 'textarea:not([readonly], [aria-readonly]), div[role="textbox"]',
        // "takeover": "always" | "once" | "empty" | "nonempty" | "never"
        // #265: On "once", don't automatically bring back after :q'ing it
        takeover: "always",
        filename: "{hostname%32}_{pathname%32}_{selector%32}_{timestamp%32}.{extension}",
    });
    return settings;
}
const confReady = new Promise(resolve => {
    browser.storage.local.get().then((obj) => {
        conf = obj;
        resolve(true);
    });
});
browser.storage.onChanged.addListener((changes) => {
    Object
        .entries(changes)
        .forEach(([key, value]) => confReady.then(() => {
        conf[key] = value.newValue;
    }));
});
function getGlobalConf() {
    // Can't be tested for
    /* istanbul ignore next */
    if (conf === undefined) {
        throw new Error("getGlobalConf called before config was ready");
    }
    return conf.globalSettings;
}
function getConf() {
    return getConfForUrl(document.location.href);
}
function getConfForUrl(url) {
    const localSettings = conf.localSettings;
    function or1(val) {
        if (val === undefined) {
            return 1;
        }
        return val;
    }
    // Can't be tested for
    /* istanbul ignore next */
    if (localSettings === undefined) {
        throw new Error("Error: your settings are undefined. Try reloading the page. If this error persists, try the troubleshooting guide: https://github.com/glacambre/firenvim/blob/master/TROUBLESHOOTING.md");
    }
    return Array.from(Object.entries(localSettings))
        .filter(([pat, _]) => (new RegExp(pat)).test(url))
        .sort((e1, e2) => (or1(e1[1].priority) - or1(e2[1].priority)))
        .reduce((acc, [_, cur]) => Object.assign(acc, cur), {});
}


/***/ }),

/***/ "./src/utils/keys.ts":
/*!***************************!*\
  !*** ./src/utils/keys.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addModifier: () => (/* binding */ addModifier),
/* harmony export */   keysToEvents: () => (/* binding */ keysToEvents),
/* harmony export */   nonLiteralKeys: () => (/* binding */ nonLiteralKeys),
/* harmony export */   translateKey: () => (/* binding */ translateKey)
/* harmony export */ });
const nonLiteralKeys = {
    " ": "<Space>",
    "<": "<lt>",
    "ArrowDown": "<Down>",
    "ArrowLeft": "<Left>",
    "ArrowRight": "<Right>",
    "ArrowUp": "<Up>",
    "Backspace": "<BS>",
    "Delete": "<Del>",
    "End": "<End>",
    "Enter": "<CR>",
    "Escape": "<Esc>",
    "F1": "<F1>",
    "F10": "<F10>",
    "F11": "<F11>",
    "F12": "<F12>",
    "F13": "<F13>",
    "F14": "<F14>",
    "F15": "<F15>",
    "F16": "<F16>",
    "F17": "<F17>",
    "F18": "<F18>",
    "F19": "<F19>",
    "F2": "<F2>",
    "F20": "<F20>",
    "F21": "<F21>",
    "F22": "<F22>",
    "F23": "<F23>",
    "F24": "<F24>",
    "F3": "<F3>",
    "F4": "<F4>",
    "F5": "<F5>",
    "F6": "<F6>",
    "F7": "<F7>",
    "F8": "<F8>",
    "F9": "<F9>",
    "Home": "<Home>",
    "PageDown": "<PageDown>",
    "PageUp": "<PageUp>",
    "Tab": "<Tab>",
    "\\": "<Bslash>",
    "|": "<Bar>",
};
const nonLiteralVimKeys = Object.fromEntries(Object
    .entries(nonLiteralKeys)
    .map(([x, y]) => [y, x]));
const nonLiteralKeyCodes = {
    "Enter": 13,
    "Space": 32,
    "Tab": 9,
    "Delete": 46,
    "End": 35,
    "Home": 36,
    "Insert": 45,
    "PageDown": 34,
    "PageUp": 33,
    "ArrowDown": 40,
    "ArrowLeft": 37,
    "ArrowRight": 39,
    "ArrowUp": 38,
    "Escape": 27,
};
// Given a "special" key representation (e.g. <Enter> or <M-l>), returns an
// array of three javascript keyevents, the first one representing the
// corresponding keydown, the second one a keypress and the third one a keyup
// event.
function modKeyToEvents(k) {
    let mods = "";
    let key = nonLiteralVimKeys[k];
    let ctrlKey = false;
    let altKey = false;
    let shiftKey = false;
    if (key === undefined) {
        const arr = k.slice(1, -1).split("-");
        mods = arr[0];
        key = arr[1];
        ctrlKey = /c/i.test(mods);
        altKey = /a/i.test(mods);
        const specialChar = "<" + key + ">";
        if (nonLiteralVimKeys[specialChar] !== undefined) {
            key = nonLiteralVimKeys[specialChar];
            shiftKey = false;
        }
        else {
            shiftKey = key !== key.toLocaleLowerCase();
        }
    }
    // Some pages rely on keyCodes to figure out what key was pressed. This is
    // awful because keycodes aren't guaranteed to be the same acrross
    // browsers/OS/keyboard layouts but try to do the right thing anyway.
    // https://github.com/glacambre/firenvim/issues/723
    let keyCode = 0;
    if (/^[a-zA-Z0-9]$/.test(key)) {
        keyCode = key.charCodeAt(0);
    }
    else if (nonLiteralKeyCodes[key] !== undefined) {
        keyCode = nonLiteralKeyCodes[key];
    }
    const init = { key, keyCode, ctrlKey, altKey, shiftKey, bubbles: true };
    return [
        new KeyboardEvent("keydown", init),
        new KeyboardEvent("keypress", init),
        new KeyboardEvent("keyup", init),
    ];
}
// Given a "simple" key (e.g. `a`, `1`…), returns an array of three javascript
// events representing the action of pressing the key.
function keyToEvents(key) {
    const shiftKey = key !== key.toLocaleLowerCase();
    return [
        new KeyboardEvent("keydown", { key, shiftKey, bubbles: true }),
        new KeyboardEvent("keypress", { key, shiftKey, bubbles: true }),
        new KeyboardEvent("keyup", { key, shiftKey, bubbles: true }),
    ];
}
// Given an array of string representation of keys (e.g. ["a", "<Enter>", …]),
// returns an array of javascript keyboard events that simulate these keys
// being pressed.
function keysToEvents(keys) {
    // Code to split mod keys and non-mod keys:
    // const keys = str.match(/([<>][^<>]+[<>])|([^<>]+)/g)
    // if (keys === null) {
    //     return [];
    // }
    return keys.map((key) => {
        if (key[0] === "<") {
            return modKeyToEvents(key);
        }
        return keyToEvents(key);
    }).flat();
}
// Turns a non-literal key (e.g. "Enter") into a vim-equivalent "<Enter>"
function translateKey(key) {
    if (nonLiteralKeys[key] !== undefined) {
        return nonLiteralKeys[key];
    }
    return key;
}
// Add modifier `mod` (`A`, `C`, `S`…) to `text` (a vim key `b`, `<Enter>`,
// `<CS-x>`…)
function addModifier(mod, text) {
    let match;
    let modifiers = "";
    let key = "";
    if ((match = text.match(/^<([A-Z]{1,5})-(.+)>$/))) {
        modifiers = match[1];
        key = match[2];
    }
    else if ((match = text.match(/^<(.+)>$/))) {
        key = match[1];
    }
    else {
        key = text;
    }
    return "<" + mod + modifiers + "-" + key + ">";
}


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computeSelector: () => (/* binding */ computeSelector),
/* harmony export */   executeInPage: () => (/* binding */ executeInPage),
/* harmony export */   getIconImageData: () => (/* binding */ getIconImageData),
/* harmony export */   isChrome: () => (/* binding */ isChrome),
/* harmony export */   languageToExtensions: () => (/* binding */ languageToExtensions),
/* harmony export */   parseGuifont: () => (/* binding */ parseGuifont),
/* harmony export */   parseSingleGuifont: () => (/* binding */ parseSingleGuifont),
/* harmony export */   toFileName: () => (/* binding */ toFileName),
/* harmony export */   toHexCss: () => (/* binding */ toHexCss)
/* harmony export */ });
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
let curHost;
// Chrome doesn't have a "browser" object, instead it uses "chrome".
if (window.location.protocol === "moz-extension:") {
    curHost = "firefox";
}
else if (window.location.protocol === "chrome-extension:") {
    curHost = "chrome";
}
else if (window.InstallTrigger === undefined) {
    curHost = "chrome";
}
else {
    curHost = "firefox";
}
// Only usable in background script!
function isChrome() {
    // Can't cover error condition
    /* istanbul ignore next */
    if (curHost === undefined) {
        throw Error("Used isChrome in content script!");
    }
    return curHost === "chrome";
}
// Runs CODE in the page's context by setting up a custom event listener,
// embedding a script element that runs the piece of code and emits its result
// as an event.
function executeInPage(code) {
    // On firefox, use an API that allows circumventing some CSP restrictions
    // Use wrappedJSObject to detect availability of said API
    // DON'T use window.eval on other plateforms - it doesn't have the
    // semantics we need!
    if (window.wrappedJSObject) {
        return new Promise((resolve, reject) => {
            try {
                resolve(window.eval(code));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        const eventId = (new URL(browser.runtime.getURL(""))).hostname + Math.random();
        script.innerHTML = `(async (evId) => {
            try {
                let result;
                result = await ${code};
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: {
                        success: true,
                        result,
                    }
                }));
            } catch (e) {
                window.dispatchEvent(new CustomEvent(evId, {
                    detail: { success: false, reason: e },
                }));
            }
        })(${JSON.stringify(eventId)})`;
        window.addEventListener(eventId, ({ detail }) => {
            script.parentNode.removeChild(script);
            if (detail.success) {
                return resolve(detail.result);
            }
            return reject(detail.reason);
        }, { once: true });
        document.head.appendChild(script);
    });
}
// Various filters that are used to change the appearance of the BrowserAction
// icon.
const svgpath = "firenvim.svg";
const transformations = {
    disabled: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Skip transparent pixels
            if (img[i + 3] === 0) {
                continue;
            }
            const mean = Math.floor((img[i] + img[i + 1] + img[i + 2]) / 3);
            img[i] = mean;
            img[i + 1] = mean;
            img[i + 2] = mean;
        }
    },
    error: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Turn transparent pixels red
            if (img[i + 3] === 0) {
                img[i] = 255;
                img[i + 3] = 255;
            }
        }
    },
    normal: ((_img) => undefined),
    notification: (img) => {
        for (let i = 0; i < img.length; i += 4) {
            // Turn transparent pixels yellow
            if (img[i + 3] === 0) {
                img[i] = 255;
                img[i + 1] = 255;
                img[i + 3] = 255;
            }
        }
    },
};
// Takes an icon kind and dimensions as parameter, draws that to a canvas and
// returns a promise that will be resolved with the canvas' image data.
function getIconImageData(kind, width = 32, height = 32) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image(width, height);
    const result = new Promise((resolve) => img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, width, height);
        const id = ctx.getImageData(0, 0, width, height);
        transformations[kind](id.data);
        resolve(id);
    }));
    img.src = svgpath;
    return result;
}
// Given a url and a selector, tries to compute a name that will be unique,
// short and readable for the user.
function toFileName(formatString, url, id, language) {
    const parsedURL = new URL(url);
    const sanitize = (s) => (s.match(/[a-zA-Z0-9]+/g) || []).join("-");
    const expand = (pattern) => {
        const noBrackets = pattern.slice(1, -1);
        const [symbol, length] = noBrackets.split("%");
        let value = "";
        switch (symbol) {
            case "hostname":
                value = parsedURL.hostname;
                break;
            case "pathname":
                value = sanitize(parsedURL.pathname);
                break;
            case "selector":
                value = sanitize(id.replace(/:nth-of-type/g, ""));
                break;
            case "timestamp":
                value = sanitize((new Date()).toISOString());
                break;
            case "extension":
                value = languageToExtensions(language);
                break;
            default: console.error(`Unrecognized filename pattern: ${pattern}`);
        }
        return value.slice(-length);
    };
    let result = formatString;
    const matches = formatString.match(/{[^}]*}/g);
    if (matches !== null) {
        for (const match of matches.filter(s => s !== undefined)) {
            result = result.replace(match, expand(match));
        }
    }
    return result;
}
// Given a language name, returns a filename extension. Can return undefined.
function languageToExtensions(language) {
    if (language === undefined || language === null) {
        language = "";
    }
    const lang = language.toLowerCase();
    /* istanbul ignore next */
    switch (lang) {
        case "apl": return "apl";
        case "brainfuck": return "bf";
        case "c": return "c";
        case "c#": return "cs";
        case "c++": return "cpp";
        case "ceylon": return "ceylon";
        case "clike": return "c";
        case "clojure": return "clj";
        case "cmake": return ".cmake";
        case "cobol": return "cbl";
        case "coffeescript": return "coffee";
        case "commonlisp": return "lisp";
        case "crystal": return "cr";
        case "css": return "css";
        case "cython": return "py";
        case "d": return "d";
        case "dart": return "dart";
        case "diff": return "diff";
        case "dockerfile": return "dockerfile";
        case "dtd": return "dtd";
        case "dylan": return "dylan";
        // Eiffel was there first but elixir seems more likely
        // case "eiffel":           return "e";
        case "elixir": return "e";
        case "elm": return "elm";
        case "erlang": return "erl";
        case "f#": return "fs";
        case "factor": return "factor";
        case "forth": return "fth";
        case "fortran": return "f90";
        case "gas": return "asm";
        case "go": return "go";
        // GFM: CodeMirror's github-flavored markdown
        case "gfm": return "md";
        case "groovy": return "groovy";
        case "haml": return "haml";
        case "handlebars": return "hbs";
        case "haskell": return "hs";
        case "haxe": return "hx";
        case "html": return "html";
        case "htmlembedded": return "html";
        case "htmlmixed": return "html";
        case "ipython": return "py";
        case "ipythonfm": return "md";
        case "java": return "java";
        case "javascript": return "js";
        case "jinja2": return "jinja";
        case "julia": return "jl";
        case "jsx": return "jsx";
        case "kotlin": return "kt";
        case "latex": return "latex";
        case "less": return "less";
        case "lua": return "lua";
        case "markdown": return "md";
        case "mllike": return "ml";
        case "ocaml": return "ml";
        case "octave": return "m";
        case "pascal": return "pas";
        case "perl": return "pl";
        case "php": return "php";
        case "powershell": return "ps1";
        case "python": return "py";
        case "r": return "r";
        case "rst": return "rst";
        case "ruby": return "ruby";
        case "rust": return "rs";
        case "sas": return "sas";
        case "sass": return "sass";
        case "scala": return "scala";
        case "scheme": return "scm";
        case "scss": return "scss";
        case "smalltalk": return "st";
        case "shell": return "sh";
        case "sql": return "sql";
        case "stex": return "latex";
        case "swift": return "swift";
        case "tcl": return "tcl";
        case "toml": return "toml";
        case "twig": return "twig";
        case "typescript": return "ts";
        case "vb": return "vb";
        case "vbscript": return "vbs";
        case "verilog": return "sv";
        case "vhdl": return "vhdl";
        case "xml": return "xml";
        case "yaml": return "yaml";
        case "z80": return "z8a";
    }
    return "txt";
}
// Make tslint happy
const fontFamily = "font-family";
// Can't be tested e2e :/
/* istanbul ignore next */
function parseSingleGuifont(guifont, defaults) {
    const options = guifont.split(":");
    const result = Object.assign({}, defaults);
    if (/^[a-zA-Z0-9]+$/.test(options[0])) {
        result[fontFamily] = options[0];
    }
    else {
        result[fontFamily] = JSON.stringify(options[0]);
    }
    if (defaults[fontFamily]) {
        result[fontFamily] += `, ${defaults[fontFamily]}`;
    }
    return options.slice(1).reduce((acc, option) => {
        switch (option[0]) {
            case "h":
                acc["font-size"] = `${option.slice(1)}pt`;
                break;
            case "b":
                acc["font-weight"] = "bold";
                break;
            case "i":
                acc["font-style"] = "italic";
                break;
            case "u":
                acc["text-decoration"] = "underline";
                break;
            case "s":
                acc["text-decoration"] = "line-through";
                break;
            case "w": // Can't set font width. Would have to adjust cell width.
            case "c": // Can't set character set
                break;
        }
        return acc;
    }, result);
}
// Parses a guifont declaration as described in `:h E244`
// defaults: default value for each of.
// Can't be tested e2e :/
/* istanbul ignore next */
function parseGuifont(guifont, defaults) {
    const fonts = guifont.split(",").reverse();
    return fonts.reduce((acc, cur) => parseSingleGuifont(cur, acc), defaults);
}
// Computes a unique selector for its argument.
function computeSelector(element) {
    function uniqueSelector(e) {
        // Only matching alphanumeric selectors because others chars might have special meaning in CSS
        if (e.id && e.id.match("^[a-zA-Z0-9_-]+$")) {
            const id = e.tagName + `[id="${e.id}"]`;
            if (document.querySelectorAll(id).length === 1) {
                return id;
            }
        }
        // If we reached the top of the document
        if (!e.parentElement) {
            return "HTML";
        }
        // Compute the position of the element
        const index = Array.from(e.parentElement.children)
            .filter(child => child.tagName === e.tagName)
            .indexOf(e) + 1;
        return `${uniqueSelector(e.parentElement)} > ${e.tagName}:nth-of-type(${index})`;
    }
    return uniqueSelector(element);
}
// Turns a number into its hash+6 number hexadecimal representation.
function toHexCss(n) {
    if (n === undefined)
        return undefined;
    const str = n.toString(16);
    // Pad with leading zeros
    return "#" + (new Array(6 - str.length)).fill("0").join("") + str;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeFunctions: () => (/* binding */ activeFunctions),
/* harmony export */   firenvimGlobal: () => (/* binding */ firenvimGlobal),
/* harmony export */   frameFunctions: () => (/* binding */ frameFunctions),
/* harmony export */   listenersSetup: () => (/* binding */ listenersSetup),
/* harmony export */   tabFunctions: () => (/* binding */ tabFunctions)
/* harmony export */ });
/* harmony import */ var _FirenvimElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FirenvimElement */ "./src/FirenvimElement.ts");
/* harmony import */ var _autofill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autofill */ "./src/autofill.ts");
/* harmony import */ var _utils_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/configuration */ "./src/utils/configuration.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* provided dependency */ var browser = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");




if (document.location.href.startsWith("https://github.com/")
    || document.location.protocol === "file:" && document.location.href.endsWith("github.html")) {
    addEventListener("load", _autofill__WEBPACK_IMPORTED_MODULE_1__.autofill);
    let lastUrl = location.href;
    // We have to use a MutationObserver to trigger autofill because Github
    // uses "progressive enhancement" and thus doesn't always trigger a load
    // event. But we can't always rely on the MutationObserver without the load
    // event because the MutationObserver won't be triggered on hard page
    // reloads!
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            if (lastUrl === "https://github.com/glacambre/firenvim/issues/new") {
                (0,_autofill__WEBPACK_IMPORTED_MODULE_1__.autofill)();
            }
        }
    }).observe(document, { subtree: true, childList: true });
}
// Promise used to implement a locking mechanism preventing concurrent creation
// of neovim frames
let frameIdLock = Promise.resolve();
const firenvimGlobal = {
    // Whether Firenvim is disabled in this tab
    disabled: browser.runtime.sendMessage({
        args: ["disabled"],
        funcName: ["getTabValue"],
    })
        // Note: this relies on setDisabled existing in the object returned by
        // getFunctions and attached to the window object
        .then((disabled) => window.setDisabled(disabled)),
    // Promise-resolution function called when a frameId is received from the
    // background script
    frameIdResolve: (_) => undefined,
    // lastFocusedContentScript keeps track of the last content frame that has
    // been focused. This is necessary in pages that contain multiple frames
    // (and thus multiple content scripts): for example, if users press the
    // global keyboard shortcut <C-n>, the background script sends a "global"
    // message to all of the active tab's content scripts. For a content script
    // to know if it should react to a global message, it just needs to check
    // if it is the last active content script.
    lastFocusedContentScript: 0,
    // nvimify: triggered when an element is focused, takes care of creating
    // the editor iframe, appending it to the page and focusing it.
    nvimify: async (evt) => {
        if (firenvimGlobal.disabled instanceof Promise) {
            await firenvimGlobal.disabled;
        }
        // When creating new frames, we need to know their frameId in order to
        // communicate with them. This can't be retrieved through a
        // synchronous, in-page call so the new frame has to tell the
        // background script to send its frame id to the page. Problem is, if
        // multiple frames are created in a very short amount of time, we
        // aren't guaranteed to receive these frameIds in the order in which
        // the frames were created. So we have to implement a locking mechanism
        // to make sure that we don't create new frames until we received the
        // frameId of the previously created frame.
        let lock;
        while (lock !== frameIdLock) {
            lock = frameIdLock;
            await frameIdLock;
        }
        frameIdLock = new Promise(async (unlock) => {
            // auto is true when nvimify() is called as an event listener, false
            // when called from forceNvimify()
            const auto = (evt instanceof FocusEvent);
            const takeover = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)().takeover;
            if (firenvimGlobal.disabled || (auto && takeover === "never")) {
                unlock();
                return;
            }
            const firenvim = new _FirenvimElement__WEBPACK_IMPORTED_MODULE_0__.FirenvimElement(evt.target, firenvimGlobal.nvimify, (id) => firenvimGlobal.firenvimElems.delete(id));
            const editor = firenvim.getEditor();
            // If this element already has a neovim frame, stop
            const alreadyRunning = Array.from(firenvimGlobal.firenvimElems.values())
                .find((instance) => instance.getElement() === editor.getElement());
            if (alreadyRunning !== undefined) {
                // The span might have been removed from the page by the page
                // (this happens on Jira/Confluence for example) so we check
                // for that.
                const span = alreadyRunning.getSpan();
                if (span.ownerDocument.contains(span)) {
                    alreadyRunning.show();
                    alreadyRunning.focus();
                    unlock();
                    return;
                }
                else {
                    // If the span has been removed from the page, the editor
                    // is dead because removing an iframe from the page kills
                    // the websocket connection inside of it.
                    // We just tell the editor to clean itself up and go on as
                    // if it didn't exist.
                    alreadyRunning.detachFromPage();
                }
            }
            if (auto && (takeover === "empty" || takeover === "nonempty")) {
                const content = (await editor.getContent()).trim();
                if ((content !== "" && takeover === "empty")
                    || (content === "" && takeover === "nonempty")) {
                    unlock();
                    return;
                }
            }
            firenvim.prepareBufferInfo();
            const frameIdPromise = new Promise((resolve, reject) => {
                firenvimGlobal.frameIdResolve = resolve;
                // TODO: make this timeout the same as the one in background.ts
                setTimeout(reject, 10000);
            });
            frameIdPromise.then((frameId) => {
                firenvimGlobal.firenvimElems.set(frameId, firenvim);
                firenvimGlobal.frameIdResolve = () => undefined;
                unlock();
            });
            frameIdPromise.catch(unlock);
            firenvim.attachToPage(frameIdPromise);
        });
    },
    // fienvimElems maps frame ids to firenvim elements.
    firenvimElems: new Map(),
};
const ownFrameId = browser.runtime.sendMessage({ args: [], funcName: ["getOwnFrameId"] });
async function announceFocus() {
    const frameId = await ownFrameId;
    firenvimGlobal.lastFocusedContentScript = frameId;
    browser.runtime.sendMessage({
        args: {
            args: [frameId],
            funcName: ["setLastFocusedContentScript"]
        },
        funcName: ["messagePage"]
    });
}
// When the frame is created, we might receive focus, check for that
ownFrameId.then(_ => {
    if (document.hasFocus()) {
        announceFocus();
    }
});
async function addFocusListener() {
    window.removeEventListener("focus", announceFocus);
    window.addEventListener("focus", announceFocus);
}
addFocusListener();
// We need to use setInterval to periodically re-add the focus listeners as in
// frames the document could get deleted and re-created without our knowledge.
const intervalId = setInterval(addFocusListener, 100);
// But we don't want to syphon the user's battery so we stop checking after a second
setTimeout(() => clearInterval(intervalId), 1000);
const frameFunctions = (0,_page__WEBPACK_IMPORTED_MODULE_3__.getNeovimFrameFunctions)(firenvimGlobal);
const activeFunctions = (0,_page__WEBPACK_IMPORTED_MODULE_3__.getActiveContentFunctions)(firenvimGlobal);
const tabFunctions = (0,_page__WEBPACK_IMPORTED_MODULE_3__.getTabFunctions)(firenvimGlobal);
Object.assign(window, frameFunctions, activeFunctions, tabFunctions);
browser.runtime.onMessage.addListener(async (request) => {
    // All content scripts must react to tab functions
    let fn = request.funcName.reduce((acc, cur) => acc[cur], tabFunctions);
    if (fn !== undefined) {
        return fn(...request.args);
    }
    // The only content script that should react to activeFunctions is the active one
    fn = request.funcName.reduce((acc, cur) => acc[cur], activeFunctions);
    if (fn !== undefined) {
        if (firenvimGlobal.lastFocusedContentScript === await ownFrameId) {
            return fn(...request.args);
        }
        return new Promise(() => undefined);
    }
    // The only content script that should react to frameFunctions is the one
    // that owns the frame that sent the request
    fn = request.funcName.reduce((acc, cur) => acc[cur], frameFunctions);
    if (fn !== undefined) {
        if (firenvimGlobal.firenvimElems.get(request.args[0]) !== undefined) {
            return fn(...request.args);
        }
        return new Promise(() => undefined);
    }
    throw new Error(`Error: unhandled content request: ${JSON.stringify(request)}.`);
});
function onScroll(cont) {
    window.requestAnimationFrame(() => {
        const posChanged = Array.from(firenvimGlobal.firenvimElems.entries())
            .map(([_, elem]) => elem.putEditorCloseToInputOrigin())
            .find(changed => changed.posChanged);
        if (posChanged) {
            // As long as one editor changes position, try to resize
            onScroll(true);
        }
        else if (cont) {
            // No editor has moved, but this might be because the website
            // implements some kind of smooth scrolling that doesn't make
            // the textarea move immediately. In order to deal with these
            // cases, schedule a last redraw in a few milliseconds
            setTimeout(() => onScroll(false), 100);
        }
    });
}
function doScroll() {
    return onScroll(true);
}
function addNvimListener(elem) {
    elem.removeEventListener("focus", firenvimGlobal.nvimify);
    elem.addEventListener("focus", firenvimGlobal.nvimify);
    let parent = elem.parentElement;
    while (parent) {
        parent.removeEventListener("scroll", doScroll);
        parent.addEventListener("scroll", doScroll);
        parent = parent.parentElement;
    }
}
function setupListeners(selector) {
    window.addEventListener("scroll", doScroll);
    window.addEventListener("wheel", doScroll);
    (new (window.ResizeObserver)((_) => {
        onScroll(true);
    })).observe(document.documentElement);
    (new MutationObserver((changes, _) => {
        if (changes.filter(change => change.addedNodes.length > 0).length <= 0) {
            return;
        }
        // This mutation observer is triggered every time an element is
        // added/removed from the page. When this happens, try to apply
        // listeners again, in case a new textarea/input field has been added.
        const toPossiblyNvimify = Array.from(document.querySelectorAll(selector));
        toPossiblyNvimify.forEach(elem => addNvimListener(elem));
        const takeover = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)().takeover;
        function shouldNvimify(node) {
            // Ideally, the takeover !== "never" check shouldn't be performed
            // here: it should live in nvimify(). However, nvimify() only
            // checks for takeover === "never" if it is called from an event
            // handler (this is necessary in order to allow manually nvimifying
            // elements). Thus, we need to check if takeover !== "never" here
            // too.
            return takeover !== "never"
                && document.activeElement === node
                && toPossiblyNvimify.includes(node);
        }
        // We also need to check if the currently focused element is among the
        // newly created elements and if it is, nvimify it.
        // Note that we can't do this unconditionally: we would turn the active
        // element into a neovim frame even for unrelated dom changes.
        for (const mr of changes) {
            for (const node of mr.addedNodes) {
                if (shouldNvimify(node)) {
                    activeFunctions.forceNvimify();
                    return;
                }
                const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
                while (walker.nextNode()) {
                    if (shouldNvimify(walker.currentNode)) {
                        activeFunctions.forceNvimify();
                        return;
                    }
                }
            }
        }
    })).observe(window.document, { subtree: true, childList: true });
    let elements;
    try {
        elements = Array.from(document.querySelectorAll(selector));
    }
    catch {
        alert(`Firenvim error: invalid CSS selector (${selector}) in your g:firenvim_config.`);
        elements = [];
    }
    elements.forEach(elem => addNvimListener(elem));
}
const listenersSetup = new Promise(resolve => {
    _utils_configuration__WEBPACK_IMPORTED_MODULE_2__.confReady.then(() => {
        const conf = (0,_utils_configuration__WEBPACK_IMPORTED_MODULE_2__.getConf)();
        if (conf.selector !== undefined && conf.selector !== "") {
            setupListeners(conf.selector);
        }
        resolve(undefined);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsV0FBVyxxQ0FBcUM7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCw0QkFBNEI7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx5QkFBeUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUNBQWlDLElBQUksVUFBVSxlQUFlLE1BQU07QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsY0FBYztBQUNkO0FBQ0EsOEJBQThCLDJCQUEyQjtBQUN6RCxpQkFBaUI7QUFDakI7QUFDQSxTQUFTLElBQUksd0JBQXdCO0FBQ3JDLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUksWUFBWTtBQUN6QjtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxhQUFhLElBQUkscURBQXFELHVCQUF1QixxQkFBcUI7QUFDL0o7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Y0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy9lZGl0b3ItYWRhcHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL25vZGVfbW9kdWxlcy93ZWJleHRlbnNpb24tcG9seWZpbGwvZGlzdC9icm93c2VyLXBvbHlmaWxsLmpzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL0V2ZW50RW1pdHRlci50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9GaXJlbnZpbUVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvYXV0b2ZpbGwudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvcGFnZS50cyIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy91dGlscy9jb25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL0ZpcmVudmltLy4vc3JjL3V0aWxzL2tleXMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vLi9zcmMvdXRpbHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0ZpcmVudmltL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRmlyZW52aW0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9GaXJlbnZpbS8uL3NyYy9jb250ZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHZW5lcmljQWJzdHJhY3RFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKF9lLCBfb3B0aW9ucykgeyB9XG4gICAgO1xuICAgIHN0YXRpYyBtYXRjaGVzKF8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWF0Y2hlcyBmdW5jdGlvbiBub3Qgb3ZlcnJpZGVuXCIpO1xuICAgIH1cbiAgICA7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNsYXNzIEFjZUVkaXRvciBleHRlbmRzIEdlbmVyaWNBYnN0cmFjdEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoZSwgX29wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoZSwgX29wdGlvbnMpO1xuICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgc3RyaW5naWZpZWQgYW5kIGluc2VydGVkIGluIHBhZ2UgY29udGV4dCBzbyB3ZVxuICAgICAgICAvLyBjYW4ndCBpbnN0cnVtZW50IGl0LlxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0aGlzLmdldEFjZSA9IChzZWxlYykgPT4ge1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldENvbnRlbnQgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgYWNlID0gZWxlbS5hY2VFZGl0b3IgfHwgdW53cmFwKHdpbmRvdykuYWNlLmVkaXQoZWxlbSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChhY2UuZ2V0VmFsdWUoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgaWYgKGFjZS5nZXRDdXJzb3JQb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBhY2UuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gYWNlLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW3dyYXAocG9zaXRpb24ucm93KSArIDEsIHdyYXAocG9zaXRpb24uY29sdW1uKV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0TGFuZ3VhZ2UgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgYWNlID0gZWxlbS5hY2VFZGl0b3IgfHwgdW53cmFwKHdpbmRvdykuYWNlLmVkaXQoZWxlbSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChhY2Uuc2Vzc2lvbi4kbW9kZUlkKS5zcGxpdChcIi9cIikuc2xpY2UoLTEpWzBdO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldENvbnRlbnQgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgdGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgYWNlID0gZWxlbS5hY2VFZGl0b3IgfHwgdW53cmFwKHdpbmRvdykuYWNlLmVkaXQoZWxlbSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChhY2Uuc2V0VmFsdWUodGV4dCwgMSkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwLCBsaW5lLCBjb2x1bW4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGFjZSA9IGVsZW0uYWNlRWRpdG9yIHx8IHVud3JhcCh3aW5kb3cpLmFjZS5lZGl0KGVsZW0pO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gYWNlLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoc2VsZWN0aW9uLm1vdmVDdXJzb3JUbyhsaW5lIC0gMSwgY29sdW1uLCBmYWxzZSkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW0gPSBlO1xuICAgICAgICAvLyBHZXQgdGhlIHRvcG1vc3QgYWNlIGVsZW1lbnRcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB3aGlsZSAoQWNlRWRpdG9yLm1hdGNoZXMocGFyZW50KSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gcGFyZW50O1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG1hdGNoZXMoZSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoKC9hY2VfZWRpdG9yL2dpKS50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjbGFzcyBDb2RlTWlycm9yNkVkaXRvciBleHRlbmRzIEdlbmVyaWNBYnN0cmFjdEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5jbVZpZXcudmlldy5zdGF0ZS5kb2MudG9TdHJpbmcoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdW53cmFwKGVsZW0pLmNtVmlldy52aWV3LnN0YXRlLnNlbGVjdGlvbi5tYWluLmhlYWQ7XG4gICAgICAgICAgICByZXR1cm4gW3dyYXAocG9zaXRpb24ubGluZSksIHdyYXAocG9zaXRpb24uY2gpXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRMYW5ndWFnZSA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuZGF0YXNldC5sYW5ndWFnZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwLCB0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gdW53cmFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbGVtLmNtVmlldy52aWV3LnN0YXRlLmRvYy5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChlbGVtLmNtVmlldy52aWV3LmRpc3BhdGNoKHsgY2hhbmdlczogeyBmcm9tOiAwLCB0bzogbGVuZ3RoLCBpbnNlcnQ6IHRleHQgfSB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXAsIGxpbmUsIGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHVud3JhcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChlbGVtLnZtVmlldy52aWV3LmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yOiBlbGVtLmNtVmlldy52aWV3LmRvYy5saW5lKGxpbmUpICsgY29sdW1uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW0gPSBlO1xuICAgICAgICAvLyBHZXQgdGhlIHRvcG1vc3QgQ29kZU1pcnJvciBlbGVtZW50XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgd2hpbGUgKENvZGVNaXJyb3I2RWRpdG9yLm1hdGNoZXMocGFyZW50KSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gcGFyZW50O1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG1hdGNoZXMoZSkge1xuICAgICAgICBsZXQgcGFyZW50ID0gZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoKC9eKC4qICk/Y20tY29udGVudC9naSkudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY2xhc3MgQ29kZU1pcnJvckVkaXRvciBleHRlbmRzIEdlbmVyaWNBYnN0cmFjdEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5Db2RlTWlycm9yLmdldFZhbHVlKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEN1cnNvciA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHVud3JhcChlbGVtKS5Db2RlTWlycm9yLmdldEN1cnNvcigpO1xuICAgICAgICAgICAgcmV0dXJuIFt3cmFwKHBvc2l0aW9uLmxpbmUpICsgMSwgd3JhcChwb3NpdGlvbi5jaCldO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldExhbmd1YWdlID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5Db2RlTWlycm9yLmdldE1vZGUoKS5uYW1lKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXAsIHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHVud3JhcChlbGVtKS5Db2RlTWlycm9yLnNldFZhbHVlKHRleHQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCwgbGluZSwgY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICByZXR1cm4gd3JhcCh1bndyYXAoZWxlbSkuQ29kZU1pcnJvci5zZXRDdXJzb3IoeyBsaW5lOiBsaW5lIC0gMSwgY2g6IGNvbHVtbiB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZWxlbSA9IGU7XG4gICAgICAgIC8vIEdldCB0aGUgdG9wbW9zdCBDb2RlTWlycm9yIGVsZW1lbnRcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB3aGlsZSAoQ29kZU1pcnJvckVkaXRvci5tYXRjaGVzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBtYXRjaGVzKGUpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgvXiguKiApP0NvZGVNaXJyb3IvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNsYXNzIE1vbmFjb0VkaXRvciBleHRlbmRzIEdlbmVyaWNBYnN0cmFjdEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihlLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKHNlbGVjdG9yLCB3cmFwLCB1bndyYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IHVyaSA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIik7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHVud3JhcCh3aW5kb3cpLm1vbmFjby5lZGl0b3IuZ2V0TW9kZWwodXJpKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKG1vZGVsLmdldFZhbHVlKCkpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBJdCdzIGltcG9zc2libGUgdG8gZ2V0IE1vbmFjbydzIGN1cnNvciBwb3NpdGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9tb25hY28tZWRpdG9yL2lzc3Vlcy8yNThcbiAgICAgICAgdGhpcy5nZXRDdXJzb3IgPSBhc3luYyAoc2VsZWN0b3IsIHdyYXAsIHVud3JhcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFsxLCAwXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRMYW5ndWFnZSA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB1bndyYXAod2luZG93KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChtb2RlbC5nZXRNb2RlSWQoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q29udGVudCA9IGFzeW5jIChzZWxlY3Rvciwgd3JhcCwgdW53cmFwLCB0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdXJpXCIpO1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB1bndyYXAod2luZG93KS5tb25hY28uZWRpdG9yLmdldE1vZGVsKHVyaSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcChtb2RlbC5zZXRWYWx1ZSh0ZXh0KSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEl0J3MgaW1wb3NzaWJsZSB0byBzZXQgTW9uYWNvJ3MgY3Vyc29yIHBvc2l0aW9uOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L21vbmFjby1lZGl0b3IvaXNzdWVzLzI1OFxuICAgICAgICB0aGlzLnNldEN1cnNvciA9IGFzeW5jIChfc2VsZWN0b3IsIF93cmFwLCBfdW53cmFwLCBfbGluZSwgX2NvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICAgICAgLy8gRmluZCB0aGUgbW9uYWNvIGVsZW1lbnQgdGhhdCBob2xkcyB0aGUgZGF0YVxuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlICghKHRoaXMuZWxlbS5jbGFzc05hbWUubWF0Y2goL21vbmFjby1lZGl0b3IvZ2kpXG4gICAgICAgICAgICAmJiB0aGlzLmVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS11cmlcIikubWF0Y2goXCJmaWxlOi8vfGlubWVtb3J5Oi8vfGdpdGxhYjpcIikpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSBwYXJlbnQ7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgbWF0Y2hlcyhlKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICgoL21vbmFjby1lZGl0b3IvZ2kpLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4vLyBUZXh0YXJlYUVkaXRvciBzb3J0IG9mIHdvcmtzIGZvciBjb250ZW50RWRpdGFibGUgZWxlbWVudHMgYnV0IHRoZXJlIHNob3VsZFxuLy8gcmVhbGx5IGJlIGEgY29udGVudGVkaXRhYmxlLXNwZWNpZmljIGVkaXRvci5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFFZGl0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmVsZW0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcmVmZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmVsZW0uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5lbGVtLmlubmVyVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q3Vyc29yID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5lbGVtLnNlbGVjdGlvblN0YXJ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmVsZW0uc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgICAgIC8vIFNpZnQgdGhyb3VnaCB0aGUgdGV4dCwgY291bnRpbmcgY29sdW1ucyBhbmQgbmV3IGxpbmVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY3Vyc29yID0gMDsgY3Vyc29yIDwgc2VsZWN0aW9uU3RhcnQ7ICsrY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiArPSB0ZXh0LmNoYXJDb2RlQXQoY3Vyc29yKSA8IDB4N0YgPyAxIDogMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRbY3Vyc29yXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW2xpbmUsIGNvbHVtbl07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRMYW5ndWFnZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJlZmVySFRNTCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ2h0bWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50ID0gYXN5bmMgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbS52YWx1ZSA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnByZWZlckhUTUwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yID0gYXN5bmMgKGxpbmUsIGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udGVudCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IDA7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGxpbmUgdGhlIGN1cnNvciBzaG91bGQgYmUgcHV0IG9uXG4gICAgICAgICAgICAgICAgd2hpbGUgKGxpbmUgPiAxICYmIGNoYXJhY3RlciA8IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2NoYXJhY3Rlcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGNoYXJhY3RlciBhZnRlciB3aGljaCB0aGUgY3Vyc29yIHNob3VsZCBiZSBtb3ZlZFxuICAgICAgICAgICAgICAgIC8vIE5vdGU6IHdlIGRvbid0IGRvIGNvbHVtbiA9IGNvbHVtbm4gKyBjaGFyYWN0ZXIgYmVjYXVzZSBjb2x1bW5cbiAgICAgICAgICAgICAgICAvLyBtaWdodCBiZSBsYXJnZXIgdGhhbiBhY3R1YWwgbGluZSBsZW5ndGggYW5kIGl0J3MgYmV0dGVyIHRvIGJlIG9uXG4gICAgICAgICAgICAgICAgLy8gdGhlIHJpZ2h0IGxpbmUgYnV0IG9uIHRoZSB3cm9uZyBjb2x1bW4gdGhhbiBvbiB0aGUgd3JvbmcgbGluZVxuICAgICAgICAgICAgICAgIC8vIGFuZCB3cm9uZyBjb2x1bW4uXG4gICAgICAgICAgICAgICAgLy8gTW9yZW92ZXIsIGNvbHVtbiBpcyBhIG51bWJlciBvZiBVVEYtOCBieXRlcyBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgICAgICAvLyBvZiB0aGUgbGluZSB0byB0aGUgY3Vyc29yLiBIb3dldmVyLCBqYXZhc2NyaXB0IHVzZXMgVVRGLTE2LFxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGlzIDIgYnl0ZXMgcGVyIG5vbi1hc2NpaSBjaGFyYWN0ZXIuIFNvIHdoZW4gd2UgZmluZCBhXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyIHRoYXQgaXMgbW9yZSB0aGFuIDEgYnl0ZSBsb25nLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGF0XG4gICAgICAgICAgICAgICAgLy8gYW1vdW50IGZyb20gY29sdW1uLCBidXQgb25seSB0d28gY2hhcmFjdGVycyBmcm9tIENIQVJBQ1RFUiFcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29sdW1uID4gMCAmJiBjaGFyYWN0ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDYW4ndCBoYXBwZW4sIGJ1dCBiZXR0ZXIgYmUgc2FmZSB0aGFuIHNvcnJ5XG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0W2NoYXJhY3Rlcl0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoY2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUgPD0gMHg3Zikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA8PSAweDdmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA+PSAweGQ4MDAgJiYgY29kZSA8PSAweGRmZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA8IDB4ZmZmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uIC09IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gLT0gNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbS5zZXRTZWxlY3Rpb25SYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbS5zZXRTZWxlY3Rpb25SYW5nZShjaGFyYWN0ZXIsIGNoYXJhY3Rlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5lbGVtID0gZTtcbiAgICB9XG4gICAgc3RhdGljIG1hdGNoZXMoXykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vLyBDb21wdXRlcyBhIHVuaXF1ZSBzZWxlY3RvciBmb3IgaXRzIGFyZ3VtZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVTZWxlY3RvcihlbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gdW5pcXVlU2VsZWN0b3IoZSkge1xuICAgICAgICAvLyBPbmx5IG1hdGNoaW5nIGFscGhhbnVtZXJpYyBzZWxlY3RvcnMgYmVjYXVzZSBvdGhlcnMgY2hhcnMgbWlnaHQgaGF2ZSBzcGVjaWFsIG1lYW5pbmcgaW4gQ1NTXG4gICAgICAgIGlmIChlLmlkICYmIGUuaWQubWF0Y2goXCJeW2EtekEtWjAtOV8tXSskXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFnTmFtZSArIGBbaWQ9XCIke2UuaWR9XCJdYDtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGlkKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICBpZiAoIWUucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiSFRNTFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXkuZnJvbShlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnRhZ05hbWUgPT09IGUudGFnTmFtZSlcbiAgICAgICAgICAgIC5pbmRleE9mKGUpICsgMTtcbiAgICAgICAgcmV0dXJuIGAke3VuaXF1ZVNlbGVjdG9yKGUucGFyZW50RWxlbWVudCl9ID4gJHtlLnRhZ05hbWV9Om50aC1vZi10eXBlKCR7aW5kZXh9KWA7XG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVTZWxlY3RvcihlbGVtZW50KTtcbn1cbi8vIFJ1bnMgQ09ERSBpbiB0aGUgcGFnZSdzIGNvbnRleHQgYnkgc2V0dGluZyB1cCBhIGN1c3RvbSBldmVudCBsaXN0ZW5lcixcbi8vIGVtYmVkZGluZyBhIHNjcmlwdCBlbGVtZW50IHRoYXQgcnVucyB0aGUgcGllY2Ugb2YgY29kZSBhbmQgZW1pdHMgaXRzIHJlc3VsdFxuLy8gYXMgYW4gZXZlbnQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVJblBhZ2UoY29kZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIGNvbnN0IGV2ZW50SWQgPSBgJHtNYXRoLnJhbmRvbSgpfWA7XG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBgKGFzeW5jIChldklkKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCB1bndyYXAgPSB4ID0+IHg7XG4gICAgICAgICAgICAgICAgbGV0IHdyYXAgPSB4ID0+IHg7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCAke2NvZGV9O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldklkLCB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgc3VjY2VzczogZmFsc2UsIHJlYXNvbjogZSB9LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoJHtKU09OLnN0cmluZ2lmeShldmVudElkKX0pYDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRJZCwgKHsgZGV0YWlsIH0pID0+IHtcbiAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICBpZiAoZGV0YWlsLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkZXRhaWwucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZGV0YWlsLnJlYXNvbik7XG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcCh4KSB7XG4gICAgaWYgKHdpbmRvdy53cmFwcGVkSlNPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHgud3JhcHBlZEpTT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4geDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwKHgpIHtcbiAgICBpZiAod2luZG93LlhQQ05hdGl2ZVdyYXBwZXIpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5YUENOYXRpdmVXcmFwcGVyKHgpO1xuICAgIH1cbiAgICByZXR1cm4geDtcbn1cbjtcbi8qIFdBUk5JTkc6IGNvZGVNaXJyb3I2IG9ubHkgd29ya3MgaW4gY2hyb21lIGJhc2VkIGJyb3dzZXJzIGZvciBub3cuIExlYXZlIGl0XG4gKiB0byBmYWxzZSBvciB1bmRlZmluZWQgaW4gRmlyZWZveC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZGl0b3IoZWxlbSwgb3B0aW9ucykge1xuICAgIGxldCBlZGl0b3I7XG4gICAgbGV0IGNsYXNzZXMgPSBbQWNlRWRpdG9yLCBDb2RlTWlycm9yRWRpdG9yLCBNb25hY29FZGl0b3JdO1xuICAgIGlmIChvcHRpb25zLmNvZGVNaXJyb3I2RW5hYmxlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goQ29kZU1pcnJvcjZFZGl0b3IpO1xuICAgIH1cbiAgICBmb3IgKGxldCBjbGF6eiBvZiBjbGFzc2VzKSB7XG4gICAgICAgIGlmIChjbGF6ei5tYXRjaGVzKGVsZW0pKSB7XG4gICAgICAgICAgICBlZGl0b3IgPSBjbGF6ejtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChlZGl0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRhcmVhRWRpdG9yKGVsZW0sIG9wdGlvbnMpO1xuICAgIH1cbiAgICBsZXQgZWQgPSBuZXcgZWRpdG9yKGVsZW0sIG9wdGlvbnMpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHdpbmRvdy53cmFwcGVkSlNPYmplY3QpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFByb3h5KGVkLCB7XG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXShjb21wdXRlU2VsZWN0b3IodGFyZ2V0LmdldEVsZW1lbnQoKSksIHdyYXAsIHVud3JhcCwgLi4uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFByb3h5KGVkLCB7XG4gICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gXCJnZXRFbGVtZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGVjdXRlSW5QYWdlKGAoJHt0YXJnZXRbcHJvcF19KSgke0pTT04uc3RyaW5naWZ5KGNvbXB1dGVTZWxlY3Rvcih0YXJnZXQuZ2V0RWxlbWVudCgpKSl9LCB4ID0+IHgsIHggPT4geCwgLi4uJHtKU09OLnN0cmluZ2lmeShhcmdzKX0pYCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIiwgW1wibW9kdWxlXCJdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGZhY3RvcnkobW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kKTtcbiAgICBnbG9iYWwuYnJvd3NlciA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbiAobW9kdWxlKSB7XG4gIC8qIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCAtIHYwLjEwLjAgLSBGcmkgQXVnIDEyIDIwMjIgMTk6NDI6NDQgKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKCFnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHNjcmlwdCBzaG91bGQgb25seSBiZSBsb2FkZWQgaW4gYSBicm93c2VyIGV4dGVuc2lvbi5cIik7XG4gIH1cblxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsVGhpcy5icm93c2VyKSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgIGNvbnN0IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSA9IFwiVGhlIG1lc3NhZ2UgcG9ydCBjbG9zZWQgYmVmb3JlIGEgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9OyAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdyYXBBUElzKGNocm9tZSk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLmJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsIlxuZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlcjxUIGV4dGVuZHMgc3RyaW5nLCBVIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPiB7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnMgPSBuZXcgTWFwPFQsIFVbXT4oKTtcblxuICAgIG9uKGV2ZW50OiBULCBoYW5kbGVyOiBVKSB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMubGlzdGVuZXJzLmdldChldmVudCk7XG4gICAgICAgIGlmIChoYW5kbGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoYW5kbGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuc2V0KGV2ZW50LCBoYW5kbGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICB9XG5cbiAgICBlbWl0KGV2ZW50OiBULCAuLi5kYXRhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVycy5nZXQoZXZlbnQpO1xuICAgICAgICBpZiAoaGFuZGxlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzIDogRXJyb3JbXSA9IFtdO1xuICAgICAgICAgICAgaGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIoLi4uZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8qIEVycm9yIGNvbmRpdGlvbnMgaGVyZSBhcmUgaW1wb3NzaWJsZSB0byB0ZXN0IGZvciBmcm9tIHNlbGVuaXVtXG4gICAgICAgICAgICAgKiBiZWNhdXNlIGl0IHdvdWxkIGFyaXNlIGZyb20gdGhlIHdyb25nIHVzZSBvZiB0aGUgQVBJLCB3aGljaCB3ZVxuICAgICAgICAgICAgICogY2FuJ3Qgc2hpcCBpbiB0aGUgZXh0ZW5zaW9uLCBzbyBkb24ndCB0cnkgdG8gaW5zdHJ1bWVudC4gKi9cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnZXRDb25mIH0gZnJvbSBcIi4vdXRpbHMvY29uZmlndXJhdGlvblwiXG5pbXBvcnQgeyBjb21wdXRlU2VsZWN0b3IsIGlzQ2hyb21lIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEFic3RyYWN0RWRpdG9yIH0gZnJvbSBcImVkaXRvci1hZGFwdGVyL0Fic3RyYWN0RWRpdG9yXCI7XG5pbXBvcnQgeyBnZXRFZGl0b3IgfSBmcm9tIFwiZWRpdG9yLWFkYXB0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIEZpcmVudmltRWxlbWVudCB7XG5cbiAgICAvLyBlZGl0b3IgaXMgYW4gb2JqZWN0IHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIHRvIGludGVyYWN0IChlLmcuXG4gICAgLy8gcmV0cmlldmUvc2V0IGNvbnRlbnQsIHJldHJpZXZlL3NldCBjdXJzb3IgcG9zaXRpb24pIGNvbnNpc3RlbnRseSB3aXRoXG4gICAgLy8gdW5kZXJseWluZyBlbGVtZW50cyAoYmUgdGhleSBzaW1wbGUgdGV4dGFyZWFzLCBDb2RlTWlycm9yIGVsZW1lbnRzIG9yXG4gICAgLy8gb3RoZXIpLlxuICAgIHByaXZhdGUgZWRpdG9yOiBBYnN0cmFjdEVkaXRvcjtcbiAgICAvLyBmb2N1c0luZm8gaXMgdXNlZCB0byBrZWVwIHRyYWNrIG9mIGZvY3VzIGxpc3RlbmVycyBhbmQgdGltZW91dHMgY3JlYXRlZFxuICAgIC8vIGJ5IEZpcmVudmltRWxlbWVudC5mb2N1cygpLiBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSBjcmVhdGVzIHRoZXNlXG4gICAgLy8gbGlzdGVuZXJzIGFuZCB0aW1lb3V0cyBpbiBvcmRlciB0byB3b3JrIGFyb3VuZCBwYWdlcyB0aGF0IHRyeSB0byBncmFiXG4gICAgLy8gdGhlIGZvY3VzIGFnYWluIGFmdGVyIHRoZSBGaXJlbnZpbUVsZW1lbnQgaGFzIGJlZW4gY3JlYXRlZCBvciBhZnRlciB0aGVcbiAgICAvLyB1bmRlcmx5aW5nIGVsZW1lbnQncyBjb250ZW50IGhhcyBjaGFuZ2VkLlxuICAgIHByaXZhdGUgZm9jdXNJbmZvID0ge1xuICAgICAgICBmaW5hbFJlZm9jdXNUaW1lb3V0czogW10gYXMgYW55W10sXG4gICAgICAgIHJlZm9jdXNSZWZzOiBbXSBhcyBhbnlbXSxcbiAgICAgICAgcmVmb2N1c1RpbWVvdXRzOiBbXSBhcyBhbnlbXSxcbiAgICB9O1xuICAgIC8vIGZyYW1lSWQgaXMgdGhlIHdlYmV4dGVuc2lvbiBpZCBvZiB0aGUgbmVvdmltIGZyYW1lLiBXZSB1c2UgaXQgdG8gc2VuZFxuICAgIC8vIGNvbW1hbmRzIHRvIHRoZSBmcmFtZS5cbiAgICBwcml2YXRlIGZyYW1lSWQ6IG51bWJlcjtcbiAgICAvLyBmcmFtZUlkUHJvbWlzZSBpcyBhIHByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgdG8gdGhlIGZyYW1lSWQuIFRoZVxuICAgIC8vIGZyYW1lSWQgY2FuJ3QgYmUgcmV0cmlldmVkIHN5bmNocm9ub3VzbHkgYXMgaXQgbmVlZHMgdG8gYmUgc2VudCBieSB0aGVcbiAgICAvLyBiYWNrZ3JvdW5kIHNjcmlwdC5cbiAgICBwcml2YXRlIGZyYW1lSWRQcm9taXNlOiBQcm9taXNlPG51bWJlcj47XG4gICAgLy8gaWZyYW1lIGlzIHRoZSBOZW92aW0gZnJhbWUuIFRoaXMgaXMgdGhlIGVsZW1lbnQgdGhhdCByZWNlaXZlcyBhbGwgaW5wdXRzXG4gICAgLy8gYW5kIGRpc3BsYXlzIHRoZSBlZGl0b3IuXG4gICAgcHJpdmF0ZSBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xuICAgIC8vIFdlIHVzZSBhbiBpbnRlcnNlY3Rpb25PYnNlcnZlciB0byBkZXRlY3Qgd2hlbiB0aGUgZWxlbWVudCB0aGVcbiAgICAvLyBGaXJlbnZpbUVsZW1lbnQgaXMgdGllZCBiZWNvbWVzIGludmlzaWJsZS4gV2hlbiB0aGlzIGhhcHBlbnMsXG4gICAgLy8gd2UgaGlkZSB0aGUgRmlyZW52aW1FbGVtZW50IGZyb20gdGhlIHBhZ2UuXG4gICAgcHJpdmF0ZSBpbnRlcnNlY3Rpb25PYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gICAgLy8gV2UgdXNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGV0ZWN0IHdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tXG4gICAgLy8gdGhlIHBhZ2UuIFdoZW4gdGhpcyBoYXBwZW5zLCB0aGUgRmlyZW52aW1FbGVtZW50IGlzIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAvLyBwYWdlLlxuICAgIHByaXZhdGUgcGFnZU9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuICAgIC8vIFdlIHVzZSBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGRldGVjdCBpZiB0aGUgc3BhbiBpcyByZW1vdmVkIGZyb20gdGhlXG4gICAgLy8gcGFnZSBieSB0aGUgcGFnZS4gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSBzcGFuIGlzIHJlLWluc2VydGVkIGluIHRoZVxuICAgIC8vIHBhZ2UuXG4gICAgcHJpdmF0ZSBzcGFuT2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgLy8gbnZpbWlmeSBpcyB0aGUgZnVuY3Rpb24gdGhhdCBsaXN0ZW5zIGZvciBmb2N1cyBldmVudHMgYW5kIGNyZWF0ZXNcbiAgICAvLyBmaXJlbnZpbSBlbGVtZW50cy4gV2UgbmVlZCBpdCBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHJlbW92ZSBpdCBhcyBhblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIGVsZW1lbnQgdGhlIHVzZXIgc2VsZWN0ZWQgd2hlbiB0aGUgdXNlciB3YW50cyB0b1xuICAgIC8vIHNlbGVjdCB0aGF0IGVsZW1lbnQgYWdhaW4uXG4gICAgcHJpdmF0ZSBudmltaWZ5OiAoZXZ0OiB7IHRhcmdldDogRXZlbnRUYXJnZXQgfSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAvLyBvcmlnaW5hbEVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgYSBmb2N1cyBldmVudCBoYXMgYmVlbiB0cmlnZ2VyZWQgb24uIFdlXG4gICAgLy8gdXNlIGl0IHRvIHJldHJpZXZlIHRoZSBlbGVtZW50IHRoZSBlZGl0b3Igc2hvdWxkIGFwcGVhciBvdmVyIChlLmcuLCBpZlxuICAgIC8vIGVsZW0gaXMgYW4gZWxlbWVudCBpbnNpZGUgYSBDb2RlTWlycm9yIGVkaXRvciwgZWxlbSB3aWxsIGJlIGEgc21hbGxcbiAgICAvLyBpbnZpc2libGUgdGV4dGFyZWEgYW5kIHdoYXQgd2UgcmVhbGx5IHdhbnQgdG8gcHV0IHRoZSBGaXJlbnZpbSBlbGVtZW50XG4gICAgLy8gb3ZlciBpcyB0aGUgcGFyZW50IGRpdiB0aGF0IGNvbnRhaW5zIGl0KSBhbmQgdG8gZ2l2ZSBmb2N1cyBiYWNrIHRvIHRoZVxuICAgIC8vIHBhZ2Ugd2hlbiB0aGUgdXNlciBhc2tzIGZvciB0aGF0LlxuICAgIHByaXZhdGUgb3JpZ2luYWxFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAvLyByZXNpemVPYnNlcnZlciBpcyB1c2VkIGluIG9yZGVyIHRvIGRldGVjdCB3aGVuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XG4gICAgLy8gYmVpbmcgZWRpdGVkIGNoYW5nZWQuIFdoZW4gdGhpcyBoYXBwZW5zLCB3ZSByZXNpemUgdGhlIG5lb3ZpbSBmcmFtZS5cbiAgICAvLyBUT0RPOiBwZXJpb2RpY2FsbHkgY2hlY2sgaWYgTVMgaW1wbGVtZW50ZWQgYSBSZXNpemVPYnNlcnZlciB0eXBlXG4gICAgcHJpdmF0ZSByZXNpemVPYnNlcnZlcjogYW55O1xuICAgIC8vIHNwYW4gaXMgdGhlIHNwYW4gZWxlbWVudCB3ZSB1c2UgaW4gb3JkZXIgdG8gaW5zZXJ0IHRoZSBuZW92aW0gZnJhbWUgaW5cbiAgICAvLyB0aGUgcGFnZS4gVGhlIG5lb3ZpbSBmcmFtZSBpcyBhdHRhY2hlZCB0byBpdHMgc2hhZG93IGRvbS4gVXNpbmcgYSBzcGFuXG4gICAgLy8gaXMgbXVjaCBsZXNzIGRpc3J1cHRpdmUgdG8gdGhlIHBhZ2UgYW5kIGVuYWJsZXMgYSBtb2RpY3VtIG9mIHByaXZhY3lcbiAgICAvLyAodGhlIHBhZ2Ugd29uJ3QgYmUgYWJsZSB0byBjaGVjayB3aGF0J3MgaW4gaXQpLiBJbiBmaXJlZm94LCBwYWdlcyB3aWxsXG4gICAgLy8gc3RpbGwgYmUgYWJsZSB0byBkZXRlY3QgdGhlIG5lb3ZpbSBmcmFtZSBieSB1c2luZyB3aW5kb3cuZnJhbWVzIHRob3VnaC5cbiAgICBwcml2YXRlIHNwYW46IEhUTUxTcGFuRWxlbWVudDtcbiAgICAvLyByZXNpemVSZXFJZCBrZWVwcyB0cmFjayBvZiB0aGUgbnVtYmVyIG9mIHJlc2l6aW5nIHJlcXVlc3RzIHRoYXQgYXJlIHNlbnRcbiAgICAvLyB0byB0aGUgaWZyYW1lLiBXZSBzZW5kIGFuZCBpbmNyZW1lbnQgaXQgZm9yIGV2ZXJ5IHJlc2l6ZSByZXF1ZXN0cywgdGhpc1xuICAgIC8vIGxldHMgdGhlIGlmcmFtZSBrbm93IHdoYXQgdGhlIG1vc3QgcmVjZW50bHkgc2VudCByZXNpemUgcmVxdWVzdCBpcyBhbmRcbiAgICAvLyB0aHVzIGF2b2lkcyByZWFjdGluZyB0byBhbiBvbGRlciByZXNpemUgcmVxdWVzdCBpZiBhIG1vcmUgcmVjZW50IGhhc1xuICAgIC8vIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQuXG4gICAgcHJpdmF0ZSByZXNpemVSZXFJZCA9IDA7XG4gICAgLy8gcmVsYXRpdmVYL1kgaXMgdGhlIHBvc2l0aW9uIHRoZSBpZnJhbWUgc2hvdWxkIGhhdmUgcmVsYXRpdmUgdG8gdGhlIGlucHV0XG4gICAgLy8gZWxlbWVudCBpbiBvcmRlciB0byBiZSBib3RoIGFzIGNsb3NlIGFzIHBvc3NpYmxlIHRvIHRoZSBpbnB1dCBlbGVtZW50XG4gICAgLy8gYW5kIGZpdCBpbiB0aGUgd2luZG93IHdpdGhvdXQgb3ZlcmZsb3dpbmcgb3V0IG9mIHRoZSB2aWV3cG9ydC5cbiAgICBwcml2YXRlIHJlbGF0aXZlWCA9IDA7XG4gICAgcHJpdmF0ZSByZWxhdGl2ZVkgPSAwO1xuICAgIC8vIGZpcnN0UHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luIGtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgdGhpcyBpcyB0aGVcbiAgICAvLyBmaXJzdCB0aW1lIHRoZSBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gZnVuY3Rpb24gaXMgY2FsbGVkIGZyb20gdGhlXG4gICAgLy8gaWZyYW1lLiBTZWUgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luQWZ0ZXJSZXNpemVGcm9tRnJhbWUoKSBmb3IgbW9yZVxuICAgIC8vIGluZm9ybWF0aW9uLlxuICAgIHByaXZhdGUgZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gPSB0cnVlO1xuICAgIC8vIG9uRGV0YWNoIGlzIGEgY2FsbGJhY2sgcHJvdmlkZWQgYnkgdGhlIGNvbnRlbnQgc2NyaXB0IHdoZW4gaXQgY3JlYXRlc1xuICAgIC8vIHRoZSBGaXJlbnZpbUVsZW1lbnQuIEl0IGlzIGNhbGxlZCB3aGVuIHRoZSBkZXRhY2goKSBmdW5jdGlvbiBpcyBjYWxsZWQsXG4gICAgLy8gYWZ0ZXIgYWxsIEZpcmVudmltIGVsZW1lbnRzIGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UuXG4gICAgcHJpdmF0ZSBvbkRldGFjaDogKGlkOiBudW1iZXIpID0+IGFueTtcbiAgICAvLyBidWZmZXJJbmZvOiBhIFt1cmwsIHNlbGVjdG9yLCBjdXJzb3IsIGxhbmddIHR1cGxlIGluZGljYXRpbmcgdGhlIHBhZ2VcbiAgICAvLyB0aGUgbGFzdCBpZnJhbWUgd2FzIGNyZWF0ZWQgb24sIHRoZSBzZWxlY3RvciBvZiB0aGUgY29ycmVzcG9uZGluZ1xuICAgIC8vIHRleHRhcmVhIGFuZCB0aGUgY29sdW1uL2xpbmUgbnVtYmVyIG9mIHRoZSBjdXJzb3IuXG4gICAgLy8gTm90ZSB0aGF0IHRoZXNlIGFyZSBfX2RlZmF1bHRfXyB2YWx1ZXMuIFJlYWwgdmFsdWVzIG11c3QgYmUgY3JlYXRlZCB3aXRoXG4gICAgLy8gcHJlcGFyZUJ1ZmZlckluZm8oKS4gVGhlIHJlYXNvbiB3ZSdyZSBub3QgZG9pbmcgdGhpcyBmcm9tIHRoZVxuICAgIC8vIGNvbnN0cnVjdG9yIGlzIHRoYXQgaXQncyBleHBlbnNpdmUgYW5kIGRpc3J1cHRpdmUgLSBnZXR0aW5nIHRoaXNcbiAgICAvLyBpbmZvcm1hdGlvbiByZXF1aXJlcyBldmFsdWF0aW5nIGNvZGUgaW4gdGhlIHBhZ2UncyBjb250ZXh0LlxuICAgIHByaXZhdGUgYnVmZmVySW5mbyA9IChQcm9taXNlLnJlc29sdmUoW1wiXCIsIFwiXCIsIFsxLCAxXSwgdW5kZWZpbmVkXSkgYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZTxbc3RyaW5nLCBzdHJpbmcsIFtudW1iZXIsIG51bWJlcl0sIHN0cmluZ10+KTtcbiAgICAvLyBjdXJzb3I6IGxhc3Qga25vd24gY3Vyc29yIHBvc2l0aW9uLiBVcGRhdGVkIG9uIGdldFBhZ2VFbGVtZW50Q3Vyc29yIGFuZFxuICAgIC8vIHNldFBhZ2VFbGVtZW50Q3Vyc29yXG4gICAgcHJpdmF0ZSBjdXJzb3IgPSBbMSwgMV0gYXMgW251bWJlciwgbnVtYmVyXTtcblxuXG4gICAgLy8gZWxlbSBpcyB0aGUgZWxlbWVudCB0aGF0IHJlY2VpdmVkIHRoZSBmb2N1c0V2ZW50LlxuICAgIC8vIE52aW1pZnkgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgbGlzdGVucyBmb3IgZm9jdXMgZXZlbnRzLiBXZSBuZWVkIHRvIGtub3dcbiAgICAvLyBhYm91dCBpdCBpbiBvcmRlciB0byByZW1vdmUgaXQgYmVmb3JlIGZvY3VzaW5nIGVsZW0gKG90aGVyd2lzZSB3ZSdsbFxuICAgIC8vIGp1c3QgZ3JhYiBmb2N1cyBhZ2FpbikuXG4gICAgY29uc3RydWN0b3IgKGVsZW06IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogKGV2dDogeyB0YXJnZXQ6IEV2ZW50VGFyZ2V0IH0pID0+IFByb21pc2U8dm9pZD4sXG4gICAgICAgICAgICAgICAgIG9uRGV0YWNoOiAoaWQ6IG51bWJlcikgPT4gYW55KSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50ID0gZWxlbTtcbiAgICAgICAgdGhpcy5udmltaWZ5ID0gbGlzdGVuZXI7XG4gICAgICAgIHRoaXMub25EZXRhY2ggPSBvbkRldGFjaDtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBnZXRFZGl0b3IoZWxlbSwge1xuICAgICAgICAgICAgcHJlZmVySFRNTDogZ2V0Q29uZigpLmNvbnRlbnQgPT0gXCJodG1sXCIsXG4gICAgICAgICAgICBjb2RlTWlycm9yNkVuYWJsZWQ6IGlzQ2hyb21lKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zcGFuID0gZWxlbVxuICAgICAgICAgICAgLm93bmVyRG9jdW1lbnRcbiAgICAgICAgICAgIC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIFwic3BhblwiKTtcbiAgICAgICAgLy8gTWFrZSBub24tZm9jdXNhYmxlLCBhcyBvdGhlcndpc2UgPFRhYj4gYW5kIDxTLVRhYj4gaW4gdGhlIHBhZ2Ugd291bGRcbiAgICAgICAgLy8gZm9jdXMgdGhlIGlmcmFtZSBhdCB0aGUgZW5kIG9mIHRoZSBwYWdlIGluc3RlYWQgb2YgZm9jdXNpbmcgdGhlXG4gICAgICAgIC8vIGJyb3dzZXIncyBVSS4gVGhlIG9ubHkgd2F5IHRvIDxUYWI+LWZvY3VzIHRoZSBmcmFtZSBpcyB0b1xuICAgICAgICAvLyA8VGFiPi1mb2N1cyB0aGUgY29ycmVzcG9uZGluZyBpbnB1dCBlbGVtZW50LlxuICAgICAgICB0aGlzLnNwYW4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgICAgICAgdGhpcy5pZnJhbWUgPSBlbGVtXG4gICAgICAgICAgICAub3duZXJEb2N1bWVudFxuICAgICAgICAgICAgLmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiwgXCJpZnJhbWVcIikgYXMgSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBpc24ndCBhbnkgZXh0cmEgd2lkdGgvaGVpZ2h0XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5tYXJnaW4gPSBcIjBweFwiO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5ib3JkZXIgPSBcIjBweFwiO1xuICAgICAgICAvLyBXZSBzdGlsbCBuZWVkIGEgYm9yZGVyLCB1c2UgYSBzaGFkb3cgZm9yIHRoYXRcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDFweCAxcHggYmxhY2tcIjtcbiAgICB9XG5cbiAgICBhdHRhY2hUb1BhZ2UgKGZpcDogUHJvbWlzZTxudW1iZXI+KSB7XG4gICAgICAgIHRoaXMuZnJhbWVJZFByb21pc2UgPSBmaXAudGhlbigoZjogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lSWQgPSBmO1xuICAgICAgICAgICAgLy8gT25jZSBhIGZyYW1lSWQgaGFzIGJlZW4gYWNxdWlyZWQsIHRoZSBGaXJlbnZpbUVsZW1lbnQgd291bGQgZGllXG4gICAgICAgICAgICAvLyBpZiBpdHMgc3BhbiB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBwYWdlLiBUaHVzIHRoZXJlIGlzIG5vIHVzZSBpblxuICAgICAgICAgICAgLy8ga2VlcGluZyBpdHMgc3Bhbk9ic2VydmVyIGFyb3VuZC4gSXQnZCBldmVuIGNhdXNlIGlzc3VlcyBhcyB0aGVcbiAgICAgICAgICAgIC8vIHNwYW5PYnNlcnZlciB3b3VsZCBhdHRlbXB0IHRvIHJlLWluc2VydCBhIGRlYWQgZnJhbWUgaW4gdGhlXG4gICAgICAgICAgICAvLyBwYWdlLlxuICAgICAgICAgICAgdGhpcy5zcGFuT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVJZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0aGUgaWZyYW1lIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBwYWdlIGluIG9yZGVyIHRvXG4gICAgICAgIC8vIHJlc2l6ZSBpdCBiZWNhdXNlIHdlJ3JlIGp1c3QgdXNpbmcgdGhlIGNvcnJlc3BvbmRpbmdcbiAgICAgICAgLy8gaW5wdXQvdGV4dGFyZWEncyBzaXplXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMucmVzaXplVG8ocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZVggPSAwO1xuICAgICAgICB0aGlzLnJlbGF0aXZlWSA9IDA7XG4gICAgICAgIHRoaXMucHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luKCk7XG5cbiAgICAgICAgLy8gVXNlIGEgUmVzaXplT2JzZXJ2ZXIgdG8gZGV0ZWN0IHdoZW4gdGhlIHVuZGVybHlpbmcgaW5wdXQgZWxlbWVudCdzXG4gICAgICAgIC8vIHNpemUgY2hhbmdlcyBhbmQgY2hhbmdlIHRoZSBzaXplIG9mIHRoZSBGaXJlbnZpbUVsZW1lbnRcbiAgICAgICAgLy8gYWNjb3JkaW5nbHlcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyAoKHdpbmRvdyBhcyBhbnkpLlJlc2l6ZU9ic2VydmVyKSgoKHNlbGYpID0+IGFzeW5jIChlbnRyaWVzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50cnkgPSBlbnRyaWVzLmZpbmQoKGVudDogYW55KSA9PiBlbnQudGFyZ2V0ID09PSBzZWxmLmdldEVsZW1lbnQoKSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5mcmFtZUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZyYW1lSWRQcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UmVjdCA9IHRoaXMuZ2V0RWxlbWVudCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZWN0LndpZHRoID09PSBuZXdSZWN0LndpZHRoICYmIHJlY3QuaGVpZ2h0ID09PSBuZXdSZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlY3QgPSBuZXdSZWN0O1xuICAgICAgICAgICAgICAgIHNlbGYucmVzaXplVG8ocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZWxmLnB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbigpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzaXplUmVxSWQgKz0gMTtcbiAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZUlkOiBzZWxmLmZyYW1lSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogW3NlbGYucmVzaXplUmVxSWQsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wicmVzaXplXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZUZyYW1lXCJdLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmdldEVsZW1lbnQoKSwgeyBib3g6IFwiYm9yZGVyLWJveFwiIH0pO1xuXG4gICAgICAgIHRoaXMuaWZyYW1lLnNyYyA9IChicm93c2VyIGFzIGFueSkucnVudGltZS5nZXRVUkwoXCIvaW5kZXguaHRtbFwiKTtcbiAgICAgICAgdGhpcy5zcGFuLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwiY2xvc2VkXCIgfSkuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO1xuXG4gICAgICAgIC8vIFNvIHBhZ2VzIChlLmcuIEppcmEsIENvbmZsdWVuY2UpIHJlbW92ZSBzcGFucyBmcm9tIHRoZSBwYWdlIGFzIHNvb25cbiAgICAgICAgLy8gYXMgdGhleSdyZSBpbnNlcnRlZC4gV2UgZG9uJ3Qgd2FudCB0aGF0LCBzbyBmb3IgdGhlIDUgc2Vjb25kc1xuICAgICAgICAvLyBmb2xsb3dpbmcgdGhlIGluc2VydGlvbiwgZGV0ZWN0IGlmIHRoZSBzcGFuIGlzIHJlbW92ZWQgZnJvbSB0aGUgcGFnZVxuICAgICAgICAvLyBieSBjaGVja2luZyB2aXNpYmlsaXR5IGNoYW5nZXMgYW5kIHJlLWluc2VydCBpZiBuZWVkZWQuXG4gICAgICAgIGxldCByZWluc2VydHMgPSAwO1xuICAgICAgICB0aGlzLnNwYW5PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFxuICAgICAgICAgICAgKHNlbGYgPT4gKG11dGF0aW9ucyA6IE11dGF0aW9uUmVjb3JkW10sIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gc2VsZi5nZXRTcGFuKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtdXRhdGlvbi5yZW1vdmVkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT09IHNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlaW5zZXJ0cyArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlaW5zZXJ0cyA+PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGaXJlbnZpbSBpcyB0cnlpbmcgdG8gY3JlYXRlIGFuIGlmcmFtZSBvbiB0aGlzIHNpdGUgYnV0IHRoZSBwYWdlIGlzIGNvbnN0YW50bHkgcmVtb3ZpbmcgaXQuIENvbnNpZGVyIGRpc2FibGluZyBGaXJlbnZpbSBvbiB0aGlzIHdlYnNpdGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZWxmLmdldEVsZW1lbnQoKS5vd25lckRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3BhbiksIHJlaW5zZXJ0cyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zcGFuT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmdldEVsZW1lbnQoKS5vd25lckRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgICAgIGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50KCkub3duZXJEb2N1bWVudC5ib2R5O1xuICAgICAgICAvLyBXZSBjYW4ndCBpbnNlcnQgdGhlIGZyYW1lIGluIHRoZSBib2R5IGlmIHRoZSBlbGVtZW50IHdlJ3JlIGdvaW5nIHRvXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIGNvbnRlbnQgb2YgaXMgdGhlIGJvZHksIGFzIHJlcGxhY2luZyB0aGUgY29udGVudCB3b3VsZFxuICAgICAgICAvLyBkZXN0cm95IHRoZSBmcmFtZS5cbiAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgPT09IHRoaXMuZ2V0RWxlbWVudCgpKSB7XG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zcGFuKTtcblxuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgLy8gSXQgaXMgcHJldHR5IGhhcmQgdG8gdGVsbCB3aGVuIGFuIGVsZW1lbnQgZGlzYXBwZWFycyBmcm9tIHRoZSBwYWdlXG4gICAgICAgIC8vIChlaXRoZXIgYnkgYmVpbmcgcmVtb3ZlZCBvciBieSBiZWluZyBoaWRkZW4gYnkgb3RoZXIgZWxlbWVudHMpLCBzb1xuICAgICAgICAvLyB3ZSB1c2UgYW4gaW50ZXJzZWN0aW9uIG9ic2VydmVyLCB3aGljaCBpcyB0cmlnZ2VyZWQgZXZlcnkgdGltZSB0aGVcbiAgICAgICAgLy8gZWxlbWVudCBiZWNvbWVzIG1vcmUgb3IgbGVzcyB2aXNpYmxlLlxuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChzZWxmID0+ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBzZWxmLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIC8vIElmIGVsZW0gZG9lc24ndCBoYXZlIGEgcmVjdCBhbnltb3JlLCBpdCdzIGhpZGRlblxuICAgICAgICAgICAgaWYgKGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKHRoaXMpLCB7IHJvb3Q6IG51bGwsIHRocmVzaG9sZDogMC4xIH0pO1xuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5nZXRFbGVtZW50KCkpO1xuXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBGaXJlbnZpbUVsZW1lbnQgZnJvbSB0aGUgcGFnZSB3aGVuIHRoZVxuICAgICAgICAvLyBjb3JyZXNwb25kaW5nIGVsZW1lbnQgaXMgcmVtb3ZlZC4gV2UgZG8gdGhpcyBieSBhZGRpbmcgYVxuICAgICAgICAvLyBtdXRhdGlvbk9ic2VydmVyIHRvIGl0cyBwYXJlbnQuXG4gICAgICAgIHRoaXMucGFnZU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKHNlbGYgPT4gKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHNlbGYuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2gobXV0YXRpb24gPT4gbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfQUxMKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhbGtlci5jdXJyZW50Tm9kZSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZWxmLmRldGFjaEZyb21QYWdlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIHRoaXMucGFnZU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyRm9jdXNMaXN0ZW5lcnMgKCkge1xuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIHRyaWVzIHRvIGA6dyB8IGNhbGwgZmlyZW52aW0jZm9jdXNfcGFnZSgpYCBpbiBOZW92aW0sXG4gICAgICAgIC8vIHdlIGhhdmUgYSBwcm9ibGVtLiBgOndgIHJlc3VsdHMgaW4gYSBjYWxsIHRvIHNldFBhZ2VFbGVtZW50Q29udGVudCxcbiAgICAgICAgLy8gd2hpY2ggY2FsbHMgRmlyZW52aW1FbGVtZW50LmZvY3VzKCksIGJlY2F1c2Ugc29tZSBwYWdlcyB0cnkgdG8gZ3JhYlxuICAgICAgICAvLyBmb2N1cyB3aGVuIHRoZSBjb250ZW50IG9mIHRoZSB1bmRlcmx5aW5nIGVsZW1lbnQgY2hhbmdlcy5cbiAgICAgICAgLy8gRmlyZW52aW1FbGVtZW50LmZvY3VzKCkgY3JlYXRlcyBldmVudCBsaXN0ZW5lcnMgYW5kIHRpbWVvdXRzIHRvXG4gICAgICAgIC8vIGRldGVjdCB3aGVuIHRoZSBwYWdlIHRyaWVzIHRvIGdyYWIgZm9jdXMgYW5kIGJyaW5nIGl0IGJhY2sgdG8gdGhlXG4gICAgICAgIC8vIEZpcmVudmltRWxlbWVudC4gQnV0IHNpbmNlIGBjYWxsIGZpcmVudmltI2ZvY3VzX3BhZ2UoKWAgaGFwcGVuc1xuICAgICAgICAvLyByaWdodCBhZnRlciB0aGUgYDp3YCwgZm9jdXNfcGFnZSgpIHRyaWdnZXJzIHRoZSBldmVudFxuICAgICAgICAvLyBsaXN0ZW5lcnMvdGltZW91dHMgY3JlYXRlZCBieSBGaXJlbnZpbUVsZW1lbnQuZm9jdXMoKSFcbiAgICAgICAgLy8gU28gd2UgbmVlZCBhIHdheSB0byBjbGVhciB0aGUgdGltZW91dHMgYW5kIGV2ZW50IGxpc3RlbmVycyBiZWZvcmVcbiAgICAgICAgLy8gcGVyZm9ybWluZyBmb2N1c19wYWdlLCBhbmQgdGhhdCdzIHdoYXQgdGhpcyBmdW5jdGlvbiBkb2VzLlxuICAgICAgICB0aGlzLmZvY3VzSW5mby5maW5hbFJlZm9jdXNUaW1lb3V0cy5mb3JFYWNoKHQgPT4gY2xlYXJUaW1lb3V0KHQpKTtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1RpbWVvdXRzLmZvckVhY2godCA9PiBjbGVhclRpbWVvdXQodCkpO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzUmVmcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgdGhpcy5pZnJhbWUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZik7XG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5maW5hbFJlZm9jdXNUaW1lb3V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmZvY3VzSW5mby5yZWZvY3VzVGltZW91dHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5mb2N1c0luZm8ucmVmb2N1c1JlZnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBkZXRhY2hGcm9tUGFnZSAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJGb2N1c0xpc3RlbmVycygpO1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW0pO1xuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZShlbGVtKTtcbiAgICAgICAgdGhpcy5wYWdlT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLnNwYW5PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuc3Bhbi5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5vbkRldGFjaCh0aGlzLmZyYW1lSWQpO1xuICAgIH1cblxuICAgIGZvY3VzICgpIHtcbiAgICAgICAgLy8gU29tZSBpbnB1dHMgdHJ5IHRvIGdyYWIgdGhlIGZvY3VzIGFnYWluIGFmdGVyIHdlIGFwcGVuZGVkIHRoZSBpZnJhbWVcbiAgICAgICAgLy8gdG8gdGhlIHBhZ2UsIHNvIHdlIG5lZWQgdG8gcmVmb2N1cyBpdCBlYWNoIHRpbWUgaXQgbG9zZXMgZm9jdXMuIEJ1dFxuICAgICAgICAvLyB0aGUgdXNlciBtaWdodCB3YW50IHRvIHN0b3AgZm9jdXNpbmcgdGhlIGlmcmFtZSBhdCBzb21lIHBvaW50LCBzbyB3ZVxuICAgICAgICAvLyBhY3R1YWxseSBzdG9wIHJlZm9jdXNpbmcgdGhlIGlmcmFtZSBhIHNlY29uZCBhZnRlciBpdCBpcyBjcmVhdGVkLlxuICAgICAgICBjb25zdCByZWZvY3VzID0gKChzZWxmKSA9PiAoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmZvY3VzSW5mby5yZWZvY3VzVGltZW91dHMucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCwgZGVzdHJveSBjdXJyZW50IHNlbGVjdGlvbi4gU29tZSB3ZWJzaXRlcyB1c2UgdGhlXG4gICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uIHRvIGZvcmNlLWZvY3VzIGFuIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSdzIGEgcmFjZSBjb25kaXRpb24gaW4gdGhlIHRlc3RzdWl0ZSBvbiBjaHJvbWUgdGhhdFxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdHMgaW4gc2VsZi5zcGFuIG5vdCBiZWluZyBpbiB0aGUgZG9jdW1lbnQgYW5kIGVycm9yc1xuICAgICAgICAgICAgICAgIC8vIGJlaW5nIGxvZ2dlZCwgc28gd2UgY2hlY2sgaWYgc2VsZi5zcGFuIHJlYWxseSBpcyBpbiBpdHNcbiAgICAgICAgICAgICAgICAvLyBvd25lckRvY3VtZW50LlxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNwYW4ub3duZXJEb2N1bWVudC5jb250YWlucyhzZWxmLnNwYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbGYuc3BhbiwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5pZnJhbWUuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApKTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLnJlZm9jdXNSZWZzLnB1c2gocmVmb2N1cyk7XG4gICAgICAgIHRoaXMuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHJlZm9jdXMpO1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgcmVmb2N1cyk7XG4gICAgICAgIHRoaXMuZm9jdXNJbmZvLmZpbmFsUmVmb2N1c1RpbWVvdXRzLnB1c2goc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZWZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCByZWZvY3VzKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCByZWZvY3VzKTtcbiAgICAgICAgfSwgMTAwKSk7XG4gICAgICAgIHJlZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c09yaWdpbmFsRWxlbWVudCAoYWRkTGlzdGVuZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgYW55KS5ibHVyKCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm52aW1pZnkpO1xuICAgICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsRWxlbWVudC5vd25lckRvY3VtZW50LmNvbnRhaW5zKHRoaXMub3JpZ2luYWxFbGVtZW50KSkge1xuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQodGhpcy5vcmlnaW5hbEVsZW1lbnQsIDApO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoYWRkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm52aW1pZnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QnVmZmVySW5mbyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlckluZm87XG4gICAgfVxuXG4gICAgZ2V0RWRpdG9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yO1xuICAgIH1cblxuICAgIGdldEVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZ2V0RWxlbWVudCgpO1xuICAgIH1cblxuICAgIGdldFBhZ2VFbGVtZW50Q29udGVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVkaXRvcigpLmdldENvbnRlbnQoKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlRWxlbWVudEN1cnNvciAoKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKS5jYXRjaCgoKSA9PiBbMSwgMV0pIGFzIFByb21pc2U8W251bWJlciwgbnVtYmVyXT47XG4gICAgICAgIHAudGhlbihjID0+IHRoaXMuY3Vyc29yID0gYyk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGdldE9yaWdpbmFsRWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RvciAoKSB7XG4gICAgICAgIHJldHVybiBjb21wdXRlU2VsZWN0b3IodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgIH1cblxuICAgIGdldFNwYW4gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGFuO1xuICAgIH1cblxuICAgIGhpZGUgKCkge1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgaXNGb2N1c2VkICgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuc3BhblxuICAgICAgICAgICAgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pZnJhbWU7XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1ZmZlckluZm8gKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlckluZm8gPSAoYXN5bmMgKCkgPT4gW1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgIHRoaXMuZ2V0U2VsZWN0b3IoKSxcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0UGFnZUVsZW1lbnRDdXJzb3IoKSxcbiAgICAgICAgICAgIGF3YWl0ICh0aGlzLmVkaXRvci5nZXRMYW5ndWFnZSgpLmNhdGNoKCgpID0+IHVuZGVmaW5lZCkpXG4gICAgICAgIF0pKCkgYXMgUHJvbWlzZTxbc3RyaW5nLCBzdHJpbmcsIFtudW1iZXIsIG51bWJlcl0sIHN0cmluZ10+O1xuICAgIH1cblxuICAgIHByZXNzS2V5cyAoa2V5czogS2V5Ym9hcmRFdmVudFtdKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgICAgICBrZXlzLmZvckVhY2goZXYgPT4gdGhpcy5vcmlnaW5hbEVsZW1lbnQuZGlzcGF0Y2hFdmVudChldikpO1xuICAgICAgICBpZiAoZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luICgpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyBTYXZlIGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgcG9zQXR0cnMgPSBbXCJsZWZ0XCIsIFwicG9zaXRpb25cIiwgXCJ0b3BcIiwgXCJ6SW5kZXhcIl07XG4gICAgICAgIGNvbnN0IG9sZFBvc0F0dHJzID0gcG9zQXR0cnMubWFwKChhdHRyOiBhbnkpID0+IHRoaXMuaWZyYW1lLnN0eWxlW2F0dHJdKTtcblxuICAgICAgICAvLyBBc3NpZ24gbmV3IHZhbHVlc1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyB0aGlzLnJlbGF0aXZlWH1weGA7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS50b3AgPSBgJHtyZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZICsgdGhpcy5yZWxhdGl2ZVl9cHhgO1xuICAgICAgICAvLyAyMTM5OTk5OTk1IGlzIGhvcGVmdWxseSBoaWdoZXIgdGhhbiBldmVyeXRoaW5nIGVsc2Ugb24gdGhlIHBhZ2UgYnV0XG4gICAgICAgIC8vIGxvd2VyIHRoYW4gVmltaXVtJ3MgZWxlbWVudHNcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuekluZGV4ID0gXCIyMTM5OTk5OTk1XCI7XG5cbiAgICAgICAgLy8gQ29tcGFyZSwgdG8ga25vdyB3aGV0aGVyIHRoZSBlbGVtZW50IG1vdmVkIG9yIG5vdFxuICAgICAgICBjb25zdCBwb3NDaGFuZ2VkID0gISFwb3NBdHRycy5maW5kKChhdHRyOiBhbnksIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlW2F0dHJdICE9PSBvbGRQb3NBdHRyc1tpbmRleF0pO1xuICAgICAgICByZXR1cm4geyBwb3NDaGFuZ2VkLCBuZXdSZWN0OiByZWN0IH07XG4gICAgfVxuXG4gICAgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luQWZ0ZXJSZXNpemVGcm9tRnJhbWUgKCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgdmVyeSB3ZWlyZCwgY29tcGxpY2F0ZWQgYW5kIGJhZCBwaWVjZSBvZiBjb2RlLiBBbGwgY2FsbHNcbiAgICAgICAgLy8gdG8gYHJlc2l6ZUVkaXRvcigpYCBoYXZlIHRvIHJlc3VsdCBpbiBhIGNhbGwgdG8gYHJlc2l6ZVRvKClgIGFuZFxuICAgICAgICAvLyB0aGVuIGBwdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKWAgaW4gb3JkZXIgdG8gbWFrZSBzdXJlIHRoZVxuICAgICAgICAvLyBpZnJhbWUgZG9lc24ndCBvdmVyZmxvdyBmcm9tIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgLy8gSG93ZXZlciwgd2hlbiB3ZSBjcmVhdGUgdGhlIGlmcmFtZSwgd2UgZG9uJ3Qgd2FudCBpdCB0byBmaXQgaW4gdGhlXG4gICAgICAgIC8vIHZpZXdwb3J0IGF0IGFsbCBjb3N0LiBJbnN0ZWFkLCB3ZSB3YW50IGl0IHRvIGNvdmVyIHRoZSB1bmRlcmx5aW5nXG4gICAgICAgIC8vIGlucHV0IGFzIG11Y2ggYXMgcG9zc2libGUuIFRoZSBwcm9ibGVtIGlzIHRoYXQgd2hlbiBpdCBpcyBjcmVhdGVkLFxuICAgICAgICAvLyB0aGUgaWZyYW1lIHdpbGwgYXNrIGZvciBhIHJlc2l6ZSAoYmVjYXVzZSBOZW92aW0gYXNrcyBmb3Igb25lKSBhbmRcbiAgICAgICAgLy8gd2lsbCB0aHVzIGFsc28gYWNjaWRlbnRhbGx5IGNhbGwgcHV0RWRpdG9yQ2xvc2VUb0lucHV0T3JpZ2luLCB3aGljaFxuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGNhbGwuXG4gICAgICAgIC8vIFNvIHdlIGhhdmUgdG8gdHJhY2sgdGhlIGNhbGxzIHRvIHB1dEVkaXRvckNsb3NlVG9JbnB1dE9yaWdpbiB0aGF0XG4gICAgICAgIC8vIGFyZSBtYWRlIGZyb20gdGhlIGlmcmFtZSAoaS5lLiBmcm9tIGByZXNpemVFZGl0b3IoKWApIGFuZCBpZ25vcmUgdGhlXG4gICAgICAgIC8vIGZpcnN0IG9uZS5cbiAgICAgICAgaWYgKHRoaXMuZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpdmVYID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVsYXRpdmVZID0gMDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RQdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKTtcbiAgICB9XG5cbiAgICAvLyBSZXNpemUgdGhlIGlmcmFtZSwgbWFraW5nIHN1cmUgaXQgZG9lc24ndCBnZXQgbGFyZ2VyIHRoYW4gdGhlIHdpbmRvd1xuICAgIHJlc2l6ZVRvICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgd2FybklmcmFtZTogYm9vbGVhbikge1xuICAgICAgICAvLyBJZiB0aGUgZGltZW5zaW9ucyB0aGF0IGFyZSBhc2tlZCBmb3IgYXJlIHRvbyBiaWcsIG1ha2UgdGhlbSBhcyBiaWdcbiAgICAgICAgLy8gYXMgdGhlIHdpbmRvd1xuICAgICAgICBsZXQgY2FudEZ1bGx5UmVzaXplID0gZmFsc2U7XG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBpZiAoYXZhaWxhYmxlV2lkdGggPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA+PSBhdmFpbGFibGVXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBhdmFpbGFibGVXaWR0aCAtIDE7XG4gICAgICAgICAgICBjYW50RnVsbHlSZXNpemUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGlmIChhdmFpbGFibGVIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgPj0gYXZhaWxhYmxlSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQgLSAxO1xuICAgICAgICAgICAgY2FudEZ1bGx5UmVzaXplID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBkaW1lbnNpb25zIHRoYXQgd2VyZSBhc2tlZCBmb3IgbWlnaHQgbWFrZSB0aGUgaWZyYW1lIG92ZXJmbG93LlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIG5lZWQgdG8gY29tcHV0ZSBob3cgbXVjaCB3ZSBuZWVkIHRvIG1vdmUgdGhlIGlmcmFtZVxuICAgICAgICAvLyB0byB0aGUgbGVmdC90b3AgaW4gb3JkZXIgdG8gaGF2ZSBpdCBib3R0b20tcmlnaHQgY29ybmVyIHNpdCByaWdodCBpblxuICAgICAgICAvLyB0aGUgd2luZG93J3MgYm90dG9tLXJpZ2h0IGNvcm5lci5cbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWRpdG9yLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IGF2YWlsYWJsZVdpZHRoIC0gKHJlY3QubGVmdCArIHdpZHRoKTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZVggPSByaWdodE92ZXJmbG93IDwgMCA/IHJpZ2h0T3ZlcmZsb3cgOiAwO1xuICAgICAgICBjb25zdCBib3R0b21PdmVyZmxvdyA9IGF2YWlsYWJsZUhlaWdodCAtIChyZWN0LnRvcCArIGhlaWdodCk7XG4gICAgICAgIHRoaXMucmVsYXRpdmVZID0gYm90dG9tT3ZlcmZsb3cgPCAwID8gYm90dG9tT3ZlcmZsb3cgOiAwO1xuXG4gICAgICAgIC8vIE5vdyBhY3R1YWxseSBzZXQgdGhlIHdpZHRoL2hlaWdodCwgbW92ZSB0aGUgZWRpdG9yIHdoZXJlIGl0IGlzXG4gICAgICAgIC8vIHN1cHBvc2VkIHRvIGJlIGFuZCBpZiB0aGUgbmV3IGlmcmFtZSBjYW4ndCBiZSBhcyBiaWcgYXMgcmVxdWVzdGVkLFxuICAgICAgICAvLyB3YXJuIHRoZSBpZnJhbWUgc2NyaXB0LlxuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgaWYgKGNhbnRGdWxseVJlc2l6ZSAmJiB3YXJuSWZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVJlcUlkICs9IDE7XG4gICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVJZDogdGhpcy5mcmFtZUlkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbdGhpcy5yZXNpemVSZXFJZCwgd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wicmVzaXplXCJdLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZUZyYW1lXCJdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZW5kS2V5IChrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICBmcmFtZUlkOiB0aGlzLmZyYW1lSWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IFtcImZyYW1lX3NlbmRLZXlcIl0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBbXCJtZXNzYWdlRnJhbWVcIl0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFBhZ2VFbGVtZW50Q29udGVudCAodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWQgPSB0aGlzLmlzRm9jdXNlZCgpO1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRDb250ZW50KHRleHQpO1xuICAgICAgICBbXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXlkb3duXCIsICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXl1cFwiLCAgICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJrZXlwcmVzc1wiLCAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJiZWZvcmVpbnB1dFwiLCB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJpbnB1dFwiLCAgICAgICB7IGJ1YmJsZXM6IHRydWUgfSksXG4gICAgICAgICAgICBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwgICAgICB7IGJ1YmJsZXM6IHRydWUgfSlcbiAgICAgICAgXS5mb3JFYWNoKGV2ID0+IHRoaXMub3JpZ2luYWxFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpKTtcbiAgICAgICAgaWYgKGZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2VFbGVtZW50Q3Vyc29yIChsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHRoaXMuY3Vyc29yWzBdID0gbGluZTtcbiAgICAgICAgdGhpcy5jdXJzb3JbMV0gPSBjb2x1bW47XG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgICAgICBwID0gdGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKGxpbmUsIGNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgc2hvdyAoKSB7XG4gICAgICAgIHRoaXMuaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSBcImluaXRpYWxcIjtcbiAgICB9XG5cbn1cbiIsIlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF1dG9maWxsKCkge1xuICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpc3N1ZV9ib2R5XCIpIGFzIGFueTtcbiAgICBpZiAoIXRleHRhcmVhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGxhdEluZm9Qcm9taXNlID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgYXJnczogW10sXG4gICAgICAgICAgICBmdW5jTmFtZTogW1wiYnJvd3NlclwiLCBcInJ1bnRpbWVcIiwgXCJnZXRQbGF0Zm9ybUluZm9cIl0sXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJleGVjXCJdLFxuICAgIH0pO1xuICAgIGNvbnN0IG1hbmlmZXN0UHJvbWlzZSA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGFyZ3M6IFtdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcImJyb3dzZXJcIiwgXCJydW50aW1lXCIsIFwiZ2V0TWFuaWZlc3RcIl0sXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJleGVjXCJdLFxuICAgIH0pO1xuICAgIGNvbnN0IG52aW1QbHVnaW5Qcm9taXNlID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge30sXG4gICAgICAgIGZ1bmNOYW1lOiBbXCJnZXROdmltUGx1Z2luVmVyc2lvblwiXSxcbiAgICB9KTtcbiAgICBjb25zdCBpc3N1ZVRlbXBsYXRlUHJvbWlzZSA9IGZldGNoKGJyb3dzZXIucnVudGltZS5nZXRVUkwoXCJJU1NVRV9URU1QTEFURS5tZFwiKSkudGhlbihwID0+IHAudGV4dCgpKTtcbiAgICBjb25zdCBicm93c2VyU3RyaW5nID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGZpcmVmb3h8Y2hyb20pW14gXSsvZ2kpO1xuICAgIGxldCBuYW1lO1xuICAgIGxldCB2ZXJzaW9uO1xuICAgIC8vIENhbid0IGJlIHRlc3RlZCwgYXMgY292ZXJhZ2UgaXMgb25seSByZWNvcmRlZCBvbiBmaXJlZm94XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoYnJvd3NlclN0cmluZykge1xuICAgICAgICBbIG5hbWUsIHZlcnNpb24gXSA9IGJyb3dzZXJTdHJpbmdbMF0uc3BsaXQoXCIvXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5hbWUgPSBcInVua25vd25cIjtcbiAgICAgICAgdmVyc2lvbiA9IFwidW5rbm93blwiO1xuICAgIH1cbiAgICBjb25zdCB2ZW5kb3IgPSBuYXZpZ2F0b3IudmVuZG9yIHx8IFwiXCI7XG4gICAgY29uc3QgW1xuICAgICAgICBwbGF0SW5mbyxcbiAgICAgICAgbWFuaWZlc3QsXG4gICAgICAgIG52aW1QbHVnaW5WZXJzaW9uLFxuICAgICAgICBpc3N1ZVRlbXBsYXRlLFxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbcGxhdEluZm9Qcm9taXNlLCBtYW5pZmVzdFByb21pc2UsIG52aW1QbHVnaW5Qcm9taXNlLCBpc3N1ZVRlbXBsYXRlUHJvbWlzZV0pO1xuICAgIC8vIENhbid0IGhhcHBlbiwgYnV0IGRvZXNuJ3QgY29zdCBtdWNoIHRvIGhhbmRsZSFcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKC9cXHIvZywgXCJcIikgIT09IGlzc3VlVGVtcGxhdGUucmVwbGFjZSgvXFxyL2csIFwiXCIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGV4dGFyZWEudmFsdWUgPSBpc3N1ZVRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwiT1MgVmVyc2lvbjpcIiwgYE9TIFZlcnNpb246ICR7cGxhdEluZm8ub3N9ICR7cGxhdEluZm8uYXJjaH1gKVxuICAgICAgICAucmVwbGFjZShcIkJyb3dzZXIgVmVyc2lvbjpcIiwgYEJyb3dzZXIgVmVyc2lvbjogJHt2ZW5kb3J9ICR7bmFtZX0gJHt2ZXJzaW9ufWApXG4gICAgICAgIC5yZXBsYWNlKFwiQnJvd3NlciBBZGRvbiBWZXJzaW9uOlwiLCBgQnJvd3NlciBBZGRvbiBWZXJzaW9uOiAke21hbmlmZXN0LnZlcnNpb259YClcbiAgICAgICAgLnJlcGxhY2UoXCJOZW92aW0gUGx1Z2luIFZlcnNpb246XCIsIGBOZW92aW0gUGx1Z2luIFZlcnNpb246ICR7bnZpbVBsdWdpblZlcnNpb259YCk7XG59XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgICAgfSBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCB7IEZpcmVudmltRWxlbWVudCB9IGZyb20gXCIuL0ZpcmVudmltRWxlbWVudFwiO1xuaW1wb3J0IHsgZXhlY3V0ZUluUGFnZSAgIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IGdldENvbmYgICAgICAgICB9IGZyb20gXCIuL3V0aWxzL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGtleXNUb0V2ZW50cyAgICB9IGZyb20gXCIuL3V0aWxzL2tleXNcIjtcblxuLy8gVGhpcyBtb2R1bGUgaXMgbG9hZGVkIGluIGJvdGggdGhlIGJyb3dzZXIncyBjb250ZW50IHNjcmlwdCBhbmQgdGhlIGJyb3dzZXInc1xuLy8gZnJhbWUgc2NyaXB0LlxuLy8gQXMgc3VjaCwgaXQgc2hvdWxkIG5vdCBoYXZlIGFueSBzaWRlIGVmZmVjdHMuXG5cbmludGVyZmFjZSBJR2xvYmFsU3RhdGUge1xuICAgIGRpc2FibGVkOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcbiAgICBsYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQ6IG51bWJlcjtcbiAgICBmaXJlbnZpbUVsZW1zOiBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+O1xuICAgIGZyYW1lSWRSZXNvbHZlOiAoXzogbnVtYmVyKSA9PiB2b2lkO1xuICAgIG52aW1pZnk6IChldnQ6IEZvY3VzRXZlbnQpID0+IHZvaWQ7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRnVuY3Rpb25zIHJ1bm5pbmcgaW4gdGhlIGNvbnRlbnQgc2NyaXB0IC8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gX2ZvY3VzSW5wdXQoZ2xvYmFsOiBJR2xvYmFsU3RhdGUsIGZpcmVudmltOiBGaXJlbnZpbUVsZW1lbnQsIGFkZExpc3RlbmVyOiBib29sZWFuKSB7XG4gICAgaWYgKGFkZExpc3RlbmVyKSB7XG4gICAgICAgIC8vIE9ubHkgcmUtYWRkIGV2ZW50IGxpc3RlbmVyIGlmIGlucHV0J3Mgc2VsZWN0b3IgbWF0Y2hlcyB0aGUgb25lc1xuICAgICAgICAvLyB0aGF0IHNob3VsZCBiZSBhdXRvbnZpbWlmaWVkXG4gICAgICAgIGNvbnN0IGNvbmYgPSBnZXRDb25mKCk7XG4gICAgICAgIGlmIChjb25mLnNlbGVjdG9yICYmIGNvbmYuc2VsZWN0b3IgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmYuc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIGFkZExpc3RlbmVyID0gZWxlbXMuaW5jbHVkZXMoZmlyZW52aW0uZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaXJlbnZpbS5mb2N1c09yaWdpbmFsRWxlbWVudChhZGRMaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIGdldEZvY3VzZWRFbGVtZW50IChmaXJlbnZpbUVsZW1zOiBNYXA8bnVtYmVyLCBGaXJlbnZpbUVsZW1lbnQ+KSB7XG4gICAgcmV0dXJuIEFycmF5XG4gICAgICAgIC5mcm9tKGZpcmVudmltRWxlbXMudmFsdWVzKCkpXG4gICAgICAgIC5maW5kKGluc3RhbmNlID0+IGluc3RhbmNlLmlzRm9jdXNlZCgpKTtcbn1cblxuLy8gVGFiIGZ1bmN0aW9ucyBhcmUgZnVuY3Rpb25zIGFsbCBjb250ZW50IHNjcmlwdHMgc2hvdWxkIHJlYWN0IHRvXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFiRnVuY3Rpb25zKGdsb2JhbDogSUdsb2JhbFN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0QWN0aXZlSW5zdGFuY2VDb3VudCA6ICgpID0+IGdsb2JhbC5maXJlbnZpbUVsZW1zLnNpemUsXG4gICAgICAgIHJlZ2lzdGVyTmV3RnJhbWVJZDogKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmZyYW1lSWRSZXNvbHZlKGZyYW1lSWQpO1xuICAgICAgICB9LFxuICAgICAgICBzZXREaXNhYmxlZDogKGRpc2FibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwubGFzdEZvY3VzZWRDb250ZW50U2NyaXB0ID0gZnJhbWVJZDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZShlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IHJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdIZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHJldHVybiAhKHJlY3QuYm90dG9tIDwgMCB8fCByZWN0LnRvcCAtIHZpZXdIZWlnaHQgPj0gMCk7XG59XG5cbi8vIEFjdGl2ZUNvbnRlbnQgZnVuY3Rpb25zIGFyZSBmdW5jdGlvbnMgb25seSB0aGUgYWN0aXZlIGNvbnRlbnQgc2NyaXB0IHNob3VsZCByZWFjdCB0b1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMoZ2xvYmFsOiBJR2xvYmFsU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmb3JjZU52aW1pZnk6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGlzTnVsbCA9IGVsZW0gPT09IG51bGwgfHwgZWxlbSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgcGFnZU5vdEVkaXRhYmxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRlbnRFZGl0YWJsZSAhPT0gXCJ0cnVlXCI7XG4gICAgICAgICAgICBjb25zdCBib2R5Tm90RWRpdGFibGUgPSAoZG9jdW1lbnQuYm9keS5jb250ZW50RWRpdGFibGUgPT09IFwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGRvY3VtZW50LmJvZHkuY29udGVudEVkaXRhYmxlID09PSBcImluaGVyaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250ZW50RWRpdGFibGUgIT09IFwidHJ1ZVwiKSk7XG4gICAgICAgICAgICBpZiAoaXNOdWxsXG4gICAgICAgICAgICAgICAgfHwgKGVsZW0gPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBwYWdlTm90RWRpdGFibGUpXG4gICAgICAgICAgICAgICAgfHwgKGVsZW0gPT09IGRvY3VtZW50LmJvZHkgJiYgYm9keU5vdEVkaXRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGV4dGFyZWFcIikpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKGlzVmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZChlID0+IGUudHlwZSA9PT0gXCJ0ZXh0XCIgJiYgaXNWaXNpYmxlKGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbG9iYWwubnZpbWlmeSh7IHRhcmdldDogZWxlbSB9IGFzIGFueSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbmRLZXk6IChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlyZW52aW0gPSBnZXRGb2N1c2VkRWxlbWVudChnbG9iYWwuZmlyZW52aW1FbGVtcyk7XG4gICAgICAgICAgICBpZiAoZmlyZW52aW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpcmVudmltLnNlbmRLZXkoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdGhyb3cgdGhpcyBlcnJvciBhcyB0aGUgYmFja2dyb3VuZCBzY3JpcHRcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGV4ZWN1dGUgYSBmYWxsYmFja1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZpcmVudmltIGZyYW1lIHNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGZvY3VzRWxlbWVudEJlZm9yZU9yQWZ0ZXIoZ2xvYmFsOiBJR2xvYmFsU3RhdGUsIGZyYW1lSWQ6IG51bWJlciwgaTogMSB8IC0xKSB7XG4gICAgbGV0IGZpcmVudmltRWxlbWVudDtcbiAgICBpZiAoZnJhbWVJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmaXJlbnZpbUVsZW1lbnQgPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgfVxuICAgIGNvbnN0IG9yaWdpbmFsRWxlbWVudCA9IGZpcmVudmltRWxlbWVudC5nZXRPcmlnaW5hbEVsZW1lbnQoKTtcblxuICAgIGNvbnN0IHRhYmluZGV4ID0gKGU6IEVsZW1lbnQpID0+ICgoeCA9PiBpc05hTih4KSA/IDAgOiB4KShwYXJzZUludChlLmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpKSkpO1xuICAgIGNvbnN0IGZvY3VzYWJsZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBvYmplY3QsIFt0YWJpbmRleF0sIFtocmVmXVwiKSlcbiAgICAgICAgLmZpbHRlcihlID0+IGUuZ2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIikgIT09IFwiLTFcIilcbiAgICAgICAgLnNvcnQoKGUxLCBlMikgPT4gdGFiaW5kZXgoZTEpIC0gdGFiaW5kZXgoZTIpKTtcblxuICAgIGxldCBpbmRleCA9IGZvY3VzYWJsZXMuaW5kZXhPZihvcmlnaW5hbEVsZW1lbnQpO1xuICAgIGxldCBlbGVtOiBFbGVtZW50O1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgLy8gb3JpZ2luYWxFbGVtZW50IGlzbid0IGluIHRoZSBsaXN0IG9mIGZvY3VzYWJsZXMsIHNvIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHRoZSBjbG9zZXN0IGVsZW1lbnQgaXMuIFdlIGRvIHRoaXMgYnkgaXRlcmF0aW5nIG92ZXJcbiAgICAgICAgLy8gYWxsIGVsZW1lbnRzIG9mIHRoZSBkb20sIGFjY2VwdGluZyBvbmx5IG9yaWdpbmFsRWxlbWVudCBhbmQgdGhlXG4gICAgICAgIC8vIGVsZW1lbnRzIHRoYXQgYXJlIGZvY3VzYWJsZS4gT25jZSB3ZSBmaW5kIG9yaWdpbmFsRWxlbWVudCwgd2Ugc2VsZWN0XG4gICAgICAgIC8vIGVpdGhlciB0aGUgcHJldmlvdXMgb3IgbmV4dCBlbGVtZW50IGRlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgaS5cbiAgICAgICAgY29uc3QgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWNjZXB0Tm9kZTogbiA9PiAoKG4gPT09IG9yaWdpbmFsRWxlbWVudCB8fCBmb2N1c2FibGVzLmluZGV4T2YoKG4gYXMgRWxlbWVudCkpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcbiAgICAgICAgICAgICAgICAgICAgOiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1QpXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaXJzdE5vZGUgPSB0cmVlV2Fsa2VyLmN1cnJlbnROb2RlIGFzIEVsZW1lbnQ7XG4gICAgICAgIGxldCBjdXIgPSBmaXJzdE5vZGU7XG4gICAgICAgIGxldCBwcmV2O1xuICAgICAgICB3aGlsZSAoY3VyICYmIGN1ciAhPT0gb3JpZ2luYWxFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2ID0gY3VyO1xuICAgICAgICAgICAgY3VyID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICBlbGVtID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpIGFzIEVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtID0gcHJldjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTYW5pdHkgY2hlY2ssIGNhbid0IGJlIGV4ZXJjaXNlZFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgIGVsZW0gPSBmaXJzdE5vZGU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtID0gZm9jdXNhYmxlc1soaW5kZXggKyBpICsgZm9jdXNhYmxlcy5sZW5ndGgpICUgZm9jdXNhYmxlcy5sZW5ndGhdO1xuICAgIH1cblxuICAgIGluZGV4ID0gZm9jdXNhYmxlcy5pbmRleE9mKGVsZW0pO1xuICAgIC8vIFNhbml0eSBjaGVjaywgY2FuJ3QgYmUgZXhlcmNpc2VkXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IFwiT2ggbXksIHNvbWV0aGluZyB3ZW50IHdyb25nIVwiO1xuICAgIH1cblxuICAgIC8vIE5vdyB0aGF0IHdlIGtub3cgd2UgaGF2ZSBhbiBlbGVtZW50IHRoYXQgaXMgaW4gdGhlIGZvY3VzYWJsZSBlbGVtZW50XG4gICAgLy8gbGlzdCwgaXRlcmF0ZSBvdmVyIHRoZSBsaXN0IHRvIGZpbmQgb25lIHRoYXQgaXMgdmlzaWJsZS5cbiAgICBsZXQgc3RhcnRlZEF0O1xuICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gICAgd2hpbGUgKHN0YXJ0ZWRBdCAhPT0gaW5kZXggJiYgKHN0eWxlLnZpc2liaWxpdHkgIT09IFwidmlzaWJsZVwiIHx8IHN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSkge1xuICAgICAgICBpZiAoc3RhcnRlZEF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWRBdCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICsgaSArIGZvY3VzYWJsZXMubGVuZ3RoKSAlIGZvY3VzYWJsZXMubGVuZ3RoO1xuICAgICAgICBlbGVtID0gZm9jdXNhYmxlc1tpbmRleF07XG4gICAgICAgIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgICB9XG5cbiAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcbiAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGlmIChlbGVtLm93bmVyRG9jdW1lbnQuY29udGFpbnMoZWxlbSkpIHtcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWxlbSwgMCk7XG4gICAgfVxuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICAgIChlbGVtIGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xuICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucyhnbG9iYWw6IElHbG9iYWxTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGV2YWxJblBhZ2U6IChfOiBudW1iZXIsIGpzOiBzdHJpbmcpID0+IGV4ZWN1dGVJblBhZ2UoanMpLFxuICAgICAgICBmb2N1c0lucHV0OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlyZW52aW1FbGVtZW50O1xuICAgICAgICAgICAgaWYgKGZyYW1lSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpcmVudmltRWxlbWVudCA9IGdldEZvY3VzZWRFbGVtZW50KGdsb2JhbC5maXJlbnZpbUVsZW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1FbGVtZW50ID0gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbUVsZW1lbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBmb2N1c1BhZ2U6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltRWxlbWVudCA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGZpcmVudmltRWxlbWVudC5jbGVhckZvY3VzTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBhbnkpLmJsdXIoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICBmb2N1c05leHQ6IChmcmFtZUlkOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGZvY3VzRWxlbWVudEJlZm9yZU9yQWZ0ZXIoZ2xvYmFsLCBmcmFtZUlkLCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNQcmV2OiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBmb2N1c0VsZW1lbnRCZWZvcmVPckFmdGVyKGdsb2JhbCwgZnJhbWVJZCwgLTEpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRFZGl0b3JJbmZvOiAoZnJhbWVJZDogbnVtYmVyKSA9PiBnbG9iYWxcbiAgICAgICAgICAgIC5maXJlbnZpbUVsZW1zXG4gICAgICAgICAgICAuZ2V0KGZyYW1lSWQpXG4gICAgICAgICAgICAuZ2V0QnVmZmVySW5mbygpLFxuICAgICAgICBnZXRFbGVtZW50Q29udGVudDogKGZyYW1lSWQ6IG51bWJlcikgPT4gZ2xvYmFsXG4gICAgICAgICAgICAuZmlyZW52aW1FbGVtc1xuICAgICAgICAgICAgLmdldChmcmFtZUlkKVxuICAgICAgICAgICAgLmdldFBhZ2VFbGVtZW50Q29udGVudCgpLFxuICAgICAgICBoaWRlRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGZpcmVudmltLmhpZGUoKTtcbiAgICAgICAgICAgIF9mb2N1c0lucHV0KGdsb2JhbCwgZmlyZW52aW0sIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBraWxsRWRpdG9yOiAoZnJhbWVJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaXJlbnZpbSA9IGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRm9jdXNlZCA9IGZpcmVudmltLmlzRm9jdXNlZCgpO1xuICAgICAgICAgICAgZmlyZW52aW0uZGV0YWNoRnJvbVBhZ2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmYgPSBnZXRDb25mKCk7XG4gICAgICAgICAgICBpZiAoaXNGb2N1c2VkKSB7XG4gICAgICAgICAgICAgICAgX2ZvY3VzSW5wdXQoZ2xvYmFsLCBmaXJlbnZpbSwgY29uZi50YWtlb3ZlciAhPT0gXCJvbmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2xvYmFsLmZpcmVudmltRWxlbXMuZGVsZXRlKGZyYW1lSWQpO1xuICAgICAgICB9LFxuICAgICAgICBwcmVzc0tleXM6IChmcmFtZUlkOiBudW1iZXIsIGtleXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCkucHJlc3NLZXlzKGtleXNUb0V2ZW50cyhrZXlzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2l6ZUVkaXRvcjogKGZyYW1lSWQ6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBnbG9iYWwuZmlyZW52aW1FbGVtcy5nZXQoZnJhbWVJZCk7XG4gICAgICAgICAgICBlbGVtLnJlc2l6ZVRvKHdpZHRoLCBoZWlnaHQsIHRydWUpO1xuICAgICAgICAgICAgZWxlbS5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW5BZnRlclJlc2l6ZUZyb21GcmFtZSgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRFbGVtZW50Q29udGVudDogKGZyYW1lSWQ6IG51bWJlciwgdGV4dDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLmZpcmVudmltRWxlbXMuZ2V0KGZyYW1lSWQpLnNldFBhZ2VFbGVtZW50Q29udGVudCh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RWxlbWVudEN1cnNvcjogKGZyYW1lSWQ6IG51bWJlciwgbGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChmcmFtZUlkKS5zZXRQYWdlRWxlbWVudEN1cnNvcihsaW5lLCBjb2x1bW4pO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRGVmaW5pdGlvbiBvZiBhIHByb3h5IHR5cGUgdGhhdCBsZXRzIHRoZSBmcmFtZSBzY3JpcHQgdHJhbnNwYXJlbnRseSBjYWxsIC8vXG4vLyB0aGUgY29udGVudCBzY3JpcHQncyBmdW5jdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBUaGUgcHJveHkgYXV0b21hdGljYWxseSBhcHBlbmRzIHRoZSBmcmFtZUlkIHRvIHRoZSByZXF1ZXN0LCBzbyB3ZSBoaWRlIHRoYXQgZnJvbSB1c2Vyc1xudHlwZSBBcmd1bWVudHNUeXBlPFQ+ID0gVCBleHRlbmRzICh4OiBhbnksIC4uLmFyZ3M6IGluZmVyIFUpID0+IGFueSA/IFU6IG5ldmVyO1xudHlwZSBQcm9taXNpZnk8VD4gPSBUIGV4dGVuZHMgUHJvbWlzZTxhbnk+ID8gVCA6IFByb21pc2U8VD47XG5cbnR5cGUgZnQgPSBSZXR1cm5UeXBlPHR5cGVvZiBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucz5cblxudHlwZSBQYWdlRXZlbnRzID0gXCJyZXNpemVcIiB8IFwiZnJhbWVfc2VuZEtleVwiIHwgXCJnZXRfYnVmX2NvbnRlbnRcIiB8IFwicGF1c2Vfa2V5aGFuZGxlclwiO1xudHlwZSBQYWdlSGFuZGxlcnMgPSAoYXJnczogYW55W10pID0+IHZvaWQ7XG5leHBvcnQgY2xhc3MgUGFnZUV2ZW50RW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlcjxQYWdlRXZlbnRzLCBQYWdlSGFuZGxlcnM+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdDogYW55LCBfc2VuZGVyOiBhbnksIF9zZW5kUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChyZXF1ZXN0LmZ1bmNOYW1lWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBhdXNlX2tleWhhbmRsZXJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZnJhbWVfc2VuZEtleVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNpemVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KHJlcXVlc3QuZnVuY05hbWVbMF0sIHJlcXVlc3QuYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnZXRfYnVmX2NvbnRlbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5lbWl0KHJlcXVlc3QuZnVuY05hbWVbMF0sIHJlc29sdmUpKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXZhbEluUGFnZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZXNpemVFZGl0b3JcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0RWxlbWVudENvbnRlbnRcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0RWRpdG9ySW5mb1wiOlxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGVkIGJ5IGZyYW1lIGZ1bmN0aW9uIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuaGFuZGxlZCBwYWdlIHJlcXVlc3Q6XCIsIHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VUeXBlID0gUGFnZUV2ZW50RW1pdHRlciAmIHtcbiAgICBbayBpbiBrZXlvZiBmdF06ICguLi5hcmdzOiBBcmd1bWVudHNUeXBlPGZ0W2tdPikgPT4gUHJvbWlzaWZ5PFJldHVyblR5cGU8ZnRba10+Pjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWdlUHJveHkgKGZyYW1lSWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHBhZ2UgPSBuZXcgUGFnZUV2ZW50RW1pdHRlcigpO1xuXG4gICAgbGV0IGZ1bmNOYW1lOiBrZXlvZiBQYWdlVHlwZTtcbiAgICBmb3IgKGZ1bmNOYW1lIGluIGdldE5lb3ZpbUZyYW1lRnVuY3Rpb25zKHt9IGFzIGFueSkpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWNsYXJlIGZ1bmMgaGVyZSBiZWNhdXNlIGZ1bmNOYW1lIGlzIGEgZ2xvYmFsIGFuZCB3b3VsZCBub3RcbiAgICAgICAgLy8gYmUgY2FwdHVyZWQgaW4gdGhlIGNsb3N1cmUgb3RoZXJ3aXNlXG4gICAgICAgIGNvbnN0IGZ1bmMgPSBmdW5jTmFtZTtcbiAgICAgICAgKHBhZ2UgYXMgYW55KVtmdW5jXSA9ICgoLi4uYXJyOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbZnJhbWVJZF0uY29uY2F0KGFyciksXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBbZnVuY10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZVBhZ2VcIl0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwYWdlIGFzIFBhZ2VUeXBlO1xufVxuIiwiLy8gVGhlc2UgbW9kZXMgYXJlIGRlZmluZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL25lb3ZpbS9uZW92aW0vYmxvYi9tYXN0ZXIvc3JjL252aW0vY3Vyc29yX3NoYXBlLmNcbmV4cG9ydCB0eXBlIE52aW1Nb2RlID0gXCJhbGxcIlxuICB8IFwibm9ybWFsXCJcbiAgfCBcInZpc3VhbFwiXG4gIHwgXCJpbnNlcnRcIlxuICB8IFwicmVwbGFjZVwiXG4gIHwgXCJjbWRsaW5lX25vcm1hbFwiXG4gIHwgXCJjbWRsaW5lX2luc2VydFwiXG4gIHwgXCJjbWRsaW5lX3JlcGxhY2VcIlxuICB8IFwib3BlcmF0b3JcIlxuICB8IFwidmlzdWFsX3NlbGVjdFwiXG4gIHwgXCJjbWRsaW5lX2hvdmVyXCJcbiAgfCBcInN0YXR1c2xpbmVfaG92ZXJcIlxuICB8IFwic3RhdHVzbGluZV9kcmFnXCJcbiAgfCBcInZzZXBfaG92ZXJcIlxuICB8IFwidnNlcF9kcmFnXCJcbiAgfCBcIm1vcmVcIlxuICB8IFwibW9yZV9sYXN0bGluZVwiXG4gIHwgXCJzaG93bWF0Y2hcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2l0ZUNvbmZpZyB7XG4gICAgY21kbGluZTogXCJuZW92aW1cIiB8IFwiZmlyZW52aW1cIiB8IFwibm9uZVwiO1xuICAgIGNvbnRlbnQ6IFwiaHRtbFwiIHwgXCJ0ZXh0XCI7XG4gICAgcHJpb3JpdHk6IG51bWJlcjtcbiAgICByZW5kZXJlcjogXCJodG1sXCIgfCBcImNhbnZhc1wiO1xuICAgIHNlbGVjdG9yOiBzdHJpbmc7XG4gICAgdGFrZW92ZXI6IFwiYWx3YXlzXCIgfCBcIm9uY2VcIiB8IFwiZW1wdHlcIiB8IFwibm9uZW1wdHlcIiB8IFwibmV2ZXJcIjtcbiAgICBmaWxlbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBHbG9iYWxTZXR0aW5ncyA9IHtcbiAgYWx0OiBcImFscGhhbnVtXCIgfCBcImFsbFwiLFxuICBcIjxDLW4+XCI6IFwiZGVmYXVsdFwiIHwgXCJub29wXCIsXG4gIFwiPEMtdD5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIixcbiAgXCI8Qy13PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBcIjxDUy1uPlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBcIjxDUy10PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBcIjxDUy13PlwiOiBcImRlZmF1bHRcIiB8IFwibm9vcFwiLFxuICBpZ25vcmVLZXlzOiB7IFtrZXkgaW4gTnZpbU1vZGVdOiBzdHJpbmdbXSB9LFxuICBjbWRsaW5lVGltZW91dDogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIGdsb2JhbFNldHRpbmdzOiBHbG9iYWxTZXR0aW5ncztcbiAgICBsb2NhbFNldHRpbmdzOiB7IFtrZXk6IHN0cmluZ106IElTaXRlQ29uZmlnIH07XG59XG5cbmxldCBjb25mOiBJQ29uZmlnID0gdW5kZWZpbmVkIGFzIElDb25maWc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVdpdGhEZWZhdWx0cyhvczogc3RyaW5nLCBzZXR0aW5nczogYW55KTogSUNvbmZpZyB7XG4gICAgZnVuY3Rpb24gbWFrZURlZmF1bHRzKG9iajogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmIChvYmpbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtuYW1lXSAhPT0gdHlwZW9mIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgfHwgQXJyYXkuaXNBcnJheShvYmpbbmFtZV0pICE9PSBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBVc2VyIGNvbmZpZyBlbnRyeSAke25hbWV9IGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHR5cGUuIE92ZXJyaWRpbmcuYCk7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtYWtlRGVmYXVsdExvY2FsU2V0dGluZyhzZXR0OiB7IGxvY2FsU2V0dGluZ3M6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqOiBJU2l0ZUNvbmZpZykge1xuICAgICAgICBtYWtlRGVmYXVsdHMoc2V0dC5sb2NhbFNldHRpbmdzLCBzaXRlLCB7fSk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIChPYmplY3Qua2V5cyhvYmopIGFzIChrZXlvZiB0eXBlb2Ygb2JqKVtdKSkge1xuICAgICAgICAgICAgbWFrZURlZmF1bHRzKHNldHQubG9jYWxTZXR0aW5nc1tzaXRlXSwga2V5LCBvYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNldHRpbmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2V0dGluZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MsIFwiZ2xvYmFsU2V0dGluZ3NcIiwge30pO1xuICAgIC8vIFwiPEtFWT5cIjogXCJkZWZhdWx0XCIgfCBcIm5vb3BcIlxuICAgIC8vICMxMDM6IFdoZW4gdXNpbmcgdGhlIGJyb3dzZXIncyBjb21tYW5kIEFQSSB0byBhbGxvdyBzZW5kaW5nIGA8Qy13PmAgdG9cbiAgICAvLyBmaXJlbnZpbSwgd2hldGhlciB0aGUgZGVmYXVsdCBhY3Rpb24gc2hvdWxkIGJlIHBlcmZvcm1lZCBpZiBubyBuZW92aW1cbiAgICAvLyBmcmFtZSBpcyBmb2N1c2VkLlxuICAgIG1ha2VEZWZhdWx0cyhzZXR0aW5ncy5nbG9iYWxTZXR0aW5ncywgXCI8Qy1uPlwiLCBcImRlZmF1bHRcIik7XG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDLXQ+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPEMtdz5cIiwgXCJkZWZhdWx0XCIpO1xuICAgIC8vIE5vdGU6IDxDUy0qPiBhcmUgY3VycmVudGx5IGRpc2FibGVkIGJlY2F1c2Ugb2ZcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmVvdmltL25lb3ZpbS9pc3N1ZXMvMTIwMzdcbiAgICAvLyBOb3RlOiA8Q1Mtbj4gZG9lc24ndCBtYXRjaCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvbiBmaXJlZm94IGJlY2F1c2UgdGhpc1xuICAgIC8vIHdvdWxkIHJlcXVpcmUgdGhlIHNlc3Npb25zIEFQSS4gSW5zdGVhZCwgRmlyZWZveCdzIGJlaGF2aW9yIG1hdGNoZXNcbiAgICAvLyBDaHJvbWUncy5cbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiPENTLW4+XCIsIFwiZGVmYXVsdFwiKTtcbiAgICAvLyBOb3RlOiA8Q1MtdD4gaXMgdGhlcmUgZm9yIGNvbXBsZXRlbmVzcyBzYWtlJ3MgYnV0IGNhbid0IGJlIGVtdWxhdGVkIGluXG4gICAgLy8gQ2hyb21lIGFuZCBGaXJlZm94IGJlY2F1c2UgdGhpcyB3b3VsZCByZXF1aXJlIHRoZSBzZXNzaW9ucyBBUEkuXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDUy10PlwiLCBcImRlZmF1bHRcIik7XG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcIjxDUy13PlwiLCBcImRlZmF1bHRcIik7XG4gICAgLy8gIzcxNzogYWxsb3cgcGFzc2luZyBrZXlzIHRvIHRoZSBicm93c2VyXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcImlnbm9yZUtleXNcIiwge30pO1xuICAgIC8vICMxMDUwOiBjdXJzb3Igc29tZXRpbWVzIGNvdmVyZWQgYnkgY29tbWFuZCBsaW5lXG4gICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcImNtZGxpbmVUaW1lb3V0XCIsIDMwMDApO1xuXG4gICAgLy8gXCJhbHRcIjogXCJhbGxcIiB8IFwiYWxwaGFudW1cIlxuICAgIC8vICMyMDI6IE9ubHkgcmVnaXN0ZXIgYWx0IGtleSBvbiBhbHBoYW51bXMgdG8gbGV0IHN3ZWRpc2ggb3N4IHVzZXJzIHR5cGVcbiAgICAvLyAgICAgICBzcGVjaWFsIGNoYXJzXG4gICAgLy8gT25seSB0ZXN0ZWQgb24gT1NYLCB3aGVyZSB3ZSBkb24ndCBwdWxsIGNvdmVyYWdlIHJlcG9ydHMsIHNvIGRvbid0XG4gICAgLy8gaW5zdHJ1bWVudCBmdW5jdGlvbi5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChvcyA9PT0gXCJtYWNcIikge1xuICAgICAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MuZ2xvYmFsU2V0dGluZ3MsIFwiYWx0XCIsIFwiYWxwaGFudW1cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFrZURlZmF1bHRzKHNldHRpbmdzLmdsb2JhbFNldHRpbmdzLCBcImFsdFwiLCBcImFsbFwiKTtcbiAgICB9XG5cbiAgICBtYWtlRGVmYXVsdHMoc2V0dGluZ3MsIFwibG9jYWxTZXR0aW5nc1wiLCB7fSk7XG4gICAgbWFrZURlZmF1bHRMb2NhbFNldHRpbmcoc2V0dGluZ3MsIFwiLipcIiwge1xuICAgICAgICAvLyBcImNtZGxpbmVcIjogXCJuZW92aW1cIiB8IFwiZmlyZW52aW1cIlxuICAgICAgICAvLyAjMTY4OiBVc2UgYW4gZXh0ZXJuYWwgY29tbWFuZGxpbmUgdG8gcHJlc2VydmUgc3BhY2VcbiAgICAgICAgY21kbGluZTogXCJmaXJlbnZpbVwiLFxuICAgICAgICBjb250ZW50OiBcInRleHRcIixcbiAgICAgICAgcHJpb3JpdHk6IDAsXG4gICAgICAgIHJlbmRlcmVyOiBcImNhbnZhc1wiLFxuICAgICAgICBzZWxlY3RvcjogJ3RleHRhcmVhOm5vdChbcmVhZG9ubHldLCBbYXJpYS1yZWFkb25seV0pLCBkaXZbcm9sZT1cInRleHRib3hcIl0nLFxuICAgICAgICAvLyBcInRha2VvdmVyXCI6IFwiYWx3YXlzXCIgfCBcIm9uY2VcIiB8IFwiZW1wdHlcIiB8IFwibm9uZW1wdHlcIiB8IFwibmV2ZXJcIlxuICAgICAgICAvLyAjMjY1OiBPbiBcIm9uY2VcIiwgZG9uJ3QgYXV0b21hdGljYWxseSBicmluZyBiYWNrIGFmdGVyIDpxJ2luZyBpdFxuICAgICAgICB0YWtlb3ZlcjogXCJhbHdheXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwie2hvc3RuYW1lJTMyfV97cGF0aG5hbWUlMzJ9X3tzZWxlY3RvciUzMn1fe3RpbWVzdGFtcCUzMn0ue2V4dGVuc2lvbn1cIixcbiAgICB9KTtcbiAgICByZXR1cm4gc2V0dGluZ3M7XG59XG5cbmV4cG9ydCBjb25zdCBjb25mUmVhZHkgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KCkudGhlbigob2JqOiBhbnkpID0+IHtcbiAgICAgICAgY29uZiA9IG9iajtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5icm93c2VyLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChjaGFuZ2VzOiBhbnkpID0+IHtcbiAgICBPYmplY3RcbiAgICAgICAgLmVudHJpZXMoY2hhbmdlcylcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXTogW2tleW9mIElDb25maWcsIGFueV0pID0+IGNvbmZSZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZba2V5XSA9IHZhbHVlLm5ld1ZhbHVlO1xuICAgICAgICB9KSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbENvbmYoKSB7XG4gICAgLy8gQ2FuJ3QgYmUgdGVzdGVkIGZvclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGNvbmYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRHbG9iYWxDb25mIGNhbGxlZCBiZWZvcmUgY29uZmlnIHdhcyByZWFkeVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmYuZ2xvYmFsU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25mKCkge1xuICAgIHJldHVybiBnZXRDb25mRm9yVXJsKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZkZvclVybCh1cmw6IHN0cmluZyk6IElTaXRlQ29uZmlnIHtcbiAgICBjb25zdCBsb2NhbFNldHRpbmdzID0gY29uZi5sb2NhbFNldHRpbmdzO1xuICAgIGZ1bmN0aW9uIG9yMSh2YWw6IG51bWJlcikge1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIC8vIENhbid0IGJlIHRlc3RlZCBmb3JcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChsb2NhbFNldHRpbmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IHlvdXIgc2V0dGluZ3MgYXJlIHVuZGVmaW5lZC4gVHJ5IHJlbG9hZGluZyB0aGUgcGFnZS4gSWYgdGhpcyBlcnJvciBwZXJzaXN0cywgdHJ5IHRoZSB0cm91Ymxlc2hvb3RpbmcgZ3VpZGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9nbGFjYW1icmUvZmlyZW52aW0vYmxvYi9tYXN0ZXIvVFJPVUJMRVNIT09USU5HLm1kXCIpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShPYmplY3QuZW50cmllcyhsb2NhbFNldHRpbmdzKSlcbiAgICAgICAgLmZpbHRlcigoW3BhdCwgX10pID0+IChuZXcgUmVnRXhwKHBhdCkpLnRlc3QodXJsKSlcbiAgICAgICAgLnNvcnQoKGUxLCBlMikgPT4gKG9yMShlMVsxXS5wcmlvcml0eSkgLSBvcjEoZTJbMV0ucHJpb3JpdHkpKSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBbXywgY3VyXSkgPT4gT2JqZWN0LmFzc2lnbihhY2MsIGN1ciksIHt9IGFzIElTaXRlQ29uZmlnKTtcbn1cbiIsImV4cG9ydCBjb25zdCBub25MaXRlcmFsS2V5czoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgXCIgXCI6IFwiPFNwYWNlPlwiLFxuICAgIFwiPFwiOiBcIjxsdD5cIixcbiAgICBcIkFycm93RG93blwiOiBcIjxEb3duPlwiLFxuICAgIFwiQXJyb3dMZWZ0XCI6IFwiPExlZnQ+XCIsXG4gICAgXCJBcnJvd1JpZ2h0XCI6IFwiPFJpZ2h0PlwiLFxuICAgIFwiQXJyb3dVcFwiOiBcIjxVcD5cIixcbiAgICBcIkJhY2tzcGFjZVwiOiBcIjxCUz5cIixcbiAgICBcIkRlbGV0ZVwiOiBcIjxEZWw+XCIsXG4gICAgXCJFbmRcIjogXCI8RW5kPlwiLFxuICAgIFwiRW50ZXJcIjogXCI8Q1I+XCIsXG4gICAgXCJFc2NhcGVcIjogXCI8RXNjPlwiLFxuICAgIFwiRjFcIjogXCI8RjE+XCIsXG4gICAgXCJGMTBcIjogXCI8RjEwPlwiLFxuICAgIFwiRjExXCI6IFwiPEYxMT5cIixcbiAgICBcIkYxMlwiOiBcIjxGMTI+XCIsXG4gICAgXCJGMTNcIjogXCI8RjEzPlwiLFxuICAgIFwiRjE0XCI6IFwiPEYxND5cIixcbiAgICBcIkYxNVwiOiBcIjxGMTU+XCIsXG4gICAgXCJGMTZcIjogXCI8RjE2PlwiLFxuICAgIFwiRjE3XCI6IFwiPEYxNz5cIixcbiAgICBcIkYxOFwiOiBcIjxGMTg+XCIsXG4gICAgXCJGMTlcIjogXCI8RjE5PlwiLFxuICAgIFwiRjJcIjogXCI8RjI+XCIsXG4gICAgXCJGMjBcIjogXCI8RjIwPlwiLFxuICAgIFwiRjIxXCI6IFwiPEYyMT5cIixcbiAgICBcIkYyMlwiOiBcIjxGMjI+XCIsXG4gICAgXCJGMjNcIjogXCI8RjIzPlwiLFxuICAgIFwiRjI0XCI6IFwiPEYyND5cIixcbiAgICBcIkYzXCI6IFwiPEYzPlwiLFxuICAgIFwiRjRcIjogXCI8RjQ+XCIsXG4gICAgXCJGNVwiOiBcIjxGNT5cIixcbiAgICBcIkY2XCI6IFwiPEY2PlwiLFxuICAgIFwiRjdcIjogXCI8Rjc+XCIsXG4gICAgXCJGOFwiOiBcIjxGOD5cIixcbiAgICBcIkY5XCI6IFwiPEY5PlwiLFxuICAgIFwiSG9tZVwiOiBcIjxIb21lPlwiLFxuICAgIFwiUGFnZURvd25cIjogXCI8UGFnZURvd24+XCIsXG4gICAgXCJQYWdlVXBcIjogXCI8UGFnZVVwPlwiLFxuICAgIFwiVGFiXCI6IFwiPFRhYj5cIixcbiAgICBcIlxcXFxcIjogXCI8QnNsYXNoPlwiLFxuICAgIFwifFwiOiBcIjxCYXI+XCIsXG59O1xuXG5jb25zdCBub25MaXRlcmFsVmltS2V5cyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbnRyaWVzKG5vbkxpdGVyYWxLZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoW3gsIHldKSA9PiBbeSwgeF0pKTtcblxuY29uc3Qgbm9uTGl0ZXJhbEtleUNvZGVzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHtcbiAgICBcIkVudGVyXCI6ICAgICAgMTMsXG4gICAgXCJTcGFjZVwiOiAgICAgIDMyLFxuICAgIFwiVGFiXCI6ICAgICAgICA5LFxuICAgIFwiRGVsZXRlXCI6ICAgICA0NixcbiAgICBcIkVuZFwiOiAgICAgICAgMzUsXG4gICAgXCJIb21lXCI6ICAgICAgIDM2LFxuICAgIFwiSW5zZXJ0XCI6ICAgICA0NSxcbiAgICBcIlBhZ2VEb3duXCI6ICAgMzQsXG4gICAgXCJQYWdlVXBcIjogICAgIDMzLFxuICAgIFwiQXJyb3dEb3duXCI6ICA0MCxcbiAgICBcIkFycm93TGVmdFwiOiAgMzcsXG4gICAgXCJBcnJvd1JpZ2h0XCI6IDM5LFxuICAgIFwiQXJyb3dVcFwiOiAgICAzOCxcbiAgICBcIkVzY2FwZVwiOiAgICAgMjcsXG59O1xuXG4vLyBHaXZlbiBhIFwic3BlY2lhbFwiIGtleSByZXByZXNlbnRhdGlvbiAoZS5nLiA8RW50ZXI+IG9yIDxNLWw+KSwgcmV0dXJucyBhblxuLy8gYXJyYXkgb2YgdGhyZWUgamF2YXNjcmlwdCBrZXlldmVudHMsIHRoZSBmaXJzdCBvbmUgcmVwcmVzZW50aW5nIHRoZVxuLy8gY29ycmVzcG9uZGluZyBrZXlkb3duLCB0aGUgc2Vjb25kIG9uZSBhIGtleXByZXNzIGFuZCB0aGUgdGhpcmQgb25lIGEga2V5dXBcbi8vIGV2ZW50LlxuZnVuY3Rpb24gbW9kS2V5VG9FdmVudHMoazogc3RyaW5nKSB7XG4gICAgbGV0IG1vZHMgPSBcIlwiO1xuICAgIGxldCBrZXkgPSBub25MaXRlcmFsVmltS2V5c1trXTtcbiAgICBsZXQgY3RybEtleSA9IGZhbHNlO1xuICAgIGxldCBhbHRLZXkgPSBmYWxzZTtcbiAgICBsZXQgc2hpZnRLZXkgPSBmYWxzZTtcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYXJyID0gay5zbGljZSgxLCAtMSkuc3BsaXQoXCItXCIpO1xuICAgICAgICBtb2RzID0gYXJyWzBdO1xuICAgICAgICBrZXkgPSBhcnJbMV07XG4gICAgICAgIGN0cmxLZXkgPSAvYy9pLnRlc3QobW9kcyk7XG4gICAgICAgIGFsdEtleSA9IC9hL2kudGVzdChtb2RzKTtcbiAgICAgICAgY29uc3Qgc3BlY2lhbENoYXIgPSBcIjxcIiArIGtleSArIFwiPlwiO1xuICAgICAgICBpZiAobm9uTGl0ZXJhbFZpbUtleXNbc3BlY2lhbENoYXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGtleSA9IG5vbkxpdGVyYWxWaW1LZXlzW3NwZWNpYWxDaGFyXTtcbiAgICAgICAgICAgIHNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaGlmdEtleSA9IGtleSAhPT0ga2V5LnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU29tZSBwYWdlcyByZWx5IG9uIGtleUNvZGVzIHRvIGZpZ3VyZSBvdXQgd2hhdCBrZXkgd2FzIHByZXNzZWQuIFRoaXMgaXNcbiAgICAvLyBhd2Z1bCBiZWNhdXNlIGtleWNvZGVzIGFyZW4ndCBndWFyYW50ZWVkIHRvIGJlIHRoZSBzYW1lIGFjcnJvc3NcbiAgICAvLyBicm93c2Vycy9PUy9rZXlib2FyZCBsYXlvdXRzIGJ1dCB0cnkgdG8gZG8gdGhlIHJpZ2h0IHRoaW5nIGFueXdheS5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2xhY2FtYnJlL2ZpcmVudmltL2lzc3Vlcy83MjNcbiAgICBsZXQga2V5Q29kZSA9IDA7XG4gICAgaWYgKC9eW2EtekEtWjAtOV0kLy50ZXN0KGtleSkpIHtcbiAgICAgICAga2V5Q29kZSA9IGtleS5jaGFyQ29kZUF0KDApO1xuICAgIH0gZWxzZSBpZiAobm9uTGl0ZXJhbEtleUNvZGVzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlDb2RlID0gbm9uTGl0ZXJhbEtleUNvZGVzW2tleV07XG4gICAgfVxuICAgIGNvbnN0IGluaXQgPSB7IGtleSwga2V5Q29kZSwgY3RybEtleSwgYWx0S2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9O1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5ZG93blwiLCBpbml0KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXlwcmVzc1wiLCBpbml0KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXl1cFwiLCBpbml0KSxcbiAgICBdO1xufVxuXG4vLyBHaXZlbiBhIFwic2ltcGxlXCIga2V5IChlLmcuIGBhYCwgYDFg4oCmKSwgcmV0dXJucyBhbiBhcnJheSBvZiB0aHJlZSBqYXZhc2NyaXB0XG4vLyBldmVudHMgcmVwcmVzZW50aW5nIHRoZSBhY3Rpb24gb2YgcHJlc3NpbmcgdGhlIGtleS5cbmZ1bmN0aW9uIGtleVRvRXZlbnRzKGtleTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2hpZnRLZXkgPSBrZXkgIT09IGtleS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBLZXlib2FyZEV2ZW50KFwia2V5ZG93blwiLCAgeyBrZXksIHNoaWZ0S2V5LCBidWJibGVzOiB0cnVlIH0pLFxuICAgICAgICBuZXcgS2V5Ym9hcmRFdmVudChcImtleXByZXNzXCIsIHsga2V5LCBzaGlmdEtleSwgYnViYmxlczogdHJ1ZSB9KSxcbiAgICAgICAgbmV3IEtleWJvYXJkRXZlbnQoXCJrZXl1cFwiLCAgICB7IGtleSwgc2hpZnRLZXksIGJ1YmJsZXM6IHRydWUgfSksXG4gICAgXTtcbn1cblxuLy8gR2l2ZW4gYW4gYXJyYXkgb2Ygc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGtleXMgKGUuZy4gW1wiYVwiLCBcIjxFbnRlcj5cIiwg4oCmXSksXG4vLyByZXR1cm5zIGFuIGFycmF5IG9mIGphdmFzY3JpcHQga2V5Ym9hcmQgZXZlbnRzIHRoYXQgc2ltdWxhdGUgdGhlc2Uga2V5c1xuLy8gYmVpbmcgcHJlc3NlZC5cbmV4cG9ydCBmdW5jdGlvbiBrZXlzVG9FdmVudHMoa2V5czogc3RyaW5nW10pIHtcbiAgICAvLyBDb2RlIHRvIHNwbGl0IG1vZCBrZXlzIGFuZCBub24tbW9kIGtleXM6XG4gICAgLy8gY29uc3Qga2V5cyA9IHN0ci5tYXRjaCgvKFs8Pl1bXjw+XStbPD5dKXwoW148Pl0rKS9nKVxuICAgIC8vIGlmIChrZXlzID09PSBudWxsKSB7XG4gICAgLy8gICAgIHJldHVybiBbXTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgaWYgKGtleVswXSA9PT0gXCI8XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RLZXlUb0V2ZW50cyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlUb0V2ZW50cyhrZXkpO1xuICAgIH0pLmZsYXQoKTtcbn1cblxuLy8gVHVybnMgYSBub24tbGl0ZXJhbCBrZXkgKGUuZy4gXCJFbnRlclwiKSBpbnRvIGEgdmltLWVxdWl2YWxlbnQgXCI8RW50ZXI+XCJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAobm9uTGl0ZXJhbEtleXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBub25MaXRlcmFsS2V5c1trZXldO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xufVxuXG4vLyBBZGQgbW9kaWZpZXIgYG1vZGAgKGBBYCwgYENgLCBgU2DigKYpIHRvIGB0ZXh0YCAoYSB2aW0ga2V5IGBiYCwgYDxFbnRlcj5gLFxuLy8gYDxDUy14PmDigKYpXG5leHBvcnQgZnVuY3Rpb24gYWRkTW9kaWZpZXIobW9kOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgIGxldCBtYXRjaDtcbiAgICBsZXQgbW9kaWZpZXJzID0gXCJcIjtcbiAgICBsZXQga2V5ID0gXCJcIjtcbiAgICBpZiAoKG1hdGNoID0gdGV4dC5tYXRjaCgvXjwoW0EtWl17MSw1fSktKC4rKT4kLykpKSB7XG4gICAgICAgIG1vZGlmaWVycyA9IG1hdGNoWzFdO1xuICAgICAgICBrZXkgPSBtYXRjaFsyXTtcbiAgICB9IGVsc2UgaWYgKChtYXRjaCA9IHRleHQubWF0Y2goL148KC4rKT4kLykpKSB7XG4gICAgICAgIGtleSA9IG1hdGNoWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSA9IHRleHQ7XG4gICAgfVxuICAgIHJldHVybiBcIjxcIiArIG1vZCArIG1vZGlmaWVycyArIFwiLVwiICsga2V5ICsgXCI+XCI7XG59XG4iLCJsZXQgY3VySG9zdCA6IHN0cmluZztcblxuLy8gQ2hyb21lIGRvZXNuJ3QgaGF2ZSBhIFwiYnJvd3NlclwiIG9iamVjdCwgaW5zdGVhZCBpdCB1c2VzIFwiY2hyb21lXCIuXG5pZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcIm1vei1leHRlbnNpb246XCIpIHtcbiAgICBjdXJIb3N0ID0gXCJmaXJlZm94XCI7XG59IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJjaHJvbWUtZXh0ZW5zaW9uOlwiKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59IGVsc2UgaWYgKCh3aW5kb3cgYXMgYW55KS5JbnN0YWxsVHJpZ2dlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY3VySG9zdCA9IFwiY2hyb21lXCI7XG59IGVsc2Uge1xuICAgIGN1ckhvc3QgPSBcImZpcmVmb3hcIjtcbn1cblxuLy8gT25seSB1c2FibGUgaW4gYmFja2dyb3VuZCBzY3JpcHQhXG5leHBvcnQgZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgLy8gQ2FuJ3QgY292ZXIgZXJyb3IgY29uZGl0aW9uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY3VySG9zdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiVXNlZCBpc0Nocm9tZSBpbiBjb250ZW50IHNjcmlwdCFcIik7XG4gICAgfVxuICAgIHJldHVybiBjdXJIb3N0ID09PSBcImNocm9tZVwiO1xufVxuXG4vLyBSdW5zIENPREUgaW4gdGhlIHBhZ2UncyBjb250ZXh0IGJ5IHNldHRpbmcgdXAgYSBjdXN0b20gZXZlbnQgbGlzdGVuZXIsXG4vLyBlbWJlZGRpbmcgYSBzY3JpcHQgZWxlbWVudCB0aGF0IHJ1bnMgdGhlIHBpZWNlIG9mIGNvZGUgYW5kIGVtaXRzIGl0cyByZXN1bHRcbi8vIGFzIGFuIGV2ZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVJblBhZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBPbiBmaXJlZm94LCB1c2UgYW4gQVBJIHRoYXQgYWxsb3dzIGNpcmN1bXZlbnRpbmcgc29tZSBDU1AgcmVzdHJpY3Rpb25zXG4gICAgLy8gVXNlIHdyYXBwZWRKU09iamVjdCB0byBkZXRlY3QgYXZhaWxhYmlsaXR5IG9mIHNhaWQgQVBJXG4gICAgLy8gRE9OJ1QgdXNlIHdpbmRvdy5ldmFsIG9uIG90aGVyIHBsYXRlZm9ybXMgLSBpdCBkb2Vzbid0IGhhdmUgdGhlXG4gICAgLy8gc2VtYW50aWNzIHdlIG5lZWQhXG4gICAgaWYgKCh3aW5kb3cgYXMgYW55KS53cmFwcGVkSlNPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuZXZhbChjb2RlKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgY29uc3QgZXZlbnRJZCA9IChuZXcgVVJMKGJyb3dzZXIucnVudGltZS5nZXRVUkwoXCJcIikpKS5ob3N0bmFtZSArIE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBgKGFzeW5jIChldklkKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgJHtjb2RlfTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZJZCwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IHN1Y2Nlc3M6IGZhbHNlLCByZWFzb246IGUgfSxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCR7SlNPTi5zdHJpbmdpZnkoZXZlbnRJZCl9KWA7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50SWQsICh7IGRldGFpbCB9OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICBpZiAoZGV0YWlsLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShkZXRhaWwucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZGV0YWlsLnJlYXNvbik7XG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xufVxuXG4vLyBWYXJpb3VzIGZpbHRlcnMgdGhhdCBhcmUgdXNlZCB0byBjaGFuZ2UgdGhlIGFwcGVhcmFuY2Ugb2YgdGhlIEJyb3dzZXJBY3Rpb25cbi8vIGljb24uXG5jb25zdCBzdmdwYXRoID0gXCJmaXJlbnZpbS5zdmdcIjtcbmNvbnN0IHRyYW5zZm9ybWF0aW9ucyA9IHtcbiAgICBkaXNhYmxlZDogKGltZzogVWludDhDbGFtcGVkQXJyYXkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWcubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIC8vIFNraXAgdHJhbnNwYXJlbnQgcGl4ZWxzXG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWVhbiA9IE1hdGguZmxvb3IoKGltZ1tpXSArIGltZ1tpICsgMV0gKyBpbWdbaSArIDJdKSAvIDMpO1xuICAgICAgICAgICAgaW1nW2ldID0gbWVhbjtcbiAgICAgICAgICAgIGltZ1tpICsgMV0gPSBtZWFuO1xuICAgICAgICAgICAgaW1nW2kgKyAyXSA9IG1lYW47XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiAoaW1nOiBVaW50OENsYW1wZWRBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgLy8gVHVybiB0cmFuc3BhcmVudCBwaXhlbHMgcmVkXG4gICAgICAgICAgICBpZiAoaW1nW2kgKyAzXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltZ1tpXSA9IDI1NTtcbiAgICAgICAgICAgICAgICBpbWdbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBub3JtYWw6ICgoX2ltZzogVWludDhDbGFtcGVkQXJyYXkpID0+ICh1bmRlZmluZWQgYXMgbmV2ZXIpKSxcbiAgICBub3RpZmljYXRpb246IChpbWc6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICAvLyBUdXJuIHRyYW5zcGFyZW50IHBpeGVscyB5ZWxsb3dcbiAgICAgICAgICAgIGlmIChpbWdbaSArIDNdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1nW2ldID0gMjU1O1xuICAgICAgICAgICAgICAgIGltZ1tpICsgMV0gPSAyNTU7XG4gICAgICAgICAgICAgICAgaW1nW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgdHlwZSBJY29uS2luZCA9IGtleW9mIHR5cGVvZiB0cmFuc2Zvcm1hdGlvbnM7XG5cbi8vIFRha2VzIGFuIGljb24ga2luZCBhbmQgZGltZW5zaW9ucyBhcyBwYXJhbWV0ZXIsIGRyYXdzIHRoYXQgdG8gYSBjYW52YXMgYW5kXG4vLyByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgY2FudmFzJyBpbWFnZSBkYXRhLlxuZXhwb3J0IGZ1bmN0aW9uIGdldEljb25JbWFnZURhdGEoa2luZDogSWNvbktpbmQsIHdpZHRoID0gMzIsIGhlaWdodCA9IDMyKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb25zdCBpZCA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRyYW5zZm9ybWF0aW9uc1traW5kXShpZC5kYXRhKTtcbiAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgfSkpO1xuICAgIGltZy5zcmMgPSBzdmdwYXRoO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdpdmVuIGEgdXJsIGFuZCBhIHNlbGVjdG9yLCB0cmllcyB0byBjb21wdXRlIGEgbmFtZSB0aGF0IHdpbGwgYmUgdW5pcXVlLFxuLy8gc2hvcnQgYW5kIHJlYWRhYmxlIGZvciB0aGUgdXNlci5cbmV4cG9ydCBmdW5jdGlvbiB0b0ZpbGVOYW1lKGZvcm1hdFN0cmluZzogc3RyaW5nLCB1cmw6IHN0cmluZywgaWQ6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcnNlZFVSTCA9IG5ldyBVUkwodXJsKTtcblxuICAgIGNvbnN0IHNhbml0aXplID0gKHM6IHN0cmluZykgPT4gKHMubWF0Y2goL1thLXpBLVowLTldKy9nKSB8fCBbXSkuam9pbihcIi1cIik7XG5cbiAgICBjb25zdCBleHBhbmQgPSAocGF0dGVybjogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vQnJhY2tldHMgPSBwYXR0ZXJuLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgY29uc3QgW3N5bWJvbCwgbGVuZ3RoXSA9IG5vQnJhY2tldHMuc3BsaXQoXCIlXCIpO1xuICAgICAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgICAgICBzd2l0Y2ggKHN5bWJvbCkge1xuICAgICAgICAgICAgY2FzZSBcImhvc3RuYW1lXCI6IHZhbHVlID0gcGFyc2VkVVJMLmhvc3RuYW1lOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwYXRobmFtZVwiOiB2YWx1ZSA9IHNhbml0aXplKHBhcnNlZFVSTC5wYXRobmFtZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNlbGVjdG9yXCI6IHZhbHVlID0gc2FuaXRpemUoaWQucmVwbGFjZSgvOm50aC1vZi10eXBlL2csIFwiXCIpKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidGltZXN0YW1wXCI6IHZhbHVlID0gc2FuaXRpemUoKG5ldyBEYXRlKCkpLnRvSVNPU3RyaW5nKCkpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJleHRlbnNpb25cIjogdmFsdWUgPSBsYW5ndWFnZVRvRXh0ZW5zaW9ucyhsYW5ndWFnZSk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihgVW5yZWNvZ25pemVkIGZpbGVuYW1lIHBhdHRlcm46ICR7cGF0dGVybn1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoLWxlbmd0aCk7XG4gICAgfTtcblxuICAgIGxldCByZXN1bHQgPSBmb3JtYXRTdHJpbmc7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGZvcm1hdFN0cmluZy5tYXRjaCgve1tefV0qfS9nKTtcbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMuZmlsdGVyKHMgPT4gcyAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UobWF0Y2gsIGV4cGFuZChtYXRjaCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdpdmVuIGEgbGFuZ3VhZ2UgbmFtZSwgcmV0dXJucyBhIGZpbGVuYW1lIGV4dGVuc2lvbi4gQ2FuIHJldHVybiB1bmRlZmluZWQuXG5leHBvcnQgZnVuY3Rpb24gbGFuZ3VhZ2VUb0V4dGVuc2lvbnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGlmIChsYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IGxhbmd1YWdlID09PSBudWxsKSB7XG4gICAgICAgIGxhbmd1YWdlID0gXCJcIjtcbiAgICB9XG4gICAgY29uc3QgbGFuZyA9IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBzd2l0Y2ggKGxhbmcpIHtcbiAgICAgICAgY2FzZSBcImFwbFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiYXBsXCI7XG4gICAgICAgIGNhc2UgXCJicmFpbmZ1Y2tcIjogICAgICAgIHJldHVybiBcImJmXCI7XG4gICAgICAgIGNhc2UgXCJjXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImNcIjtcbiAgICAgICAgY2FzZSBcImMjXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiY3NcIjtcbiAgICAgICAgY2FzZSBcImMrK1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3BwXCI7XG4gICAgICAgIGNhc2UgXCJjZXlsb25cIjogICAgICAgICAgIHJldHVybiBcImNleWxvblwiO1xuICAgICAgICBjYXNlIFwiY2xpa2VcIjogICAgICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgICAgIGNhc2UgXCJjbG9qdXJlXCI6ICAgICAgICAgIHJldHVybiBcImNsalwiO1xuICAgICAgICBjYXNlIFwiY21ha2VcIjogICAgICAgICAgICByZXR1cm4gXCIuY21ha2VcIjtcbiAgICAgICAgY2FzZSBcImNvYm9sXCI6ICAgICAgICAgICAgcmV0dXJuIFwiY2JsXCI7XG4gICAgICAgIGNhc2UgXCJjb2ZmZWVzY3JpcHRcIjogICAgIHJldHVybiBcImNvZmZlZVwiO1xuICAgICAgICBjYXNlIFwiY29tbW9ubGlzcFwiOiAgICAgIHJldHVybiBcImxpc3BcIjtcbiAgICAgICAgY2FzZSBcImNyeXN0YWxcIjogICAgICAgICAgcmV0dXJuIFwiY3JcIjtcbiAgICAgICAgY2FzZSBcImNzc1wiOiAgICAgICAgICAgICAgcmV0dXJuIFwiY3NzXCI7XG4gICAgICAgIGNhc2UgXCJjeXRob25cIjogICAgICAgICAgIHJldHVybiBcInB5XCI7XG4gICAgICAgIGNhc2UgXCJkXCI6ICAgICAgICAgICAgICAgIHJldHVybiBcImRcIjtcbiAgICAgICAgY2FzZSBcImRhcnRcIjogICAgICAgICAgICAgcmV0dXJuIFwiZGFydFwiO1xuICAgICAgICBjYXNlIFwiZGlmZlwiOiAgICAgICAgICAgICByZXR1cm4gXCJkaWZmXCI7XG4gICAgICAgIGNhc2UgXCJkb2NrZXJmaWxlXCI6ICAgICAgIHJldHVybiBcImRvY2tlcmZpbGVcIjtcbiAgICAgICAgY2FzZSBcImR0ZFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZHRkXCI7XG4gICAgICAgIGNhc2UgXCJkeWxhblwiOiAgICAgICAgICAgIHJldHVybiBcImR5bGFuXCI7XG4gICAgICAgIC8vIEVpZmZlbCB3YXMgdGhlcmUgZmlyc3QgYnV0IGVsaXhpciBzZWVtcyBtb3JlIGxpa2VseVxuICAgICAgICAvLyBjYXNlIFwiZWlmZmVsXCI6ICAgICAgICAgICByZXR1cm4gXCJlXCI7XG4gICAgICAgIGNhc2UgXCJlbGl4aXJcIjogICAgICAgICAgIHJldHVybiBcImVcIjtcbiAgICAgICAgY2FzZSBcImVsbVwiOiAgICAgICAgICAgICAgcmV0dXJuIFwiZWxtXCI7XG4gICAgICAgIGNhc2UgXCJlcmxhbmdcIjogICAgICAgICAgIHJldHVybiBcImVybFwiO1xuICAgICAgICBjYXNlIFwiZiNcIjogICAgICAgICAgICAgICByZXR1cm4gXCJmc1wiO1xuICAgICAgICBjYXNlIFwiZmFjdG9yXCI6ICAgICAgICAgICByZXR1cm4gXCJmYWN0b3JcIjtcbiAgICAgICAgY2FzZSBcImZvcnRoXCI6ICAgICAgICAgICAgcmV0dXJuIFwiZnRoXCI7XG4gICAgICAgIGNhc2UgXCJmb3J0cmFuXCI6ICAgICAgICAgIHJldHVybiBcImY5MFwiO1xuICAgICAgICBjYXNlIFwiZ2FzXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJhc21cIjtcbiAgICAgICAgY2FzZSBcImdvXCI6ICAgICAgICAgICAgICAgcmV0dXJuIFwiZ29cIjtcbiAgICAgICAgLy8gR0ZNOiBDb2RlTWlycm9yJ3MgZ2l0aHViLWZsYXZvcmVkIG1hcmtkb3duXG4gICAgICAgIGNhc2UgXCJnZm1cIjogICAgICAgICAgICAgIHJldHVybiBcIm1kXCI7XG4gICAgICAgIGNhc2UgXCJncm9vdnlcIjogICAgICAgICAgIHJldHVybiBcImdyb292eVwiO1xuICAgICAgICBjYXNlIFwiaGFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJoYW1sXCI7XG4gICAgICAgIGNhc2UgXCJoYW5kbGViYXJzXCI6ICAgICAgIHJldHVybiBcImhic1wiO1xuICAgICAgICBjYXNlIFwiaGFza2VsbFwiOiAgICAgICAgICByZXR1cm4gXCJoc1wiO1xuICAgICAgICBjYXNlIFwiaGF4ZVwiOiAgICAgICAgICAgICByZXR1cm4gXCJoeFwiO1xuICAgICAgICBjYXNlIFwiaHRtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJodG1sXCI7XG4gICAgICAgIGNhc2UgXCJodG1sZW1iZWRkZWRcIjogICAgIHJldHVybiBcImh0bWxcIjtcbiAgICAgICAgY2FzZSBcImh0bWxtaXhlZFwiOiAgICAgICAgcmV0dXJuIFwiaHRtbFwiO1xuICAgICAgICBjYXNlIFwiaXB5dGhvblwiOiAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiaXB5dGhvbmZtXCI6ICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwiamF2YVwiOiAgICAgICAgICAgICByZXR1cm4gXCJqYXZhXCI7XG4gICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0XCI6ICAgICAgIHJldHVybiBcImpzXCI7XG4gICAgICAgIGNhc2UgXCJqaW5qYTJcIjogICAgICAgICAgIHJldHVybiBcImppbmphXCI7XG4gICAgICAgIGNhc2UgXCJqdWxpYVwiOiAgICAgICAgICAgIHJldHVybiBcImpsXCI7XG4gICAgICAgIGNhc2UgXCJqc3hcIjogICAgICAgICAgICAgIHJldHVybiBcImpzeFwiO1xuICAgICAgICBjYXNlIFwia290bGluXCI6ICAgICAgICAgICByZXR1cm4gXCJrdFwiO1xuICAgICAgICBjYXNlIFwibGF0ZXhcIjogICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwibGVzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJsZXNzXCI7XG4gICAgICAgIGNhc2UgXCJsdWFcIjogICAgICAgICAgICAgIHJldHVybiBcImx1YVwiO1xuICAgICAgICBjYXNlIFwibWFya2Rvd25cIjogICAgICAgICByZXR1cm4gXCJtZFwiO1xuICAgICAgICBjYXNlIFwibWxsaWtlXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jYW1sXCI6ICAgICAgICAgICAgcmV0dXJuIFwibWxcIjtcbiAgICAgICAgY2FzZSBcIm9jdGF2ZVwiOiAgICAgICAgICAgcmV0dXJuIFwibVwiO1xuICAgICAgICBjYXNlIFwicGFzY2FsXCI6ICAgICAgICAgICByZXR1cm4gXCJwYXNcIjtcbiAgICAgICAgY2FzZSBcInBlcmxcIjogICAgICAgICAgICAgcmV0dXJuIFwicGxcIjtcbiAgICAgICAgY2FzZSBcInBocFwiOiAgICAgICAgICAgICAgcmV0dXJuIFwicGhwXCI7XG4gICAgICAgIGNhc2UgXCJwb3dlcnNoZWxsXCI6ICAgICAgIHJldHVybiBcInBzMVwiO1xuICAgICAgICBjYXNlIFwicHl0aG9uXCI6ICAgICAgICAgICByZXR1cm4gXCJweVwiO1xuICAgICAgICBjYXNlIFwiclwiOiAgICAgICAgICAgICAgICByZXR1cm4gXCJyXCI7XG4gICAgICAgIGNhc2UgXCJyc3RcIjogICAgICAgICAgICAgIHJldHVybiBcInJzdFwiO1xuICAgICAgICBjYXNlIFwicnVieVwiOiAgICAgICAgICAgICByZXR1cm4gXCJydWJ5XCI7XG4gICAgICAgIGNhc2UgXCJydXN0XCI6ICAgICAgICAgICAgIHJldHVybiBcInJzXCI7XG4gICAgICAgIGNhc2UgXCJzYXNcIjogICAgICAgICAgICAgIHJldHVybiBcInNhc1wiO1xuICAgICAgICBjYXNlIFwic2Fzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzYXNzXCI7XG4gICAgICAgIGNhc2UgXCJzY2FsYVwiOiAgICAgICAgICAgIHJldHVybiBcInNjYWxhXCI7XG4gICAgICAgIGNhc2UgXCJzY2hlbWVcIjogICAgICAgICAgIHJldHVybiBcInNjbVwiO1xuICAgICAgICBjYXNlIFwic2Nzc1wiOiAgICAgICAgICAgICByZXR1cm4gXCJzY3NzXCI7XG4gICAgICAgIGNhc2UgXCJzbWFsbHRhbGtcIjogICAgICAgIHJldHVybiBcInN0XCI7XG4gICAgICAgIGNhc2UgXCJzaGVsbFwiOiAgICAgICAgICAgIHJldHVybiBcInNoXCI7XG4gICAgICAgIGNhc2UgXCJzcWxcIjogICAgICAgICAgICAgIHJldHVybiBcInNxbFwiO1xuICAgICAgICBjYXNlIFwic3RleFwiOiAgICAgICAgICAgICByZXR1cm4gXCJsYXRleFwiO1xuICAgICAgICBjYXNlIFwic3dpZnRcIjogICAgICAgICAgICByZXR1cm4gXCJzd2lmdFwiO1xuICAgICAgICBjYXNlIFwidGNsXCI6ICAgICAgICAgICAgICByZXR1cm4gXCJ0Y2xcIjtcbiAgICAgICAgY2FzZSBcInRvbWxcIjogICAgICAgICAgICAgcmV0dXJuIFwidG9tbFwiO1xuICAgICAgICBjYXNlIFwidHdpZ1wiOiAgICAgICAgICAgICByZXR1cm4gXCJ0d2lnXCI7XG4gICAgICAgIGNhc2UgXCJ0eXBlc2NyaXB0XCI6ICAgICAgIHJldHVybiBcInRzXCI7XG4gICAgICAgIGNhc2UgXCJ2YlwiOiAgICAgICAgICAgICAgIHJldHVybiBcInZiXCI7XG4gICAgICAgIGNhc2UgXCJ2YnNjcmlwdFwiOiAgICAgICAgIHJldHVybiBcInZic1wiO1xuICAgICAgICBjYXNlIFwidmVyaWxvZ1wiOiAgICAgICAgICByZXR1cm4gXCJzdlwiO1xuICAgICAgICBjYXNlIFwidmhkbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ2aGRsXCI7XG4gICAgICAgIGNhc2UgXCJ4bWxcIjogICAgICAgICAgICAgIHJldHVybiBcInhtbFwiO1xuICAgICAgICBjYXNlIFwieWFtbFwiOiAgICAgICAgICAgICByZXR1cm4gXCJ5YW1sXCI7XG4gICAgICAgIGNhc2UgXCJ6ODBcIjogICAgICAgICAgICAgIHJldHVybiBcIno4YVwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJ0eHRcIjtcbn1cblxuLy8gTWFrZSB0c2xpbnQgaGFwcHlcbmNvbnN0IGZvbnRGYW1pbHkgPSBcImZvbnQtZmFtaWx5XCI7XG5cbi8vIENhbid0IGJlIHRlc3RlZCBlMmUgOi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTaW5nbGVHdWlmb250KGd1aWZvbnQ6IHN0cmluZywgZGVmYXVsdHM6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBndWlmb250LnNwbGl0KFwiOlwiKTtcbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7XG4gICAgaWYgKC9eW2EtekEtWjAtOV0rJC8udGVzdChvcHRpb25zWzBdKSkge1xuICAgICAgICByZXN1bHRbZm9udEZhbWlseV0gPSBvcHRpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtmb250RmFtaWx5XSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnNbMF0pO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdHNbZm9udEZhbWlseV0pIHtcbiAgICAgICAgcmVzdWx0W2ZvbnRGYW1pbHldICs9IGAsICR7ZGVmYXVsdHNbZm9udEZhbWlseV19YDtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnMuc2xpY2UoMSkucmVkdWNlKChhY2MsIG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvcHRpb25bMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaFwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXNpemVcIl0gPSBgJHtvcHRpb24uc2xpY2UoMSl9cHRgO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYlwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXdlaWdodFwiXSA9IFwiYm9sZFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaVwiOlxuICAgICAgICAgICAgICAgICAgICBhY2NbXCJmb250LXN0eWxlXCJdID0gXCJpdGFsaWNcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICAgICAgYWNjW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJsaW5lLXRocm91Z2hcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIndcIjogLy8gQ2FuJ3Qgc2V0IGZvbnQgd2lkdGguIFdvdWxkIGhhdmUgdG8gYWRqdXN0IGNlbGwgd2lkdGguXG4gICAgICAgICAgICAgICAgY2FzZSBcImNcIjogLy8gQ2FuJ3Qgc2V0IGNoYXJhY3RlciBzZXRcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCByZXN1bHQgYXMgYW55KTtcbn1cblxuLy8gUGFyc2VzIGEgZ3VpZm9udCBkZWNsYXJhdGlvbiBhcyBkZXNjcmliZWQgaW4gYDpoIEUyNDRgXG4vLyBkZWZhdWx0czogZGVmYXVsdCB2YWx1ZSBmb3IgZWFjaCBvZi5cbi8vIENhbid0IGJlIHRlc3RlZCBlMmUgOi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHdWlmb250KGd1aWZvbnQ6IHN0cmluZywgZGVmYXVsdHM6IGFueSkge1xuICAgIGNvbnN0IGZvbnRzID0gZ3VpZm9udC5zcGxpdChcIixcIikucmV2ZXJzZSgpO1xuICAgIHJldHVybiBmb250cy5yZWR1Y2UoKGFjYywgY3VyKSA9PiBwYXJzZVNpbmdsZUd1aWZvbnQoY3VyLCBhY2MpLCBkZWZhdWx0cyk7XG59XG5cbi8vIENvbXB1dGVzIGEgdW5pcXVlIHNlbGVjdG9yIGZvciBpdHMgYXJndW1lbnQuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNlbGVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZnVuY3Rpb24gdW5pcXVlU2VsZWN0b3IoZTogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICAvLyBPbmx5IG1hdGNoaW5nIGFscGhhbnVtZXJpYyBzZWxlY3RvcnMgYmVjYXVzZSBvdGhlcnMgY2hhcnMgbWlnaHQgaGF2ZSBzcGVjaWFsIG1lYW5pbmcgaW4gQ1NTXG4gICAgICAgIGlmIChlLmlkICYmIGUuaWQubWF0Y2goXCJeW2EtekEtWjAtOV8tXSskXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFnTmFtZSArIGBbaWQ9XCIke2UuaWR9XCJdYDtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGlkKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICBpZiAoIWUucGFyZW50RWxlbWVudCkgeyByZXR1cm4gXCJIVE1MXCI7IH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgY29uc3QgaW5kZXggPVxuICAgICAgICAgICAgQXJyYXkuZnJvbShlLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC50YWdOYW1lID09PSBlLnRhZ05hbWUpXG4gICAgICAgICAgICAgICAgLmluZGV4T2YoZSkgKyAxO1xuICAgICAgICByZXR1cm4gYCR7dW5pcXVlU2VsZWN0b3IoZS5wYXJlbnRFbGVtZW50KX0gPiAke2UudGFnTmFtZX06bnRoLW9mLXR5cGUoJHtpbmRleH0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXF1ZVNlbGVjdG9yKGVsZW1lbnQpO1xufVxuXG4vLyBUdXJucyBhIG51bWJlciBpbnRvIGl0cyBoYXNoKzYgbnVtYmVyIGhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uLlxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4Q3NzKG46IG51bWJlcikge1xuICAgIGlmIChuID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RyID0gbi50b1N0cmluZygxNik7XG4gICAgLy8gUGFkIHdpdGggbGVhZGluZyB6ZXJvc1xuICAgIHJldHVybiBcIiNcIiArIChuZXcgQXJyYXkoNiAtIHN0ci5sZW5ndGgpKS5maWxsKFwiMFwiKS5qb2luKFwiXCIpICsgc3RyO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEZpcmVudmltRWxlbWVudCB9IGZyb20gXCIuL0ZpcmVudmltRWxlbWVudFwiO1xuaW1wb3J0IHsgYXV0b2ZpbGwgfSBmcm9tIFwiLi9hdXRvZmlsbFwiO1xuaW1wb3J0IHsgY29uZlJlYWR5LCBnZXRDb25mIH0gZnJvbSBcIi4vdXRpbHMvY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgZ2V0TmVvdmltRnJhbWVGdW5jdGlvbnMsIGdldEFjdGl2ZUNvbnRlbnRGdW5jdGlvbnMsIGdldFRhYkZ1bmN0aW9ucyB9IGZyb20gXCIuL3BhZ2VcIjtcblxuaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aChcImh0dHBzOi8vZ2l0aHViLmNvbS9cIilcbiAgICB8fCBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJmaWxlOlwiICYmIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYuZW5kc1dpdGgoXCJnaXRodWIuaHRtbFwiKSkge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGF1dG9maWxsKTtcbiAgICBsZXQgbGFzdFVybCA9IGxvY2F0aW9uLmhyZWY7IFxuICAgIC8vIFdlIGhhdmUgdG8gdXNlIGEgTXV0YXRpb25PYnNlcnZlciB0byB0cmlnZ2VyIGF1dG9maWxsIGJlY2F1c2UgR2l0aHViXG4gICAgLy8gdXNlcyBcInByb2dyZXNzaXZlIGVuaGFuY2VtZW50XCIgYW5kIHRodXMgZG9lc24ndCBhbHdheXMgdHJpZ2dlciBhIGxvYWRcbiAgICAvLyBldmVudC4gQnV0IHdlIGNhbid0IGFsd2F5cyByZWx5IG9uIHRoZSBNdXRhdGlvbk9ic2VydmVyIHdpdGhvdXQgdGhlIGxvYWRcbiAgICAvLyBldmVudCBiZWNhdXNlIHRoZSBNdXRhdGlvbk9ic2VydmVyIHdvbid0IGJlIHRyaWdnZXJlZCBvbiBoYXJkIHBhZ2VcbiAgICAvLyByZWxvYWRzIVxuICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICBpZiAodXJsICE9PSBsYXN0VXJsKSB7XG4gICAgICAgIGxhc3RVcmwgPSB1cmw7XG4gICAgICAgIGlmIChsYXN0VXJsID09PSBcImh0dHBzOi8vZ2l0aHViLmNvbS9nbGFjYW1icmUvZmlyZW52aW0vaXNzdWVzL25ld1wiKSB7XG4gICAgICAgICAgICBhdXRvZmlsbCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkub2JzZXJ2ZShkb2N1bWVudCwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZX0pO1xufVxuXG4vLyBQcm9taXNlIHVzZWQgdG8gaW1wbGVtZW50IGEgbG9ja2luZyBtZWNoYW5pc20gcHJldmVudGluZyBjb25jdXJyZW50IGNyZWF0aW9uXG4vLyBvZiBuZW92aW0gZnJhbWVzXG5sZXQgZnJhbWVJZExvY2sgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuZXhwb3J0IGNvbnN0IGZpcmVudmltR2xvYmFsID0ge1xuICAgIC8vIFdoZXRoZXIgRmlyZW52aW0gaXMgZGlzYWJsZWQgaW4gdGhpcyB0YWJcbiAgICBkaXNhYmxlZDogYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBhcmdzOiBbXCJkaXNhYmxlZFwiXSxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZTogW1wiZ2V0VGFiVmFsdWVcIl0sXG4gICAgICAgIH0pXG4gICAgICAgIC8vIE5vdGU6IHRoaXMgcmVsaWVzIG9uIHNldERpc2FibGVkIGV4aXN0aW5nIGluIHRoZSBvYmplY3QgcmV0dXJuZWQgYnlcbiAgICAgICAgLy8gZ2V0RnVuY3Rpb25zIGFuZCBhdHRhY2hlZCB0byB0aGUgd2luZG93IG9iamVjdFxuICAgICAgICAudGhlbigoZGlzYWJsZWQ6IGJvb2xlYW4pID0+ICh3aW5kb3cgYXMgYW55KS5zZXREaXNhYmxlZChkaXNhYmxlZCkpLFxuICAgIC8vIFByb21pc2UtcmVzb2x1dGlvbiBmdW5jdGlvbiBjYWxsZWQgd2hlbiBhIGZyYW1lSWQgaXMgcmVjZWl2ZWQgZnJvbSB0aGVcbiAgICAvLyBiYWNrZ3JvdW5kIHNjcmlwdFxuICAgIGZyYW1lSWRSZXNvbHZlOiAoXzogbnVtYmVyKTogdm9pZCA9PiB1bmRlZmluZWQsXG4gICAgLy8gbGFzdEZvY3VzZWRDb250ZW50U2NyaXB0IGtlZXBzIHRyYWNrIG9mIHRoZSBsYXN0IGNvbnRlbnQgZnJhbWUgdGhhdCBoYXNcbiAgICAvLyBiZWVuIGZvY3VzZWQuIFRoaXMgaXMgbmVjZXNzYXJ5IGluIHBhZ2VzIHRoYXQgY29udGFpbiBtdWx0aXBsZSBmcmFtZXNcbiAgICAvLyAoYW5kIHRodXMgbXVsdGlwbGUgY29udGVudCBzY3JpcHRzKTogZm9yIGV4YW1wbGUsIGlmIHVzZXJzIHByZXNzIHRoZVxuICAgIC8vIGdsb2JhbCBrZXlib2FyZCBzaG9ydGN1dCA8Qy1uPiwgdGhlIGJhY2tncm91bmQgc2NyaXB0IHNlbmRzIGEgXCJnbG9iYWxcIlxuICAgIC8vIG1lc3NhZ2UgdG8gYWxsIG9mIHRoZSBhY3RpdmUgdGFiJ3MgY29udGVudCBzY3JpcHRzLiBGb3IgYSBjb250ZW50IHNjcmlwdFxuICAgIC8vIHRvIGtub3cgaWYgaXQgc2hvdWxkIHJlYWN0IHRvIGEgZ2xvYmFsIG1lc3NhZ2UsIGl0IGp1c3QgbmVlZHMgdG8gY2hlY2tcbiAgICAvLyBpZiBpdCBpcyB0aGUgbGFzdCBhY3RpdmUgY29udGVudCBzY3JpcHQuXG4gICAgbGFzdEZvY3VzZWRDb250ZW50U2NyaXB0OiAwLFxuICAgIC8vIG52aW1pZnk6IHRyaWdnZXJlZCB3aGVuIGFuIGVsZW1lbnQgaXMgZm9jdXNlZCwgdGFrZXMgY2FyZSBvZiBjcmVhdGluZ1xuICAgIC8vIHRoZSBlZGl0b3IgaWZyYW1lLCBhcHBlbmRpbmcgaXQgdG8gdGhlIHBhZ2UgYW5kIGZvY3VzaW5nIGl0LlxuICAgIG52aW1pZnk6IGFzeW5jIChldnQ6IHsgdGFyZ2V0OiBFdmVudFRhcmdldCB9KSA9PiB7XG4gICAgICAgIGlmIChmaXJlbnZpbUdsb2JhbC5kaXNhYmxlZCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIGF3YWl0IGZpcmVudmltR2xvYmFsLmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBjcmVhdGluZyBuZXcgZnJhbWVzLCB3ZSBuZWVkIHRvIGtub3cgdGhlaXIgZnJhbWVJZCBpbiBvcmRlciB0b1xuICAgICAgICAvLyBjb21tdW5pY2F0ZSB3aXRoIHRoZW0uIFRoaXMgY2FuJ3QgYmUgcmV0cmlldmVkIHRocm91Z2ggYVxuICAgICAgICAvLyBzeW5jaHJvbm91cywgaW4tcGFnZSBjYWxsIHNvIHRoZSBuZXcgZnJhbWUgaGFzIHRvIHRlbGwgdGhlXG4gICAgICAgIC8vIGJhY2tncm91bmQgc2NyaXB0IHRvIHNlbmQgaXRzIGZyYW1lIGlkIHRvIHRoZSBwYWdlLiBQcm9ibGVtIGlzLCBpZlxuICAgICAgICAvLyBtdWx0aXBsZSBmcmFtZXMgYXJlIGNyZWF0ZWQgaW4gYSB2ZXJ5IHNob3J0IGFtb3VudCBvZiB0aW1lLCB3ZVxuICAgICAgICAvLyBhcmVuJ3QgZ3VhcmFudGVlZCB0byByZWNlaXZlIHRoZXNlIGZyYW1lSWRzIGluIHRoZSBvcmRlciBpbiB3aGljaFxuICAgICAgICAvLyB0aGUgZnJhbWVzIHdlcmUgY3JlYXRlZC4gU28gd2UgaGF2ZSB0byBpbXBsZW1lbnQgYSBsb2NraW5nIG1lY2hhbmlzbVxuICAgICAgICAvLyB0byBtYWtlIHN1cmUgdGhhdCB3ZSBkb24ndCBjcmVhdGUgbmV3IGZyYW1lcyB1bnRpbCB3ZSByZWNlaXZlZCB0aGVcbiAgICAgICAgLy8gZnJhbWVJZCBvZiB0aGUgcHJldmlvdXNseSBjcmVhdGVkIGZyYW1lLlxuICAgICAgICBsZXQgbG9jaztcbiAgICAgICAgd2hpbGUgKGxvY2sgIT09IGZyYW1lSWRMb2NrKSB7XG4gICAgICAgICAgICBsb2NrID0gZnJhbWVJZExvY2s7XG4gICAgICAgICAgICBhd2FpdCBmcmFtZUlkTG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZyYW1lSWRMb2NrID0gbmV3IFByb21pc2UoYXN5bmMgKHVubG9jazogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBhdXRvIGlzIHRydWUgd2hlbiBudmltaWZ5KCkgaXMgY2FsbGVkIGFzIGFuIGV2ZW50IGxpc3RlbmVyLCBmYWxzZVxuICAgICAgICAgICAgLy8gd2hlbiBjYWxsZWQgZnJvbSBmb3JjZU52aW1pZnkoKVxuICAgICAgICAgICAgY29uc3QgYXV0byA9IChldnQgaW5zdGFuY2VvZiBGb2N1c0V2ZW50KTtcblxuICAgICAgICAgICAgY29uc3QgdGFrZW92ZXIgPSBnZXRDb25mKCkudGFrZW92ZXI7XG4gICAgICAgICAgICBpZiAoZmlyZW52aW1HbG9iYWwuZGlzYWJsZWQgfHwgKGF1dG8gJiYgdGFrZW92ZXIgPT09IFwibmV2ZXJcIikpIHtcbiAgICAgICAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGZpcmVudmltID0gbmV3IEZpcmVudmltRWxlbWVudChcbiAgICAgICAgICAgICAgICBldnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgIGZpcmVudmltR2xvYmFsLm52aW1pZnksXG4gICAgICAgICAgICAgICAgKGlkOiBudW1iZXIpID0+IGZpcmVudmltR2xvYmFsLmZpcmVudmltRWxlbXMuZGVsZXRlKGlkKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IGZpcmVudmltLmdldEVkaXRvcigpO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGVsZW1lbnQgYWxyZWFkeSBoYXMgYSBuZW92aW0gZnJhbWUsIHN0b3BcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlSdW5uaW5nID0gQXJyYXkuZnJvbShmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLnZhbHVlcygpKVxuICAgICAgICAgICAgICAgIC5maW5kKChpbnN0YW5jZSkgPT4gaW5zdGFuY2UuZ2V0RWxlbWVudCgpID09PSBlZGl0b3IuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgIGlmIChhbHJlYWR5UnVubmluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIHNwYW4gbWlnaHQgaGF2ZSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFnZSBieSB0aGUgcGFnZVxuICAgICAgICAgICAgICAgIC8vICh0aGlzIGhhcHBlbnMgb24gSmlyYS9Db25mbHVlbmNlIGZvciBleGFtcGxlKSBzbyB3ZSBjaGVja1xuICAgICAgICAgICAgICAgIC8vIGZvciB0aGF0LlxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBhbHJlYWR5UnVubmluZy5nZXRTcGFuKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYW4ub3duZXJEb2N1bWVudC5jb250YWlucyhzcGFuKSkge1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5UnVubmluZy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlSdW5uaW5nLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHVubG9jaygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNwYW4gaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYWdlLCB0aGUgZWRpdG9yXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIGRlYWQgYmVjYXVzZSByZW1vdmluZyBhbiBpZnJhbWUgZnJvbSB0aGUgcGFnZSBraWxsc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgd2Vic29ja2V0IGNvbm5lY3Rpb24gaW5zaWRlIG9mIGl0LlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBqdXN0IHRlbGwgdGhlIGVkaXRvciB0byBjbGVhbiBpdHNlbGYgdXAgYW5kIGdvIG9uIGFzXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGRpZG4ndCBleGlzdC5cbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeVJ1bm5pbmcuZGV0YWNoRnJvbVBhZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdXRvICYmICh0YWtlb3ZlciA9PT0gXCJlbXB0eVwiIHx8IHRha2VvdmVyID09PSBcIm5vbmVtcHR5XCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IChhd2FpdCBlZGl0b3IuZ2V0Q29udGVudCgpKS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKChjb250ZW50ICE9PSBcIlwiICYmIHRha2VvdmVyID09PSBcImVtcHR5XCIpXG4gICAgICAgICAgICAgICAgICAgIHx8IChjb250ZW50ID09PSBcIlwiICYmIHRha2VvdmVyID09PSBcIm5vbmVtcHR5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJlbnZpbS5wcmVwYXJlQnVmZmVySW5mbygpO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVJZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKF86IG51bWJlcikgPT4gdm9pZCwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgZmlyZW52aW1HbG9iYWwuZnJhbWVJZFJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IG1ha2UgdGhpcyB0aW1lb3V0IHRoZSBzYW1lIGFzIHRoZSBvbmUgaW4gYmFja2dyb3VuZC50c1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocmVqZWN0LCAxMDAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZyYW1lSWRQcm9taXNlLnRoZW4oKGZyYW1lSWQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGZpcmVudmltR2xvYmFsLmZpcmVudmltRWxlbXMuc2V0KGZyYW1lSWQsIGZpcmVudmltKTtcbiAgICAgICAgICAgICAgICBmaXJlbnZpbUdsb2JhbC5mcmFtZUlkUmVzb2x2ZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnJhbWVJZFByb21pc2UuY2F0Y2godW5sb2NrKTtcbiAgICAgICAgICAgIGZpcmVudmltLmF0dGFjaFRvUGFnZShmcmFtZUlkUHJvbWlzZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBmaWVudmltRWxlbXMgbWFwcyBmcmFtZSBpZHMgdG8gZmlyZW52aW0gZWxlbWVudHMuXG4gICAgZmlyZW52aW1FbGVtczogbmV3IE1hcDxudW1iZXIsIEZpcmVudmltRWxlbWVudD4oKSxcbn07XG5cbmNvbnN0IG93bkZyYW1lSWQgPSBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhcmdzOiBbXSwgZnVuY05hbWU6IFtcImdldE93bkZyYW1lSWRcIl0gfSk7XG5hc3luYyBmdW5jdGlvbiBhbm5vdW5jZUZvY3VzICgpIHtcbiAgICBjb25zdCBmcmFtZUlkID0gYXdhaXQgb3duRnJhbWVJZDtcbiAgICBmaXJlbnZpbUdsb2JhbC5sYXN0Rm9jdXNlZENvbnRlbnRTY3JpcHQgPSBmcmFtZUlkO1xuICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGFyZ3M6IFsgZnJhbWVJZCBdLFxuICAgICAgICAgICAgZnVuY05hbWU6IFtcInNldExhc3RGb2N1c2VkQ29udGVudFNjcmlwdFwiXVxuICAgICAgICB9LFxuICAgICAgICBmdW5jTmFtZTogW1wibWVzc2FnZVBhZ2VcIl1cbiAgICB9KTtcbn1cbi8vIFdoZW4gdGhlIGZyYW1lIGlzIGNyZWF0ZWQsIHdlIG1pZ2h0IHJlY2VpdmUgZm9jdXMsIGNoZWNrIGZvciB0aGF0XG5vd25GcmFtZUlkLnRoZW4oXyA9PiB7XG4gICAgaWYgKGRvY3VtZW50Lmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgYW5ub3VuY2VGb2N1cygpO1xuICAgIH1cbn0pO1xuYXN5bmMgZnVuY3Rpb24gYWRkRm9jdXNMaXN0ZW5lciAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBhbm5vdW5jZUZvY3VzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGFubm91bmNlRm9jdXMpO1xufVxuYWRkRm9jdXNMaXN0ZW5lcigpO1xuLy8gV2UgbmVlZCB0byB1c2Ugc2V0SW50ZXJ2YWwgdG8gcGVyaW9kaWNhbGx5IHJlLWFkZCB0aGUgZm9jdXMgbGlzdGVuZXJzIGFzIGluXG4vLyBmcmFtZXMgdGhlIGRvY3VtZW50IGNvdWxkIGdldCBkZWxldGVkIGFuZCByZS1jcmVhdGVkIHdpdGhvdXQgb3VyIGtub3dsZWRnZS5cbmNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChhZGRGb2N1c0xpc3RlbmVyLCAxMDApO1xuLy8gQnV0IHdlIGRvbid0IHdhbnQgdG8gc3lwaG9uIHRoZSB1c2VyJ3MgYmF0dGVyeSBzbyB3ZSBzdG9wIGNoZWNraW5nIGFmdGVyIGEgc2Vjb25kXG5zZXRUaW1lb3V0KCgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCksIDEwMDApO1xuXG5leHBvcnQgY29uc3QgZnJhbWVGdW5jdGlvbnMgPSBnZXROZW92aW1GcmFtZUZ1bmN0aW9ucyhmaXJlbnZpbUdsb2JhbCk7XG5leHBvcnQgY29uc3QgYWN0aXZlRnVuY3Rpb25zID0gZ2V0QWN0aXZlQ29udGVudEZ1bmN0aW9ucyhmaXJlbnZpbUdsb2JhbCk7XG5leHBvcnQgY29uc3QgdGFiRnVuY3Rpb25zID0gZ2V0VGFiRnVuY3Rpb25zKGZpcmVudmltR2xvYmFsKTtcbk9iamVjdC5hc3NpZ24od2luZG93LCBmcmFtZUZ1bmN0aW9ucywgYWN0aXZlRnVuY3Rpb25zLCB0YWJGdW5jdGlvbnMpO1xuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAocmVxdWVzdDogeyBmdW5jTmFtZTogc3RyaW5nW10sIGFyZ3M6IGFueVtdIH0pID0+IHtcbiAgICAvLyBBbGwgY29udGVudCBzY3JpcHRzIG11c3QgcmVhY3QgdG8gdGFiIGZ1bmN0aW9uc1xuICAgIGxldCBmbiA9IHJlcXVlc3QuZnVuY05hbWUucmVkdWNlKChhY2M6IGFueSwgY3VyOiBzdHJpbmcpID0+IGFjY1tjdXJdLCB0YWJGdW5jdGlvbnMpO1xuICAgIGlmIChmbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmbiguLi5yZXF1ZXN0LmFyZ3MpO1xuICAgIH1cblxuICAgIC8vIFRoZSBvbmx5IGNvbnRlbnQgc2NyaXB0IHRoYXQgc2hvdWxkIHJlYWN0IHRvIGFjdGl2ZUZ1bmN0aW9ucyBpcyB0aGUgYWN0aXZlIG9uZVxuICAgIGZuID0gcmVxdWVzdC5mdW5jTmFtZS5yZWR1Y2UoKGFjYzogYW55LCBjdXI6IHN0cmluZykgPT4gYWNjW2N1cl0sIGFjdGl2ZUZ1bmN0aW9ucyk7XG4gICAgaWYgKGZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGZpcmVudmltR2xvYmFsLmxhc3RGb2N1c2VkQ29udGVudFNjcmlwdCA9PT0gYXdhaXQgb3duRnJhbWVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKC4uLnJlcXVlc3QuYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgLy8gVGhlIG9ubHkgY29udGVudCBzY3JpcHQgdGhhdCBzaG91bGQgcmVhY3QgdG8gZnJhbWVGdW5jdGlvbnMgaXMgdGhlIG9uZVxuICAgIC8vIHRoYXQgb3ducyB0aGUgZnJhbWUgdGhhdCBzZW50IHRoZSByZXF1ZXN0XG4gICAgZm4gPSByZXF1ZXN0LmZ1bmNOYW1lLnJlZHVjZSgoYWNjOiBhbnksIGN1cjogc3RyaW5nKSA9PiBhY2NbY3VyXSwgZnJhbWVGdW5jdGlvbnMpO1xuICAgIGlmIChmbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaXJlbnZpbUdsb2JhbC5maXJlbnZpbUVsZW1zLmdldChyZXF1ZXN0LmFyZ3NbMF0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbiguLi5yZXF1ZXN0LmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3I6IHVuaGFuZGxlZCBjb250ZW50IHJlcXVlc3Q6ICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdCl9LmApO1xufSk7XG5cbmZ1bmN0aW9uIG9uU2Nyb2xsKGNvbnQ6IGJvb2xlYW4pIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zQ2hhbmdlZCA9IEFycmF5LmZyb20oZmlyZW52aW1HbG9iYWwuZmlyZW52aW1FbGVtcy5lbnRyaWVzKCkpXG4gICAgICAgIC5tYXAoKFtfLCBlbGVtXSkgPT4gZWxlbS5wdXRFZGl0b3JDbG9zZVRvSW5wdXRPcmlnaW4oKSlcbiAgICAgICAgLmZpbmQoY2hhbmdlZCA9PiBjaGFuZ2VkLnBvc0NoYW5nZWQpO1xuICAgICAgICBpZiAocG9zQ2hhbmdlZCkge1xuICAgICAgICAgICAgLy8gQXMgbG9uZyBhcyBvbmUgZWRpdG9yIGNoYW5nZXMgcG9zaXRpb24sIHRyeSB0byByZXNpemVcbiAgICAgICAgICAgIG9uU2Nyb2xsKHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnQpIHtcbiAgICAgICAgICAgIC8vIE5vIGVkaXRvciBoYXMgbW92ZWQsIGJ1dCB0aGlzIG1pZ2h0IGJlIGJlY2F1c2UgdGhlIHdlYnNpdGVcbiAgICAgICAgICAgIC8vIGltcGxlbWVudHMgc29tZSBraW5kIG9mIHNtb290aCBzY3JvbGxpbmcgdGhhdCBkb2Vzbid0IG1ha2VcbiAgICAgICAgICAgIC8vIHRoZSB0ZXh0YXJlYSBtb3ZlIGltbWVkaWF0ZWx5LiBJbiBvcmRlciB0byBkZWFsIHdpdGggdGhlc2VcbiAgICAgICAgICAgIC8vIGNhc2VzLCBzY2hlZHVsZSBhIGxhc3QgcmVkcmF3IGluIGEgZmV3IG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBvblNjcm9sbChmYWxzZSksIDEwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZG9TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG9uU2Nyb2xsKHRydWUpO1xufVxuXG5mdW5jdGlvbiBhZGROdmltTGlzdGVuZXIoZWxlbTogRWxlbWVudCkge1xuICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGZpcmVudmltR2xvYmFsLm52aW1pZnkpO1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGZpcmVudmltR2xvYmFsLm52aW1pZnkpO1xuICAgIGxldCBwYXJlbnQgPSBlbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBkb1Njcm9sbCk7XG4gICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRvU2Nyb2xsKTtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cExpc3RlbmVycyhzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZG9TY3JvbGwpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZG9TY3JvbGwpO1xuICAgIChuZXcgKCh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcikoKF86IGFueVtdKSA9PiB7XG4gICAgICAgIG9uU2Nyb2xsKHRydWUpO1xuICAgIH0pKS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICAobmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGNoYW5nZXMsIF8pID0+IHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZmlsdGVyKGNoYW5nZSA9PiBjaGFuZ2UuYWRkZWROb2Rlcy5sZW5ndGggPiAwKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgbXV0YXRpb24gb2JzZXJ2ZXIgaXMgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgYW4gZWxlbWVudCBpc1xuICAgICAgICAvLyBhZGRlZC9yZW1vdmVkIGZyb20gdGhlIHBhZ2UuIFdoZW4gdGhpcyBoYXBwZW5zLCB0cnkgdG8gYXBwbHlcbiAgICAgICAgLy8gbGlzdGVuZXJzIGFnYWluLCBpbiBjYXNlIGEgbmV3IHRleHRhcmVhL2lucHV0IGZpZWxkIGhhcyBiZWVuIGFkZGVkLlxuICAgICAgICBjb25zdCB0b1Bvc3NpYmx5TnZpbWlmeSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB0b1Bvc3NpYmx5TnZpbWlmeS5mb3JFYWNoKGVsZW0gPT4gYWRkTnZpbUxpc3RlbmVyKGVsZW0pKTtcblxuICAgICAgICBjb25zdCB0YWtlb3ZlciA9IGdldENvbmYoKS50YWtlb3ZlcjtcbiAgICAgICAgZnVuY3Rpb24gc2hvdWxkTnZpbWlmeShub2RlOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIElkZWFsbHksIHRoZSB0YWtlb3ZlciAhPT0gXCJuZXZlclwiIGNoZWNrIHNob3VsZG4ndCBiZSBwZXJmb3JtZWRcbiAgICAgICAgICAgIC8vIGhlcmU6IGl0IHNob3VsZCBsaXZlIGluIG52aW1pZnkoKS4gSG93ZXZlciwgbnZpbWlmeSgpIG9ubHlcbiAgICAgICAgICAgIC8vIGNoZWNrcyBmb3IgdGFrZW92ZXIgPT09IFwibmV2ZXJcIiBpZiBpdCBpcyBjYWxsZWQgZnJvbSBhbiBldmVudFxuICAgICAgICAgICAgLy8gaGFuZGxlciAodGhpcyBpcyBuZWNlc3NhcnkgaW4gb3JkZXIgdG8gYWxsb3cgbWFudWFsbHkgbnZpbWlmeWluZ1xuICAgICAgICAgICAgLy8gZWxlbWVudHMpLiBUaHVzLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRha2VvdmVyICE9PSBcIm5ldmVyXCIgaGVyZVxuICAgICAgICAgICAgLy8gdG9vLlxuICAgICAgICAgICAgcmV0dXJuIHRha2VvdmVyICE9PSBcIm5ldmVyXCJcbiAgICAgICAgICAgICAgICAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlXG4gICAgICAgICAgICAgICAgJiYgdG9Qb3NzaWJseU52aW1pZnkuaW5jbHVkZXMobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgaXMgYW1vbmcgdGhlXG4gICAgICAgIC8vIG5ld2x5IGNyZWF0ZWQgZWxlbWVudHMgYW5kIGlmIGl0IGlzLCBudmltaWZ5IGl0LlxuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuJ3QgZG8gdGhpcyB1bmNvbmRpdGlvbmFsbHk6IHdlIHdvdWxkIHR1cm4gdGhlIGFjdGl2ZVxuICAgICAgICAvLyBlbGVtZW50IGludG8gYSBuZW92aW0gZnJhbWUgZXZlbiBmb3IgdW5yZWxhdGVkIGRvbSBjaGFuZ2VzLlxuICAgICAgICBmb3IgKGNvbnN0IG1yIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBtci5hZGRlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZE52aW1pZnkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRnVuY3Rpb25zLmZvcmNlTnZpbWlmeSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgICAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkTnZpbWlmeSh3YWxrZXIuY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVGdW5jdGlvbnMuZm9yY2VOdmltaWZ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSkub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQsIHsgc3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlIH0pO1xuXG4gICAgbGV0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIGFsZXJ0KGBGaXJlbnZpbSBlcnJvcjogaW52YWxpZCBDU1Mgc2VsZWN0b3IgKCR7c2VsZWN0b3J9KSBpbiB5b3VyIGc6ZmlyZW52aW1fY29uZmlnLmApO1xuICAgICAgICBlbGVtZW50cyA9IFtdO1xuICAgIH1cbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gYWRkTnZpbUxpc3RlbmVyKGVsZW0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RlbmVyc1NldHVwID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgY29uZlJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25mID0gZ2V0Q29uZigpO1xuICAgICAgICBpZiAoY29uZi5zZWxlY3RvciAhPT0gdW5kZWZpbmVkICYmIGNvbmYuc2VsZWN0b3IgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIHNldHVwTGlzdGVuZXJzKGNvbmYuc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9