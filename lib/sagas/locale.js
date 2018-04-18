import { takeEvery, put, call } from 'redux-saga/effects';
import router from './router';

export function changeLocale(i18n) {
  return function* changeLocaleSaga({ payload: locale }) {
    yield new Promise((resolve, reject) =>
      i18n.changeLanguage(locale, (err, t) => {
        if (err) {
          reject(err);
        } else {
          resolve(t);
        }
      })
    );
    yield put({ type: 'locale', payload: locale });
  };
}

export function* watchChangeLocale(i18n) {
  yield takeEvery('change_locale', changeLocale(i18n));
}

export function* localeChanged() {
  yield call(router, { payload: window.location.pathname });
}

export function* watchLocaleChanged() {
  yield takeEvery('locale', localeChanged);
}
