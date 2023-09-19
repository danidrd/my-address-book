import './App.css';
import AddressBook from './AddressBook';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactDetails from './ContactDetails';
function App() {

  return (
    <Router>
          <Routes>
            <Route exact path="/" Component={AddressBook}>
            </Route>
            <Route path="/contact/:email" Component={ContactDetails}>
            </Route>
          </Routes>

    </Router>
  );
}

export default App;
