import { MatchModel } from '../../../domain/models/match'
import { AddMatchModel, AddMatch } from '../../../domain/usecases/add-match'
import { AddMatchRepository } from '../../protocols/add-match-repository'

export class DbAddMatch implements AddMatch {
  private readonly addMatchRepository: AddMatchRepository

  constructor (addMatchRepository: AddMatchRepository) {
    this.addMatchRepository = addMatchRepository
  }

  async add (matchData: AddMatchModel): Promise<MatchModel> {
    const match = this.addMatchRepository.add(Object.assign({ }, matchData))
    return match
  }
}
