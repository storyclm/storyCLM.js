# StoryCLM.JS

StoryCLM.js - это библиотека, предоставляющая доступ к системным функциям (API) платформы StoryCLM.
Библиотека должна использоваться в HTML5 приложениях для StoryCLM.
В других CLM системах, а так же без StoryCLM данная библиотека работать не будет.

## Версия
Текущая версия документации актуальна для StoryCLM.js (1.7.6) и для версии клиентского приложения 3.0.0 и выше.

## Общие сведения
Библиотека состоит из четырех разделов (пространств имен):

 * Base - функции связанные общими сведениями об устройстве, пользователе и навигации
 * Presentation - функции для манипуляций с приложениями и их содержимым
 * Tables - работа с системной базой данных
 * UI - настройка отображения системных контроллов в приложении
 * Http - доступ к внешним HTTP ресурсам
 * Sessions - доступ к сессиям

## Возвращаемый объект и ошибки

 В каждую функцию, которая имеет аргумент **callback**, как результат выполненой операции, передается объект msg:

 ```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{}
}
```

  * status - статус операции. Если "Success", то операция прошла успешно. Иначе нужно смотреть код ошибки и сообщение об ошибке;
  * errorCode - 200, если операция прошла успешно;
  * errorMessage - сообщение об ошибке;
  * data - данные, которые вернула функция, если операция прошла успешно. Результат выполнения функции;

## Дополнительные материалы
В каталоге "[storyclm.js](https://github.com/storyclm/StoryCLM-Samples/tree/master/storyclm.js)" находятся три приложения - примера. Загрузив их в StoryCLM, можно подробно изучить код и 
детально разобраться в работе библиотеке на реальных примерах:

