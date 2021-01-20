import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '2 Bike,Aviao,Navio 200000 2020-01-01 2020-03-30'
    )
    const expected = {
      from: '2020-01-01',
      to: '2020-03-30',
      vehicles: ['Bike', 'Aviao', 'Navio'],
      id: '2',
      kmTraveled: '200000'
    }
    expect(person).to.be.deep.equal(expected)
  })
  it('should format values', () => {
    const person = new Person({
      from: '2020-01-01',
      to: '2020-03-30',
      vehicles: ['Bike', 'Aviao', 'Navio'],
      id: '2',
      kmTraveled: '200000'
    })
    const result = person.formatted("pt-BR")
    const expected = {
      id: 2,
      vehicles: 'Bike, Aviao e Navio',
      kmTraveled: '200.000 km',
      from: '01 de janeiro de 2020',
      to: '30 de março de 2020'
    }
    expect(result).to.be.deep.equal(expected)
  })
})