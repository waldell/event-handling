import Element from './element';
import ElementEvent from './element-event';
import ObjectValidation from 'object-validation/dist/object-validation';

/**
 * Main object containing elements and their events
 * 
 * @class Events
 */
export default class Events {
    /**
     * Creates an instance of Events.
     * 
     * @memberOf Events
     */
    constructor(_window=window) {
        this.window = _window;
        this._elements = [];
    }
    
    get elements() {
        return this._elements;
    }

    /**
     * Returns a Element object by a HTMLElement object
     * 
     * @param {!HTMLElement} element - The {HTMLElement} object that represents the {Element}
     * @returns {Element} - The {Element} object for the supplied {HTMLElement}
     * 
     * @memberOf Events
     */
    _getElement(element) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);
        return this.elements.find((e) => {
            return e.element === element;
        });
    }
    
    /**
     * Creates and returns a {Element} object and adds it to the elements-array (if it doesn't exist)
     * 
     * @param {!HTMLElement} element - The {HTMLElement} to create a {Element} of
     * @returns {Element} - The {Element} in the elements-array
     * 
     * @memberOf Events
     */
    _createElementIfNotExists(element) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);

        let elm = this._getElement(element);
        if (!elm) {
            elm = new Element(element, null, this.window);
            this.elements.push(elm);
        }
        return elm;
    }

    /**
     * Adds an event to a {HTMLElement} element
     * 
     * @param {!HTMLElement} element - The {HTMLElement} to add a {Element} and {ElementEvent} for
     * @param {!string} eventName - The name of the event to add
     * @param {!function} handler - The handler-function to call when the event is triggered.
     * 
     * @memberOf Events
     */
    _addElementEvent(element, eventName, handler) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isNotNullOrUndefined().isTypeOf(Function);

        let elm = this._createElementIfNotExists(element);
        elm.addEvent(new ElementEvent(eventName, handler));
    }

    /**
     * Adds an event to a {HTMLElement} element and adds it before the other events with the same eventName
     * 
     * @param {!HTMLElement} element - The {HTMLElement} to add a {Element} and {ElementEvent} for
     * @param {!string} eventName - The name of the event to add
     * @param {!function} handler - The handler-function to call when the event is triggered.
     * 
     * @memberOf Events
     */
    _addElementEventFirst(element, eventName, handler) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isNotNullOrUndefined().isTypeOf(Function);

        let elm = this._createElementIfNotExists(element),
            evts = elm.getEvents(eventName);
        
        // Remove all event handlers
        evts.forEach((e, i) => {
            this.off(element, e.type, e.handler);
        });

        // Bind the new event passed to this function
        this.on(element, eventName, handler);

        // Bind the removed events again but now after the newly created event    
        evts.forEach((e, i) => {
            this.on(element, e.type, e.handler);
        });
    }

    /**
     * Removes the {ElementEvent} in a {Element} by eventName and optionally by the handler-function
     * 
     * @param {!HTMLElement} element - The element to remove the events from
     * @param {!string} eventName - The name of the event that should be removed
     * @param {function} [handler] - (optional) When specified, only removes the event's that has the passed handler-function
     * 
     * @memberOf Events
     */
    _removeElementEvents(element, eventName, handler) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isTypeOf(Function);

        let elm = this._getElement(element);
        if (elm) {
            elm.removeEvents(eventName, handler);
        }
    }

    /**
     * Creates and dispatches an event on the specified element with optional data attached to the event
     * 
     * @param {!HTMLElement} element - The element to trigger the event on
     * @param {!string} eventName - The name of the event to trigger
     * @param {any} [detail] - (optional) Pass a parameter with the event
     * 
     * @memberOf Events
     */
    _createAndDispatchEvent(element, eventName, detail) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);

        let event = new this.window.CustomEvent(eventName, {
            cancelable: true,
            bubbles: false,
            detail: detail
        });
        
        // OK, Let me explain this code before you make any conclusions about it or maybe even me.
        // Firefox differs in it's behaviour from all other browsers in the way that you cannot trigger events on disabled element.
        // Because of this, our entire initalization of events in  does not work, meaning that disabled elements cannot be initialized.
        // The solution here is to enable the element, trigger the event and then disable it again.
        // Here is a support-question I asked, which did not result in anything meaningful:
        // https://stackoverflow.com/questions/49065256/dispatch-customevent-on-disabled-dom-element?answertab=votes#tab-top
        let isDisabled = false;
        if (element.hasAttribute) {
            isDisabled = element.hasAttribute('disabled');
            element.removeAttribute('disabled');
        }
        if (isDisabled) {
            setTimeout(() => {
                element.dispatchEvent(event);
                if (element.hasAttribute && isDisabled) {
                    element.setAttribute('disabled', true);
                }
            }, 1);
        } else {
            element.dispatchEvent(event);
        }
    }

    /**
     * Adds a event-handler as the first to trigger for the specified element 
     * 
     * @param {!HTMLElement|this.window.Window|NodeList} element - The {HTMLElement} to bind the event to
     * @param {!string} eventName - The name of the event
     * @param {!function} handler - The handler-function to run when the event it dispatched
     * 
     * @memberOf Events
     */
    onFirst(element, eventName, handler) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window, this.window.NodeList]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isNotNullOrUndefined().isTypeOf(Function);

        if (element.constructor === this.window.NodeList) {
            for (let e of element) {
                this._addElementEventFirst(e, eventName, handler);
            }
        } else {
            this._addElementEventFirst(element, eventName, handler);
        }
    }

    /**
     * Adds a event-handler for the specified element 
     * 
     * @param {!HTMLElement} element - The {HTMLElement} to bind the event to
     * @param {!string} eventName - The name of the event
     * @param {!function} handler - The handler-function to run when the event it dispatched
     * 
     * @memberOf Events
     */
    on(element, eventName, handler) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window, this.window.NodeList]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isNotNullOrUndefined().isTypeOf(Function);

        if (element.constructor === this.window.NodeList) {
            for (let e of element) {
                e.addEventListener(eventName, handler);
                this._addElementEvent(e, eventName, handler);
            }
        } else {
            element.addEventListener(eventName, handler);
            this._addElementEvent(element, eventName, handler);
        }
    }

    /**
     * Removes event-handler's for the specified element 
     * 
     * @param {!HTMLElement} element - The {HTMLElement} to remove the event from
     * @param {!string} eventName - The name of the event to remove
     * @param {function} [handler] - (optional) When specified, only removes the events with the specified handler-function
     * 
     * @memberOf Events
     */
    off(element, eventName, handler) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window, this.window.NodeList]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isTypeOf(Function);

        if (element.constructor === this.window.NodeList) {
            for (let e of element) {
                if (handler) {
                    e.removeEventListener(eventName, handler);
                    this._removeElementEvents(e, eventName, handler);
                } else {
                    let Element = this._getElement(e);
                    if (Element) {
                        let ElementEvents = Element.getEvents(eventName);
    
                        for (let x of ElementEvents) {
                            e.removeEventListener(eventName, x.handler);
                        }
                        this._removeElementEvents(e, eventName);
                    }
                }
            }
        } else {
            if (handler) {
                element.removeEventListener(eventName, handler);
                this._removeElementEvents(element, eventName, handler);
            } else {
                let Element = this._getElement(element);

                if (Element) {
                    let ElementEvents = Element.getEvents(eventName);
                    
                    for (let x of ElementEvents) {
                        element.removeEventListener(eventName, x.handler);
                    }
                    this._removeElementEvents(element, eventName);
                }
            }
            
        }
    }

    /**
     * Dispatches an event on the specified element with optional data attached to the event
     * 
     * @param {!HTMLElement} element - The element to trigger the event on
     * @param {!string} eventName - The name of the event to trigger
     * @param {any} [detail] - (optional) Pass a parameter with the event
     * 
     * @memberOf Events
     */
    trigger(element, eventName, detail) {
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window, this.window.NodeList]);
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        
        if (element.constructor === this.window.NodeList) {
            for (let e of element) {
                this._createAndDispatchEvent(e, eventName, detail);
            }
        } else {
            this._createAndDispatchEvent(element, eventName, detail);
        }
    }
}
