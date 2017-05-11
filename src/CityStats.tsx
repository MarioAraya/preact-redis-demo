import { h, Component } from 'preact'

export interface CityProps {
    nombre?: string,
    placeholder?: string,
    lat?: number,  // from Google Maps API
    long?: number, // from Google Maps API
    temp?: string, // from Forecast.io API
    hour?: string  // from Forecast.io API
}

export default class CityStats extends Component<CityProps, any>
{
    render (props) {
        let { nombre, placeholder, hour, temp } = props;
        return (
            <div>
                <input type="text" placeholder="placeholder" />{ nombre }<br/>
                <button>Consultar</button>
                <p>hour: { hour }</p>
                <br/>
                <p>temp: { temp }</p>
            </div>
        )
    }
}