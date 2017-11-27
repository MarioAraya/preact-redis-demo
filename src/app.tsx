import { h, render } from "preact";
import CityStats from "./components/CityStats";

render(
    <div class="container">
        <CityStats nombre="Santiago,CL" />
        <CityStats nombre="Auckland,NZ" />
        <CityStats nombre="Zurich,SW" />        
        <CityStats nombre="Sydney,AU" />
        <CityStats nombre="London,UK" />
        <CityStats nombre="Georgia,USA" />
    </div>
, document.querySelector("#app"));