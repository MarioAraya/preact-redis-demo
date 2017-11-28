import * as sinon from 'sinon'
import forecastService from '../src/components-services/forecast-io-service'

describe('IntegrationTests - forecastIO tests', () => {
    let getForecast;
    beforeEach(function () { getForecast = sinon.spy(forecastService, 'getForecast'); });
    afterEach(function () { getForecast.restore(); });

    it('getForecast() should be called with no params', () => {
        forecastService.getForecast(undefined)        
        sinon.assert.calledOnce(getForecast)
        sinon.assert.calledWith(getForecast, undefined)          
    })

    it('getForecast() should be called with null param', () => {
        forecastService.getForecast(null)
        sinon.assert.calledOnce(getForecast)
        sinon.assert.calledWith(getForecast, null)          
    })

    it('getForecast() should be called with certain good coordinates params', () => {
        var params = { lat: -33.4122, lng: -70.5996 }
        var expectedParams = {
            lat: -33.4122, 
            lng: -70.5996
        }
        forecastService.getForecast(params)
        sinon.assert.calledOnce(getForecast)
        sinon.assert.calledWith(getForecast, expectedParams)          
    })

    it('getForecast() should be called with BAD-TYPE coordinates params', () => {
        var params = { lat: undefined, lng: '-70.5996' }
        var expectedParams = {
            lat: undefined, 
            lng: '-70.5996'
        }
        forecastService.getForecast(params)
        sinon.assert.calledOnce(getForecast)
        sinon.assert.calledWith(getForecast, expectedParams)          
    })
})