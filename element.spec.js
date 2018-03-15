import Element from './element';
import ElementEvent from './element-event';

import 'babel-polyfill'
import { expect } from 'chai';


describe('Element', function () {

    let li = document.createElement('li');

    describe('constructor', function () {

        it('with bad parameters: should throw exception', function () {
            
            expect(() => {
                new Element();
            }).to.throw();

            expect(() => {
                new Element(null, null);
            }).to.throw();

            expect(() => {
                new Element('hello');
            }).to.throw();
            
            expect(() => {
                new Element('hello', 'this is a bad type');
            }).to.throw();

            expect(() => {
                new Element('hello', ['bad', 'type', 1]);
            }).to.throw();

            expect(() => {
                new Element(li,
                    new ElementEvent('a', () => {})
                );
            }).to.throw();
            
        });

        it('with good parameters: should not throw exceptioon', () => {
            expect(() => {
                new Element(li);
            }).to.not.throw();

            expect(() => {
                new Element(li, [
                    new ElementEvent('a', () => {})
                ]);
            }).to.not.throw();

            expect(() => {
                new Element(li, [
                    new ElementEvent('a', () => {}),
                    new ElementEvent('a', () => {}),
                    new ElementEvent('a', () => {}),
                    new ElementEvent('a', () => {})
                ]);
            }).to.not.throw();

        });



    });

    describe('getEvents', () => {

        it('with bad parameters: should throw exception', () => {

            expect(() => {
                new Element(li).getEvents();
            }).to.throw();

            expect(() => {
                new Element(li).getEvents(true);
            }).to.throw();

            expect(() => {
                new Element(li).getEvents('good param', 'bad param');
            }).to.throw();
            
        });

        it('with good parameters: should not throw exception', () => {

            expect(() => {
                new Element(li).getEvents('good.param');
            }).to.not.throw();

            expect(() => {
                new Element(li).getEvents('good.param', () => {});
            }).to.not.throw();
        });

        it('getEvents: should return right callbacks...', () => {
            function primi() {}
            function secondi() {}
            function contorni() {}
            function dessert() {}

            let eventArray = [
                new ElementEvent('first', primi),

                new ElementEvent('second', secondi),
                new ElementEvent('second', secondi),

                new ElementEvent('third', contorni),
                new ElementEvent('third', contorni),
                new ElementEvent('third', contorni),

                new ElementEvent('fourth', dessert),
                new ElementEvent('fourth', dessert),
                new ElementEvent('fourth', () => {}),
                new ElementEvent('fourth', () => {})
            ];

            let obj = new Element(li, eventArray);

            expect(obj.getEvents('first')).to.deep.equal( eventArray.filter((x) => { return x.type === 'first'; }) );
            expect(obj.getEvents('second')).to.deep.equal( eventArray.filter((x) => { return x.type === 'second'; }) );
            expect(obj.getEvents('third')).to.deep.equal( eventArray.filter((x) => { return x.type === 'third'; }) );
            expect(obj.getEvents('fourth')).to.deep.equal( eventArray.filter((x) => { return x.type === 'fourth'; }) );

            expect(obj.getEvents('fourth', dessert)).to.deep.equal( 
                eventArray.filter((x) => { 
                    return x.type === 'fourth' && x.handler === dessert; 
                }) 
            );

            expect(obj.getEvents('first', secondi)).to.have.lengthOf(0);
            expect(obj.getEvents('first', contorni)).to.have.lengthOf(0);
            expect(obj.getEvents('fourth', () => {})).to.have.lengthOf(0);            
        });
    });

    describe('addEvent', () => {
        
        it('with bad parameters: should throw exception', () => {
            let obj = new Element(li);

            expect(() => {
                obj.addEvent();
            }).to.throw();

            expect(() => {
                obj.addEvent('Hello');
            }).to.throw();

            expect(() => {
                obj.addEvent(null);
            }).to.throw();

            expect(() => {
                obj.addEvent(undefined);
            }).to.throw();
            
        });

        it('with good parameters: should not throw exception', () => {
            let obj = new Element(li);

            expect(() => {
                obj.addEvent(new ElementEvent('hello', () => {}));
            }).to.not.throw();

            expect(() => {
                obj.addEvent(new ElementEvent('hello', () => {}));
                obj.addEvent(new ElementEvent('hello', () => {}));
                obj.addEvent(new ElementEvent('hello', () => {}));
                obj.addEvent(new ElementEvent('hello', () => {}));
                obj.addEvent(new ElementEvent('hello', () => {}));
            }).to.not.throw();
            
        });

        it('should add parameters to array', () => {
            let obj = new Element(li);

            expect(obj.events.length).to.equal(0);

            obj.addEvent(new ElementEvent('hello1', () => {}));
            obj.addEvent(new ElementEvent('hello1', () => {}));
            obj.addEvent(new ElementEvent('hello2', () => {}));
            obj.addEvent(new ElementEvent('hello3', () => {}));
            obj.addEvent(new ElementEvent('hello4', () => {}));

            expect(obj.events.length).to.equal(5);
        });

    });

    describe('removeEvents', () => {
        
        it('with bad parameters: should throw exception', () => {
            let obj = new Element(li);

            expect(() => {
                obj.removeEvents();
            }).to.throw();

            expect(() => {
                obj.removeEvents(true);
            }).to.throw();

            expect(() => {
                obj.removeEvents('evtName', 'bad.param.should.be.Function');
            }).to.throw();
            expect(() => {
                obj.removeEvents('evtName', true);
            }).to.throw();

            expect(() => {
                obj.removeEvents(null);
            }).to.throw();
            expect(() => {
                obj.removeEvents(null, null);
            }).to.throw();

            expect(() => {
                obj.removeEvents(undefined);
            }).to.throw();
            expect(() => {
                obj.removeEvents(undefined, undefined);
            }).to.throw();
            
        });

        it('with good parameters: should not throw exception', () => {
            let obj = new Element(li);

            expect(() => {
                obj.removeEvents('hello');
                obj.removeEvents('hello', () => {});
                obj.removeEvents('hello', function() {});
            }).to.not.throw();
            
        });

        it('should remove elements from array', () => {
            function primi() {}
            function secondi() {}
            function contorni() {}
            function dessert() {}

            let eventArray = [
                new ElementEvent('first', primi),

                new ElementEvent('second', secondi),
                new ElementEvent('second', secondi),

                new ElementEvent('third', contorni),
                new ElementEvent('third', contorni),
                new ElementEvent('third', contorni),

                new ElementEvent('fourth', dessert),
                new ElementEvent('fourth', dessert),
                new ElementEvent('fourth', () => {}),
                new ElementEvent('fourth', () => {})
            ];

            let obj = new Element(li, eventArray);

            expect(obj.events.length).to.equal(10);

            obj.removeEvents('first');
            expect(obj.events.length).to.equal(9);

            obj.removeEvents('second');
            expect(obj.events.length).to.equal(7);

            obj.removeEvents('third', primi);
            expect(obj.events.length).to.equal(7);

            obj.removeEvents('third', contorni);
            expect(obj.events.length).to.equal(4);

            obj.removeEvents('fourth', dessert);
            expect(obj.events.length).to.equal(2);

            obj.removeEvents('fourth');
            expect(obj.events.length).to.equal(0);
            
        });

    });
});
