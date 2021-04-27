window.Native = {
    _createUUID: function () {
        const s4 = () => ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    },
    _cancel: function (id, resaon) {
        const callback = Native._callbackList[id];
        resaon = resaon || new Error(`Callback cancelled. (id: ${id})`);
        callback.cancel = new Date();
        callback.reject(resaon);
        clearTimeout(callback.timer);
    },
    _cancelAll: function () {
        Object.getOwnPropertyNames(Native._callbackList).forEach((key) => {
            Native._cancel(key);
        });
    },
    _addCallback: function (id, name, resolve, reject) {
        const timer = setTimeout(() => {
            Native._cancel(id, new Error(`Callback timeout. (id: ${id})`));
        }, 10000.0);
        Native._callbackList[id] = {
            name,
            resolve,
            reject,
            timer,
            start: new Date()
        };
    },
    _callbackList: {},
    TestMethod1: function () {
        const id = Native._createUUID();
        const args = Array.from(arguments).concat(id);
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'TestMethod1', resolve, reject);
            webkit.messageHandlers.TestMethod1.postMessage(args);
        });
    },
    TestMethod2: function () {
        const id = Native._createUUID();
        const args = Array.from(arguments).concat(id);
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'TestMethod2', resolve, reject);
            webkit.messageHandlers.TestMethod2.postMessage(args);
        });
    },
    saveState: function () {
        const id = Native._createUUID();
        const args = Array.from(arguments).concat(id);
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'saveState', resolve, reject);
            webkit.messageHandlers.saveState.postMessage(args);
        });
    },
};
Object.defineProperty(Native, 'questStage', {
    key: 'questStage',
    get: function get() {
        const id = Native._createUUID();
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'questStage', resolve, reject);
            webkit.messageHandlers.questStage.postMessage([id]);
        });
    },
});
Object.defineProperty(Native, 'bool', {
    key: 'bool',
    get: function get() {
        const id = Native._createUUID();
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'bool', resolve, reject);
            webkit.messageHandlers.bool.postMessage([id]);
        });
    },
});
Object.defineProperty(Native, 'user', {
    key: 'user',
    get: function get() {
        const id = Native._createUUID();
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'user', resolve, reject);
            webkit.messageHandlers.user.postMessage([id]);
        });
    },
});
Object.defineProperty(Native, 'app', {
    key: 'app',
    get: function get() {
        const id = Native._createUUID();
        return new Promise((resolve, reject) => {
            Native._addCallback(id, 'app', resolve, reject);
            webkit.messageHandlers.app.postMessage([id]);
        });
    },
});