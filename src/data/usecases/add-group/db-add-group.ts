import { GroupModel } from '../../../domain/models/group'
import { AddGroupModel, AddGroup } from '../../../domain/usecases/add-group'
import { AddGroupRepository } from '../../protocols/add-group-repository'

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
