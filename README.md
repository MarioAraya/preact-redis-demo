Esta app muestra un componente renderizado con Preact, y que al clickearlo consume la api de googlemaps en primera instancia y en las posteriores lee desde redis, luego con la data obtenida consume api de Forecast.io para obtener la hora exacta y pronóstico del tiempo.

# Como levantar proyecto

Ejecutar comandos: 
- npm install
- npm start
- open "index.html" en el browser

Con estos comandos instalamos las dependencias y generamos el build webpack.
Luego arrancamos el servidor y la API backend.

- [Heroku deploy](https://cryptic-retreat-74751.herokuapp.com/)

Material usado:
- [HelloWorld - Preact+Typescript+WebpackSimple](https://medium.com/@shakyShane/hello-world-with-preact-jsx-typescript-6d70cf2ebf01) - Tutorial HelloWorld con Preact y Typescript
- [Redis instalación](https://github.com/MSOpenTech/redis/releases) - Para montar servidor local
- [Redis Labs](https://redislabs.com)  - Para usar instancia en la nube de Redis
- Axios - Para request en frontend
- Express - Para API backend
- Documentación API [Forecast.IO](https://darksky.net/dev/docs)
- Documentación API [Google Geocode](https://developers.google.com/maps/documentation/geocoding/start)

Repos:
- Revisar remotes antes de pushear 'git remote -v'
- Remover remote con "git remote remove origin' antes de agregar el remote adecuado
- [Github] git remote add origin https://MarioAraya@github.com/MarioAraya/preact-redis-demo.git
- [Bitbucket] git remote add origin https://MarioArayaRomero@bitbucket.org/MarioArayaRomero/preact-redis-demo.git
