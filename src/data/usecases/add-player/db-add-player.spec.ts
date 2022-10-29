import { PlayerModel, AddPlayerModel, AddPlayerRepository } from './db-add-player-protocols'
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
  matches: [],
  position: []
})

const makeFakePlayerData = (): AddPlayerModel => ({
  name: 'valid_code',
  cellphone: 'valid_cellphone',
  matches: [],
  position: []
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
  test('Should call AddPlayerRepository with correct values', async () => {
    const { sut, addPlayerRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPlayerRepositoryStub, 'add')
    await sut.add(makeFakePlayerData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_code',
      cellphone: 'valid_cellphone',
      matches: [],
      position: []
    })
  })

  test('Should throw if AddPlayerRepository throws', async () => {
    const { sut, addPlayerRepositoryStub } = makeSut()
    jest.spyOn(addPlayerRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakePlayerData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an player on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakePlayerData())
    expect(account).toEqual(makeFakePlayer())
  })
})
