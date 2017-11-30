import * as sinon from 'sinon'
import googleService from '../src/services/google-service'

describe('IntegrationTests - google API tests', () => {
    let googleGetLatLng_axios;
    beforeEach(function () { googleGetLatLng_axios = sinon.spy(googleService, 'googleGetLatLng_axios'); });
    afterEach(function () { googleGetLatLng_axios.restore(); });

    it('googleGetLatLng_axios() should be called', () => {
        googleService.googleGetLatLng_axios('Santiago,CL')        
        sinon.assert.calledOnce(googleGetLatLng_axios)
        sinon.assert.calledWith(googleGetLatLng_axios, 'Santiago,CL')          
    })

    let city
    it('googleGetLatLng_axios() should be called with '+city, () => {
        city = 'Peñaflor,CL'
        googleService.googleGetLatLng_axios(city).then( response => {
            //console.log('__response '+city+': ', response)
        }).catch( err => console.log('_err con '+ city +':', err))
        sinon.assert.calledOnce(googleGetLatLng_axios)
        sinon.assert.calledWith(googleGetLatLng_axios, city)          
    })

    it('googleGetLatLng_axios() should be called with '+city, () => {
        city = 'Arica,CL'
        googleService.googleGetLatLng_axios(city).then( response => {
            //console.log('__response '+city+': ', response)
        }).catch( err => console.log('_err con '+ city +':', err))
        sinon.assert.calledOnce(googleGetLatLng_axios)
        sinon.assert.calledWith(googleGetLatLng_axios, city)          
    })
})
