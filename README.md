# Backend-airbnb

Backend made with Node JS Express and a MySQL Database.

## isAuthenticated

| Headers      | Description | Required |
| :----------- | :---------- | :------: |
| Bearer token | User token  |   YES    |

| Body   |  type  | Description | Required |
| :----- | :----: | :---------- | :------: |
| userId | string | User id     |   YES    |

## Routes User

/users (GET) : All Users

/user/:id (GET): Select one user in database

/user/delete (POST) : Delete account + _isAthenticated_

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
| username    | string | Username of the account |   YES    |
| name        | string | Name of user            |   YES    |
| description | string | Message for other user  |   YES    |

/user/update (POST) : Update Profile + _isAuthentiated_

| Body        |  Type  | Description  | Required |
| :---------- | :----: | :----------- | :------: |
| email       | string | New email    |    NO    |
| password    | string | New password |    NO    |
| username    | string | New username |    NO    |
| name        | string | New name     |    NO    |
| description | string | New message  |    NO    |

## Routes room

| | | | |

/room/:id (GET): Select one room in database

/rooms (GET) : ALL rooms of website

| Query    |  Type  | Description               | Required |
| :------- | :----: | :------------------------ | :------: |
| title    | string | Name of room              |    NO    |
| minPrice | number | Price location            |    NO    |
| maxPrice | number | Price location def:10 000 |    NO    |
| sort     | string | price-asc or price-desc   |    NO    |
| page     | number | def: 1                    |    NO    |
| limit    | number | def : 20                  |    NO    |

/room/publish : Create new offer. + _isAuthenticated_

| Body        |  Type  | Description           | Required |
| :---------- | :----: | :-------------------- | :------: |
| title       | string | Name of room          |   YES    |
| description | string | Descrioption room     |   YES    |
| price       | number | Price location        |   YES    |
| lat         | number | Latitude emplacement  |   YES    |
| lng         | number | Longitude emplacement |   YES    |
| photo       | files  | Picture room          |   Yes    |

/room/update (POST) : Update an offer. + _isAuthenticated_

| Body        |  Type  | Description           | Required |
| :---------- | :----: | :-------------------- | :------: |
| roomId      | string | Id of room update     |   YES    |
| title       | string | New name of room      |    NO    |
| description | string | New descrioption room |    NO    |
| price       | number | New price location    |    NO    |
| lat         | string | New adresse room      |    NO    |
| lng         | string | New adresse room      |    NO    |
| photo       | files  | New picture room      |    NO    |

/room/delete (POST) : Delete an offer. + _isAhtenticated_

| Body   |  Type  | Description       | Required |
| :----- | :----: | :---------------- | :------: |
| roomId | string | Id of room update |   YES    |
