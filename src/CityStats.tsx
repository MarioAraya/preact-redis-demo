import { h, Component } from "preact";
import axios from "axios";

const url: string = "http://localhost:5000";

export interface ICityProps {
    nombre?: string;
    lat?: number;  // from Google Maps API or REDIS
    long?: number; // from Google Maps API or REDIS
    temp?: string;   // from Forecast.io API
    hour?: string; // from Forecast.io API
}

export default class CityStats extends Component<ICityProps, any> {
    constructor() {
        super();
        this.state = {
            nombre: "ASDF333",
            temp: 3,
            hour: "33:33",
            lat: -33.555,
            lng: 44.6654
        };
        this.getStats = this.getStats.bind(this);
    }
    getStats() {
        console.log("getStats called!");
        axios.get(url + "/api/redis/store").then((res) => {
            this.setState({
                nombre: "Peñaflor,CL",
                temp: 3
            });
        }).catch((err) => {
            console.error(err);
        });
    }
    render (): any {
        let { nombre, hour, temp } = this.state;
        return (
            <button class="btn btn-primary" type="button" onClick={this.getStats}> {nombre} 
                <span class="badge"><span class="glyphicon glyphicon-time" aria-hidden="true"></span> { hour } - </span>
                <span class="badge"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> { temp }°</span>
            </button>
        );
    }
}