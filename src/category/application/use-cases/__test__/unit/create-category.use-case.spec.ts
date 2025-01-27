import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { CreateCategoryUseCase } from "../../create-category.use-case";

describe("CreateCategoryUseCase Unit Tests", () => {
    let useCase: CreateCategoryUseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new CreateCategoryUseCase(repository);
    });

    it("should create a new category", async () => {
        const spyInsert = jest.spyOn(repository, "insert");

        await useCase.execute({
            name: "Category 1",
            description: "Category 1 description",
            is_active: true
        });

        expect(spyInsert).toHaveBeenCalledTimes(1);

        const categories = await repository.findAll();
        expect(categories).toHaveLength(1);
        expect(categories[0].name).toBe("Category 1");
        expect(categories[0].description).toBe("Category 1 description");
        expect(categories[0].is_active).toBeTruthy();

        spyInsert.mockRestore();
    });
})