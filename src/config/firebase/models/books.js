import {
  db
} from '../firebase';

const refName = 'books';

export const DBReference = db.ref(`${refName}`)

export const addBook = ({isbn, title, publisher, author, added_at}) => db.ref(`${refName}/${isbn}`).set({title, publisher, author, added_at});

export const onceGetBooks = () => db.ref(`${refName}`).once('value');