* [storyclm-js](https://github.com/storyclm/StoryCLM-Samples/tree/master/storyclm.js/storyclm-js) - интерактивный справочник по всем функциям библиотеки с подробным описанием;
* [tables](https://github.com/storyclm/StoryCLM-Samples/tree/master/storyclm.js/tables) - приложение, которое показывает на реальном примере работу с таблицами. В примере продемонстрирована постраничная выборка и CRUD операции.
* [querybuilder](https://github.com/storyclm/StoryCLM-Samples/tree/master/storyclm.js/tablesquery) - конструктор запросов [TablesQuery](https://github.com/storyclm/documentation/blob/master/TABLES_QUERY.md). Приложение - это визуальный конструктор запросов. Конструируя и отправляя запрос, можно освоить работу с выборкой данных из таблиц в StoryCLM. 


## Подключение

```sh
<script src="js/storyclm-1.7.6.js"></script>
```

### Base
------------------------
#### Method: Go(name, data)

```sh
StoryCLM.Go(name, data, callback);
```
**Описание:**

Переходит на слайд и передает ему данные.

**Параметры:**

* name - название слайда в презентации, на который нужно перейти ("index.html").
* data - данные, которые будут переданы в слайд при переходе на него ({ test: "test" }).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "go",
    "Data": {
        "slideName": "index.html",
        "data": {
            "test": "test"
        }
    }
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method: Go(name)

```sh
StoryCLM.Go(name, callback);
```
**Описание:**

Переходит на слайд.

**Параметры:**

* name - название слайда в презентации, на который нужно перейти ("index.html").
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "go",
    "Data": {
        "slideName": "index.html",
        "data": {}
    }
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method: GetNavigationData

```sh
StoryCLM.GetNavigationData();
```
**Описание:**

Получает данные, которые были переданы в слайд при вызове метода Open или Go.

**Параметры:**



**Запрос:**
```sh
{}
```

**Ответ:**
```sh
{ test: "test" }
```
--------------------------
#### Method: StoryCLM.System.GetInfo

```sh
StoryCLM.System.GetInfo(callback);
```
**Описание:**

Получает системную информацию.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getAppInfo",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "localization":"ru",
      "osVersion":"10.0.2",
      "os":"iOS",
      "device":"iPad Air 2 (WiFi/Cellular)",
      "appVersion":"2.7 (1.0)"
   }
}
```
--------------------------
#### Method: StoryCLM.CustomEvents.Set

```sh
StoryCLM.CustomEvents.Set(Key, value, callback);
```
**Описание:**

Записывает кастомные данные и отправляет на сервер. Данные в формате key/value.

**Параметры:**

* Key - ключ ("KEY").
* Value - значени. Значение должно быть типом string ("test").
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "setCustomEvent",
    "Data": {
        "key": "KEY",
        "value": "test"
    }
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "KEY":"test"
   }
}
```
--------------------------
#### Method: StoryCLM.User.Get

```sh
StoryCLM.User.Get(callback);
```
**Описание:**

Получает информацию о текущем пользователе.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getUserInfo",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "email":"rsk-k161@ya.ru",
      "name":"Владимир Клюев",
      "location":"Ставрополь"
   }
}
```
--------------------------
#### Method: StoryCLM.Geolocation.Get

```sh
StoryCLM.Geolocation.Get(callback);
```
**Описание:**

Получает данные геолокации.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getGeoLocationInfo",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
### Presentation
-------------------------
#### Method: StoryCLM.Presentation.Open(id, name, data)

```sh
StoryCLM.Presentation.Open(id, name, data,callback);
```
**Описание:**

Открывает презентацию по идендификатору и загружает слайд. При загрузке слайда ему будет передан объект.

**Параметры:**

* id - идентификатор презентации (5).
* name - слайд, на которы нужно перейти после открытия презентации ("6.html").
* data - данные, которые будут переданы в слайд при переходе ({ test: "test" }).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "open",
    "Data": {
        "presId": 5,
        "slideName": "6.html",
        "data": {
            "test": "test"
        }
    }
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method: StoryCLM.Presentation.Open(id, name)

```sh
StoryCLM.Presentation.Open(id, name, callback);
```
**Описание:**

Открывает презентацию по идендификатору и загружает слайд slide.html.

**Параметры:**

* id - идентификатор презентации (5).
* name - слайд, на которы нужно перейти после открытия презентации ("6.html").
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "open",
    "Data": {
        "presId": 5,
        "slideName": "6.html",
        "data": {}
    }
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method: StoryCLM.Presentation.Open(id, data)

```sh
StoryCLM.Presentation.Open(id, data, callback);
```
**Описание:**

Открывает презентацию по идендификатору и загружает слайд по умолчанию (index.html). При загрузке слайда ему будет передан объект.

**Параметры:**

* id - идентификатор презентации (5).
* data - данные, которые будут переданы в слайд при переходе ({ test: "test" }).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "open",
    "Data": {
        "presId": 5,
        "slideName": "",
        "data": {
            "test": "test"
        }
    }
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method: StoryCLM.Presentation.Open(id)

```sh
StoryCLM.Presentation.Open(id, callback);
```
**Описание:**

Открывает презентацию по идендификатору и загружает слайд по умолчанию (index.html).

**Параметры:**

* id - идентификатор презентации (5).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "open",
    "Data": {
        "presId": 5,
        "slideName": "",
        "data": {}
    }
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method: StoryCLM.Presentation.Close

```sh
StoryCLM.Presentation.Close();
```
**Описание:**

Закрывает текущую презентацию. Отрабатывает ситуацию аналичную при закрытии через системный "крестик".

**Запрос:**
```sh
{
    "Command": "closePresentation",
    "Data": {
        "mode": 0
    }
}
```
--------------------------
#### Method: StoryCLM.Presentation.Close

```sh
StoryCLM.Presentation.Close(1);
```
**Описание:**

Закрывает текущую презентацию. При закрытии не появляются системные окна подтверждения, но создается сессиия.

**Запрос:**
```sh
{
    "Command": "closePresentation",
    "Data": {
        "mode": 1
    }
}
```
--------------------------
#### Method: StoryCLM.Presentation.Close

```sh
StoryCLM.Presentation.Close(2);
```
**Описание:**

Закрывает текущую презентацию. При закрытии не появляются системные окна подтверждения, сессия не создается.

**Запрос:**
```sh
{
    "Command": "closePresentation",
    "Data": {
        "mode": 2
    }
}
```
--------------------------
#### Method: StoryCLM.Presentation.SetComplete

```sh
StoryCLM.Presentation.SetComplete();
```
**Описание:**

Указывает что в текущем сеансе презентация полность показана или были пройдены все ключиывые слайды. Зависит от бизнес логики презентации. Выставляется разработчиками.

**Параметры:**


**Запрос:**
```sh
{
    "Command": "setPresentationComplete",
    "Data": {}
}
```

**Ответ:**
```sh
{}
```
--------------------------
#### Method:  StoryCLM.Presentation.GetInfo

```sh
 StoryCLM.Presentation.GetInfo(callback);
