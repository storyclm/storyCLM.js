## Sessions

### Method: StoryCLM.Sessions.Get

```sh
 StoryCLM.Sessions.Get(callback);
```
**Описание:**

Получает список сессий для текущего пользователя на устройстве.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getSessions",
    "Data": {}
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data": [
       {
           "created": "2019-07-10T12:21:12Z",
           "sessionId": "FE859C7B-192D-4E3D-B2FD-2B0583381504",
           "presentationId": "70"
       },
       {
           "sessionId": "EEF1E4D2-A2E9-4801-A81A-85037B7A8ABB",
           "created": "2019-07-10T12:23:52Z",
           "presentationId": "70"
       }
   ]
}
```
### Method: StoryCLM.Sessions.GetById

```sh
 StoryCLM.Sessions.GetById(sessionId, callback);
```
**Описание:**

Получает сессию по идентификатору, включая слайды в порядке их демонстрации.

**Параметры:**

* sessionId - идентификатор сессии.
* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getSessionById",
    "Data": {
        "id": "FE859C7B-192D-4E3D-B2FD-2B0583381504"
    }
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data":  {
           "timeZone": 3,
           "created": "2019-07-10T12:21:12Z",
           "state": 2,
           "sessionId": "FE859C7B-192D-4E3D-B2FD-2B0583381504",
           "presentationId": "70",
           "latitude": 45.01693344116211,
           "longitude": 41.89881896972656,
           "duration": 129,
           "userId": "b3505adf-cc45-4d9b-b1ab-3bd881c6abe3",
           "complete": false,
           "slidesCount": 3,
			"slides": [
					{
					   "id": "FE859C7B",
				 	   "name": "index.html",
					   "duration": 36,
					   "created": "2019-07-10T12:21:12Z"
					}					
			]
       }
}
```
### Method: StoryCLM.Sessions.GetCurrent

```sh
 StoryCLM.Sessions.GetCurrent(callback);
```
**Описание:**

Получает текущую сессию, включая слайды в порядке их демонстрации.

**Параметры:**

* callback - функция, в которую будет передан результат выполнения операции.

**Запрос:**
```sh
{
    "Command": "getCurrentSession",
    "Data": {}
}
```
**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data":  {
           "timeZone": 3,
           "created": "2019-07-10T12:21:12Z",
           "state": 1,
           "sessionId": "FE859C7B-192D-4E3D-B2FD-2B0583381504",
           "presentationId": "70",
           "latitude": 45.01693344116211,
           "longitude": 41.89881896972656,
           "duration": 129,
           "userId": "b3505adf-cc45-4d9b-b1ab-3bd881c6abe3",
           "complete": false,
           "slidesCount": 3,
			"slides": [
					{
					   "id": "FE859C7B",
				 	   "name": "index.html",
					   "duration": 36,
					   "created": "2019-07-10T12:21:12Z"
					}					
			]
       }
}
```
### Method: StoryCLM.Sessions.SetComplete

```sh
StoryCLM.Sessions.SetComplete();
```
**Описание:**

Указывает что в текущем сеансе презентация полность показана или были пройдены все ключиывые слайды. Зависит от бизнес логики презентации. Выставляется разработчиками.

**Параметры:**


**Запрос:**
```sh
{
    "Command": "setSessionComplete",
    "Data": {}
}
```

**Ответ:**
```sh
{
   "status": "no error",
   "errorCode": 200,
   "errorMessage": "",
   "data":  {}
}
```