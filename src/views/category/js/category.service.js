import categoryApi from '@/api/category.api'

class CategoryService {
    async create(data) {
        return categoryApi.creat(data)
    }
    async update(data) {
        return categoryApi.update(data)
    }
    async modify(data) {
        return categoryApi.modify(data)
    }
    async delete(id) {
        return categoryApi.delete(id)
    }
    async find(id) {
        return categoryApi.find(id)
    }
    async list(pageable) {
        return categoryApi.list(pageable)
    }
    async children(id) {
        return categoryApi.children(id)
    }
    async advancedSearch(whereClause, pageable) {
        return categoryApi.advancedSearch(whereClause, pageable)
    }
}
export default new CategoryService()