```
**Описание:**

Получает базовую информацию о текущей презентации.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getPresentationInfo",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "revision":16,
      "status":1,
      "order":2,
      "longDescription":"",
      "slidesCount":5,
      "presentationId":4,
      "mediaFilesCount":1,
      "name":"StoryCLM.JS",
      "shortdescription":""
   }
}
```
--------------------------
#### Method:  StoryCLM.Presentation.GetPreviousSlide

```sh
 StoryCLM.Presentation.GetPreviousSlide(callback);
```
**Описание:**

Получает имя предидущего слайда по карте (если карта включена), если таковой имеется.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getPreviousSlide",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "slide":"index.html"
   }
}
```
--------------------------
#### Method:  StoryCLM.Presentation.GetNextSlide

```sh
 StoryCLM.Presentation.GetNextSlide(callback);
```
**Описание:**

Получает имя следуещего слайда по карте (если карта включена), если таковой имеется.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getNextSlide",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method:  StoryCLM.Presentation.GetBackForwardList

```sh
 StoryCLM.Presentation.GetBackForwardList(callback);
```
**Описание:**

История переходов по слайдам в виде списка слайдов.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getBackForwardList",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":[
      "index.html",
      "index.html"
   ]
}
```
--------------------------
#### Method:  StoryCLM.Presentation.GetMediaFiles

```sh
 StoryCLM.Presentation.GetMediaFiles(callback);
```
**Описание:**

Получить список медиафайлов текущей презентации.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getMediaFiles",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":[
      {
         "title":"mediafile1.pdf",
         "fileName":"mediafile1.pdf"
      }
   ]
}
```
--------------------------
#### Method:  StoryCLM.Presentation.GetPresentations

```sh
 StoryCLM.Presentation.GetPresentations(callback);
```
**Описание:**

Получить список всех досупных презентаций клиента к которому принадлежит презентация.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getPresentations",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":[
      {
         "name":"CLM",
         "presId":5
      },
      {
         "name":"StoryCLM.JS",
         "presId":4
      }
   ]
}
```
--------------------------
#### Method: StoryCLM.Presentation.OpenMediaFile(name, id)

```sh
 StoryCLM.Presentation.OpenMediaFile(name, id, callback);
```
**Описание:**

Открыть медиафайл по имени и иднедификатору презентации.

**Параметры:**

* name - название медиафайла ("mediafile1.pdf").
* id - идентификатор презентации в которой этот медиафайл находится. Презентация должжна быть доступна (5).
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "openMediaFile",
    "Data": {
        "id": 5,
        "name": "mediafile1.pdf"
    }
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "name":"mediafile1.pdf",
      "status":"close"
   }
}
```
--------------------------
#### Method: StoryCLM.Presentation.OpenMediaFile(name)

```sh
 StoryCLM.Presentation.OpenMediaFile(name, callback);
```
**Описание:**

Открыть медиафайл по имени в текущей презентации.

**Параметры:**

* name - название медиафайла ("mediafile1.pdf").
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "openMediaFile",
    "Data": {
        "id": -1,
        "name": "mediafile1.pdf"
    }
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "name":"mediafile1.pdf",
      "status":"close"
   }
}
```
--------------------------
#### Method: StoryCLM.Presentation.GetBackForwardPresList

```sh
 StoryCLM.Presentation.GetBackForwardPresList(callback);
```
**Описание:**

Получает историю переходов между презентациями в текущем сеансе.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getBackForwardPresList",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method: StoryCLM.Presentation.GetMap

```sh
 StoryCLM.Presentation.GetMap(callback);
```
**Описание:**

Получает карту презентации (если карта включена).

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getMap",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method: StoryCLM.Presentation.GetCurrentSlideName

```sh
 StoryCLM.Presentation.GetCurrentSlideName(callback);
```
**Описание:**

