## Sessions

### Method: StoryCLM.Sessions.Get

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
{
	"ErrorMessage": "",
	"GUID": "GUID_24b5b9bb02b4ae6a465c1f81f8cf1c77e",
	"Status": "no error",
	"ErrorCode": 200,
	"Data": [
		{
			"id": "46DAE276897C43B0B27BE522AE7774AA",
			"start": "2017-06-09T19:00:48",
			"latitude": "55.75578600",
			"longtitude": "37.61763300",
			"visit": 0,
			"userName": "test@mail.com",
			"address": "Manezhnaya ploshchad',Moscow,Moscow,Russia,109012",
			"confirmed": 0,
			"offset": 3,
			"slides": 1,
			"end": "2017-06-09T19:00:51",
			"checkIn": 0,
			"finished": 1,
			"duration": 2,
			"presentationId": 17
		},
		{
			"id": "5D3EF7290C2748978F690B3E5B9AF3B6",
			"start": "2017-06-09T19:01:29",
			"latitude": "55.75578600",
			"longtitude": "37.61763300",
			"visit": 0,
			"userName": "test@mail.com",
			"address": "Manezhnaya ploshchad',Moscow,Moscow,Russia,109012",
			"confirmed": 0,
			"offset": 3,
			"slides": 0,
			"end": "2017-06-09T19:01:33",
			"checkIn": 0,
			"finished": 1,
			"duration": 3,
			"presentationId": 17
		}
	]
}
```
### Method: StoryCLM.Sessions.GetById

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
        "id": "8031BA5940864ECF9AB27D915404D013"
    }
}
```
**Ответ:**
```sh
{
	"ErrorMessage": "",
	"GUID": "GUID_3571334665c8ef4209f87b6739ef1ce3b",
	"Status": "no error",
	"ErrorCode": 200,
	"Data": {
		"id": "8031BA5940864ECF9AB27D915404D013",
		"start": "2017-06-13T10:07:02",
		"latitude": "55.75578600",
		"longtitude": "37.61763300",
		"visit": 0,
		"userName": "test@mail.com",
		"address": "Manezhnaya ploshchad',Moscow,Moscow,Russia,109012",
		"confirmed": 0,
		"offset": 3,
		"slides": 1,
		"end": "2017-06-13T10:07:06",
		"checkIn": 0,
		"finished": 1,
		"duration": 4,
		"presentationId": 17
	}
}
```
### Method: StoryCLM.Sessions.Update

```sh
 StoryCLM.Sessions.Update(session, callback);
```
**Описание:**

Обновляет сессию. Передается объект с полями которе нужно изменить. Объект обязательно должен содержать идентификатор сесии. Идентификатор сессии изменить нельзя.

**Параметры:**

* session -  сессия.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "sessionconupdate",
    "Data": {
	 "id": "8031BA5940864ECF9AB27D915404D013",
	 "visit": 1,
    }
}
```
**Ответ:**
```sh
{
	"ErrorMessage": "",
	"GUID": "GUID_3571334665c8ef4209f87b6739ef1ce3b",
	"Status": "no error",
	"ErrorCode": 200,
	"Data": {
		"id": "8031BA5940864ECF9AB27D915404D013",
		"start": "2017-06-13T10:07:02",
		"latitude": "55.75578600",
		"longtitude": "37.61763300",
		"visit": 1,
		"userName": "test@mail.com",
		"address": "Manezhnaya ploshchad',Moscow,Moscow,Russia,109012",
		"confirmed": 1,
		"offset": 3,
		"slides": 1,
		"end": "2017-06-13T10:07:06",
		"checkIn": 0,
		"finished": 1,
		"duration": 4,
		"presentationId": 17
	}
}
```
### Method: StoryCLM.Sessions.DeleteById

```sh
 StoryCLM.Sessions.DeleteById(sessionId, callback);
```
**Описание:**

Удаляет сессию по идентификатору. Возвращает удаленную сессию.

**Параметры:**

* sessionId - идентификатор сессии.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "deletesessionbyid",
    "Data": {
        "id": "8031BA5940864ECF9AB27D915404D013"
    }
}
```
**Ответ:**
```sh
{
	"ErrorMessage": "",
	"GUID": "GUID_3571334665c8ef4209f87b6739ef1ce3b",
	"Status": "no error",
	"ErrorCode": 200,
	"Data": {
		"id": "8031BA5940864ECF9AB27D915404D013",
		"start": "2017-06-13T10:07:02",
		"latitude": "55.75578600",
		"longtitude": "37.61763300",
		"visit": 0,
		"userName": "test@mail.com",
		"address": "Manezhnaya ploshchad',Moscow,Moscow,Russia,109012",
		"confirmed": 1,
		"offset": 3,
		"slides": 1,
		"end": "2017-06-13T10:07:06",
		"checkIn": 0,
		"finished": 1,
		"duration": 4,
		"presentationId": 17
	}
}
```