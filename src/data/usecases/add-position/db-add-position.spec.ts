import { PositionModel } from '../../../domain/models/position'
import { AddPositionModel } from '../../../domain/usecases/add-position'
import { AddPositionRepository } from '../../protocols/add-position-repository'
import { DbAddPosition } from './db-add-position'

const makeAddPositionRepository = (): AddPositionRepository => {
  class AddPositionRepositoryStub implements AddPositionRepository {
    async add (playerData: AddPositionModel): Promise<PositionModel> {
      return new Promise(resolve => resolve(makeFakePlayer()))
    }
  }
  return new AddPositionRepositoryStub()
}

const makeFakePlayer = (): PositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

const makeFakePlayerData = (): AddPositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

interface SutTypes {
  sut: DbAddPosition
  addPositionRepositoryStub: AddPositionRepository
}

const makeSut = (): SutTypes => {
  const addPositionRepositoryStub = makeAddPositionRepository()
  const sut = new DbAddPosition(addPositionRepositoryStub)
  return {
    sut,
    addPositionRepositoryStub
  }
}

describe('DbAddPosition Usecase', () => {
  test('Should call AddPositionRepository with correct values', async () => {
    const { sut, addPositionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPositionRepositoryStub, 'add')
    await sut.add(makeFakePlayerData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      first: 'valid_first',
      second: 'valid_second',
      third: 'valid_third',
      fourth: 'valid_fourth'
    })
  })
})
