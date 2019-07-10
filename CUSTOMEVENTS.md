## Sessions

### Method: StoryCLM.CustomEvents.Set

```sh
 StoryCLM.CustomEvents.Set(key, value);
```
**Описание:**

Запись кастомного события. Если кастомное событие для этой презентации и сессии существует, то оно перезаписывается. Команда с ответом не требуется.

**Параметры:**

* key - ключ;
* value - значение.

**Запрос:**
```sh
{
    "Command": "setCustomEvent",
    "Data": {
        "key": "name",
        "value": "Vova"
    }
}
```
**Ответ:**
```sh

```
### Method: StoryCLM.CustomEvents.Get

```sh
 StoryCLM.CustomEvents.Get(key, callback);
```
**Описание:**

Получение кастомного события по ключу для текущей сессии.

**Параметры:**

* key - ключ;

**Запрос:**
```sh
{
    "Command": "getCustomEventByKey",
    "Data": {
        "key": "name"
    }
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": {
       "value": "Vova"
   }
}
```
### Method: StoryCLM.CustomEvents.Delete

```sh
 StoryCLM.CustomEvents.Delete(key, callback);
```
**Описание:**

Удаление кастомного события по ключу для текущей сессии.

**Параметры:**

* key - ключ;

**Запрос:**
```sh
{
    "Command": "deleteCustomEventByKey",
    "Data": {
        "key": "name"
    }
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": {
       "key": "name"
   }
}
```
### Method: StoryCLM.CustomEvents.GetObject

```sh
 StoryCLM.CustomEvents.GetObject(sessionId, contentId, callback);
```
**Описание:**

Получение кастомных событий в виде объекта для сессии и презентации, если сессии не указана, то возвращает для текущей сессии, если презентация не указана, то возвращает для текущей презентации.

**Параметры:**

* sessionId - идентификатор сессии;
* contentId - идентификатор презентации.

**Запрос:**
```sh
{
    "Command": "getCustomEventsObject",
    "Data": {
        "sessionId": "AB7B3F4914FC413E914EE39214A31718",
        "contentId": "2598"
    }
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": {
        "specialnost": "Участковый педитр",
        "ingridient": "Жыры",
        "childs": "16",
    }
}
```