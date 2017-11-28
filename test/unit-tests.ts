import { assert } from 'chai';
import * as chai from 'chai';

import etcService from '../src/components-services/etc-service'

describe('UnitTests - getIconUrlForecastIO() tests', () => {    
    /** 
     * QUE tipo de configuracion previa() o posterior() podrìa haver aca
     * 
     * 
     */
    it('getIconUrlForecastIO() should return icon URL with right param', () => {
        let result = etcService.getIconUrlForecastIO('partly-cloudy-night')
        chai.assert.equal(result, 'https://i.imgur.com/uNE3UsV.png')
    })

    it('getIconUrlForecastIO() should be called with any string', () => {
        let result = etcService.getIconUrlForecastIO('asdf')
        chai.assert.equal(result, 'empty.png')
        chai.assert.typeOf(result, 'string')        
    })

    it('getIconUrlForecastIO() should be called with BAD-TYPE params', () => {
        let result1 = etcService.getIconUrlForecastIO(undefined)
        let result2 = etcService.getIconUrlForecastIO(null)
        let result3 = etcService.getIconUrlForecastIO(1)
        chai.assert.equal(result1, 'empty.png')    
        chai.assert.equal(result2, 'empty.png')    
        chai.assert.equal(result3, 'empty.png')    
    })
})
