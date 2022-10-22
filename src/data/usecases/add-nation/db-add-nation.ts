import { NationModel, AddNationRepository } from './db-add-nation-protocols'
import { AddNation, AddNationModel } from '../../../domain/usecases/add-nation'

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
