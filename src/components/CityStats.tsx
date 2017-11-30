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
            hour: '00:00',
            summ: '',
            icon: 'images/loading.svg',
            error: '',
            ciudad: this.props.nombreCiudad
        };
        this.btnClick = this.btnClick.bind(this);
    }
    
    btnClick() {
        redisService.getDataCiudad(this.state.ciudad)
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
                console.error(`Error al obtener la data de la ciudad ${this.state.ciudad}: ` + err)
            })
    }

    handleChange = (e) => {
        this.setState({
            ciudad: e.target.value
        });
    }
      
    render (props): any {
        let { hour, temp, icon, summ, ciudad } = this.state;
        return (
            <button class="btnForecast btn btn-primary" type="button">
                <div class="icon">
                    { icon!=="" && <img onClick={this.btnClick} src={ icon } alt={ summ } width="60" /> }
                    <input type="text" value={ ciudad } onChange={this.handleChange} />
                </div>
                <div class="badge1">
                    <span class="badge"><span class="glyphicon glyphicon-time" aria-hidden="true"></span> { hour }</span> &nbsp;
                    <span class="badge"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span> { temp }°</span>                                    
                </div>
            </button>
        );
    }
}