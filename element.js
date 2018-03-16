import ElementEvent from './element-event';
import ObjectValidation from 'object-validation/dist/object-validation';

/**
 * An object containing a this.window.HTMLElement and all events bound to the element
 * 
 * @class Element
 */
export default class Element {
    /**
     * Creates an instance of Element.
     * @param {!this.window.HTMLElement} element 
     * @param {ElementEvent[]} [events]
     * 
     * @memberOf Element
     */
    constructor(element, events, _window=window) {
        this.window = _window;
        new ObjectValidation(element).isNotNullOrUndefined().isInstanceOf([this.window.HTMLElement, this.window.Window]);
        new ObjectValidation(events).isArrayOnlyContainingTypesOf(ElementEvent);

        this._element = element;
        this._events = events ? events : [];
    }
    /**
     * The this.window.HTMLElement 
     * 
     * @readonly
     * @returns {this.window.HTMLElement}
     * 
     * @memberOf Element
     */
    get element() {
        return this._element;
    }

    /**
     * An array of events bound to the element
     * 
     * @readonly
     * @returns {ElementEvent[]}
     * 
     * @memberOf Element
     */
    get events() {
        return this._events;
    }
    
    /**
     * Gets all events bound to the element filtered by the name of the event and optionally filtered by the callback-function
     * 
     * @param {!string} eventName
     * @param {function} [handler]
     * @returns {ElementEvent[]}
     * 
     * @memberOf Element
     */
    getEvents(eventName, handler) {
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isTypeOf(Function);

        return this.events.filter((e) => {
            return e.type === eventName && (!handler || e.handler === handler);
        });
    }
    /**
     * Adds an {ElementEvent} object first to the list of events
     * 
     * @param {!ElementEvent} event - The event to add
     * 
     * @memberOf Element
     */
    // addEventFirst(event) {
    //     new ObjectValidation(event).isNotNullOrUndefined().isTypeOf(ElementEvent);
    // }
    
    /**
     * Adds an {ElementEvent} object to the list of events
     * 
     * @param {!ElementEvent} event - The event to add
     * 
     * @memberOf Element
     */
    addEvent(event) {
        new ObjectValidation(event).isNotNullOrUndefined().isTypeOf(ElementEvent);

        this.events.push(event);
    }
    /**
     * Remove all {ElementEvent} objects specified by the name of the event and optionally by the supplied handler-function.
     * 
     * @param {!string} eventName - The name of the event that should be removed
     * @param {function} [handler] - (optional) Only remove events with the specified handler function
     * 
     * @memberOf Element
     */
    removeEvents(eventName, handler) {
        new ObjectValidation(eventName).isNotNullOrUndefined().isTypeOf(String);
        new ObjectValidation(handler).isTypeOf(Function);

        let evtsToRemove = this.getEvents(eventName, handler),
            evtsToKeep = this.events.filter((x) => {
                return evtsToRemove.indexOf(x) === -1;
            });
        this._events = evtsToKeep;
    }
}
