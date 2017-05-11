import { h, render } from "preact";
import HelloWorld from "./HelloWorld";
import CityStats from "./CityStats";

render(
    <div class="container">
        <CityStats nombre="Santiago,CL" />
        <CityStats nombre="Zurich,SW" />
        <CityStats nombre="Auckland,NZ" />
        <CityStats nombre="Sydney,AU" />
        <CityStats nombre="London,UK" />
        <CityStats nombre="Georgia,USA" />
    </div>
, document.querySelector("#app"));