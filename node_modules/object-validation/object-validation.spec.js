import ObjectValidation from './object-validation';

import { expect } from 'chai';

class D { }
class C { constructor() { } }
class B extends C { constructor() { super(); } }
class A extends B { constructor() { super(); } }

describe('Object validation', function () {

    describe('isNotNull', function () {

        it('isNotNull: should pass validation', function () {
            expect(() => {
                new ObjectValidation().isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(undefined).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('').isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('hello').isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('').isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(0).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(-100).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(true).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(false).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({}).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({ a: 'b', b: 1 }).isNotNull();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({ a: 'b', b: 1 }).isNotNull();
            }).to.not.throw();

        });
        it('isNotNull: should not pass validation', function () {
            expect(() => {
                new ObjectValidation(null).isNotNull();
            }).to.throw();
        });

    });

    describe('isNotUndefined', function () {
        
        it('isNotUndefined: should pass validation', function () {
            expect(() => {
                new ObjectValidation(null).isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('').isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('hello').isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('').isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(0).isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(-100).isNotUndefined();
            }).to.not.throw();

            expect(() => {

                new ObjectValidation(true).isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(false).isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({}).isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({ a: 'b', b: 1 }).isNotUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({ a: 'b', b: 1 }).isNotUndefined();
            }).to.not.throw();
            
        });
        it('isNotUndefined: should not pass validation', function () {

            expect(() => {
                new ObjectValidation().isNotUndefined();
            }).to.throw();

            expect(() => {
                new ObjectValidation(undefined).isNotUndefined();
            }).to.throw();
        });

    });

    describe('isNotNullOrUndefined', function () {
        
        it('isNotNullOrUndefined: should pass validation', function () {
            expect(() => {
                new ObjectValidation('').isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('hello').isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation('').isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(0).isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(-100).isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {

                new ObjectValidation(true).isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(false).isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({}).isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({ a: 'b', b: 1 }).isNotNullOrUndefined();
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({ a: 'b', b: 1 }).isNotNullOrUndefined();
            }).to.not.throw();
            
        });
        it('isNotNullOrUndefined: should not pass validation', function () {
            expect(() => {
                new ObjectValidation().isNotNullOrUndefined();
            }).to.throw();
            expect(() => {
                new ObjectValidation(undefined).isNotNullOrUndefined();
            }).to.throw();
            expect(() => {
                new ObjectValidation(null).isNotNullOrUndefined();
            }).to.throw();
        });

    });

    describe('isTypeOf', function () {
        
        it('isTypeOf: should pass validation', function () {
            expect(() => {
                new ObjectValidation('').isTypeOf(String);
                new ObjectValidation('Hello World!!!').isTypeOf([String,Boolean,Number]);
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(function() {}).isTypeOf(Function);
                new ObjectValidation(function() {}).isTypeOf([Function, String]);
                new ObjectValidation(() => {}).isTypeOf(Function);
                new ObjectValidation(() => {}).isTypeOf([Function, String]);
            }).to.not.throw();

            expect(() => {
                new ObjectValidation({}).isTypeOf(Object);
                new ObjectValidation({}).isTypeOf([Object, Boolean]);
                new ObjectValidation({a: 'b'}).isTypeOf(Object);
                new ObjectValidation({a: 'b'}).isTypeOf([Object, Boolean]);
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(0).isTypeOf(Number);
                new ObjectValidation(0).isTypeOf([Number,String,Boolean]);
                new ObjectValidation(1).isTypeOf(Number);
                new ObjectValidation(1).isTypeOf([Number,String,Boolean]);
                new ObjectValidation(-1).isTypeOf(Number);
                new ObjectValidation(-1).isTypeOf([Number,String,Boolean]);
                new ObjectValidation(111.222).isTypeOf(Number);
                new ObjectValidation(111.222).isTypeOf([Number,String,Boolean]);
            }).to.not.throw();

            expect(() => {
                new ObjectValidation(true).isTypeOf(Boolean);
                new ObjectValidation(false).isTypeOf([Boolean, String]);
            }).to.not.throw();

            expect(() => {
                new ObjectValidation([]).isTypeOf(Array);
                new ObjectValidation([]).isTypeOf([Array, String]);
                new ObjectValidation(['a','b','c']).isTypeOf(Array);
                new ObjectValidation(['a','b','c']).isTypeOf([Array, String]);
                new ObjectValidation(new Array()).isTypeOf(Array);
                new ObjectValidation(new Array()).isTypeOf([Array, String]);
                new ObjectValidation(new Array([1,2,3])).isTypeOf(Array);
                new ObjectValidation(new Array([1,2,3])).isTypeOf([Array, String]);
            }).to.not.throw();
            
        });
        it('isTypeOf: should not pass validation', function () {
            expect(() => {
                new ObjectValidation('').isTypeOf(Boolean);
            }).to.throw();
            expect(() => {
                new ObjectValidation('Hello World!!!').isTypeOf([Boolean,Number]);
            }).to.throw();

            expect(() => {
                new ObjectValidation(function() {}).isTypeOf(Object);
            }).to.throw();
            expect(() => {
                new ObjectValidation(function() {}).isTypeOf([Object, String]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(() => {}).isTypeOf(Object);
            }).to.throw();
            expect(() => {
                new ObjectValidation(() => {}).isTypeOf([Object, String]);
            }).to.throw();

            expect(() => {
                new ObjectValidation({}).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation({}).isTypeOf([String, Boolean]);
            }).to.throw();
            expect(() => {
                new ObjectValidation({a: 'b'}).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation({a: 'b'}).isTypeOf([String, Boolean]);
            }).to.throw();

            expect(() => {
                new ObjectValidation(0).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation(0).isTypeOf([String,Boolean]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(1).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation(1).isTypeOf([String,Boolean]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(-1).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation(-1).isTypeOf([String,Boolean]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(111.222).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation(111.222).isTypeOf([String,Boolean]);
            }).to.throw();

            expect(() => {
                new ObjectValidation(true).isTypeOf(String);
            }).to.throw();
            expect(() => {
                new ObjectValidation(false).isTypeOf([Number, String]);
            }).to.throw();

            expect(() => {
                new ObjectValidation([]).isTypeOf(Number);
            }).to.throw();
            expect(() => {
                new ObjectValidation([]).isTypeOf([Number, String]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(['a','b','c']).isTypeOf(Number);
            }).to.throw();
            expect(() => {
                new ObjectValidation(['a','b','c']).isTypeOf([Number, String]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(new Array()).isTypeOf(Number);
            }).to.throw();
            expect(() => {
                new ObjectValidation(new Array()).isTypeOf([Number, String]);
            }).to.throw();
            expect(() => {
                new ObjectValidation(new Array([1,2,3])).isTypeOf(Number);
            }).to.throw();
            expect(() => {
                new ObjectValidation(new Array([1,2,3])).isTypeOf([Number, String]);
            }).to.throw();
        });

    });

    describe('isInstanceOf', function () {
        
        it('isInstanceOf: should pass validation', function () {
            expect(() => {
                new ObjectValidation(new A()).isInstanceOf(A);
                new ObjectValidation(new A()).isInstanceOf(B);
                new ObjectValidation(new A()).isInstanceOf(C);
            }).to.not.throw();
            
        });
        it('isInstanceOf: should not pass validation', function () {
            expect(() => {
                new ObjectValidation(new A()).isInstanceOf(D);
            }).to.throw();
        });

    });

        
    describe('isArrayOnlyContainingTypesOf', function () {
        
        it('isArrayOnlyContainingTypesOf: should pass validation', function () {
            expect(() => {
                new ObjectValidation(['hello', 'hej', 'hola']).isArrayOnlyContainingTypesOf(String);
                new ObjectValidation(['hello', 'hej', 'hola']).isArrayOnlyContainingTypesOf([String, Number]);
                new ObjectValidation(['hello', 'hej', 1]).isArrayOnlyContainingTypesOf([String, Number]);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingTypesOf(A);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingTypesOf([A, String]);
            }).to.not.throw();
            
        });
        it('isArrayOnlyContainingTypesOf: should not pass validation', function () {

            expect(() => {
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingTypesOf(D);
            }).to.throw();

            expect(() => {
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingTypesOf([D, String]);
            }).to.throw();

            expect(() => {
                new ObjectValidation([new A(), new B()]).isArrayOnlyContainingTypesOf([A, D]);
            }).to.throw();

            expect(() => {
                new ObjectValidation([new A(), new B()]).isArrayOnlyContainingTypesOf(A);
            }).to.throw();
        });

    });

    

    describe('isArrayOnlyContainingInstancesOf', function () {
        
        it('isArrayOnlyContainingInstancesOf: should pass validation', function () {
            expect(() => {
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf(A);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf(B);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf(C);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf([A, B]);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf([A, C]);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf([B, C]);
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf([A, B, C]);
            }).to.not.throw();
        });
        it('isArrayOnlyContainingInstancesOf: should not pass validation', function () {

            expect(() => {
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf(D);
            }).to.throw();

            expect(() => {
                new ObjectValidation([new A(), new A()]).isArrayOnlyContainingInstancesOf([D, String]);
            }).to.throw();

            expect(() => {
                new ObjectValidation([new A(), new B()]).isArrayOnlyContainingInstancesOf([A, D]);
            }).to.throw();

            expect(() => {
                new ObjectValidation([new A(), new B()]).isArrayOnlyContainingInstancesOf(A);
            }).to.throw();

        });
    });


});

