import Life from '../src/Life'

describe('Life', () => {
  var life: Life
  life = new Life()

  var generatedKey: string
  describe('nextGen', () => {
    it('should return empty 0x0 field', () => {
      const nextGen = life.nextGen([[0]])
      generatedKey = nextGen.prevGenKey

      expect(nextGen).toMatchObject({gen: [[]]})
    })
  })

  describe('getGen', () => {
    it('should return empty 1x1 field from cache', () => {
      const gen = life.getGen(generatedKey)

      expect(gen).toMatchObject([[0]])
    })

    it('should return empty 0x0 field because it is not in the cache', () => {
      const gen = life.getGen('abc')

      expect(gen).toMatchObject([[]])
    })
  })
})
