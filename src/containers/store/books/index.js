import * as contants from "./contants"
import { orderBy, map } from "lodash"

const state = {
  books: contants.INITIAL_STATE.books
}

const mutations = {
  setBooks(state, payload) {
    state.books = payload
  },
  clearBooks(state) {
    state.books = null
  },
}

const actions = {
  setBooks({
    commit
  }, books) {
    commit('setBooks', books)
  },
}

const getters = {
  books: state => state.books,
  recentBooks: state => {
    const { books } = state
    const booksWithKey = map(books, (book, key) =>({...book,key}))
    const orderedByAddedAt = orderBy(booksWithKey, ['added_at'], ['desc'])

    return orderedByAddedAt.slice(0, 10)
  }
}

export {
  state,
  actions,
  mutations,
  getters
}
