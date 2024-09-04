import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = new Category({
                name: 'Movie'
            })

            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Movie')
            expect(category.description).toBeNull()
            expect(category.is_active).toBeTruthy()
            expect(category.created_at).toBeInstanceOf(Date)
        })

        test('should create a category with given values', () => {
            const created_at = new Date()
            const category = new Category({
                name: 'Movie',
                description: 'Movies category',
                is_active: false,
                created_at
            })

            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toBe('Movie')
            expect(category.description).toBe('Movies category')
            expect(category.is_active).toBeFalsy()
            expect(category.created_at).toBe(created_at)
        })
    })
})
