# NailGarden
Proyecto del curso de multimedios.

## Acerca de
El proyecto consiste en un sistema web de cuidado personal, donde las personas que lo visitan podrán ver los servicios ofrecidos, así como una página para poder contactar a la organización, una página de registro e inicio de sesión, una página del perfil, así como una página para agendar una cita.

## Requisitos
Debe tener *Node.js* y *MongoDB* instalado en sus computadores.

## Instalación
Para poder correr el servidor con la página se debe de:
* Clonar el repositorio
* Instalar las dependendencias descritas en el _package.json_ con el comando `npm i`
* Crear un archivo para almacenar las variables de entorno, llamado `.env`
  * Crear las siguientes variables de entorno:
      1. `DATABASE_URL=mongodb://localhost/NailGarden`
      2. `SESSION_SECRET=*~QCN,,'?eGL7hc"`
* Correr el servidor con `npm run devStart`

Con los pasos anteriores se corre el servidor. Los valores de las variables de entorno pueden variar dependiendo de las preferencias del usuario.

## Página
Pueden ver la página en https://nail-garden.herokuapp.com/

## Participantes
* [Norma Chavarría Rojas](https://github.com/norma430)
* [Yanily Jiménez Benavides](https://github.com/yanily)
* [Robert Arias Castro](https://github.com/robert-arias)
