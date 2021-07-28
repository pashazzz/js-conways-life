import crypto from 'crypto'

interface cellCoords {
  row: number,
  col: number,
}

export default class Life {
  /**
   * cache stores the generations by SHA256 of their JSON state like the key
   * and times of it happened in values
   */
   private cache: Object

  /**
   * curGen using for generate next generation
   * options can influence to how generate next gen
   */
  private curGen: number[][]
  private options: Object

  private mooreNeighborhood: cellCoords[]

  constructor() {
    this.cache = {}

    this.mooreNeighborhood = [
      {row: -1, col: -1},
      {row: -1, col: 0},
      {row: -1, col: 1},
      {row: 0, col: -1},
      {row: 0, col: 1},
      {row: 1, col: -1},
      {row: 1, col: 0},
      {row: 1, col: 1},
    ]
  }

  private getGenHash(gen: number[][]): string {
    return crypto.createHash('md5').update(JSON.stringify(gen)).digest('hex')
  }

  private countNeighbours(cellCoords): number {
    let countNeighbours = 0
    for (const neighbour of this.mooreNeighborhood) {
      const row = cellCoords.row + neighbour.row
      const col = cellCoords.col + neighbour.col

      // out of field is not needed
      if (this.curGen[row] && this.curGen[row][col]) {
        countNeighbours += this.curGen[row][col]
      }
    }

    return countNeighbours
  }

  private determineCellStatus(cellCoords): number {
    const countNeighbours = this.countNeighbours(cellCoords)
    let newCellStatus = 0
    switch (this.curGen[cellCoords.row][cellCoords.col]) {
      case 0:
        // life starts only if cell have exact 3 neighbours
        newCellStatus = countNeighbours === 3 ? 1 : 0
        break;
      case 1:
        // cell still live only have 2 or 3 neighbours
        newCellStatus = countNeighbours === 2 || countNeighbours === 3 ? 1 : 0
        break;
    }

    return newCellStatus
  }

  /**
   * nextGen() is a generator for next generation.
   * @param gen - generation state in 2xArray of 0 and 1
   * @param options - object with customizing generating
   * @returns the same size of 2xArray like @param gen with next generation
   */
  public nextGen(gen: number[][], options?: Object): {gen: number[][], prevGenHash: string } {
    // if already generated and stored in cache return it
    const genHash = this.getGenHash(gen)
    if (this.cache[genHash]) {
      return { gen: this.cache[genHash], prevGenHash: genHash }
    }

    // otherwise
    this.curGen = gen

    const nextGen = []
    for (const rowInd in gen) {
      nextGen.push([])
      for (const cellInd in gen[rowInd]) {
        const newCellStatus = this.determineCellStatus({row: Number(rowInd), col: Number(cellInd)})
        nextGen[rowInd].push(newCellStatus)
      }
    }

    this.cache[genHash] = nextGen

    return {gen: nextGen, prevGenHash: genHash}
  }

  /**
   * getGen() look into the cache for key. In case it not exists, returns 0x0
   * Otherwise returns the next generation
   * @param key for cache
   * @returns cached generation in 2xArray format or empty 0x0 field
   */
  public getGen(key: string): number[][] {
    return this.cache[key] || [[]]
  }
}