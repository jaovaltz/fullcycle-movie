import { Category } from "../../../domain/category.entity";
import { CategoryOutputMapper } from "./category-output";

describe('CategoryOutputMapper Unit Tests', () => {
    it('should convert a category in output', () => {
        const aggregate = Category.create({
            name: 'Category 1',
            description: 'Description 1',
            is_active: true
        })

        const spyToJSON = jest.spyOn(aggregate, 'toJSON');
        const output = CategoryOutputMapper.toOutput(aggregate);

        expect(spyToJSON).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: aggregate.category_id.id,
            name: 'Category 1',
            description: 'Description 1',
            is_active: true,
            created_at: aggregate.created_at
        })


    })
})