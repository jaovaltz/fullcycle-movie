import { Category } from "../../../domain/category.entity";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  it("should no filter items when filter object is null", async () => {
    const items = [Category.create({ name: "test" })];
    const filterSpy = jest.spyOn(items, "filter" as any);

    const itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter parameter", async () => {
    const items = [
      Category.create({ name: "test" }),
      Category.create({ name: "test2" }),
    ];

    const itemsFiltered = await repository["applyFilter"](items, "test2");
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });

  it("should sort by name", async () => {
    const items = [
      Category.create({ name: "test" }),
      Category.create({ name: "test3" }),
      Category.create({ name: "test2" }),
    ];

    const itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[1], items[2], items[0]]);
  });

  it("should sort by created_at", async () => {
    const items = [
      Category.create({ name: "test", created_at: new Date("2021-01-01") }),
      Category.create({ name: "test3", created_at: new Date("2021-01-03") }),
      Category.create({ name: "test2", created_at: new Date("2021-01-02") }),
    ];

    const itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[1], items[2], items[0]]);
  });
});
