# Descripción
Esta app muestra un componente con *Preact* (React), que al clickearlo consume la api de *googlemaps*, en primera instancia, para obtener la geoloc y luego escribe/lee desde la cache Redis (redislabs) y consume la API de *Forecast.io* para obtener la hora exacta y pronóstico del tiempo.

# Como levantar proyecto

Ejecutar comandos: 
```
- npm install
- npm start
luego open "index.html" en el browser

- npm run build
- npm run build-server
para publicar

- npm run test
para correr tests
```

Con estos comandos instalamos las dependencias y generamos el build webpack.
Luego arrancamos el servidor y la API backend.



# DEMO online
- [DEMO site deployed on Firebase](https://fir-react-redis-temperatura.firebaseapp.com/) (this is consuming backend API from Azure)
- [DEMO api deployed on MS Azure](https://api-forecast-redis.azurewebsites.net/api/redis/getLatLng/London,UK)

# Material usado:
- [HelloWorld con Preact+Typescript+WebpackSimple](https://medium.com/@shakyShane/hello-world-with-preact-jsx-typescript-6d70cf2ebf01) - Tutorial ultra básico HelloWorld con Preact y Typescript
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