Получает название текущего слайда.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getCurrentSlideName",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "slide":"presentation.html"
   }
}
```
--------------------------
### UI
--------------------------
#### Method: StoryCLM.UI.OpenMediaLibrary

```sh
 StoryCLM.UI.OpenMediaLibrary(callback);
```
**Описание:**

Открывает системный контроллер "Медиафайлы".

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "openMediaLibrary ",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method: StoryCLM.UI.HideMediaLibraryBtn

```sh
 StoryCLM.UI.HideMediaLibraryBtn(callback);
```
**Описание:**

Скрывает с экрана кнопку "Библиотека медиафайлов" на слайде.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "hideMediaLibraryBtn",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method: StoryCLM.UI.HideMapBtn

```sh
 StoryCLM.UI.HideMapBtn(callback);
```
**Описание:**

Отключает контролл "Системная карта" на слайде. Карту можно будет открыть через API.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "hideMapBtn",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method: StoryCLM.UI.HideSystemBtns

```sh
 StoryCLM.UI.HideSystemBtns(callback);
```
**Описание:**

Скрывает все системные контроллы на слайде.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "hideSystemBtns",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
#### Method: StoryCLM.UI.OpenMediaLibrary

```sh
 StoryCLM.UI.OpenMediaLibrary(callback);
```
**Описание:**

Открывает системный контроллер "Медиафайлы".

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "openMediaLibrary ",
    "Data": {}
}
```

**Ответ:**
```sh

```
--------------------------
### Tables
--------------------------
#### Method: StoryCLM.Tables.Get

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
--------------------------
#### Method: StoryCLM.Tables.Insert(id, entry)

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
--------------------------
#### Method: StoryCLM.Tables.Insert(id, entries)

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
--------------------------
#### Method: StoryCLM.Tables.Update(6, entry)

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
--------------------------
#### Method: StoryCLM.Tables.Update(id, entries)

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
--------------------------
#### Method: StoryCLM.Tables.Count(id)

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
--------------------------
#### Method: StoryCLM.Tables.Count(id, tablesQuery)

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
--------------------------
#### Method: StoryCLM.Tables.Find(tableId, id)

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
--------------------------
#### Method: StoryCLM.Tables.Find(tableId, ids)

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
--------------------------
#### Method: StoryCLM.Tables.Find(tableId, tablesQuery)

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
--------------------------
#### Method: StoryCLM.Tables.FindAll

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
--------------------------
#### Method: StoryCLM.Tables.Delete(tableId, id)

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
--------------------------
#### Method: StoryCLM.Tables.Delete(6, ids)

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
--------------------------

### Http

Пространство имен Http содержит методы, которые позволяют приложению взаимодействовать с внешними сервисами по протоколу HTTP.
Тем самым, возможно произвести интеграцию с внешними сервисами, минуя сервер StoryCLM. Такой подход называется "Интеграция без сервера."
При таком подходе презентация обменивается данными напрямую с внешним сервисом по средсвам HTTP запросов, миную сервер StoryCLM. В таком случае, пришедшие в ответ от сервиса данны, либо хранятся в localstorage, либо не сохраняются совсем.

Запрос обычно состоит из трех частей:
* URL - уникальный идендифкатор ресурса.
* Header - объект-коллекция заголовков.
* Body - данные в формате Base64.

**Body**

Тело запроса должно быть в формате Base64, это позволяет передвать по протоколы HTTP практически любые данные от текстовых (формы, json, xml) до бинарных (картинки).
Пример создания тела документа в формате json и кодирование его в Base64:
```
    function utf8_to_b64(str) {
        return window.btoa(str);
    }

    var entry = {
		 userId: 666,
        id: 555,
        title: "test",
        body: "test"
	};

    var body = utf8_to_b64(JSON.stringify(entry, null, 4));
```
Если потребуется, можно задать список заголовков. Список заголовков доблжен быть в виде объекта:
```
    var headers = {
        "Accept": "application/json",
        "Accept-Language": "en-us,en;q=0.5",
        "Accept-Charset": "utf-8",
        "Content-Type": "application/json"
    };
```
Тело ответа и заголовки ответа приходят в аналогичных форматах. После получения, тело нужно декодировать из Base64.

