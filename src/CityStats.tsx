import { h, Component } from "preact";
import axios from "axios";
import utils from "./util"

export interface ICityProps {
    nombre?: string;
}

export default class CityStats extends Component<ICityProps, any> {
    constructor() {
        super();
        this.state = {
            temp: 0,
            hour: "00:00",
            summ: "",
            icon: "",
            error: ""
        };
        this.btnClick = this.btnClick.bind(this);
    }
    
    btnClick(props) {
        axios.get("/api/redis/getLatLng/" + this.props.nombre).then((res) => {
            console.log(`getStats OK nombre=${this.props.nombre} lat=${res.data.lat} lng=${res.data.lng}`)
            axios.get('/api/forecast/getTimeTemp/' + res.data.lat +"/" +res.data.lng)
            .then((resForecast) => {
                console.log('/forecast.IO ... OK', resForecast.data) 
                this.setState({
                    hour: utils.getHourTimezone(resForecast.data.offset),
                    temp: resForecast.data.temp,
                    summ: resForecast.data.summ,
                    icon: utils.getIconUrlForecastIO(resForecast.data.icon)
                });             
            }).catch((err) => {
                console.log('Error en /api/forecast/getTimeTemp/ : ' +err);
                this.setState({error: err})
            });
        }).catch((err) => {
            console.log('Error en /api/redis/getLatLng/ : ' +err);
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