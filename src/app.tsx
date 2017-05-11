import { h, render } from 'preact'
import HelloWorld from './HelloWorld'
import CityStats from './CityStats'

render(
    //<HelloWorld name="World" />
    <div>
        <CityStats nombre="Santiago,CL" />
        <CityStats nombre="Zurich,SW" placeholder="asd" />
        <CityStats nombre="Auckland,NZ" placeholder="asd" />
        <CityStats nombre="Sydney,AU" placeholder="asd" />
        <CityStats nombre="London,UK" placeholder="asd" />
        <CityStats nombre="Georgia,USA" placeholder="asd" />
    </div>
, document.querySelector('#app'))