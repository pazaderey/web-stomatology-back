# Dent.io (Backend)

Представляет собой серверную часть приложения `Dent.io`.

## Требования

Для запуска потребуется Node.js версии 19 и выше.

## Настройка

1. Создайте Credentials на Google Cloud для доступа к Google API с помощью OAuth
1. С помощью них создайте Refresh токен для Google Developers
1. Создайте файл `.env` в корневой директории.
1. Заполните его согласно примеру (`.env.example`).

### Переменные окружения

|Название|Описание|Значение по умолчанию|
|-|-|-|
|SECRET_TOKEN|Приватный ключ на авторизации|-|
|PORT|Порт на котором запускается приложение|3000|
|EMAIL_USER|Google почта для отправки писем|-|
|CLIENT_ID|Client ID для Google OAuth|-|
|CLIENT_SECRET|Client SECRET для Google OAuth|-|
|REDIRECT_URI|Redirect URI для Google OAuth|-|
|REFRESH_TOKEN|Refresh Token для Google OAuth|-|

## Сборка

Выполните команды (в зависимости от пакетного менеджера, который вы используете)

```bash
$ npm install
$ npm run build
```

или

```bash
$ yarn install
$ yarn build
```

## Запуск

```bash
$ npm start
```

или

```bash
$ yarn start
```

Приложение запустится на порту, который был указан в файле `.env`. Если не указан, то на порту 3000.
