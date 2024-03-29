import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { Category } from './category.types';

export function* fetchCategoriesAsync() {

  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments); // yield  call(메서드, 파라미터) 
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync); // if you hear a bunch of the same action, give me the latest one.
};

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
};