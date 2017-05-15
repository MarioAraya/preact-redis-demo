import { h, Component } from "preact";
import axios from "axios";

const url: string = "http://localhost:5000";

export interface ICityProps {
    nombre?: string;
}

export interface ICityState {
    temp: string;
    hour: string;
    lat: number;
    lng: number;
}

export default class CityStats extends Component<ICityProps, any> {
    constructor() {
        super();
        this.state = {
            nombre: "",
            temp: 0,
            hour: "00:00",
            lat: 0,
            lng: 0
        };
        this.btnClick = this.btnClick.bind(this);
    }
    btnClick(props) {
        axios.get(url + "/api/redis/getLatLng/" + this.props.nombre).then((res) => {
            console.log('getStats OK')
            this.setState({
                nombre: this.props.nombre + " (ok)",
                lat: res.data[0],
                lng: res.data[1],
                hour: "11:22"
            });
            return res.data;
        }).catch((err) => {
            console.log('getStats ERROR: ' +err);
        });
    }
    render (props): any {
        let { nombre } = this.props;
        let { hour, temp } = this.state;
        return (
            <button class="btn btn-primary" type="button" onClick={this.btnClick}><p> {nombre} </p>
                <span class="badge"><span class="glyphicon glyphicon-time" aria-hidden="true"></span> { hour } - </span>
                <span class="badge"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> { temp }°</span>
            </button>
        );
    }
}