## UI

### Method: StoryCLM.UI.HideCloseBtn

```sh
 StoryCLM.UI.HideCloseBtn(callback);
```
**Описание:**

Скрывает системную кнопку закрытия презентации.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "hideCloseBtn",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{}
}
```
### Method: StoryCLM.UI.HideSystemBtns

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
{
   "status":"Success",
   "errorCode":200,
   "errorMessage":"",
   "data":{}
}
```