# iflux-frontend

> Frontend for iFLUX Server

## Board

[![Stories in Backlog](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=backlog&title=Backlog)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)
[![Stories in In Progress](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)
[![Stories in Ready](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=ready&title=Ready)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)
[![Stories in In Done](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=done&title=Done)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)


## Setup
Create the file .env in the root directory of the project. This file will not be commited. The content refers the iflux server API
```bash
IFLUX_SERVER_URL=http://localhost:3000/v1
```

## Run it

Setup and run [iflux-Docker](https://github.com/SoftEng-HEIGVD/iflux-docker)

Run the http-server on localhost
```bash
npm start ./
```
Access it with [http://localhost:8100](http://localhost:8100).