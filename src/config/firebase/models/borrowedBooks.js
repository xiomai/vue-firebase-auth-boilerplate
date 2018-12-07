import {
  db
} from '../firebase';

const refName = 'borrowedBooks';

export const DBReference = db.ref(`${refName}`)

export const addBorrowedBook = ({isbn, icno, borrowed_at}) => db.ref(`${refName}/${isbn}`).set({ icno, borrowed_at});

export const removeBorrowedBook = (isbn) => db.ref(`${refName}/${isbn}`).remove();

export const onceGetBorrowedBooks = () => db.ref(`${refName}`).once('value');

export const onceGetBorrowedBook = (isbn) => db.ref(`${refName}/${isbn}`).once('value');
