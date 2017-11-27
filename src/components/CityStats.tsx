import { h, Component } from "preact";
import methods from '../methods'

export interface ICityProps {
    nombre?: string;
}

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
        methods.getDataCiudad(this.props.nombre)
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