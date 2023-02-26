import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase/firebase';
import { FirebaseProvider } from './firebase/index';
import App from './App';

// Create a Firebase context and wrap the App component
export const FirebaseContext = React.createContext(
  firebase, FirebaseProvider
);
console.log(FirebaseContext);

// use createRoot to render the App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>
);