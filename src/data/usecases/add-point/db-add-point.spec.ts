import { PointModel } from '../../../domain/models/point'
import { AddPointModel } from '../../../domain/usecases/add-point'
import { AddPointRepository } from '../../protocols/add-point-repository'
import { DbAddPoint } from './db-add-point'

const makeAddPointRepository = (): AddPointRepository => {
  class AddPointRepositoryStub implements AddPointRepository {
    async add (pointData: AddPointModel): Promise<PointModel> {
      return new Promise(resolve => resolve(makeFakePoint()))
    }
  }
  return new AddPointRepositoryStub()
}

const makeFakePoint = (): PointModel => ({
  code: 'valid_code',
  point: 2
})

const makeFakePositionData = (): AddPointModel => ({
  code: 'valid_code',
  point: 2
})

interface SutTypes {
  sut: DbAddPoint
  addPointRepositoryStub: AddPointRepository
}

const makeSut = (): SutTypes => {
  const addPointRepositoryStub = makeAddPointRepository()
  const sut = new DbAddPoint(addPointRepositoryStub)
  return {
    sut,
    addPointRepositoryStub
  }
}

describe('DbAddPoint Usecase', () => {
  test('Should call AddPointRepository with correct values', async () => {
    const { sut, addPointRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPointRepositoryStub, 'add')
    await sut.add(makeFakePositionData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      point: 2
    })
  })
})
