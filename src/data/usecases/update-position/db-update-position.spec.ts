import { PositionModel } from '../../../domain/models/position'
import { UpdatePositionRepository } from '../../protocols/update-position-repository'
import { UpdatePositionModel } from '../../../domain/usecases/update-position'
import { DbUpdatePosition } from './db-update-position'

const makeUpdatePositionRepository = (): UpdatePositionRepository => {
  class UpdatePositionRepositoryStub implements UpdatePositionRepository {
    async update (positionData: UpdatePositionModel): Promise<UpdatePositionModel> {
      return new Promise(resolve => resolve(makeFakePosition()))
    }
  }
  return new UpdatePositionRepositoryStub()
}

const makeFakePosition = (): PositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

const makeFakeUpdatePositionData = (): UpdatePositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

interface SutTypes {
  sut: DbUpdatePosition
  updatePositionRepositoryStub: UpdatePositionRepository
}

const makeSut = (): SutTypes => {
  const updatePositionRepositoryStub = makeUpdatePositionRepository()
  const sut = new DbUpdatePosition(updatePositionRepositoryStub)
  return {
    sut,
    updatePositionRepositoryStub
  }
}

describe('DbUpdate Position Usecase', () => {
  test('Should call UpdatePositionRepository with correct values', async () => {
    const { sut, updatePositionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(updatePositionRepositoryStub, 'update')
    await sut.update(makeFakeUpdatePositionData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      first: 'valid_first',
      second: 'valid_second',
      third: 'valid_third',
      fourth: 'valid_fourth'
    })
  })
})
