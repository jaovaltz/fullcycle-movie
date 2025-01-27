import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import {
    InvalidUuidError,
    Uuid
} from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { GetCategoryUseCase } from "../../get-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
    let repository: CategoryInMemoryRepository;
    let useCase: GetCategoryUseCase;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new GetCategoryUseCase(repository);
    });

    it("should throws error when entity uuid is invalid", async () => {
        await expect(useCase.execute({
            id: "fake id",
        })).rejects.toThrow(new InvalidUuidError());
    })

    it("should throws error when entity not found", async () => {

        const uuid = new Uuid().id;

        await expect(useCase.execute({
            id: uuid,
        })).rejects.toThrow(new NotFoundError(uuid, Category));
    })

    it("should get a category", async () => {
        const entity = Category.create({
            name: "Category 1",
            description: "Category 1 description",
            is_active: true
        });

        await repository.insert(entity);

        const uuid = entity.category_id.id;

        const category = await useCase.execute({
            id: uuid,
        });

        expect(category.id).toBe(uuid);
        expect(category.name).toBe("Category 1");
        expect(category.description).toBe("Category 1 description");
        expect(category.is_active).toBeTruthy();
    })
})