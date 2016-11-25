// waterchange.js
const _ = require('lodash/fp'),
    wpi = require('wiring-pi'),
    log = require('./logger.js'),
    Promise = require('bluebird'),
    delay_length = 30000,
    fill_pin = 5,
    drain_pin = 6,
    sump_normal_level_float = 7;
      
wpi.setup('wpi');
wpi.pinMode(fill_pin, wpi.OUTPUT);
wpi.pinMode(drain_pin,wpi.OUTPUT);

const fill_sump = _.partial(wpi.digitalWrite, [fill_pin]),
      drain_sump = _.partial(wpi.digitalWrite, [drain_pin]),
      
      waitForFloat_high = () => { 
        const thepromise = new Promise((resolve) => {  
            const interupt_callback = () => {
                    log.debug('interupt triggered. callback called'); 
                    return resolve();
            };
            wpi.wiringPiISR(sump_normal_level_float, wpi.INT_EDGE_RISING,interupt_callback);
            return true
        })
        .finally(() => {
            wpi.wiringPiISRCancel(sump_normal_level_float);
            log.debug('cancel float interupt');
            return true
        });
        return thepromise;  
      }
/*    
const doFillSum = () => {
        drain_sump(false);
        log.debug('drain tank');
        fill_sump(true); 
        log.debug('fill tank');
        return waitForFloat_high().then(() => {
        fill_sump(false);
        log.info('waterchange complete')
        return('complete')
    })
    }
*/
    
async function doWaterChange() {
    log.info('begin waterchange');
    drain_sump(true);
    await Promise.delay(delay_length)
    drain_sump(false,);
    log.debug('drain tank');
    fill_sump(true); 
    log.debug('fill tank');
    await waitForFloat_high()
    fill_sump(false);
    log.info('waterchange complete')
    return 'complete'
}

module.exports = doWaterChange;