**ПРИМЕЧАНИЕ:** для того что бы лучше освоить работу с методами приведенными ниже, можно скачать презентацию "[storyclm-js](https://github.com/storyclm/Samples/tree/master/storyclm.js/storyclm-js)".



#### Method: StoryCLM.Http.Post

```sh
 StoryCLM.Http.Post(url, body, headers, callback);
```
**Описание:**

Отправляет запрос с методом POST.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* body - тело запроса. Строка в формате Base64.
* headers - набор заголовков.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httppost",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts",
        "body": "JTI1N0IlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ1c2VySWQlMjUyMiUyNTNBJTI1MjA2NjYlMjUyQyUyNTBBJTI1MjAlMjUyMCUyNTIwJTI1MjAlMjUyMmlkJTI1MjIlMjUzQSUyNTIwNTU1JTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ0aXRsZSUyNTIyJTI1M0ElMjUyMCUyNTIydGVzdCUyNTIyJTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJib2R5JTI1MjIlMjUzQSUyNTIwJTI1MjJ0ZXN0JTI1MjIlMjUwQSUyNTdE",
        "headers": {
            "Accept": "application/json",
            "Accept-Language": "en-us,en;q=0.5",
            "Accept-Charset": "utf-8",
            "Content-Type": "application/json"
        }
    }
}
```
**Ответ:**
```sh
{
  "ErrorMessage" : "",
  "Status" : "created",
  "ErrorCode" : 201,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Expires" : "-1",
      "Cache-Control" : "no-cache",
      "Date" : "Thu, 20 Apr 2017 13:46:15 GMT",
      "access-control-allow-credentials" : "true",
      "Content-Length" : "69",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"45-t\/mYTZNeHjOxV+BVh0Fzsrtii50\"",
      "Vary" : "Origin, X-HTTP-Method-Override, Accept-Encoding",
      "cf-ray" : "35288c76ba8b4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiA2NjYsCiAgImlkIjogNTU1LAogICJ0aXRsZSI6ICJ0ZXN0IiwKICAiYm9keSI6ICJ0ZXN0Igp9"
  }
}
```
**Тело ответа:**
```sh
{
    "userId": 666,
    "id": 555,
    "title": "test",
    "body": "test"
}
```
--------------------------

#### Method: StoryCLM.Http.Post

```sh
 StoryCLM.Http.Post(url, body, callback);
```
**Описание:**

Отправляет запрос с методом POST.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* body - тело запроса. Строка в формате Base64.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httppost",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts",
        "body": "JTI1N0IlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ1c2VySWQlMjUyMiUyNTNBJTI1MjA2NjYlMjUyQyUyNTBBJTI1MjAlMjUyMCUyNTIwJTI1MjAlMjUyMmlkJTI1MjIlMjUzQSUyNTIwNTU1JTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ0aXRsZSUyNTIyJTI1M0ElMjUyMCUyNTIydGVzdCUyNTIyJTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJib2R5JTI1MjIlMjUzQSUyNTIwJTI1MjJ0ZXN0JTI1MjIlMjUwQSUyNTdE",
        "headers": {}
    }
}
```
**Ответ:**
```sh
{
  "ErrorMessage" : "",
  "Status" : "created",
  "ErrorCode" : 201,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Expires" : "-1",
      "Cache-Control" : "no-cache",
      "Date" : "Thu, 20 Apr 2017 13:46:15 GMT",
      "access-control-allow-credentials" : "true",
      "Content-Length" : "69",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"45-t\/mYTZNeHjOxV+BVh0Fzsrtii50\"",
      "Vary" : "Origin, X-HTTP-Method-Override, Accept-Encoding",
      "cf-ray" : "35288c76ba8b4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiA2NjYsCiAgImlkIjogNTU1LAogICJ0aXRsZSI6ICJ0ZXN0IiwKICAiYm9keSI6ICJ0ZXN0Igp9"
  }
}
```
**Тело ответа:**
```sh
{
    "userId": 666,
    "id": 555,
    "title": "test",
    "body": "test"
}
```
--------------------------
#### Method: StoryCLM.Http.Put

