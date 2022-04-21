function* getCities (initial) {
  let cities = ['beijing', 'tokyo', 'london']

  for (const city of cities) {
    return city
    const passingData = yield city
  }
}

const city = getCities()

console.log(`city`, city.next())
console.log(`city`, city.next(2))
console.log(`city`, city.next(3))
console.log(`city`, city.next())