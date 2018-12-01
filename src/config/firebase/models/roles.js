import {
  db
} from '../firebase';

const adminRole = "admin"
const refName = 'roles';

export const addUserAsAdminRole= (authUserId) => db.ref(`${refName}/${authUserId}`).set(adminRole);

export const onceGetRole = (authUserId) => db.ref(`${refName}/${authUserId}`).once('value');