```sh
 StoryCLM.Http.Put(url, body, headers, callback);
```
**Описание:**

Отправляет запрос с методом PUT.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* body - тело запроса. Строка в формате Base64.
* headers - набор заголовков.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httpput",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts/1",
        "body": "JTI1N0IlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ1c2VySWQlMjUyMiUyNTNBJTI1MjA2NjYlMjUyQyUyNTBBJTI1MjAlMjUyMCUyNTIwJTI1MjAlMjUyMmlkJTI1MjIlMjUzQSUyNTIwNTU1JTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ0aXRsZSUyNTIyJTI1M0ElMjUyMCUyNTIydGVzdCUyNTIyJTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJib2R5JTI1MjIlMjUzQSUyNTIwJTI1MjJ0ZXN0JTI1MjIlMjUwQSUyNTdE",
        "headers": {
            "Accept": "application/json",
            "Accept-Language": "en-us,en;q=0.5",
            "Accept-Charset": "utf-8",
            "Content-Type": "application/json"
        }
    }
}
```
**Ответ:**
```sh
{
  "ErrorMessage" : "",
  "Status" : "no error",
  "ErrorCode" : 200,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Content-Encoding" : "gzip",
      "Expires" : "-1",
      "Cache-Control" : "no-cache",
      "Date" : "Thu, 20 Apr 2017 13:48:38 GMT",
      "access-control-allow-credentials" : "true",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"43-PsA+O8XAGFcGfXof\/Wtj7IAtJBA\"",
      "Vary" : "Origin, Accept-Encoding",
      "cf-ray" : "35288ff4e95e4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiA2NjYsCiAgImlkIjogMSwKICAidGl0bGUiOiAidGVzdCIsCiAgImJvZHkiOiAidGVzdCIKfQ=="
  }
}
```
**Тело ответа:**
```sh
{
    "userId": 666,
    "id": 555,
    "title": "test",
    "body": "test"
}
```
--------------------------
#### Method: StoryCLM.Http.Put

```sh
 StoryCLM.Http.Put(url, body, callback);
```
**Описание:**

Отправляет запрос с методом PUT.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* body - тело запроса. Строка в формате Base64.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httpput",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts/1",
        "body": "JTI1N0IlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ1c2VySWQlMjUyMiUyNTNBJTI1MjA2NjYlMjUyQyUyNTBBJTI1MjAlMjUyMCUyNTIwJTI1MjAlMjUyMmlkJTI1MjIlMjUzQSUyNTIwNTU1JTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJ0aXRsZSUyNTIyJTI1M0ElMjUyMCUyNTIydGVzdCUyNTIyJTI1MkMlMjUwQSUyNTIwJTI1MjAlMjUyMCUyNTIwJTI1MjJib2R5JTI1MjIlMjUzQSUyNTIwJTI1MjJ0ZXN0JTI1MjIlMjUwQSUyNTdE",
        "headers": {}
    }
}
```
**Ответ:**
```sh
{
  "ErrorMessage" : "",
  "Status" : "no error",
  "ErrorCode" : 200,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Content-Encoding" : "gzip",
      "Expires" : "-1",
      "Cache-Control" : "no-cache",
      "Date" : "Thu, 20 Apr 2017 13:48:38 GMT",
      "access-control-allow-credentials" : "true",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"43-PsA+O8XAGFcGfXof\/Wtj7IAtJBA\"",
      "Vary" : "Origin, Accept-Encoding",
      "cf-ray" : "35288ff4e95e4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiA2NjYsCiAgImlkIjogMSwKICAidGl0bGUiOiAidGVzdCIsCiAgImJvZHkiOiAidGVzdCIKfQ=="
  }
}
```
**Тело ответа:**
```sh
{
    "userId": 666,
    "id": 555,
    "title": "test",
    "body": "test"
}
```
--------------------------
#### Method: StoryCLM.Http.Get

```sh
 StoryCLM.Http.Get(url, headers, callback);
```
**Описание:**

