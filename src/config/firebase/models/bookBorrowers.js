import {
  db
} from '../firebase';

const refName = 'bookBorrowers';

export const DBReference = db.ref(`${refName}`)

export const addBookBorrower = ({isbn, icno, borrowed_at}) => db.ref(`${refName}/${icno}/${isbn}`).update({  borrowed_at });

export const removeBookBorrowed = ({isbn, icno}) => db.ref(`${refName}/${icno}/${isbn}`).remove();

export const onceGetBookBorrowers = () => DBReference.once('value');

export const onceGetBookBorrower = ({icno}) => db.ref(`${refName}/${icno}`).once('value');
