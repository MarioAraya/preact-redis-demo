import { assert } from 'chai'
import methods from '../src/methods'

describe('App tests', () => {
    describe('icons method tests', () => {
        it('should return "empty.png" as string', () => {
            let result = methods.getIconUrlForecastIO('asdf')
            assert.equal(result, 'empty.png')
        })
    
        it('should return typeof string', () => {
            let result = methods.getIconUrlForecastIO('asdf')
            assert.typeOf(result, 'string')
        })
    
        it('should return "https://i.imgur.com/uNE3UsV.png" ', () => {
            let result = methods.getIconUrlForecastIO('partly-cloudy-night')
            assert.equal(result, 'https://i.imgur.com/uNE3UsV.png')
        })
    })

    // describe('axios tests', () => {
    //     it('should return city forecast as response object', () => {
    //         return new Promise((resolve, reject) => {
    //             return methods.getForecast({ lat: -33.4122, lng: -70.5996 })
    //             //console.log('result', result)
    //             //Promise.reject('whatever')
    //         }).then( state => {
    //             console.log('state:', state)
    //         }).catch( err => {
    //             console.log('err:', err)                
    //             assert.isNotOk(err, 'Promise error')
    //         })
    //     })
    // })
})
