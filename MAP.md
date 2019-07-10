## Sessions

### Method: StoryCLM.Presentation.GetMap

```sh
 StoryCLM.Map.GetMap(callback);
```
**Описание:**

Получает структуру презентации (если она включена). Представляет из себя дерево зависимых друг от друга слайдов

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
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{
      "index.html":[
		"slide1.html",
		"slide2.html",
		"slide3.html",
		"slide4.html",
		"slide5.html"
		]
   }
}
```
### Method: StoryCLM.Map.HideMapBtn
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
### Method: StoryCLM.UI.ShowMapBtn
```sh
 StoryCLM.Map.ShowMapBtn(callback);
```
**Описание:**

Включает контролл "Системная карта" на слайде. Карту можно будет открыть через API.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "showMapBtn",
    "Data": {}
}
```

**Ответ:**
```sh

```