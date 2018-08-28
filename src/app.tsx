import { h, render } from "preact";
import CityStats from "./components/CityStats";

render(
    <div class="container">
        <CityStats nombreCiudad="Santiago,CL" />
        <CityStats nombreCiudad="Auckland,NZ" />
        <CityStats nombreCiudad="Zurich,SW" />        
        <CityStats nombreCiudad="Sydney,AU" />
        <CityStats nombreCiudad="London,UK" />
        <CityStats nombreCiudad="Malloco,CL" />
        <p><i>Note: Click loading icon to refresh forecast information.</i></p>
        <p><i>this is using googlemaps to get lat/lng, then using forecast.io to query data, caching latlng in Redis instance </i></p>
        <a href="https://github.com/MarioAraya/preact-redis-demo">https://github.com/MarioAraya/preact-redis-demo</a>
    </div>
, document.querySelector("#app"));