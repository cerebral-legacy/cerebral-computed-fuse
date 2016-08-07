/* global beforeEach,describe,it */
import { expect } from 'chai'
import { Controller } from 'cerebral-testable'
import fuse from '../src'

describe('fuse', () => {
  let controller

  beforeEach(() => {
    [ controller ] = Controller({
      users: [
        { firstName: 'Brian', lastName: 'Fitch' },
        { firstName: 'Christian', lastName: 'Alfoni' },
        { firstName: 'Garth', lastName: 'Williams' },
        { firstName: 'Aleksey', lastName: 'Guryanov' },
        { firstName: 'Thomas', lastName: 'Rich' }
      ],
      query: 'Alfonzo'
    })
  })

  it('finds things', () => {
    const matches = fuse('users', 'query', ['firstName', 'lastName']).get(controller.get())
    expect(matches).to.eql([{ firstName: 'Christian', lastName: 'Alfoni' }])
  })
})
