var GUID = (function () {

    function _GUID() {
        return UUIDcreatePart(4) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(6);
    };

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

    return {
        newGuid: _GUID
    };

})();

var dataSource = (function () {

    var tablesStorageKey = "60AE0285-40EE-4A2D-BA5F-F75D601593DD";
    var globalData = [];
    var tables = [
        {
            Id: 5,
            Name: "Contact",
            Schema: [
              {
                  k: "name",
                  t: 1
              },
              {
                  k: "companyname",
                  t: 1
              },
              {
                  k: "position",
                  t: 1
              }
            ],
            Created: "2016-08-12T07:32:46.69"
        },
        {
            Id: 6,
            Name: "Profile",
            Schema: [
              {
                  k: "Name",
                  t: 1
              },
              {
                  k: "Age",
                  t: 2
              },
              {
                  k: "Gender",
                  t: 4
              },
              {
                  k: "Rating",
                  t: 3
              },
              {
                  k: "Created",
                  t: 5
              }
            ],
            Created: "2016-09-28T21:53:40.19"
        }
    ];

    function  _loadData(){
        globalData = JSON.parse(localStorage[tablesStorageKey] || "[]");
    }

    function _save()
    {
        localStorage[tablesStorageKey] = JSON.stringify(globalData);
    }

    function _getSchema(tableId) {
        for (var t = 0; t < tables.length; t++)
            if (tableId === tables[t].Id) return tables[t].Schema;
    }

    function _find(data) {
        var skip = data.start;
        var take = data.length;
        return {
            draw: data.draw,
            recordsTotal: globalData.length,
            recordsFiltered: globalData.length,
            data: globalData.slice(skip, take + skip)
        };
    }

    function _insert(data) {
        var id = GUID.newGuid();
        globalData.push([id, data.Name, data.Age, data.Gender, data.Rating, data.Created]);
        _save()
        return {
            IsOk: true,
            id: id
        };
    }

    function _update(data) {
        for (var t = 0; t < globalData.length; t++)
            if (data._id === globalData[t][0]) {
                globalData[t] = [data._id, data.Name, data.Age, data.Gender, data.Rating, data.Created];
                _save()
                return {
                    IsOk: true
                };
            }
        return {
            IsOk: false
        };
    }

    function _delete(id) {
        for (var t = 0; t < globalData.length; t++)
            if (id === globalData[t][0]) {
                globalData = globalData.filter(item => item !== globalData[t]);
                _save();
                return {
                    IsOk: true
                };
            }
        return {
            IsOk: false
        };
    }

    _loadData();

    return {
        getSchema: _getSchema,
        find: _find,
        insert: _insert,
        update: _update,
        delete: _delete
    };

})();
