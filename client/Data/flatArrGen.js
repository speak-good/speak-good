export function normArrGen(poses) {
  return poses[0].keypoints.map(p => {
    let tempx = Math.pow(p.position.x, 2)
    let tempy = Math.pow(p.position.y, 2)
    let tempxy = Math.pow(p.position.x + p.position.y, 2)
    let normx = tempx / tempxy
    let normy = tempy / tempxy
    return [normx, normy]
  })
}

export function flattenArr(normArray) {
  return normArray.reduce((a, b) => {
    return a.concat(b)
  }, [])
}
