import Events from './events';
import Element from './element';

import { expect } from 'chai';

describe('Events', () => {
    let li = document.createElement('li');

    describe('constructor', () => {

        it('should initialize', () => {
            expect(new Events().elements).to.have.length(0);
        });

    });

    describe('_getElement', () => {
        let obj = new Events();
        obj._createElementIfNotExists(li);

        it('should throw error: when bad parameters', () => {
            expect( () => {
                obj._getElement();
            }).to.throw();
            expect( () => {
                obj._getElement('bad param');
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            expect(() => {
                obj._getElement(li);
            }).to.not.throw();
        });

        it('should return passed element-object', () => {
            expect(obj._getElement(li)).to.deep.equal(new Element(li));
        });

    });


    describe('_createElementIfNotExists', () => {
        let obj = new Events();

        it('should throw error: when bad parameters', () => {
            expect( () => {
                obj._createElementIfNotExists();
            }).to.throw();
            expect( () => {
                obj._createElementIfNotExists('bad param');
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            expect(() => {
                obj._createElementIfNotExists(li);
            }).to.not.throw();
        });

        it('should return passed element-object', () => {
            expect(obj._createElementIfNotExists(li)).to.deep.equal(new Element(li));
        });

        it('should contain added element-object', () => {
            obj._createElementIfNotExists(li);
            expect(obj.elements).to.deep.include(new Element(li));
        });
    });


    describe('_addElementEvent', () => {
        

        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj._addElementEvent();
            }).to.throw();
            expect( () => {
                obj._addElementEvent('badparam');
            }).to.throw();
            expect( () => {
                obj._addElementEvent(li, false);
            }).to.throw();
            expect( () => {
                obj._addElementEvent(li, 'somestring', 'hello I am bad');
            }).to.throw();
            expect( () => {
                obj._addElementEvent(li, false, () => {});
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            let obj = new Events();

            expect(() => {
                obj._addElementEvent(li, 'eventName', () => {});
                obj._addElementEvent(li, 'eventName', function() {});
            }).to.not.throw();
        });

        it('should contain passed element-object with events', () => {
            let obj = new Events();

            obj._addElementEvent(li, 'event1', () => {});
            obj._addElementEvent(li, 'event2', () => {});
            obj._addElementEvent(li, 'event3', () => {});

            let elm = obj._getElement(li);

            expect(obj.elements.length).to.equal(1);
            expect(elm.events.length).to.equal(3);
        });
    });


    describe('_addElementEventFirst', () => {
        

        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj._addElementEventFirst();
            }).to.throw();
            expect( () => {
                obj._addElementEventFirst('badparam');
            }).to.throw();
            expect( () => {
                obj._addElementEventFirst(li, false);
            }).to.throw();
            expect( () => {
                obj._addElementEventFirst(li, 'somestring', 'hello I am bad');
            }).to.throw();
            expect( () => {
                obj._addElementEventFirst(li, false, () => {});
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            let obj = new Events();

            expect(() => {
                obj._addElementEventFirst(li, 'eventName', () => {});
            }).to.not.throw();

            expect(() => {
                obj._addElementEventFirst(li, 'eventName', function() {});
            }).to.not.throw();
        });

        it('should contain passed element-object with events in right order', () => {
            let obj = new Events();

            
            let f1 = () => {};
            let f2 = () => {};
            let f3 = () => {};
            let f4 = () => {};
            obj._addElementEventFirst(li, 'event', f1);
            obj._addElementEventFirst(li, 'event1', f2);
            obj._addElementEventFirst(li, 'event1', f3);
            obj._addElementEventFirst(li, 'event1', f4);

            let elm = obj._getElement(li);

            expect(obj.elements.length).to.equal(1);
            expect(elm.events.length).to.equal(4);

            expect(elm.events[0].handler).to.equal(f1);
            expect(elm.events[1].handler).to.equal(f4);
            expect(elm.events[2].handler).to.equal(f3);
            expect(elm.events[3].handler).to.equal(f2);
        });
    });


    describe('_removeElementEvents', () => {
        
        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj._removeElementEvents();
            }).to.throw();
            expect( () => {
                obj._removeElementEvents('badparam');
            }).to.throw();
            expect( () => {
                obj._removeElementEvents(li, false);
            }).to.throw();
            expect( () => {
                obj._removeElementEvents(li, 'somestring', 'hello I am bad');
            }).to.throw();
            expect( () => {
                obj._removeElementEvents(li, false, () => {});
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            let obj = new Events();

            expect(() => {
                obj._removeElementEvents(li, 'eventName', () => {});
            }).to.not.throw();

            expect(() => {
                obj._removeElementEvents(li, 'eventName', function() {});
            }).to.not.throw();
        });

        it('should not contain passed element-object when removed', () => {
            let obj = new Events();

            let f1 = () => {};
            let f2 = () => {};
            let f3 = () => {};
            let f4 = () => {};
            obj._addElementEvent(li, 'event', f1);
            obj._addElementEvent(li, 'event1', f2);
            obj._addElementEvent(li, 'event1', f3);
            obj._addElementEvent(li, 'event1', f4);
            obj._removeElementEvents(li, 'event');
            
            let elm = obj._getElement(li);
            expect(elm.events.length).to.equal(3);

            expect(elm.events[0].handler).to.equal(f2);
            expect(elm.events[1].handler).to.equal(f3);
            expect(elm.events[2].handler).to.equal(f4);
        });

        it('should not contain passed element-objects when removed', () => {
            let obj = new Events();

            let f1 = () => {};
            let f2 = () => {};
            let f3 = () => {};
            let f4 = () => {};
            obj._addElementEvent(li, 'event', f1);
            obj._addElementEvent(li, 'event1', f2);
            obj._addElementEvent(li, 'event1', f3);
            obj._addElementEvent(li, 'event1', f4);
            obj._removeElementEvents(li, 'event1');
            
            let elm = obj._getElement(li);
            expect(elm.events.length).to.equal(1);

            expect(elm.events[0].handler).to.equal(f1);
        });

        it('should not contain passed element-objects with specified handler function when removed', () => {
            let obj = new Events();

            let f1 = () => {};
            let f2 = () => {};
            let f3 = () => {};
            let f4 = () => {};
            obj._addElementEvent(li, 'event', f1);
            obj._addElementEvent(li, 'event1', f2);
            obj._addElementEvent(li, 'event1', f3);
            obj._addElementEvent(li, 'event1', f4);

            obj._removeElementEvents(li, 'event1', f4);
            
            let elm = obj._getElement(li);
            expect(elm.events.length).to.equal(3);

            expect(elm.events[0].handler).to.equal(f1);
            expect(elm.events[1].handler).to.equal(f2);
            expect(elm.events[2].handler).to.equal(f3);
        });
        
    });


    describe('_createAndDispatchEvent', () => {
        
        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj._createAndDispatchEvent();
            }).to.throw();
            expect( () => {
                obj._createAndDispatchEvent('badparam');
            }).to.throw();
            expect( () => {
                obj._createAndDispatchEvent(li, false);
            }).to.throw();
            expect( () => {
                obj._createAndDispatchEvent(li, false, () => {});
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            let obj = new Events();

            expect(() => {
                obj._createAndDispatchEvent(li, 'eventName', true);
            }).to.not.throw();

            expect(() => {
                obj._createAndDispatchEvent(li, 'eventName', 'hello');
            }).to.not.throw();
        });

        it('should trigger event', () => {
            let sinon = require('sinon'),
                obj = new Events(),
                spy = sinon.spy();
                
            li.addEventListener('hello', spy);
            obj._createAndDispatchEvent(li, 'hello');
            expect(spy.called).to.be.true;
        });
        
    });


    describe('onFirst', () => {
        
        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj.onFirst();
            }).to.throw();
            expect( () => {
                obj.onFirst('badparam');
            }).to.throw();
            expect( () => {
                obj.onFirst(li, false);
            }).to.throw();
            expect( () => {
                obj.onFirst(li, false, () => {});
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }

            let obj = new Events(),
                nodeList = document.querySelectorAll('div');

            expect(() => {
                obj.onFirst(li, 'eventName', () => {});
            }).to.not.throw();
            
            expect(() => {
                obj.onFirst(nodeList, 'eventName', () => {});
            }).to.not.throw();
        });

        it('should call _addElementEventFirst for passed element', () => {
            let sinon = require('sinon');

            let obj = new Events(),
                spy = sinon.spy(obj, '_addElementEventFirst');

            obj.onFirst(li, 'eventName', () => {});
            expect(spy.calledOnce).to.be.true;
        });

        it('should call _addElementEventFirst for every passed element', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }
            let sinon = require('sinon');

            let obj = new Events(),
                nodeList = document.querySelectorAll('div'),
                spy = sinon.spy(obj, '_addElementEventFirst');

            obj.onFirst(nodeList, 'eventName', () => {});
            expect(spy.callCount).to.be.equal(5);
        });



        
    });


    describe('on', () => {
        
        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj.on();
            }).to.throw();
            expect( () => {
                obj.on('badparam');
            }).to.throw();
            expect( () => {
                obj.on(li, false);
            }).to.throw();
            expect( () => {
                obj.on(li, false, () => {});
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }

            let obj = new Events(),
                nodeList = document.querySelectorAll('div');

            expect(() => {
                obj.on(li, 'eventName', () => {});
            }).to.not.throw();
            
            expect(() => {
                obj.on(nodeList, 'eventName', () => {});
            }).to.not.throw();
        });

        it('should call _addElementEvent for passed element', () => {
            let sinon = require('sinon');

            let obj = new Events(),
                spy = sinon.spy(obj, '_addElementEvent');

            obj.on(li, 'eventName', () => {});
            expect(spy.calledOnce).to.be.true;
        });

        it('should call _addElementEvent for every passed element', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }
            let sinon = require('sinon');

            let obj = new Events(),
                nodeList = document.querySelectorAll('div'),
                spy = sinon.spy(obj, '_addElementEvent');

            obj.on(nodeList, 'eventName', () => {});
            expect(spy.callCount).to.be.equal(5);
        });
    });


    describe('off', () => {
        
        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj.off();
            }).to.throw();
            expect( () => {
                obj.off('badparam');
            }).to.throw();
            expect( () => {
                obj.off(li, false);
            }).to.throw();
            expect( () => {
                obj.off(li, 'hello', false);
            }).to.throw();
        });

        it('should not throw error: when good parameter', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }

            let obj = new Events(),
                nodeList = document.querySelectorAll('div');

            expect(() => {
                obj.off(li, 'eventName', () => {});
            }).to.not.throw();
            
            expect(() => {
                obj.off(nodeList, 'eventName', () => {});
            }).to.not.throw();
        });

        it('should call _removeElementEvents with passed handler for passed element', () => {
            let sinon = require('sinon');

            let obj = new Events(),
                spy = sinon.spy(obj, '_removeElementEvents');

            obj.off(li, 'eventName', () => {});
            expect(spy.calledOnce).to.be.true;
        });

        it('should call _removeElementEvents for passed element', () => {
            let sinon = require('sinon');

            let obj = new Events(),
                spy = sinon.spy(obj, '_removeElementEvents');
            obj.on(li, 'eventName', () => { });
            obj.off(li, 'eventName');
            expect(spy.calledOnce).to.be.true;
        });

        it('should call _removeElementEvents with passed handler for every passed element', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }
            let sinon = require('sinon');

            let obj = new Events(),
                nodeList = document.querySelectorAll('div'),
                spy = sinon.spy(obj, '_removeElementEvents');

            obj.off(nodeList, 'eventName', () => {});
            expect(spy.callCount).to.be.equal(5);
        });

        it('should call _removeElementEvents for every passed element', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }
            let sinon = require('sinon');

            let obj = new Events(),
                nodeList = document.querySelectorAll('div'),
                spy = sinon.spy(obj, '_removeElementEvents');
            obj.on(nodeList, 'eventName', () => {});
            obj.off(nodeList, 'eventName');
            expect(spy.callCount).to.be.equal(5);
        });
    });


    describe('trigger', () => {
        
        it('should throw error: when bad parameters', () => {
            let obj = new Events();

            expect( () => {
                obj.trigger();
            }).to.throw();
            expect( () => {
                obj.trigger('badparam');
            }).to.throw();
            expect( () => {
                obj.trigger(li, false);
            }).to.throw();

        });

        it('should not throw error: when good parameter', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }

            let obj = new Events(),
                nodeList = document.querySelectorAll('div');

            expect(() => {
                obj.trigger(li, 'eventName', 'some data');
            }).to.not.throw();
            
            expect(() => {
                obj.trigger(nodeList, 'eventName');
            }).to.not.throw();

        });

        it('should call _createAndDispatchEvent for passed element', () => {
            let sinon = require('sinon');

            let obj = new Events(),
                spy = sinon.spy(obj, '_createAndDispatchEvent');

            obj.trigger(li, 'eventName');
            expect(spy.calledOnce).to.be.true;
        });

        it('should call _removeElementEvents for every passed element', () => {
            // Karma creates this global __html__ property that will hold all
            // of our HTML so we can populate the body during our tests
            if (window.__html__) {
                document.body.innerHTML = window.__html__['./events.spec.html'];
            }
            let sinon = require('sinon');

            let obj = new Events(),
                nodeList = document.querySelectorAll('div'),
                spy = sinon.spy(obj, '_createAndDispatchEvent');

            obj.trigger(nodeList, 'eventName');
            expect(spy.callCount).to.be.equal(5);
        });
    });


});
