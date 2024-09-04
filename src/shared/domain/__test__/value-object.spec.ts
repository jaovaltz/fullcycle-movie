import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
    constructor(readonly value: string) {
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly value1: string, readonly value2: number) {
        super();
    }
}

describe("ValueObject Unit Tests", () => {

    test("should be equals", () => {
        const valueObject1 = new StringValueObject("test");
        const valueObject2 = new StringValueObject("test");
        expect(valueObject1.equals(valueObject2)).toBeTruthy();

        const complexValueObject1 = new ComplexValueObject("test", 1);
        const complexValueObject2 = new ComplexValueObject("test", 1);
        expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
    })
})