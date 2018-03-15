import ObjectValidation from 'object-validation/dist/object-validation';

/**
 * An object holding information, relevant for a ES6 native CustomEvent object
 * 
 * @class ElementEvent
 */
export default class ElementEvent {

    /**
     * Creates an instance of ElementEvent
     * @param {!string} type - The name of the event to be added
     * @param {!function} handler - The handler function that should be called when the event is fired
     * @param {boolean} [once=false] - A {boolean} indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
     * @param {boolean} [passive=false] - A {boolean} indicating that the listener will never call preventDefault(). If it does, the user agent should ignore it and generate a console warning.
     * @param {boolean} [capture=false] - A {boolean} indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     * 
     * @memberOf ElementEvent
     */
    constructor(type, handler, once=false, passive=false, capture=false) {
        new ObjectValidation(type).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isNotNullOrUndefined().isTypeOf(Function);
        new ObjectValidation(once).isTypeOf(Boolean);
        new ObjectValidation(passive).isTypeOf(Boolean);
        new ObjectValidation(capture).isTypeOf(Boolean);

        this._type = type;
        this._handler = handler;
        this._once = once;
        this._passive = passive;
        this._capture = capture;
    }

    get type() { 
        return this._type; 
    }
    get handler() { 
        return this._handler; 
    }
    get once() { 
        return this._once; 
    }
    get passive() { 
        return this._passive; 
    }
    get capture() { 
        return this._capture; 
    }
}
