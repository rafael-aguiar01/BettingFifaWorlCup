import { NationModel, AddNationRepository, AddNation, AddNationModel } from './db-add-nation-protocols'

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
