import { AddPositionController } from './add-position'
import { PositionModel } from '../../../domain/models/position'
import { HttpRequest } from '../../protocols'
import { AddPosition, AddPositionModel } from '../../../domain/usecases/add-position'

const makeFakePosition = (): PositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'valid_code',
    first: 'valid_first',
    second: 'valid_second',
    third: 'valid_third',
    fourth: 'valid_fourth'
  }
})

const makeAddPosition = (): AddPosition => {
  class AddPositionStub implements AddPosition {
    async add (position: AddPositionModel): Promise<PositionModel> {
      return new Promise(resolve => resolve(makeFakePosition()))
    }
  }
  return new AddPositionStub()
}

interface SutTypes{
  sut: AddPositionController
  addPositionStub: AddPosition
}

const makeSut = (): SutTypes => {
  const addPositionStub = makeAddPosition()
  const sut = new AddPositionController(addPositionStub)
  return {
    sut,
    addPositionStub
  }
}

describe('AddPosition Controller', () => {
  test('Should call AddPosition with correct values', async () => {
    const { sut, addPositionStub } = makeSut()
    const addSpy = jest.spyOn(addPositionStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      first: 'valid_first',
      second: 'valid_second',
      third: 'valid_third',
      fourth: 'valid_fourth'
    })
  })
})
