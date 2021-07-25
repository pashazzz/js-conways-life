import crypto from 'crypto'

export default class Life {
  /**
   * cache stores the generations by SHA256 of their JSON state like the key
   * and times of it happened in values
   */
   private cache: Object

  /**
   * algorithm using to encrypt/decrypt
   * cacheKey is random string for encrypt/decrypt keys of cache
   * iv is an initialization vector to encrypt/decrypt
   */
  private algorithm: string
  private cacheKey: Buffer
  private iv: Buffer

  constructor() {
    this.cache = {}
    this.algorithm = 'aes-128-cbc'
    this.cacheKey = crypto.randomBytes(16)
    this.iv = crypto.randomBytes(16)
  }

  private addGenToCache(gen: number[][]): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.cacheKey,
      this.iv
    )
    let checksum = cipher.update(JSON.stringify(gen), 'utf8', 'hex')
    checksum += cipher.final('hex')

    this.cache[checksum] = this.cache[checksum] ? this.cache[checksum] + 1 : 1

    return checksum
  }

  private getGenFromCache(genKey: string): number[][] {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.cacheKey,
      this.iv
    )
    let json = decipher.update(genKey, 'hex', 'utf8')
    json += decipher.final('utf8')

    return JSON.parse(json)
  }

  /**
   * nextGen() is universal generator of next generation.
   * @param gen - generation state in 2xArray of 0 and 1
   * @param options - object with customizing generating
   * @returns the same size of 2xArray like @param gen with next generation
   */
  public nextGen(gen: number[][], options?: Object): {gen: number[][], prevGenKey: string } {
    const genKey = this.addGenToCache(gen)

    return {gen: [[]], prevGenKey: genKey}
  }

  /**
   * getGen() look into the cache for key. In case it not exists, returns 0x0
   * Otherwise decrypt the key and returns the generation
   * @param key for cache
   * @returns cached generation in 2xArray format or empty 0x0 field
   */
  public getGen(key: string): number[][] {
    return this.cache[key] ? this.getGenFromCache(key) : [[]]
  }
}