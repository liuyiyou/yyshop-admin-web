import supplierApi from '@/api/supplier.api'

class SupplierService {
  async create(data) {
    return supplierApi.creat(data)
  }
  async update(data) {
    return supplierApi.update(data)
  }
  async delete(id) {
    return supplierApi.delete(id)
  }
  async find(id) {
    return supplierApi.find(id)
  }
  async list (params) {
    console.log('getSupplierList', params)
    return supplierApi.list(params)
  }
}
export default new SupplierService()