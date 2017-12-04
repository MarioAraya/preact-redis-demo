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
    </div>
, document.querySelector("#app"));