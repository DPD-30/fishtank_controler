'use strict';
/*global jest,expect*/
jest.unmock('nools');

var nools = require("nools");

describe('Tank Rule tests', ()=>{
    
    describe('test waterchange rule', ()=>{
       
        const flow = nools.compile(__dirname + "/../newruleset.nools");
       
        var WaterChange = (date,status) => {return {date:date, status:status}};
        let session, trackFireEvent;
        
        beforeEach(()=>{
            session = flow.getSession( );
            trackFireEvent = jest.genMockFunction();
            session.on("fire", trackFireEvent);
        });
    
        afterEach(()=>{ session.dispose()});
        
        it('should fire doWaterchange event when date older than 1 day',()=>{
            const trackDoWaterChangeEvent = jest.genMockFunction();
            let d = new Date();
            d.setDate(d.getDate()-1);
            d.setMinutes(d.getMinutes()+0);
            
            session.assert(WaterChange(d,'complete'));
            session.on('doWaterChange',trackDoWaterChangeEvent);
            session.match();
            
            expect(trackFireEvent).toBeCalled();
            expect(trackFireEvent.mock.calls[0][0]).toBe('dailyWaterChange');
            expect(trackDoWaterChangeEvent).toBeCalled();
        });
        
        it('should NOT fire doWaterchange event when date older than 1 day',()=>{
            const trackDoWaterChangeEvent = jest.genMockFunction();
            let d = new Date();
            d.setDate(d.getDate()-1);
            d.setMinutes(d.getMinutes()+1);
            
            session.assert(WaterChange(d,'complete'));
            session.on('doWaterChange',trackDoWaterChangeEvent);
            session.match();
            
            expect(trackFireEvent).not.toBeCalled();
            expect(trackDoWaterChangeEvent).not.toBeCalled();
        });
    });
});