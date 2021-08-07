interface cellCoords {
  row: number,
  col: number,
}

interface nextGenResult {
  gen: number[][],
  parentGenHash: string,
}

export default class Life {
  /**
   * constants for statuses
   */
  static readonly STATUS_DEAD = 0
  static readonly STATUS_ALIVE = 1

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

  // taken from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  private async digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

  private async getGenHash(gen: number[][]): Promise<string> {
    return await this.digestMessage(JSON.stringify(gen))
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
      case Life.STATUS_DEAD:
        // life starts only if cell have exact 3 neighbours
        newCellStatus = countNeighbours === 3
          ? Life.STATUS_ALIVE
          : Life.STATUS_DEAD
        break;
      case Life.STATUS_ALIVE:
        // cell still live only have 2 or 3 neighbours
        newCellStatus = countNeighbours === 2 || countNeighbours === 3
          ? Life.STATUS_ALIVE
          : Life.STATUS_DEAD
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
  public async nextGen(gen: number[][], options?: Object): Promise<nextGenResult> {
    // if already generated and stored in cache return it
    const genHash = await this.getGenHash(gen)
    if (this.cache[genHash]) {
      return { gen: this.cache[genHash], parentGenHash: genHash }
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

    return {gen: nextGen, parentGenHash: genHash}
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