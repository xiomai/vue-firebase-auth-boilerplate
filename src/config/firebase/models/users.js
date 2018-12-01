import {
  db
} from '../firebase';
import { addUserAsAdminRole, deleteUserRole } from './roles'

const refName = 'users';

export const addUserThenAssignAsAdmin = async (authUserId, name, email) => {
  try {
    await db.ref(`${refName}/${authUserId}`).set({name, email})
    await addUserAsAdminRole(authUserId)

    return true;
  } catch (error) {
    return error
  }
}

export const deleteUserAndRole = async (authUserId) => {
  try {
    await db.ref(`${refName}/${authUserId}`).remove()
    await deleteUserRole(authUserId)

    return true;
  } catch (error) {
    return error
  }
}

export const onceGetUsers = () => db.ref(`${refName}`).once('value');
