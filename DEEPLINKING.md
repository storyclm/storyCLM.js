## Deep Linking

### Method: StoryCLM.DeepLinking.Inbound.GetData

```sh
 StoryCLM.DeepLinking.Inbound.GetData(callback);
```
**Описание:**

Получает входящий объект данных. Если приложение не было открыто через Deep Linking то errorCode - 404.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getDeepLinkingInboundData",
    "Data": {}
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": {
           "source": "whatsapp",
           "uri": "storyclm://content?contentId=34&slide=slide_user.html&Name=Boris&Age=19",
           "parameters": {
                         "contentId": "3565",
                         "slide": "slide_user.html",
                         "name": "Boris",
                         "age": "19",
                         "visitId": "35656",
           }
	}
}
```
### Method: StoryCLM.DeepLinking.Outbound.GetData

```sh
 StoryCLM.DeepLinking.Outbound.GetData(callback);
```
**Описание:**

Получает объект Outbound. Если объект не был создан внешним приложением или через API то errorCode 404.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getDeepLinkingOutboundData",
    "Data": {
        "scheme": "whatsapp://send"
    }
}
```
**Ответ:**
```sh
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": {
           "source": "whatsapp://send",
           "parameters": {
                         "text": "Hello World!",
                         "phone": "+70000000000"
           }
	}
```
### Method: StoryCLM.DeepLinking.Outbound.SetScheme

```sh
 StoryCLM.DeepLinking.Outbound.SetScheme(scheme, callback);
```
**Описание:**

Задает схему обратного вызова. Формат URI. Если объект Outbound не был создан, то данный обхект создается с новой схемой. Если объект существует то схема будет заменена.
Если схема невалидна то будет возвращен errorCode 400 и описание ошибки.
Если объект Outbound существует то после завершения показа будет прделожено перейти по схеме и отпрвить данные в приложение.

**Параметры:**

* scheme - схема. Адрес обратного вызова; В формате URI.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "setDeepLinkingOutboundScheme",
    "Data": {
        "scheme": "whatsapp://send"
    }
}
```
**Ответ:**
```sh
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": {
           "source": "whatsapp://send",
           "parameters": {
                         "text": "Hello World!",
                         "phone": "+70000000000"
           }
	}
```
### Method: StoryCLM.DeepLinking.Outbound.Set

```sh
 StoryCLM.DeepLinking.Outbound.Set(key, value, callback);
```
**Описание:**

Запись или изменение параметра. Ключ регистронезависимый. Если объект Outbound не создан то errorCode 400 с сообщением об ошибке. Если параметр не существует то он будет создан иначе будет изменен. Если значение ключа совпадает с названием системного параметра, то парметр будет замещен при отправки даннх значеним системного параметра.

**Параметры:**

* key - ключ;
* value - значение.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "setDeepLinkingOutboundParameter",
    "Data": {
        "key": "phone",
        "value": "+70000000000"
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
            "key": "phone",
            "value": "+70000000000"
   }
```
### Method: StoryCLM.DeepLinking.Outbound.Get

```sh
 StoryCLM.DeepLinking.Outbound.Get(key, callback);
```
**Описание:**

Получение параметра по ключу. Ключ регистронезависимый. Если объект Outbound не создан то errorCode 400 с сообщением об ошибке. Если параметр не существует value - null.

**Параметры:**

* key - ключ;

**Запрос:**
```sh
{
    "Command": "getDeepLinkingOutboundParameter",
    "Data": {
        "key": "phone"
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
       "value": "70000000000"
   }
}
```
### Method: StoryCLM.DeepLinking.Outbound.Delete

```sh
 StoryCLM.DeepLinking.Outbound.Delete(key, callback);
```
**Описание:**

Удаление параметра по ключу. Ключ регистронезависимый. Если объект Outbound не создан то errorCode 400 с сообщением об ошибке. Системный параметр удалить нельзя.

**Параметры:**

* key - ключ;

**Запрос:**
```sh
{
    "Command": "deleteDeepLinkingOutboundParameter",
    "Data": {
        "key": "phone"
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
       "key": "phone"
   }
}
```