# kanban


## Docs 
# CRUD Database

1. ____POST/tasks_:

- Request header:

```javascript
{
  "Content-Type": "application/json"
}
```
- Request body:

```javascript
{
  "title":"RestAPI",
  "category": "routing",
}
```
- Response:

**Success**
```javascript
{
  "status": 201
    "message": "Berhasil menambah data"
    "data": {
      "id": 1,
      "title":"RestAPI",
      "category": "routing",
      "UserId":<integer>
    }
}
```

**Error**
```javascript
{
  status: 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


2. _GET/tasks_:

- Response:

**Success**
```javascript
{
  "status": 200
  "data": [{All data from database}]
}
```

**Error**
```javascript
{
  "status": 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


3. _GET/tasks/:id_:

- Response:

**Success**
```javascript
{
  "status": 200
  "data": [{ Specified data as requested from database}]
}
```

**Error**
```javascript
{
  "status": 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


4. _PUT/tasks/:id_:


- Request body:

```javascript
{
  "title":"RestAPI",
  "category": "routing",
}
```

- Response:

**Success**
```javascript
{
  "status": 201
  "message": "Berhasil mengupdate data"
}
```

**Error**
```javascript
{
  status: 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


5. DELETE/tasks/:id_:

- Response:

**Success**

```javascript
{
  "status": 200
  "message": "Berhasil menghapus data"
}
```

**Error**

```javascript
{
  "status": 500
  "error": "Internal server error"
}
```


# Login and Register 

1. ____POST/register__:

- Request header:

```javascript
{
  "Content-Type": "application/json"
}
```
- Request body:

```javascript
{
  "email": "jhondoe@google.com",
  "password":"*******",
}
```
- Response:

```javascript
{
  "id": 1
  "email": "jhondoe@google.com",
  "password":"*******"
  "organization": "Hactiv8",
}
```

**Success**
```javascript
{
  "status": 201
  "message": "succesfuly created new user"
}
```

**Error**
```javascript
{
  status: 400
  "error": "validation error"
}
{
  "status": 500
  "error": "Internal server error"
}
```


2. __POST/login__:

- Request header:

```javascript
{
  "Content-Type": "application/json"
}
```
- Request body:

```javascript
{
  "username":"Jhon Doe",
  "password":"*******"
}
```
- Response:

**Success**
```javascript
{
  "status": 201
  "message": "succesfuly created new user"
  "token": "kjashsncfhvoyi38572375nicuelircw"
}
```

**Error**
```javascript
{
  status: 400
  "error": "Bad request"
}
{
  "status": 500
  "error": "Internal server error"
}
```



3. __POST/todos/google-sign-in__:

- Request body:

```javascript
{
  "token": "hancyb8a7aw83n4nx"
}
```
- Response:

**Success**
```javascript
{
  "status": 200
  "message": "succesfuly signed in"
}
```

**Success**
```javascript
{
  "status": 201
  "message": "succesfuly created new user"
}
```

**Error**
```javascript
{
  status: 400
  "error": "Bad request"
}
{
  "status": 500
  "error": "Internal server error"
}
```
