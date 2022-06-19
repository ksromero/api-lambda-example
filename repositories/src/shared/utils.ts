const { stringify } = JSON

const intersecArrNotInc = (arrOne: string[], arrTwo: string[]) => {
  return arrOne.filter(carId => !arrTwo.includes(carId))
}

const response = (message: Body) => {
  return {
    body: stringify(message),
    statusCode: message.code
  }
}

interface Body {
  details: any,
  code: number
}

export {
  intersecArrNotInc,
  response
}