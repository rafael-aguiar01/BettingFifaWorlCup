import { AddPlayerController } from './add-player'
import { PlayerModel } from '../../../domain/models/player'
import { HttpRequest } from '../../protocols'
import { AddPlayer, AddPlayerModel } from '../../../domain/usecases/add-player'

const makeFakePlayer = (): PlayerModel => ({
  name: 'valid_name',
  cellphone: 'cellphone_number',
  matches: {},
  position: {}
})

const makeFakeRequest = (): HttpRequest => ({
  body: ({
    name: 'valid_name',
    cellphone: 'cellphone_number',
    matches: {},
    position: {}
  })
})

const makeAddPlayer = (): AddPlayer => {
  class AddPlayerStub implements AddPlayer {
    async add (player: AddPlayerModel): Promise<PlayerModel> {
      return new Promise(resolve => resolve(makeFakePlayer()))
    }
  }
  return new AddPlayerStub()
}

interface SutTypes{
  sut: AddPlayerController
  addPlayerStub: AddPlayer
}

const makeSut = (): SutTypes => {
  const addPlayerStub = makeAddPlayer()
  const sut = new AddPlayerController(addPlayerStub)
  return {
    sut,
    addPlayerStub
  }
}

describe('AddPlayer Controller', () => {
  test('Should call AddPlayer with correct values', async () => {
    const { sut, addPlayerStub } = makeSut()
    const addSpy = jest.spyOn(addPlayerStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cellphone: 'cellphone_number',
      matches: {},
      position: {}
    })
  })
})
