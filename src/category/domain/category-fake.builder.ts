import { Chance } from "chance";
import { Category } from "./category.entity";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";

type PropOrFactory<T> = T | ((index: number) => T);

export class CategoryFakeBuilder<TBuild = any> {
  private _category_id: PropOrFactory<Uuid> | undefined = undefined;

  private _name: PropOrFactory<string> = (_index) => this.chance.word();

  private _description: PropOrFactory<string | null> = (_index) =>
    this.chance.paragraph();

  private _is_active: PropOrFactory<boolean> = (_index) => true;

  private _created_at: PropOrFactory<Date | undefined> = undefined;

  private countObjs;

  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  static theCategories(countObjs: number) {
    return new CategoryFakeBuilder<Category[]>(countObjs);
  }

  private chance: Chance.chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withUuid(valueOrFactory: PropOrFactory<Uuid>) {
    this._category_id = valueOrFactory;
    return this;
  }
}
