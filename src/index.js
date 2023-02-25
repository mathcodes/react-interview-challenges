import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase/firebase';
import App from './App';

// Create a Firebase context and wrap the App component
export const FirebaseContext = React.createContext(null);

// use createRoot to render the App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>
);