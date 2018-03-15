import ElementEvent from './element-event';

import 'babel-polyfill'
import { expect } from 'chai';

describe('ElementEvent', function () {

    describe('constructor', function () {

        it('with bad parameters: should throw exception', function () {
            expect(() => {
                new ElementEvent();
            }).to.throw();

            expect(() => {
                new ElementEvent(null, null);
            }).to.throw();

            expect(() => {
                new ElementEvent('');
            }).to.throw();

            expect(() => {
                new ElementEvent(null, '');
            }).to.throw();

            expect(() => {
                new ElementEvent('', null);
            }).to.throw();

            expect(() => {
                new ElementEvent('', ()=> {}, true, true, 'hello');
            }).to.throw();
            expect(() => {
                new ElementEvent('', ()=> {}, true, 'hello', true);
            }).to.throw();
            expect(() => {
                new ElementEvent('', ()=> {}, 'hello', true, true);
            }).to.throw();
            
        });

        it('with good parameters: should not throw exception', function () {
            expect(() => {
                new ElementEvent('evt', () => {});
                new ElementEvent('evt', () => {}, true);
                new ElementEvent('evt', () => {}, true, true);
                new ElementEvent('evt', () => {}, true, true, true);
            }).to.not.throw();
        });

        it('properties should return passed values', function () {
            let fun = () => {},
                evt = 'evy',
                obj = new ElementEvent(evt, fun),
                expected = {
                    type: evt,
                    handler: fun,
                    once: false,
                    passive: false,
                    capture: false
                };

            expect(obj).to.include(expected);
        });


    });
});
