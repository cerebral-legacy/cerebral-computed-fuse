/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import controller from './helpers/controller'
import fuseModule from '../src'

controller.addModules({
  findUsers: fuseModule({
    statePath: ['users'],
    options: { keys: ['firstName', 'lastName'] }
  })
})
controller.addSignals({
  output: [ ({ state, services }) => state.set('output', state.get(services.findUsers.fuse)) ]
})
const signals = controller.getSignals()

let tree

describe('fuse', function () {
  afterEach(function () {
    controller.reset()
  })

  beforeEach(function () {
    tree = controller.model.tree
    tree.set(['users'], [
      { firstName: 'Brian', lastName: 'Fitch' },
      { firstName: 'Christian', lastName: 'Alfoni' },
      { firstName: 'Garth', lastName: 'Williams' },
      { firstName: 'Aleksey', lastName: 'Guryanov' },
      { firstName: 'Thomas', lastName: 'Rich' }
    ])
    tree.set(['findUsers', 'query'], null)
    tree.set(['output'], null)
    tree.commit()
  })

  it('finds things', function () {
    signals.findUsers.search.sync({ query: 'Guryanov' })
    signals.output.sync()
    expect(tree.get(['output'])).to.eql([{ firstName: 'Aleksey', lastName: 'Guryanov' }])
  })
})
