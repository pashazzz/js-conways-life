interface Params {
  x?: number,
  y?: number,
  world?: string,
}

export const getLink = (arr: number[][]): string => {
  let str = ''
  arr.flat().forEach(cell => str += cell)
  const intArr = []
  let byteStr = ''
  for (let i = 0; i < str.length; i++) {
    byteStr += str[i]
    if (byteStr.length === 8) {
      intArr.push(parseInt(byteStr, 2))
      byteStr = ''
    }
  }
  if (byteStr.length > 0 && byteStr.length < 8) {
    intArr.push(parseInt(byteStr.padStart(8, '0'), 2))
  }
  const params: Params = {
    x: arr[0].length,
    y: arr.length,
    world: btoa(intArr.toString())
  }

  return `${window.location.origin}${window.location.pathname}?x=${params.x}&y=${params.y}&world=${params.world}`
}

export const parseLink = (str: string): number[][] => {
  const fields = ['x', 'y', 'world']
  const params: Params = {}
  str.split('&').forEach(param => {
    const [key, val] = param.split('=')
    if (fields.includes(key)) {
      params[key] = val
    }
  })
  // have not required fields
  if (Object.keys(params).sort().join('') !== fields.sort().join('')) {
    return [[]]
  }
  const arrFlat = atob(params.world).split(',')
  let cellsFlat = ''
  arrFlat.forEach((byteStr) => {
    cellsFlat += Number(byteStr).toString(2).padStart(8, '0')
  })
  const cellsFlatArr = cellsFlat.split('')

  // fill the getted world
  const world: number[][] = []
  for (let iRow = 0; iRow < params.y; iRow++ ) {
    const row = []
    for (let iCol = 0; iCol < params.x; iCol++) {
      if (cellsFlatArr.length === 0) {
        row.push(0)
        continue
      }
      row.push(Number(cellsFlatArr.shift()))
    }
    world.push(row)
  }

  return world
}