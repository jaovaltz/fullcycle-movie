import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import {
    InvalidUuidError,
    Uuid
} from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../../domain/category.entity";
import { CategorySearchResult } from "../../../../domain/category.repository";
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { CategoryOutputMapper } from "../../common/category-output";
import { GetCategoryUseCase } from "../../get-category.use-case";
import { ListCategoriesUseCase } from "../../list-categories.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
    let repository: CategoryInMemoryRepository;
    let useCase: ListCategoriesUseCase;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new ListCategoriesUseCase(repository);
    });

    it("should throws error when entity uuid is invalid", async () => {
        let result = new CategorySearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 10
        });

        let output = await useCase['toOutput'](result);
        expect(output.items).toEqual([]);

        const entity = Category.create({ name: 'Movie 1' });
        result = new CategorySearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 10
        });

        output = await useCase['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity].map(CategoryOutputMapper.toOutput),
            total: 1,
            current_page: 1,
            last_page: 1,
            per_page: 10
        })
    })
})