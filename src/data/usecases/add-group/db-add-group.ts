import { GroupModel, AddGroupModel, AddGroup, AddGroupRepository } from './db-add-group-protocols'

export class DbAddGroup implements AddGroup {
  private readonly addGroupRepository: AddGroupRepository

  constructor (addGroupRepository: AddGroupRepository) {
    this.addGroupRepository = addGroupRepository
  }

  async add (groupData: AddGroupModel): Promise<GroupModel> {
    const group = this.addGroupRepository.add(Object.assign({ }, groupData))
    return group
  }
}
