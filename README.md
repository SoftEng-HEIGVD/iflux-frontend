# iflux-frontend

> Frontend for iFLUX Server

## Board

[![Stories in Backlog](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=backlog&title=Backlog)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)
[![Stories in In Progress](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)
[![Stories in Ready](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=ready&title=Ready)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)
[![Stories in In Done](https://badge.waffle.io/SoftEng-HEIGVD/iflux-frontend.svg?label=done&title=Done)](http://waffle.io/SoftEng-HEIGVD/iflux-frontend)


## Development setup

Create a `.env` file in the root directory of the project and put the following content:

```bash
IFLUX_PUBLIC_API_URL=http://<Boot2Docker IP>:3000/api/v1

```

### Mandatory

It's highly recommended to use `Docker` to simplify your environment setup. Refers to this [iFLUX Docker](https://github.com/SoftEng-HEIGVD/iflux-docker) repository. 

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| IFLUX_PUBLIC_API_URL       | Should be the Docker host IP (boot2docker IP, Vagrant VM IP, ...) or the IP of your host if you have installed iFLUX Server manually. |

## Run

```
$> npm install
$> bower install
$> grunt
```