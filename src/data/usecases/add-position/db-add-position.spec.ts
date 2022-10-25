import { PositionModel } from '../../../domain/models/position'
import { AddPositionModel } from '../../../domain/usecases/add-position'
import { AddPositionRepository } from '../../protocols/add-position-repository'
import { DbAddPosition } from './db-add-position'

const makeAddPositionRepository = (): AddPositionRepository => {
  class AddPositionRepositoryStub implements AddPositionRepository {
    async add (playerData: AddPositionModel): Promise<PositionModel> {
      return new Promise(resolve => resolve(makeFakePosition()))
    }
  }
  return new AddPositionRepositoryStub()
}

const makeFakePosition = (): PositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

const makeFakePositionData = (): AddPositionModel => ({
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
    await sut.add(makeFakePositionData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      first: 'valid_first',
      second: 'valid_second',
      third: 'valid_third',
      fourth: 'valid_fourth'
    })
  })

  test('Should throw if AddPositionRepository throws', async () => {
    const { sut, addPositionRepositoryStub } = makeSut()
    jest.spyOn(addPositionRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakePositionData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an player on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakePositionData())
    expect(account).toEqual(makeFakePosition())
  })
})
