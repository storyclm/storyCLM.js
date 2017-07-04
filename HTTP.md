## HTTP

Пространство имен Http содержит методы которые позволяют приложению взаимодействовать с внешними сервисами по протоколу HTTP, посылая запросы. Запрос обычно состоит из трех частей:
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
Если потребуется можно задать список заголовков. Список заголовков доблжен быть в виде объекта:
```
    var headers = {
        "Accept": "application/json",
        "Accept-Language": "en-us,en;q=0.5",
        "Accept-Charset": "utf-8",
        "Content-Type": "application/json"
    };
```
Тело ответа и заголовки ответа приходят в аналогичных форматах. После получения ответа тело нужно декодировать из Base64.

**ПРИМЕЧАНИЕ:** для того что бы лучше освоить работу с методами приведенными ниже, можно скачать приложение "[storyclm-js](https://github.com/storyclm/Samples/tree/master/storyclm.js/storyclm-js)".

### Method: StoryCLM.Http.Post

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
### Method: StoryCLM.Http.Post

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
### Method: StoryCLM.Http.Put

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
### Method: StoryCLM.Http.Put

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
### Method: StoryCLM.Http.Get

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
### Method: StoryCLM.Http.Get

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
### Method: StoryCLM.Http.Delete

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
### Method: StoryCLM.Http.Delete

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