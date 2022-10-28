import { MatchModel } from '../../../domain/models/match'
import { UpdateMatchModel, UpdateMatch } from '../../../domain/usecases/update-match'
import { UpdateMatchRepository } from '../../protocols/update-match-repository'

export class DbUpdateMatch implements UpdateMatch {
  private readonly updateMatchRepository: UpdateMatchRepository

  constructor (updateMatchRepository: UpdateMatchRepository) {
    this.updateMatchRepository = updateMatchRepository
  }

  async update (match: UpdateMatchModel): Promise<MatchModel> {
    const matchUpdated = this.updateMatchRepository.update(Object.assign({ }, match))
    return matchUpdated
  }
}
