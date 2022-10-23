import { GroupModel } from '../models/group'

export interface AddGroupModel {
  code: string
  teamA: string
  teamB: string
  teamC: string
  teamD: string
}

export interface AddGroup {
  add (group: AddGroupModel): Promise<GroupModel>
}
