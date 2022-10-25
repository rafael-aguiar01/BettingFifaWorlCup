import { GroupModel } from '../../domain/models/group'
import { AddGroupModel } from '../../domain/usecases/add-group'

export interface AddGroupRepository {
  add (groupData: AddGroupModel): Promise<GroupModel>
}
