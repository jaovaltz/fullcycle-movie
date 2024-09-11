import { Entity } from "../entity";
import { ValueObject } from "../value-object";
import { SearchParams } from "./serach-params";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: EntityId): Promise<void>;

  findAll(): Promise<E[]>;
  findById(entity_id: EntityId): Promise<E | null>;

  getEntity(): new (...args: any[]) => E;
}

export interface ISearchableRepository<
  E extends Entity,
  EntityId extends ValueObject,
  SearchInput = SearchParams,
  SearchOutput
> extends IRepository<E, EntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
