import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError, Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
    let repository: CategoryInMemoryRepository;
    let useCase: DeleteCategoryUseCase;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new DeleteCategoryUseCase(repository);
    });

    it("should throws error if category does not exist", async () => {
        await expect(useCase.execute({ id: "invalid-id" })).rejects.toThrow(new InvalidUuidError());
    
        const uuid = new Uuid().id;

        await expect(useCase.execute({ id: uuid })).rejects.toThrow(new NotFoundError(uuid, Category));
    });

    it("should delete a category", async () => {
        const items = [new Category({ name: "test 1" })]
        repository.items = items;
        
        await useCase.execute({ id: items[0].category_id.id });
        expect(repository.items).toHaveLength(0);
    })
});
