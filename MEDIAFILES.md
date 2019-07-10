## Media Files

### Method:  StoryCLM.Mediafiles.GetMediaFiles

```sh
 StoryCLM.Mediafiles.GetMediaFiles(callback);
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
### Method: StoryCLM.Mediafiles.OpenMediaFile(name, id)

```sh
 StoryCLM.Mediafiles.OpenMediaFile(name, id, callback);
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
### Method: StoryCLM.Mediafiles.OpenMediaFile(name)

```sh
 StoryCLM.Mediafiles.OpenMediaFile(name, callback);
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
### Method: StoryCLM.UI.OpenMediaLibrary

```sh
 StoryCLM.UI.OpenMediaLibrary(callback);
```
**Описание:**

Открывает системный контроллер "Медиафайлы". Колбек вызывается когда пльзователь закрыл библиотеку.

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
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "status":"close"
   }
}
```
### Method: StoryCLM.UI.HideMediaLibraryBtn

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