import { h, Component } from "preact";
import axios from "axios";
import utils from "./util"

export interface ICityProps {
    nombre?: string;
}

const httpClient = axios.create();
httpClient.defaults.timeout = 5000;

export default class CityStats extends Component<ICityProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            hour: "00:00",
            summ: "",
            icon: "images/loading.svg",
            error: ""
        };
        this.btnClick = this.btnClick.bind(this);

        // Se hace click automáticamente al instanciar el componente
        this.btnClick(this.props.nombre);
    }
    
    btnClick(props) {
        this.getDataCiudad(this.props.nombre)
    }

    // lat Lng from redis
    private getDataCiudad(ciudad: string) {
        return httpClient.get("/api/redis/getLatLng/" + ciudad).then( res => {
                console.log(`getStats OK nombre=${ciudad} lat=${res.data.lat} lng=${res.data.lng}`)
                this.getForecast(res.data)
            }).catch(
                err => console.log('Error en /api/redis/getLatLng/ : ' +err)
            )
    }

    // Forecast info from forecast.io
    private getForecast(data) {
        return httpClient.get('/api/forecast/getTimeTemp/' + data.lat +"/" + data.lng)
            .then( resForecast => {
                console.log('/forecast.IO ... OK', resForecast.data) 
                this.setState({
                    hour: utils.getHourTimezone(resForecast.data.offset),
                    temp: resForecast.data.temp,
                    summ: resForecast.data.summ,
                    icon: utils.getIconUrlForecastIO(resForecast.data.icon)
                });             
            }).catch( err => {
                console.log('Error en /api/forecast/getTimeTemp/ : ' +err);
                this.setState({error: err})
            });
    }

    render (props): any {
        let { nombre } = this.props;
        let { hour, temp, icon, summ } = this.state;
        return (
            <button class="btnForecast btn btn-primary" type="button" onClick={this.btnClick}>
                <div class="icon">
                    { icon!=="" && <img src={ icon } alt={ summ } width="60" /> }
                    <span>{ nombre }</span>
                </div>
                <div class="badge1">
                    <span class="badge"><span class="glyphicon glyphicon-time" aria-hidden="true"></span> { hour }</span> &nbsp;
                    <span class="badge"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> { temp }°</span>                                    
                </div>
            </button>
        );
    }
}