Отправляет запрос с методом Get.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* headers - набор заголовков.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httpget",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts/1",
        "headers": {
            "Accept": "application/json",
            "Accept-Language": "en-us,en;q=0.5",
            "Accept-Charset": "utf-8",
            "Content-Type": "application/json"
        }
    }
}
```
**Ответ:**
```sh
 {
  "ErrorMessage" : "",
  "Status" : "no error",
  "ErrorCode" : 200,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Content-Encoding" : "gzip",
      "Expires" : "Thu, 20 Apr 2017 17:49:25 GMT",
      "cf-cache-status" : "HIT",
      "Cache-Control" : "public, max-age=14400",
      "Date" : "Thu, 20 Apr 2017 13:49:25 GMT",
      "access-control-allow-credentials" : "true",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"",
      "Vary" : "Accept-Encoding",
      "cf-ray" : "3528911c8b8c4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiAxLAogICJpZCI6IDEsCiAgInRpdGxlIjogInN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0IiwKICAiYm9keSI6ICJxdWlhIGV0IHN1c2NpcGl0XG5zdXNjaXBpdCByZWN1c2FuZGFlIGNvbnNlcXV1bnR1ciBleHBlZGl0YSBldCBjdW1cbnJlcHJlaGVuZGVyaXQgbW9sZXN0aWFlIHV0IHV0IHF1YXMgdG90YW1cbm5vc3RydW0gcmVydW0gZXN0IGF1dGVtIHN1bnQgcmVtIGV2ZW5pZXQgYXJjaGl0ZWN0byIKfQ=="
  }
}
```
**Тело ответа:**
```sh
{
	userId: 1,
	id: 1,
	title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
	body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}
```
--------------------------
#### Method: StoryCLM.Http.Get

```sh
 StoryCLM.Http.Get(url, callback);
```
**Описание:**

Отправляет запрос с методом Get.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httpget",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts/1"
    }
}
```
**Ответ:**
```sh
 {
  "ErrorMessage" : "",
  "Status" : "no error",
  "ErrorCode" : 200,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Content-Encoding" : "gzip",
      "Expires" : "Thu, 20 Apr 2017 17:49:25 GMT",
      "cf-cache-status" : "HIT",
      "Cache-Control" : "public, max-age=14400",
      "Date" : "Thu, 20 Apr 2017 13:49:25 GMT",
      "access-control-allow-credentials" : "true",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"",
      "Vary" : "Accept-Encoding",
      "cf-ray" : "3528911c8b8c4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiAxLAogICJpZCI6IDEsCiAgInRpdGxlIjogInN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0IiwKICAiYm9keSI6ICJxdWlhIGV0IHN1c2NpcGl0XG5zdXNjaXBpdCByZWN1c2FuZGFlIGNvbnNlcXV1bnR1ciBleHBlZGl0YSBldCBjdW1cbnJlcHJlaGVuZGVyaXQgbW9sZXN0aWFlIHV0IHV0IHF1YXMgdG90YW1cbm5vc3RydW0gcmVydW0gZXN0IGF1dGVtIHN1bnQgcmVtIGV2ZW5pZXQgYXJjaGl0ZWN0byIKfQ=="
  }
}
```
**Тело ответа:**
```sh
{
	userId: 1,
	id: 1,
	title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
	body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}
```
--------------------------
#### Method: StoryCLM.Http.Delete

```sh
 StoryCLM.Http.Delete(url, headers, callback);
```
**Описание:**

Отправляет запрос с методом Delete.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* headers - набор заголовков.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httpdelete",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts/1",
        "headers": {
            "Accept": "application/json",
            "Accept-Language": "en-us,en;q=0.5",
            "Accept-Charset": "utf-8",
            "Content-Type": "application/json"
        }
    }
}
```
**Ответ:**
```sh
 {
  "ErrorMessage" : "",
  "Status" : "no error",
  "ErrorCode" : 200,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Content-Encoding" : "gzip",
      "Expires" : "Thu, 20 Apr 2017 17:49:25 GMT",
      "cf-cache-status" : "HIT",
      "Cache-Control" : "public, max-age=14400",
      "Date" : "Thu, 20 Apr 2017 13:49:25 GMT",
      "access-control-allow-credentials" : "true",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"",
      "Vary" : "Accept-Encoding",
      "cf-ray" : "3528911c8b8c4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiAxLAogICJpZCI6IDEsCiAgInRpdGxlIjogInN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0IiwKICAiYm9keSI6ICJxdWlhIGV0IHN1c2NpcGl0XG5zdXNjaXBpdCByZWN1c2FuZGFlIGNvbnNlcXV1bnR1ciBleHBlZGl0YSBldCBjdW1cbnJlcHJlaGVuZGVyaXQgbW9sZXN0aWFlIHV0IHV0IHF1YXMgdG90YW1cbm5vc3RydW0gcmVydW0gZXN0IGF1dGVtIHN1bnQgcmVtIGV2ZW5pZXQgYXJjaGl0ZWN0byIKfQ=="
  }
}
```
**Тело ответа:**
```sh
{}
```
--------------------------
#### Method: StoryCLM.Http.Delete

```sh
 StoryCLM.Http.Delete(url, headers, callback);
