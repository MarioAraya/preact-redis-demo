import * as sinon from 'sinon'
import googleService from '../src/services/google-service'

describe('IntegrationTests - google API tests', () => {
    let getCoordenadas;
    beforeEach(function () { getCoordenadas = sinon.spy(googleService, 'getCoordenadas'); });
    afterEach(function () { getCoordenadas.restore(); });

    it('getCoordenadas() should be called', () => {
        googleService.getCoordenadas('Santiago,CL')        
        sinon.assert.calledOnce(getCoordenadas)
        sinon.assert.calledWith(getCoordenadas, 'Santiago,CL')          
    })

    let city
    it('getCoordenadas() should be called with '+city, () => {
        city = 'Peñaflor,CL'
        googleService.getCoordenadas(city).then( response => {
            //console.log('__response '+city+': ', response)
        }).catch( err => console.log('_err con '+ city +':', err))
        sinon.assert.calledOnce(getCoordenadas)
        sinon.assert.calledWith(getCoordenadas, city)          
    })

    it('getCoordenadas() should be called with '+city, () => {
        city = 'Arica,CL'
        googleService.getCoordenadas(city).then( response => {
            //console.log('__response '+city+': ', response)
        }).catch( err => console.log('_err con '+ city +':', err))
        sinon.assert.calledOnce(getCoordenadas)
        sinon.assert.calledWith(getCoordenadas, city)          
    })
})
