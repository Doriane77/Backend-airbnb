# Backend-airbnb

Backend made with Node JS Express and a MySQL Database.

## Authentication

| Headers      | Description | Required |
| :----------- | :---------- | :------: |
| Bearer token | User token  |   YES    |

| Body   | Description | Required |
| :----- | :---------- | :------: |
| userId | user id     |   YES    |

## Routes User

/users (GET) : All Users

/login (POST): User login

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

## Routes room

| | | | |

/rooms (GET) : ALL rooms of website

/room/publish : Create new offer. + _isAuthenticated_

| Body        |  Type  | Description       | Required |
| :---------- | :----: | :---------------- | :------: |
| roomId      | string | id of room update |   YES    |
| title       | string | name of room      |   YES    |
| description | string | descrioption room |   YES    |
| price       | number | price location    |   YES    |
| lat         | string | adresse room      |   YES    |
| lng         | string | adresse room      |   YES    |
| photo       | files  | picture room      |   Yes    |

/room/update (POST) : Update an offer. + _isAuthenticated_

| Body        |  Type  | Description           | Required |
| :---------- | :----: | :-------------------- | :------: |
| roomId      | string | id of room update     |   YES    |
| title       | string | new name of room      |    NO    |
| description | string | new descrioption room |    NO    |
| price       | number | new price location    |    NO    |
| lat         | string | new adresse room      |    NO    |
| lng         | string | new adresse room      |    NO    |
| photo       | files  | new picture room      |    NO    |

/room/delete (POST) : Delete a offer. + _isAhtenticated_

| Body   |  Type  | Description       | Required |
| :----- | :----: | :---------------- | :------: |
| roomId | string | id of room update |   YES    |
