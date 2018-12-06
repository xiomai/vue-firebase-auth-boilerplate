import {
  db
} from '../firebase';

const refName = 'students';

export const DBReference = db.ref(`${refName}`)

export const addStudent = ({icno, name, course, added_at}) => db.ref(`${refName}/${icno}`).set({name, course, added_at});

export const onceGetStudents = () => db.ref(`${refName}`).once('value');

export const onceGetStudent = (icno) => db.ref(`${refName}/${icno}`).once('value');
