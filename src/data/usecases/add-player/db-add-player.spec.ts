import { PlayerModel } from '../../../domain/models/player'
import { AddPlayerModel } from '../../../domain/usecases/add-player'
import { AddPlayerRepository } from '../../protocols/add-player-repository'
import { DbAddPlayer } from './db-add-player'

const makeAddPlayerRepository = (): AddPlayerRepository => {
  class AddPlayerRepositoryStub implements AddPlayerRepository {
    async add (playerData: AddPlayerModel): Promise<PlayerModel> {
      return new Promise(resolve => resolve(makeFakePlayer()))
    }
  }
  return new AddPlayerRepositoryStub()
}

const makeFakePlayer = (): PlayerModel => ({
  name: 'valid_code',
  cellphone: 'valid_cellphone',
  matches: {},
  position: {}
})

const makeFakePlayerData = (): AddPlayerModel => ({
  name: 'valid_code',
  cellphone: 'valid_cellphone',
  matches: {},
  position: {}
})

interface SutTypes {
  sut: DbAddPlayer
  addPlayerRepositoryStub: AddPlayerRepository
}

const makeSut = (): SutTypes => {
  const addPlayerRepositoryStub = makeAddPlayerRepository()
  const sut = new DbAddPlayer(addPlayerRepositoryStub)
  return {
    sut,
    addPlayerRepositoryStub
  }
}

describe('DbAddPlayer Usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addPlayerRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPlayerRepositoryStub, 'add')
    await sut.add(makeFakePlayerData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_code',
      cellphone: 'valid_cellphone',
      matches: {},
      position: {}
    })
  })
})
