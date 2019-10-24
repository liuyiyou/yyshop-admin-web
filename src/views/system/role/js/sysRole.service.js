import sysRoleApi from '@/api/system/sysRole.api'

class SysRoleService {
    async create(data) {
        return sysRoleApi.creat(data)
    }
    async update(data) {
        return sysRoleApi.update(data)
    }
    async modify(data) {
        return sysRoleApi.modify(data)
    }
    async delete(id) {
        return sysRoleApi.delete(id)
    }
    async find(id) {
        return sysRoleApi.find(id)
    }
    async list(pageable) {
        return sysRoleApi.list(pageable)
    }
    async advancedSearch(whereClause, pageable) {
        return sysRoleApi.advancedSearch(whereClause, pageable)
    }
}
export default new SysRoleService()
