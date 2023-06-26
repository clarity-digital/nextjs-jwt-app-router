<img width="800" alt="GitHub README banner_ Next App Router" src="https://github.com/avocado-media/nextjs-jwt-app-router/assets/45365598/9a6466e6-4ba7-42e4-bdd3-1c3ffade37cb">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This repository contains a [Next.js](https://nextjs.org/) with the new App Router paradigm and JWT authentication using a Laravel REST API.

## Laravel backend

We created a [Laravel REST API](https://laravel.com/) inspired by Laravel Breeze. You can find the
repository [here](https://github.com/avocado-media/laravel-jwt-rest-api).

## Features

- JWT authentication with NextAuth.js
  - Login
  - Register
  - Password reset
  - Email verification
- Profile updating
- Password changing
- TypeScript

## Installation

1. `npm install`
2. `cp .env.example .env.local`
3. `npm run dev`

## Authentication

The access token has a TTL of 1 hour until it expires. The access token should be refreshed within this time window to avoid becoming unauthenticated. The access token can be refreshed for two weeks. After that, the user has to log in again.

This behavior can be changed in the [REST API repository](https://github.com/avocado-media/laravel-jwt-rest-api).

## Contributing

Feel free to open a pull request if you want to contribute to this project. All contributions / suggestions are
welcome ✨

## License

This project is open-sourced software licensed under the MIT license.
