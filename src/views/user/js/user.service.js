import userApi from '@/api/user.api'

class UserService {
  async getUserList (params) {
    console.log('getUserList', params)
    return userApi.getUserList(params)
  }
}
export default new UserService()
