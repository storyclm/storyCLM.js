
## Base

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
### Method: Go(name)

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
### Method: GetNavigationData

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
### Method: StoryCLM.System.GetInfo

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
### Method: StoryCLM.CustomEvents.Set

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
### Method: StoryCLM.User.Get

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
### Method: StoryCLM.Geolocation.Get

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
