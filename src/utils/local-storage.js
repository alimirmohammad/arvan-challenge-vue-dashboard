import { LOCAL_STORAGE_KEYS } from "../constants/local-storage-keys";
import { MUTATIONS_NAMES } from "../constants/mutation-names";
import store from "../store";

export function saveTokenToLocalStorage(token) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ARVAN_TOKEN, token);
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ARVAN_TOKEN);
  if (token) {
    store.commit(MUTATIONS_NAMES.SET_TOKEN, { token });
  }
}

export function clearLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ARVAN_TOKEN);
}
