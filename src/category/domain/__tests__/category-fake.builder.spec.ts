import { Chance } from "chance";
import { CategoryFakeBuilder } from "../category-fake.builder";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";

describe("CategoryFakeBuilder Unit Tests", () => {
  describe("category_id prop", () => {
    const faker = CategoryFakeBuilder.aCategory();

    test("should throw error when any with methods is called", () => {
      expect(() => faker.category_id).toThrow(
        new Error("Property category_id not have a factory, use 'with' methods")
      );
    });

    test("should be undefined", () => {
      expect(faker["_category_id"]).toBeUndefined();
    });
  });

  describe("name prop", () => {
    const faker = CategoryFakeBuilder.aCategory();

    test("should pass index to name factory", () => {
      faker.withName((index) => `name-${index}`);
      const category = faker.build();
      expect(category.name).toBe("name-0");

      const fakerMany = CategoryFakeBuilder.theCategories(3);
      fakerMany.withName((index) => `name-${index}`);
      const categories = fakerMany.build();
      expect(categories[0].name).toBe("name-0");
      expect(categories[1].name).toBe("name-1");
      expect(categories[2].name).toBe("name-2");
    });
  });
});
