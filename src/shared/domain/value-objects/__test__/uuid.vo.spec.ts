import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from 'uuid';

describe("UUID Value Object Unit Tests", () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

    test("should throw error when uuid is invalid", () => {
        const invalidUuid = "invalid-uuid";
        expect(() => new Uuid(invalidUuid))
            .toThrowError(InvalidUuidError);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
    test("should create a valid uuid", () => {;
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBe(true);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
    test("should create a valid uuid with a given value", () => {
        const validUuid = "550e8400-e29b-41d4-a716-446655440000";
        const uuid = new Uuid(validUuid);
        expect(uuid.id).toBe(validUuid);
    })

})