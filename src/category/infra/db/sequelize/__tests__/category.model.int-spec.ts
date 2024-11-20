import { CategoryModel } from "../category.model";
import { Category } from "../../../../domain/category.entity";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe("CategoryModel Integration Tests", () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: CategorySequelizeRepository;

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  test("should insert a new category", async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);

    const model = await CategoryModel.findByPk(category.category_id.id);

    expect(model).not.toBeNull();
  });

  test("should bulk insert categories", async () => {
    const categories = Category.fake().theCategories(2).build();
    await repository.bulkInsert(categories);

    const models = await CategoryModel.findAll();

    expect(models).toHaveLength(2);
  });
});
