/*!
* StoryCLM Library v2.1.0
* Copyright(c) 2019, Vladimir Klyuev, Breffi Inc. All rights reserved.
* License: Licensed under The MIT License.
*/
; (function () {

    if (window.StoryCLMBridge) return;
    
    var messagingIframe;
    var sendMessageQueue = [];

    var responseCallbacks = {};
    var uniqueId = 1;

    var CUSTOM_PROTOCOL_SCHEME = 'storyclm';
    var QUEUE_HAS_MESSAGE = 'SCLM_QUEUE';

    var slideData;

    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }

    function _GUID() {
        return UUIDcreatePart(4) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(6);
    }

    function UUIDcreatePart(length) {
        var uuidpart = "";
        for (var i = 0; i < length; i++) {
            var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
            if (uuidchar.length == 1) {
                uuidchar = "0" + uuidchar;
            }
            uuidpart += uuidchar;
        }
        return uuidpart;
    }
    
    
    function _invoke(command, data, responseCallback) {
        var message = { Command: command, Data: data };
        //setJson("request", message);
        if (responseCallback)
        {
            var GUID = 'GUID_' + (uniqueId++) + _GUID();
            responseCallbacks[GUID] = responseCallback;
            message.GUID = GUID;
        }
        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + ':' + QUEUE_HAS_MESSAGE;
    }

    function _getQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        return messageQueueString;
    }

    function _storyCLMHandler(messageJSON) {
        setTimeout(function () {
            if (!messageJSON) return;
            var message = JSON.parse(messageJSON);
            if (!message.GUID) return;
            var responseCallback = responseCallbacks[message.GUID];
            if (typeof responseCallback !== "function") return;
            responseCallback(message);
            delete responseCallbacks[message.GUID];
        }, 1);
    }

    function _getNavigationData() {
        return slideData;
    }

    _createQueueReadyIframe(window.document);
    window.StoryCLMBridge = {
        Invoke: _invoke,
        GetQueue: _getQueue,
        StoryCLMHandler: _storyCLMHandler,
        GetNavigationData: _getNavigationData
    };

    StoryCLMBridge.Invoke("getNavigationData", {}, function (data) {
        try {
            var dr = new StoryCLMApiMessage(data);
            slideData = dr.data;
        }
        catch (ex)
        { }
    });

})();

function StoryCLMApiMessage(data) {
    if (this instanceof StoryCLMApiMessage) {
        if (data) {
            this.status = data.Status;
            this.errorCode = data.ErrorCode;
            this.errorMessage = data.ErrorMessage;
            this.data = data.Data;
        }
        else {
            this.status = "error";
            this.errorCode = -2;
            this.errorMessage = "Data is empty";
            this.data = {};
        }
    }
    else return new StoryCLMApiMessage(data);
}

function StoryCLMparametersErrorMessge(callback) {
    if (typeof callback === "function")
        callback(new StoryCLMApiMessage({
            status: "error",
            errorCode: -3,
            errorMessage: "Error Parameters",
            data: {}
        }));
}

var StoryCLM = {};

StoryCLM.Go = function (name, data, callback) {
    var options = {};
    if (typeof name !== "string") {
        StoryCLMparametersErrorMessge(callback);
        return;
    }
    if (arguments.length >= 3)
    {
        data = data || {};
    }
    else if (arguments.length === 2)
    {
        if (typeof data === "function")
        {
            callback = data;
            data = {};
        }
        data = data || {};
    }
    options = { slideName: name, data: data };
    StoryCLMBridge.Invoke("go", options, function (data) {
        if (typeof callback === "function")
            callback(new StoryCLMApiMessage(data));
    });
};

StoryCLM.GetNavigationData = function () {
    return window.StoryCLMNavigationData || {};
};

