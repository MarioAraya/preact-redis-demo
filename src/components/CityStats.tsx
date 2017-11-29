import { h, Component } from "preact";
import redisService from '../components-services/redis-service'

export interface ICityProps {
    nombreCiudad?: string;
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
        this.btnClick();
    }
    
    btnClick() {
        console.log('this.props.nombreCiudad: ' +this.props.nombreCiudad)
        
        redisService.getDataCiudad(this.props.nombreCiudad)
            .then( res => {
                this.setState({
                    temp: res.temp,
                    hour: res.hour,
                    summ: res.summ,
                    icon: res.icon,
                    error: res.error
                })
            })
            .catch( err => {
                console.error(`Error al obtener la data de la ciudad ${this.props.nombreCiudad}: ` + err)
            })
    }

    handleChange = (e) => {
        //this.setState({inputValue: e.target.value});
        console.log('e.target.value = ' +e.target.value)
        this.props.nombreCiudad = e.target.value
    }
      

    render (props): any {
        let { nombreCiudad } = this.props;
        let { hour, temp, icon, summ } = this.state;
        return (
            <button class="btnForecast btn btn-primary" type="button" onClick={this.btnClick}>
                <div class="icon">
                    { icon!=="" && <img src={ icon } alt={ summ } width="60" /> }
                    <input type="text" value={ nombreCiudad } onChange={this.handleChange} />
                </div>
                <div class="badge1">
                    <span class="badge"><span class="glyphicon glyphicon-time" aria-hidden="true"></span> { hour }</span> &nbsp;
                    <span class="badge"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> { temp }°</span>                                    
                </div>
            </button>
        );
    }
}