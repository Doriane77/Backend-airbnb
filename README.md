# Backend-airbnb

Backend made with Node JS Express and a MySQL Database.

## Authentication

| Headers      | Description | Required |
| :----------- | :---------- | :------: |
| Bearer token | User token  |   YES    |

| Body   | Description | Required |
| :----- | :---------- | :------: |
| userId | user id     |   YES    |

## Route User

/login(POST): User login

| Body     |  type  | Description      | Required |
| :------- | :----: | :--------------- | :------: |
| email    | string | Account email    |   YES    |
| password | string | Account password |   YES    |

/register (POST) : Sin_up

| Body        |  Type  | Description             | Required |
| :---------- | :----: | :---------------------- | :------: |
| email       | string | New account email       |   YES    |
| password    | string | New account password    |   YES    |
| username    | string | username of the account |   YES    |
| name        | string | name of user            |   YES    |
| description | string | message for other user  |   YES    |

/users (GET) : All Users

/user/update (GET) : Update Profile

| Body        |  Type  | Description  | Required |
| :---------- | :----: | :----------- | :------: |
| id          | string | account id   |   YES    |
| email       | string | new email    |    NO    |
| password    | string | new password |    NO    |
| username    | string | new username |    NO    |
| name        | string | new name     |    NO    |
| description | string | new message  |    NO    |

/user/delete (POST) : Delete account

| Body |  Type  | Description | Required |
| :--- | :----: | :---------- | :------: |
| id   | string | user id     |   YES    |

## Route room
