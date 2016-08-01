/* global beforeEach,describe,it */
import { expect } from 'chai'
import { Controller } from 'cerebral-testable'
import fuse from '../src'
import computed from '../src/computed'

describe('fuse', () => {
  let controller, signals

  beforeEach(() => {
    [ controller, signals ] = Controller({
      users: [
        { firstName: 'Brian', lastName: 'Fitch' },
        { firstName: 'Christian', lastName: 'Alfoni' },
        { firstName: 'Garth', lastName: 'Williams' },
        { firstName: 'Aleksey', lastName: 'Guryanov' },
        { firstName: 'Thomas', lastName: 'Rich' }
      ],
      output: null
    }, {
      findUsers: fuse({
        statePath: ['users'],
        options: { keys: ['firstName', 'lastName'] }
      })
    })

    controller.addSignals({
      output: [ ({ state, services }) => state.set('output', services.findUsers.get(state)) ]
    })
  })

  describe('search signal', () => {
    it('sets the query state', () => {
      return controller.test(() => signals.findUsers.search({ query: 'test' })).then(() => {
        expect(controller.get('findUsers.query')).to.equal('test')
      })
    })
  })

  describe('computed', () => {
    it('finds things', () => {
      return controller.test(() => signals.findUsers.search({ query: 'Alfonzo' }))
        .then(() => {
          const matches = computed({ modulePath: 'findUsers', statePath: 'users' }).get(controller.get())
          expect(matches).to.eql([{ firstName: 'Christian', lastName: 'Alfoni' }])
        })
    })
  })

  describe('get service', () => {
    it('finds things', () => {
      return controller.test(() => signals.findUsers.search({ query: 'Guryanov' }))
        .then(() => controller.test(() => signals.output()))
        .then(() => {
          expect(controller.get('output')).to.eql([{ firstName: 'Aleksey', lastName: 'Guryanov' }])
        })
    })
  })
})