StoryCLM.System = (function () {
    function _getInfo(callback)
    {
        StoryCLMBridge.Invoke("getAppInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        GetInfo: _getInfo
    };
})();

StoryCLM.Presentation = (function () {

    function _open(presId, slideName, data, callback) {
        var options = {};
        if (typeof presId !== "number") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        if (arguments.length === 3) {
            
            if (typeof data === "function") {
                if (typeof slideName === "string") {
                    callback = data;
                    data = {};
                }
                else {
                    callback = data;
                    data = slideName;
                    slideName = "";
                }
            }
        }
        else if (arguments.length === 2) {
            if (typeof slideName === "function") {
                callback = slideName;
                slideName = "";
            }
            else {
                if (typeof slideName !== "string") {
                    StoryCLMparametersErrorMessge(callback);
                    return;
                }
            }
        }
        slideName = slideName || "";
        data = data || {};
        options = { presId: presId, slideName: slideName, data: data };
        StoryCLMBridge.Invoke("open", options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _close(mode) {
        if (typeof mode === "undefined") mode = 0;
        if (typeof mode !== "number") mode = 0;
        if (mode < 0 || mode > 2) mode = 0;
        StoryCLMBridge.Invoke("closePresentation", { mode: mode });
    }

    function _getInfo(callback) {
        StoryCLMBridge.Invoke("getPresentationInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getPreviousSlide(callback) {
        StoryCLMBridge.Invoke("getPreviousSlide", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getNextSlide(callback) {
        StoryCLMBridge.Invoke("getNextSlide", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getBackForwardList(callback) {
        StoryCLMBridge.Invoke("getBackForwardList", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getBackForwardPresList(callback) {
        StoryCLMBridge.Invoke("getBackForwardPresList", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getPresentations(callback) {
        StoryCLMBridge.Invoke("getPresentations", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getCurrentSlideName(callback) {
        StoryCLMBridge.Invoke("getCurrentSlideName", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        Open: _open,
        Close: _close,
        GetInfo: _getInfo,
        GetPreviousSlide: _getPreviousSlide,
        GetNextSlide: _getNextSlide,
        GetBackForwardList: _getBackForwardList,
        GetPresentations: _getPresentations,
        GetCurrentSlideName: _getCurrentSlideName,
        GetBackForwardPresList: _getBackForwardPresList
    };
})();

StoryCLM.Mediafiles = (function () {

    function _getMediaFiles(callback) {
        StoryCLMBridge.Invoke("getMediaFiles", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _openMediaFile(name, id, callback) {
        var options = {};
        if (typeof name !== "string") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        if (arguments.length >= 3) {
            if (typeof id !== "number") {
                StoryCLMparametersErrorMessge(callback);
                return;
            }
        }
        else if (arguments.length === 2) {
            if (typeof id === "function") {
                callback = id;
                id = -1;
            }
            else {
                if (typeof id !== "number") {
                    StoryCLMparametersErrorMessge(callback);
                    return;
                }
            }
        }
        id = id || -1;
        options = { id: id, name: name };
        StoryCLMBridge.Invoke("openMediaFile", options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _hideMediaLibraryBtn() {
        StoryCLMBridge.Invoke("hideMediaLibraryBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _showMediaLibraryBtn() {
        StoryCLMBridge.Invoke("showMediaLibraryBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _openMediaLibrary() {
        StoryCLMBridge.Invoke("openMediaLibrary", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        HideMediaLibraryBtn: _hideMediaLibraryBtn,
        ShowMediaLibraryBtn: _showMediaLibraryBtn,
        OpenMediaLibrary: _openMediaLibrary,
        OpenMediaFile: _openMediaFile,
        GetMediaFiles: _getMediaFiles
    };
})();

StoryCLM.Map = (function () {


    function _hideMapBtn() {
        StoryCLMBridge.Invoke("hideMapBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _showMapBtn() {
        StoryCLMBridge.Invoke("showMapBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getMap(callback) {
        StoryCLMBridge.Invoke("getMap", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        HideMapBtn: _hideMapBtn,
        ShowMapBtn: _showMapBtn,
        GetMap: _getMap
    };
})();

StoryCLM.User = (function () {

    function _get(callback) {
        StoryCLMBridge.Invoke("getUserInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        Get: _get
    };
})();

StoryCLM.Sessions = (function () {

    function _get(callback) {
        StoryCLMBridge.Invoke("getSessions", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getCurrent(callback) {
        StoryCLMBridge.Invoke("getCurrentSessions", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getById(id, callback) {
        if (typeof id === "undefined") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        StoryCLMBridge.Invoke("getSessionById", { id: id }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _setComplete(callback) {
        StoryCLMBridge.Invoke("setSessionComplete", {});
    }

    return {
        Get: _get,
        GetCurrent: _getCurrent,
        SetComplete: _setComplete,
        GetById: _getById
    };
})();

StoryCLM.Geolocation = (function () {

    function _get(callback) {
        StoryCLMBridge.Invoke("getGeoLocationInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }
    return {
        Get: _get
    };
})();

StoryCLM.CustomEvents = (function () {

    function _set(key, value, callback) {
        if (typeof key !== "string") return;
        StoryCLMBridge.Invoke("setCustomEvent", { key: key, value: value + "" }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _get(key, callback) {
        if (typeof key !== "string") return;
        StoryCLMBridge.Invoke("getCustomEventByKey", { key: key }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _delete(key, callback) {
        if (typeof key !== "string") return;
        StoryCLMBridge.Invoke("deleteCustomEventByKey", { key: key }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getObject(sessionId, contentId, callback) {
        if (typeof sessionId !== "string" || typeof contentId !== "string") return;
        StoryCLMBridge.Invoke("getCustomEventsObject", { sessionId: sessionId + "", contentId: contentId + "" }, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        Set: _set,
        Get: _get,
        Delete: _delete,
        GetObject: _getObject
    };
})();

StoryCLM.UI = (function () {

    function _hideCloseBtn() {
        StoryCLMBridge.Invoke("hideCloseBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }


    function _hideMapBtn() {
        StoryCLMBridge.Invoke("hideMapBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _hideSystemBtns() {
        StoryCLMBridge.Invoke("hideSystemBtns", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        HideCloseBtn: _hideCloseBtn,
        HideMapBtn: _hideMapBtn,
        HideSystemBtns: _hideSystemBtns
    };
})();

function TablesQuery() {
    if (this instanceof TablesQuery) {

        this.skip = 0;
        this.take = 100;
        this.query = "";
        this.sort = -1;
        this.sortfield = "";

    }
    else return new TablesQuery();
}

TablesQuery.prototype = {
   
    Query: function (q) {
        this.query = q;
        return this;
    },
    Skip: function (s) {
        this.skip = s;
        return this;
    },
    Take: function (t) {
        this.take = t;
        return this;
    },
    Sort: function (t,f) {
        this.sort = t;
        this.sortfield = f;
        return this;
    }

};

StoryCLM.Tables = (function () {

    function _find(tableId, query, callback) {
        var options = {};
        var command = "";

        if (typeof tableId !== "number" || typeof query === "undefined") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }

        if (typeof query === "string") {
            command = "findById";
            options = {
                tableId: tableId,
                id: query
            }
        }
        else if (Array.isArray(query)) {
            command = "findByIds";
            options = {
                tableId: tableId,
                ids: query
            }
        }
        else if (typeof query === "object") {
            command = "findByQuery";
            options = query;
        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
        
    }

    function _delete(tableId, id, callback) {
        var options = {
            tableId: tableId
        };
        var command = "";

        if (typeof tableId !== "number" || typeof id === "undefined") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }

        if (Array.isArray(id)) {

            command = "deleteByIds";
            options.ids = id;

        } else if (typeof id === "string") {

            command = "deleteById";
            options.id = id;

        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _update(tableId, entry, callback) {
        var options = {
            tableId: tableId
        };
        var command = "";

        if (typeof tableId !== "number" || typeof entry === "undefined") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }

        if (Array.isArray(entry)) {
            command = "updateEntries";
            options.entries = entry;
        } else {
            command = "updateEntry";
            options.entry = entry;
        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _insert(tableId, entry, callback) {
        var options = {
            tableId: tableId
        };
        var command = "";

        if (typeof tableId !== "number" || typeof entry === "undefined") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }

        if (Array.isArray(entry)) {
            command = "insertEntries";
            options.entries = entry;
        } else {
            command = "insertEntry";
            options.entry = entry;
        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _tables(callback) {
        var options = {};

        StoryCLMBridge.Invoke("tables", options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _count(tableId, query, callback) {
        var options = {
            tableId: tableId
        };
        var command = "count";

        if (typeof tableId !== "number") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }

        if (arguments.length === 3) {
            options.query = query;
            command = "countByQuery";
        }
        else if (arguments.length === 2){
            callback = query;
            command = "count";
        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        Find: _find,
        Delete: _delete,
        Update: _update,
        Insert: _insert,
        Get: _tables,
        Count: _count
    };
})();

StoryCLM.Http = (function () {

    function isURL(str) {
        return true;
        //var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        //'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        //'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        //'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        //'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        //'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        //return pattern.test(str);
    }

    function _post(url, body, headers, callback) {
        var command = "httppost";
        var options = {};
        if (typeof url === "undefined" || !isURL(url)) {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        if (arguments.length === 3) {
            if (typeof headers === "function") {
                if (typeof body === "string") {
                    callback = headers;
                    headers = {};
                }
                else {
                    callback = headers;
                    headers = body;
                    body = ""
                }
            }
        }
        else if (arguments.length === 2) {
            if (typeof body === "function") {
                callback = body;
                body = "";
            }
            else {
                if (typeof body !== "string") {
                    StoryCLMparametersErrorMessge(callback);
                    return;
                }
            }
        }
        body = body || "";
        headers = headers || {};
        options = { url: url, body: body, headers: headers };
        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _put(url, body, headers, callback) {
        var command = "httpput";
        var options = {};
        if (typeof url === "undefined" || !isURL(url)) {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        if (arguments.length === 3) {
            if (typeof headers === "function") {
                if (typeof body === "string") {
                    callback = headers;
                    headers = {};
                }
                else {
                    callback = headers;
                    headers = body;
                    body = ""
                }
            }
        }
        else if (arguments.length === 2) {
            if (typeof body === "function") {
                callback = body;
                body = "";
            }
            else {
                if (typeof body !== "string") {
                    StoryCLMparametersErrorMessge(callback);
                    return;
                }
            }
        }
        body = body || "";
        headers = headers || {};
        options = { url: url, body: body, headers: headers };
        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _get(url, headers, callback) {
        var command = "httpget";
        if (typeof url === "undefined" || !isURL(url)) {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        var options = {
            url: url
        };

        if (arguments.length === 3) {
            options.headers = headers;
        }
        else if (arguments.length === 2) {
            callback = headers;
        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _delete(url, headers, callback) {
        var command = "httpdelete";
        if (typeof url === "undefined" || !isURL(url)) {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        var options = {
            url: url
        };

        if (arguments.length === 3) {
            options.headers = headers;
        }
        else if (arguments.length === 2) {
            callback = headers;
        }

        StoryCLMBridge.Invoke(command, options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        Post: _post,
        Put: _put,
        Get: _get,
        Delete: _delete
    };
})();
