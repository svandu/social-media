# Social Media API

## Table of contents

[Social Media APIs](#social-media-apis)
   - [POST User Details - POST](#post-user-details---post)
     - [Endpoint](#endpoint)
     - [Request Body](#request-body)
     - [Example](#example)
     - [Response](#response)

# Social Media APIs

## POST User Details - POST

### Endpoint

```markdown
http://localhost:8000/api/v1/users/signup
```

### Request Body

| Name     | Type   | Validation |
| -------- | ------ | ---------- |
| email    | string | required   |
| password | string | required   |
| name     | string | required   |

### Example

```markdown
post("{BASE_URL}/api/v1/users/signup"
    {
        "firstName": "abc",
        "lastName": "def",
        "email": "a@gmail.com",
        "password": "123456",
        "confirmPassword": "123456"
    }

)
```

### Response

```markdown
{
    "message": "User signup successfully",
    "newUser": {
        "name": "abc def",
        "email": "a@gmail.com",
        "password": hashed password,
        "_id": "65cbc6b9994a7118d521e365",
        "__v": 0
    },
    "token": token key generate
}
```
