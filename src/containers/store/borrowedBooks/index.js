import * as contants from "./contants"
import { orderBy, map } from "lodash"

const state = {
  borrowedBooks: contants.INITIAL_STATE.borrowedBooks
}

const mutations = {
  setBorrowedBooks(state, payload) {
    state.borrowedBooks = payload
  },
  clearBorrowedBooks(state) {
    state.borrowedBooks = null
  },
}

const actions = {
  setBorrowedBooks({
    commit
  }, books) {
    commit('setBorrowedBooks', books)
  },
}

const getters = {
  borrowedBooks: state => state.borrowedBooks,
  recentBorrowedBooks: state => {
    const { borrowedBooks } = state
    const booksWithKey = map(borrowedBooks, (book, key) =>({...book,key}))
    // return booksWithKey
    const orderedByAddedAt = orderBy(booksWithKey, ['borrowed_at'], ['desc'])

    return orderedByAddedAt.slice(0, 10)
  }
}

export {
  state,
  actions,
  mutations,
  getters
}
