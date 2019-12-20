import memberApi from '@/api/member.api'

class MemberService {
  async create(data) {
    return memberApi.creat(data)
  }
  async update(data) {
    return memberApi.update(data)
  }
  async modify(data) {
    return memberApi.modify(data)
  }
  async delete(id) {
    return memberApi.delete(id)
  }
  async find(id) {
    return memberApi.find(id)
  }
  async list(pageable) {
    return memberApi.list(pageable)
  }

  async listAjax(paramer) {
    return memberApi.getServiceList(paramer)
  }


  async advancedSearch(whereClause, pageable) {
    return memberApi.advancedSearch(whereClause, pageable)
  }

}
export default new MemberService()
