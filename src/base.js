import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAlNjt8fax_TsS2qS1R_cf_ZjumjXl236A",
  authDomain: "catch-of-the-day-81cee.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-81cee.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
