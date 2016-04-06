'use strict';
/*global jest, pit, expect */
jest.unmock("util");
jest.unmock("lodash/fp");
jest.unmock("lodash");
jest.unmock("lodash/fp/partial");
jest.unmock("../waterchange.js");
jest.unmock("bunyan")
jest.unmock('../logger.js')

var log = require('bunyan').createLogger({name: 'waterchange', level: 'warn'});

var util = require('util')
describe('doWaterChange', function(){
  pit('promise test', () => { 
   var results = require('../waterchange.js')() 
   var  wpi = require('wiring-pi');  
  
   jest.runAllTimers();
   
   return results
   .then(()=>{ 
     expect(wpi.digitalWrite.mock.calls.length).toBe(4);
     expect(wpi.digitalWrite.mock.calls[0][0]).toBe(true);
     expect(wpi.digitalWrite.mock.calls[1][0]).toBe(false);
     expect(wpi.digitalWrite.mock.calls[2][0]).toBe(true);
     expect(wpi.digitalWrite.mock.calls[3][0]).toBe(false);
     expect(wpi.wiringPiISR.mock.calls.length).toBe(1);
     expect(wpi.wiringPiISRCancel.mock.calls.length).toBe(1);
     
  });
   
  });
});
