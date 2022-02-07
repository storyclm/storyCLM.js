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

Закрывает текущую презентацию. Отрабатывает ситуацию аналогичную при закрытии через системный "крестик".

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

Закрывает текущую презентацию. При закрытии не появляются системные окна подтверждения, но создается сессия.

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
      "shortDescription":""
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

Получает имя следующего слайда по карте (если карта включена), если таковой имеется.

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
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "slide":"slide1.html"
   }
}
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
      "slide1.html"
   ]
}
```
### Method:  StoryCLM.Presentation.GetPresentations

```sh
 StoryCLM.Presentation.GetPresentations(callback);
```
**Описание:**

Получить список всех доступных презентаций клиента к которому принадлежит презентация.

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
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":[
      {
         "name":"TestPresentation",
         "presId":55
      }
   ]
}
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
      "slide":"index.html"
   }
}
```