```
**Описание:**

Отправляет запрос с методом Delete.

**Параметры:**

* url - идентификатор (адрес) ресурса.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "httpdelete",
    "Data": {
        "url": "https://jsonplaceholder.typicode.com/posts/1"
    }
}
```
**Ответ:**
```sh
 {
  "ErrorMessage" : "",
  "Status" : "no error",
  "ErrorCode" : 200,
  "Data" : {
    "headers" : {
      "Content-Type" : "application\/json; charset=utf-8",
      "Pragma" : "no-cache",
      "x-powered-by" : "Express",
      "Via" : "1.1 vegur",
      "Server" : "cloudflare-nginx",
      "Content-Encoding" : "gzip",
      "Expires" : "Thu, 20 Apr 2017 17:49:25 GMT",
      "cf-cache-status" : "HIT",
      "Cache-Control" : "public, max-age=14400",
      "Date" : "Thu, 20 Apr 2017 13:49:25 GMT",
      "access-control-allow-credentials" : "true",
      "x-content-type-options" : "nosniff",
      "Etag" : "W\/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"",
      "Vary" : "Accept-Encoding",
      "cf-ray" : "3528911c8b8c4e0c-DME"
    },
    "body" : "ewogICJ1c2VySWQiOiAxLAogICJpZCI6IDEsCiAgInRpdGxlIjogInN1bnQgYXV0IGZhY2VyZSByZXBlbGxhdCBwcm92aWRlbnQgb2NjYWVjYXRpIGV4Y2VwdHVyaSBvcHRpbyByZXByZWhlbmRlcml0IiwKICAiYm9keSI6ICJxdWlhIGV0IHN1c2NpcGl0XG5zdXNjaXBpdCByZWN1c2FuZGFlIGNvbnNlcXV1bnR1ciBleHBlZGl0YSBldCBjdW1cbnJlcHJlaGVuZGVyaXQgbW9sZXN0aWFlIHV0IHV0IHF1YXMgdG90YW1cbm5vc3RydW0gcmVydW0gZXN0IGF1dGVtIHN1bnQgcmVtIGV2ZW5pZXQgYXJjaGl0ZWN0byIKfQ=="
  }
}
```
**Тело ответа:**
```sh
{}
```
--------------------------

### Sessions

#### Method: StoryCLM.Sessions.Get

```sh
 StoryCLM.Sessions.Get(callback);
```
**Описание:**

Получает список сессий для текущего пользователя.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getsessions",
    "Data": {}
}
```
**Ответ:**
```sh

```
--------------------------

#### Method: StoryCLM.Sessions.GetById

```sh
 StoryCLM.Sessions.GetById(sessionId, callback);
```
**Описание:**

Получает сессию по идентификатору.

**Параметры:**

* sessionId - идентификатор сессии.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getsessionbyid",
    "Data": {
        "id": "90C0499FF3A145BDBC83D2D5C4BEE6AD"
    }
}
```
**Ответ:**
```sh

```
--------------------------

#### Method: StoryCLM.Sessions.Confirm

```sh
 StoryCLM.Sessions.Confirm(sessionId, callback);
```
**Описание:**

Помечает сессию как обработанную.

**Параметры:**

* sessionId - идентификатор сессии.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "sessionconfirm",
    "Data": {
        "id": "90C0499FF3A145BDBC83D2D5C4BEE6AD"
    }
}
```
**Ответ:**
```sh

```
--------------------------

