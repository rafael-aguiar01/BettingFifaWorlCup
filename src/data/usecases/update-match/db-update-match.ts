import { MatchModel, UpdateMatchModel, UpdateMatch, UpdateMatchRepository } from './db-update-match-protocols'

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
