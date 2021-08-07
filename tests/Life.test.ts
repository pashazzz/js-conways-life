import Life from '../src/Life'

describe('Life', () => {
  var life: Life
  life = new Life()

  var generatedHash: string

  // generations presets
  const gens = require('./gens.json')

  /**
   * Public methods
   */
  describe('nextGen', () => {
    it('should return expected generation and hash for cache access', async () => {
      for (const state of gens) {
        const nextGen = await life.nextGen(state.init)
        
        expect(nextGen).toMatchObject({gen: state.expected})
        expect(nextGen.parentGenHash.length).toEqual(40)

        generatedHash = generatedHash || nextGen.parentGenHash
      }
    })

    it('should return expected generation from cache', async () => {
      const nextGen = await life.nextGen(gens[0].init)
      expect(nextGen).toEqual({gen: gens[0].expected, parentGenHash: generatedHash})
    })
  })

  describe('getGen', () => {
    it('should return expected generation from cache', () => {
      const gen = life.getGen(generatedHash)

      expect(gen).toMatchObject(gens[0].expected)
    })

    it('should return empty 0x0 field because it is not in the cache', () => {
      const gen = life.getGen('abc')

      expect(gen).toMatchObject([[]])
    })
  })

  /**
   * Private methods
   * 
   * We cann't access to private methods directly, like `life.priv()`
   * but we can use array access ([]) to get at the private members: `life['priv']()
   */
  describe('getGenHash', () => {
    it("should return sha1 hash '029a64e6da9de1c033bb880d1104437df8321eac'", async () => {
      const sha1 = await life['getGenHash']( [[0,0],[1,1]] )

      expect(sha1).toEqual('029a64e6da9de1c033bb880d1104437df8321eac')
    })
  })
})
