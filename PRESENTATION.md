## Presentation

### Method: StoryCLM.Presentation.Open(id, name, data)

```sh
StoryCLM.Presentation.Open(id, name, data, callback);
```
**Описание:**

Открывает презентацию по идентификатору и загружает слайд. При загрузке слайда ему будет передан объект.

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
### Method: StoryCLM.Presentation.Open(id, name)

```sh
StoryCLM.Presentation.Open(id, name, callback);
```
**Описание:**

Открывает презентацию по идентификатору и загружает слайд slide.html.

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
### Method: StoryCLM.Presentation.Open(id, data)

```sh
StoryCLM.Presentation.Open(id, data, callback);
```
**Описание:**

Открывает презентацию по идентификатору и загружает слайд по умолчанию (index.html). При загрузке слайда ему будет передан объект.

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
### Method: StoryCLM.Presentation.Open(id)

```sh
StoryCLM.Presentation.Open(id, callback);
```
**Описание:**

Открывает презентацию по идентификатору и загружает слайд по умолчанию (index.html).

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
### Method: StoryCLM.Presentation.Close

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
### Method: StoryCLM.Presentation.Close

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
### Method: StoryCLM.Presentation.Close

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
### Method: StoryCLM.Presentation.SetComplete

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
### Method: StoryCLM.Presentation.GetInfo

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
### Method:  StoryCLM.Presentation.GetPreviousSlide

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
### Method:  StoryCLM.Presentation.GetNextSlide

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
### Method:  StoryCLM.Presentation.GetBackForwardList

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
### Method:  StoryCLM.Presentation.GetMediaFiles

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
### Method:  StoryCLM.Presentation.GetPresentations

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
### Method: StoryCLM.Presentation.OpenMediaFile(name, id)

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
### Method: StoryCLM.Presentation.OpenMediaFile(name)

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
### Method: StoryCLM.Presentation.GetBackForwardPresList

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
### Method: StoryCLM.Presentation.GetMap

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
### Method: StoryCLM.Presentation.GetCurrentSlideName

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
