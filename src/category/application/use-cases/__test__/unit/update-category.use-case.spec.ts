import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import {
    InvalidUuidError,
    Uuid
} from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { UpdateCategoryUseCase } from "../../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
    let repository: CategoryInMemoryRepository;
    let useCase: UpdateCategoryUseCase;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase(repository);
    });

    it("should throws error when entity uuid is invalid", async () => {
        await expect(useCase.execute({
            id: "fake id",
            name: "Category 1",
        })).rejects.toThrow(new InvalidUuidError());
    })

    it("should throws error when entity not found", async () => {

        const uuid = new Uuid().id;

        await expect(useCase.execute({
            id: uuid,
            name: "Category 1",
        })).rejects.toThrow(new NotFoundError(uuid, Category));
    })

    it("should update a category", async () => {
        const entity = Category.create({
            name: "Category 1",
            description: "Category 1 description",
            is_active: true
        });

        await repository.insert(entity);

        const uuid = entity.category_id.id;

        const updated = await useCase.execute({
            id: uuid,
            name: "Category 1 updated",
            description: "Category 1 description updated",
            is_active: false
        });

        expect(updated.id).toBe(uuid);
        expect(updated.name).toBe("Category 1 updated");
        expect(updated.description).toBe("Category 1 description updated");
        expect(updated.is_active).toBeFalsy();
    })


})