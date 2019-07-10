## Tables

### Method: StoryCLM.Tables.Get

```sh
 StoryCLM.Tables.Get(callback);
```
**Описание:**

Получает все доступные таблицы и их схемы.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "tables",
    "Data": {}
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Insert(id, entry)

```sh
 StoryCLM.Tables.Insert(id, entry, callback);
```
**Описание:**

Добавляет новую запись в таблицу. 
Запись должна соотвествовать схеме таблицы. 
Добавлять запись в таблицу можно если таблица работает в режимах: Application и Default. 
С таблицами в режиме Default можно работать только при наличии интернета. 
Данная операция не может быть применена к таблице в режиме Master.

**Параметры:**

* id - идентификатор таблицы (6).
* entry - новая сущность.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "insertEntry",
    "Data": {
        "tableId": 6,
        "entry": {
            "Name": "Vladimir",
            "Age": 22,
            "Gender": true,
            "Rating": 2.2,
            "Created": "1995-12-16T21:00:00.000Z"
        }
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Insert(id, entries)

```sh
 StoryCLM.Tables.Insert(id, entries, callback);
```
**Описание:**

Добавляет коллекцию записей в таблицу. Записи должны соотвествовать схеме таблицы. Добавлять записи в таблицу можно только если таблица работает в режимах: Application и Default. С таблицами в режиме Default можно работать только при наличии интернета. Данная операция не может быть применена к таблице в режиме Master.

**Параметры:**

* id - идентификатор таблицы (6).
* entries - коллекция сущностей.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "insertEntries",
    "Data": {
        "tableId": 6,
        "entries": [
            {
                "Name": "Vladimir",
                "Age": 22,
                "Gender": true,
                "Rating": 2.2,
                "Created": "1995-12-16T21:00:00.000Z"
            },
            {
                "Name": "Vladimir",
                "Age": 22,
                "Gender": true,
                "Rating": 2.2,
                "Created": "1995-12-16T21:00:00.000Z"
            },
            {
                "Name": "Vladimir",
                "Age": 22,
                "Gender": true,
                "Rating": 2.2,
                "Created": "1995-12-16T21:00:00.000Z"
            }
        ]
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Update(6, entry)

```sh
 StoryCLM.Tables.Update(6, entry, callback);
```
**Описание:**

Перезаписывает запись в таблице. Перезаписывать можно все поля записи кроме идетификатора (id/_id). Запись должна соотвествовать схеме таблицы. Обновлять запись в таблице можно только если таблица работает в режимах: Application и Default. С таблицами в режиме Default можно работать только при наличии интернета. С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер. Данная операция не может быть применена к таблице в режиме Master.

**Параметры:**

* id - идентификатор таблицы (6).
* entry - сущность.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "updateEntry",
    "Data": {
        "tableId": 6,
        "entry": {
            "Name": "Anna",
            "Age": 33,
            "Gender": false,
            "Rating": 3.3,
            "Created": "1995-12-16T21:00:00.000Z",
            "_id": "DD7776E0E74A47DE879D877F287CD191"
        }
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Update(id, entries)

```sh
 StoryCLM.Tables.Update(id, entries, callback);
```
**Описание:**

Перезаписывает записи в таблице. Перезаписывать можно все поля кроме идетификатора (id/_id). Записи должны соотвествовать схеме таблицы. Обновлять записи в таблице можно только если таблица работает в режимах: Application и Default. С таблицами в режиме Default можно работать только при наличии интернета. С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер. Данная операция не может быть применена к таблице в режиме Master.

**Параметры:**

* id - идентификатор таблицы (6).
* entries - коллекция сущностей.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "updateEntries",
    "Data": {
        "tableId": 6,
        "entries": [
            {
                "Name": "Anna",
                "Age": 33,
                "Gender": false,
                "Rating": 3.3,
                "Created": "1995-12-16T21:00:00.000Z",
                "_id": "DD7776E0E74A47DE879D877F287CD191"
            },
            {
                "Name": "Anna",
                "Age": 33,
                "Gender": false,
                "Rating": 3.3,
                "Created": "1995-12-16T21:00:00.000Z",
                "_id": "DD7776E0E74A47DE879D877F287CD191"
            },
            {
                "Name": "Anna",
                "Age": 33,
                "Gender": false,
                "Rating": 3.3,
                "Created": "1995-12-16T21:00:00.000Z",
                "_id": "DD7776E0E74A47DE879D877F287CD191"
            }
        ]
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Count(id)

```sh
 StoryCLM.Tables.Count(id, callback);
```
**Описание:**

Получает колличество записей в таблице. В таблицах, которые работают офлайн, колличество записей - это колличесво записей в локальной базе.

**Параметры:**

* id - идентификатор таблицы (6).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "count",
    "Data": {
        "tableId": 6
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Count(id, tablesQuery)

```sh
 StoryCLM.Tables.Count(id, tablesQuery, callback);
```
**Описание:**

Получает колличество записей по [запросу](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md). Используется для постраничной навигации. В таблицах, которые работают офлайн, колличество записей - это колличесво записей в локальной базе.

**Параметры:**

* id - идентификатор таблицы (6).
* [tablesQuery](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md) - запрос ([age][gt][30]).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "countByQuery",
    "Data": {
        "tableId": 6,
        "query": "[age][gt][30]"
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Find(tableId, id)

```sh
 StoryCLM.Tables.Find(tableId, id, callback);
```
**Описание:**

Получает запись по ее идентификатору. С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер.

**Параметры:**

* tableId - идентификатор таблицы (6).
* id - идентификатор записи.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "findById",
    "Data": {
        "tableId": 6,
        "id": "DD7776E0E74A47DE879D877F287CD191"
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Find(tableId, ids)

```sh
 StoryCLM.Tables.Find(tableId, ids, callback);
```
**Описание:**

Получает записи по списку идентификаторов. С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер.

**Параметры:**

* tableId - идентификатор таблицы (6).
* ids - список идентификаторов.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "findByIds",
    "Data": {
        "tableId": 6,
        "ids": [
            "DD7776E0E74A47DE879D877F287CD191",
            "DD7776E0E74A47DE879D877F287CD191",
            "DD7776E0E74A47DE879D877F287CD191"
        ]
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Find(tableId, tablesQuery)

```sh
 StoryCLM.Tables.Find(tableId, new TablesQuery().Query("[age][gt][30]").Sort(1, "age").Skip(0).Take(100), callback);
```
**Описание:**

Получает записи по [запросу](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md). [Запрос](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md): [age][gt][30] - подробно о запросах во вкладке "TablesQuery". Сортировка: по полю "age", тип сортировки - DESC (0 - ASC, 1 - DESC, -1 - без сортировки). Пропустить записей: 0 (Skip(0)). Выбрать записей: 100 (Take(100)). С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер.

**Параметры:**

* tableId - идентификатор таблицы (6).
* [tablesQuery](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md) - запрос ([age][gt][30]).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "findByQuery",
    "Data": {
        "skip": 0,
        "take": 100,
        "query": "[age][gt][30]",
        "sort": 1,
        "sortfield": "age"
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.FindAll

```sh
 StoryCLM.Tables.Find(tableId, new TablesQuery().Skip(0).Take(100), callback);
```
**Описание:**

Получает записи постранично. Пропустить записей: 0 (Skip(0)). Выбрать записей: 100 (Take(100)). С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер.

**Параметры:**

* tableId - идентификатор таблицы (6).
* [tablesQuery](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md) - запроc.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "findByQuery",
    "Data": {
        "skip": 0,
        "take": 100,
        "query": "",
        "sort": -1,
        "sortfield": ""
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Delete(tableId, id)

```sh
 StoryCLM.Tables.Delete(tableId, id, callback);
```
**Описание:**

Удаляет запись по идентификатору. С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер. Данная операция не может быть применена к таблице в режиме Master.

**Параметры:**

* tableId - идентификатор таблицы (6).
* id - идентификатор записи.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "deleteById",
    "Data": {
        "tableId": 6,
        "id": "DD7776E0E74A47DE879D877F287CD191"
    }
}
```

**Ответ:**
```sh

```
### Method: StoryCLM.Tables.Delete(6, ids)

```sh
 StoryCLM.Tables.Delete(6, ids, callback);
```
**Описание:**

Удаляет запись по идентификатору. С данными в таблице, которая работает в режиме Application, можно производить операции до тех пор пока эти данные не будут отправлены на сервер. Данная операция не может быть применена к таблице в режиме Master.

**Параметры:**

* tableId - идентификатор таблицы (6).
* ids - список идендифкаторов.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "deleteByIds",
    "Data": {
        "tableId": 6,
        "ids": [
            "DD7776E0E74A47DE879D877F287CD191",
            "DD7776E0E74A47DE879D877F287CD191",
            "DD7776E0E74A47DE879D877F287CD191"
        ]
    }
}
```

**Ответ:**
```sh

```