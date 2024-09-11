import { Entity } from "../../../domain/entity";
import { Uuid } from "../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.toString(),
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => any {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test("should insert a new entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);
    expect(repo.items).toHaveLength(1);
    expect(repo.items[0]).toBe(entity);
  });

  test("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({ name: "Test 1", price: 100 }),
      new StubEntity({ name: "Test 2", price: 200 }),
    ];

    await repo.bulkInsert(entities);
    expect(repo.items).toHaveLength(2);
    expect(repo.items).toEqual(entities);
  });

  test("should update an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);
    entity.name = "Updated Test";
    await repo.update(entity);

    expect(repo.items).toHaveLength(1);
    expect(repo.items[0].name).toBe("Updated Test");
  });

  test("should delete an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);
    await repo.delete(entity.entity_id);

    expect(repo.items).toHaveLength(0);
  });

  test("should find all entities", async () => {
    const entities = [
      new StubEntity({ name: "Test 1", price: 100 }),
      new StubEntity({ name: "Test 2", price: 200 }),
    ];

    await repo.bulkInsert(entities);
    const allEntities = await repo.findAll();

    expect(allEntities).toHaveLength(2);
    expect(allEntities).toEqual(entities);
  });

  test("should find an entity by ID", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repo.insert(entity);
    const foundEntity = await repo.findById(entity.entity_id);

    expect(foundEntity).toBe(entity);
  });
});
