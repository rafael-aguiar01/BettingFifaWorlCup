import { NationModel } from '../../../domain/models/nation'
import { AddNation, AddNationModel } from '../../../domain/usecases/add-nation'
import { AddNationRepository } from '../../protocols/add-nation-repository'

export class DbAddNation implements AddNation {
  private readonly addNationRepository: AddNationRepository

  constructor (addNationRepository: AddNationRepository) {
    this.addNationRepository = addNationRepository
  }

  async add (nationData: AddNationModel): Promise<NationModel> {
    const nation = this.addNationRepository.add(Object.assign({ }, nationData))
    return nation
  }
}
