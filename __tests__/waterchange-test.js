'use strict';
/*global jest, pit, expect */

jest.mock("wiring-pi")
jest.useFakeTimers();
var  log = require('../logger.js')
log.level('debug')

var util = require('util')
describe('doWaterChange', function(){
  it('promise test', async () => { 
 
   var wc_promise = require('../waterchange.js')()
    var wpi = require('wiring-pi')
   jest.runAllTimers() 
   jest.runAllTicks()
   var finalresults = await wc_promise
//  console.log(wpi.wiringPiISR.mock.calls)
   expect(finalresults).toEqual('complete') 
   expect(wpi.pinMode.mock.calls).toEqual( [ [ 5, 1 ], [ 6, 1 ] ])
   expect(wpi.digitalWrite.mock.calls).toEqual([ [ 6, true ], [ 6, false ], [ 5, true ], [ 5, false ] ])
   expect(wpi.wiringPiISR).toBeCalled()
   expect(wpi.wiringPiISR.mock.calls[0][0]).toBe(7)
   expect(wpi.wiringPiISR.mock.calls[0][1]).toBe(2)
   expect(wpi.wiringPiISRCancel.mock.calls[0][0]).toBe(7)
   
  });
});

