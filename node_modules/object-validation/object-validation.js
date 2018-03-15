import ObjectValidation from './object-validation';

export default class ObjectValidaton {
    constructor(object) {
        this.object = object;
    }
    /**
     * Validation to not allow null value
     * 
     * @param {string} [message='Object cannot be null'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error then value is null
     * 
     * @memberOf ObjectValidaton
     */
    isNotNull(message='Object cannot be null') {
        if (this.object === null) {
            throw message;
        }
        return this;
    }

    /**
     * Validation to not allow undefined value
     * 
     * @param {string} [message='Object cannot be undedined'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error then value is undefined
     * 
     * @memberOf ObjectValidaton
     */
    isNotUndefined(message='Object cannot be undedined') {
        if (this.object === undefined) {
            throw message;
        }
        return this;
    }

    /**
     * Validation to not allow null OR undefined value
     * 
     * @param {string} [message='Object cannot be null or undefined'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error then value is null OR undefined
     * 
     * @memberOf ObjectValidaton
     */
    isNotNullOrUndefined(message='Object cannot be null or undedined') {
        if (this.object === null || this.object === undefined) {
            throw message;
        }
        return this;
    }

    /**
     * Validation to check if a value is of given type(s)
     * 
     * @param {any|any[]} types 
     * @param {string} [message='Object must be of type {types}'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error if the object is not of the supplied type(s)
     * 
     * @memberOf ObjectValidaton
     */
    isTypeOf(types, message='Object must be of type {types}') {
        if (types.constructor !== Array) {
            types = [types];
        }
        if (this.object !== null && this.object !== undefined && types.indexOf(this.object.constructor) === -1) {
            let typesStr = types.map((x) => { return x.name; }).join('|');
            throw message.replace('{types}', typesStr);
        }
        return this;
    }

    /**
     * Validation to check if a value is of given base type(s)
     * 
     * @param {any|any[]} baseTypes 
     * @param {string} [message='Object must have a base type of {types}'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error if value is not of given base type(s)
     * 
     * @memberOf ObjectValidaton
     */
    isInstanceOf(baseTypes, message='Object must have a base type of {types}') {
        if (baseTypes.constructor !== Array) {
            baseTypes = [baseTypes];
        }
        if (this.object !== null && this.object !== undefined) {
            let found = baseTypes.find((x) => {
                return this.object instanceof x;
            });
            if (!found) {
                let types = baseTypes.map((x) => { return x.name; }).join('|');
                throw message.replace('{types}', types);
            }
        }
        return this;
    }

    /**
     * Validation to check if all objects in an array is of the given type(s)
     * 
     * @param {any} types 
     * @param {string} [message='Object must be an array only containing objects of type {types}'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error then not all items in the array are of the given type(s)
     * 
     * @memberOf ObjectValidaton
     */
    isArrayOnlyContainingTypesOf(types, message='Object must be an array only containing objects of type {types}') {
        if (this.object && this.isTypeOf(Array) && !this.object.every((x) => {
            try {
                new ObjectValidation(x).isTypeOf(types);
            } catch(ex) {
                return false;
            }
            return true;
        })) {
            let typeStr = types.map((x) => { return x.name; }).join('|');
            throw message.replace('{types}', typeStr);
        }

        return this;
    }

    /**
     * Validation to check if all objects in an array is of the given base type(s)
     * 
     * @param {any} types 
     * @param {string} [message='Object must be an array only containing objects that have a base type of {types}'] 
     * @returns {ObjectValidation}
     * @throws {Error} throws an error then not all items in the array are of the given base type(s)
     * 
     * @memberOf ObjectValidaton
     */
    isArrayOnlyContainingInstancesOf(types, message='Object must be an array only containing objects that have a base type of {types}') {
        if (this.object && this.isTypeOf(Array) && !this.object.every((x) => {
            try {
                new ObjectValidation(x).isInstanceOf(types);
            } catch(ex) {
                return false;
            }
            return true;
        })) {
            let typeStr = types.map((x) => { return x.name; }).join('|');
            throw message.replace('{types}', typeStr);
        }

        return this;
    }
}
