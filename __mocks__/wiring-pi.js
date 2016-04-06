'use strict';
const wpi = jest.genMockFromModule('../node_modules/wiring-pi');
const util = require('util');

wpi.wiringPiISR.mockImplementation( (x,y,callback) =>{ 
    process.nextTick(callback)
    
} );
module.exports = wpi;

