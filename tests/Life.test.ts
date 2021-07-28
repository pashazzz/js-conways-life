import Life from '../src/Life'

describe('Life', () => {
  var life: Life
  life = new Life()

  var generatedHash: string

  // generations presets
  const gens = require('./gens.json')

  describe('nextGen', () => {
    it('should return expected generation and hash for cache access', () => {
      for (const state of gens) {
        const nextGen = life.nextGen(state.init)
        
        expect(nextGen).toMatchObject({gen: state.expected})
        expect(nextGen.prevGenHash.length).toEqual(32)

        generatedHash = generatedHash || nextGen.prevGenHash
      }
    })

    it('should return expected generation from cache', () => {
      const nextGen = life.nextGen(gens[0].init)
      expect(nextGen).toEqual({gen: gens[0].expected, prevGenHash: generatedHash})
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
})
