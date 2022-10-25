import { NationModel, AddNationModel, AddNationRepository } from './db-add-nation-protocols'
import { DbAddNation } from './db-add-nation'

const makeAddNationRepository = (): AddNationRepository => {
  class AddNationRepositoryStub implements AddNationRepository {
    async add (nationData: AddNationModel): Promise<NationModel> {
      return new Promise(resolve => resolve(makeFakeNation()))
    }
  }
  return new AddNationRepositoryStub()
}

const makeFakeNation = (): NationModel => ({
  code: 'valid_code',
  name: 'valid_name'
})

const makeFakeNationData = (): AddNationModel => ({
  code: 'valid_code',
  name: 'valid_name'
})

interface SutTypes {
  sut: DbAddNation
  addNationRepositoryStub: AddNationRepository
}

const makeSut = (): SutTypes => {
  const addNationRepositoryStub = makeAddNationRepository()
  const sut = new DbAddNation(addNationRepositoryStub)
  return {
    sut,
    addNationRepositoryStub
  }
}

describe('DbAddNation Usecase', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addNationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addNationRepositoryStub, 'add')
    await sut.add(makeFakeNationData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      name: 'valid_name'
    })
  })

  test('Should throw if AddNationRepository throws', async () => {
    const { sut, addNationRepositoryStub } = makeSut()
    jest.spyOn(addNationRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeNationData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an nation on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeNationData())
    expect(account).toEqual(makeFakeNation())
  })
})
