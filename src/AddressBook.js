import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import ContactDetails from './ContactDetails';



function AddressBook() {

  
  // Initialize the state to store contacts

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  
  // Initialize the state to store the input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Initialize the state to store function state
  const [sortOrder, setSortOrder] = useState('name');
  const [search,setSearch] = useState('');
  // Initialize routing
  const history = useNavigate();
  const location = useLocation();

  React.useEffect(()=>{
    if(location.state && location.state.cs){
      setContacts(location.state.cs);
    }
    
  }, [location.state]);


  

  const clearSearch = () => {
    setFilteredContacts([]);
    setSearch('');
  }
  
  // Function to handle adding a new contact
  const addContact = () => {
    if (name && email) {
      // Check if the email already exists in the contacts array
      const contactIndex = contacts.findIndex((contact) => contact.email === email);
  
      if (contactIndex !== -1) {
        // If the email exists, update the existing contact
        const updatedContacts = [...contacts];
        updatedContacts[contactIndex] = { name, email };
        setContacts(updatedContacts);
        history('/', { contacts: updatedContacts});
      } else {
        // If the email doesn't exist, add a new contact
        setContacts([...contacts, { name, email }]);
        history('/', {contacts: [...contacts, {name,email}]});
      }
  
      // Clear input fields
      setName('');
      setEmail('');
    }
  };
  
  //Function to handle removing a contact
  const removeContact = (emailToRemove) => {
    // Check if the contact with the provided email exists in the contacts array
    const contactIndex = contacts.findIndex((contact) => contact.email === emailToRemove);
  
    if (contactIndex !== -1) {
      // If the contact exists, create a new array without the contact to be removed
      const updatedContacts = [...contacts];
      updatedContacts.splice(contactIndex, 1);
      setContacts(updatedContacts);
    }
  };
  //Function to handle sorting contacts by email or name
  const sortContacts = () => {
    const sortedContacts = [...contacts];
    const filteredSortedContacts = [...filteredContacts];
    if(sortOrder === 'name'){
      sortedContacts.sort((a,b) => a.name.localeCompare(b.name));
      filteredSortedContacts.sort((a,b) => a.name.localeCompare(b.name));

    }else if(sortOrder === 'email'){
      sortedContacts.sort((a,b) => a.email.localeCompare(b.email));
      filteredSortedContacts.sort((a,b) => a.email.localeCompare(b.email));
    }

    setContacts(sortedContacts);
  };
  //Function to handle searching contacts by email or name
  const searchContacts = (textToSearch) => {
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) || 
        contact.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredContacts(filtered);
  }
  //Function to handle clearing booknp
  const clearBook = () => {
    setContacts([]);
    setFilteredContacts([]);
  }
  //Function to handle usenavigate when a contact is clicked
  function handleContactClick(contact) { 
    history(`/contact/${contact.email}`, {
      state: {
        userContact: contact,
        cs: contacts,
      }
    });
  };

  return (
    <div>
      <h1>Address Book</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addContact}>Add Contact</button>
        <button onClick={clearBook}>Clear AddressBook</button>
      </div>
      <div>
          <input
            type="text"
            placeholder='Search by name or email'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchContacts}>Search</button>
          <button onClick={clearSearch}>Clear</button>

      </div>
      <div>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
        <button onClick={sortContacts}>Sort contacts</button>
      </div>
      {/* Display the filtered contacts */}
      <ul>
        {filteredContacts.length > 0
          ? filteredContacts.map((contact, index) => (
              <li key={index}>
                <ContactDetails contact={contact}></ContactDetails>
                <button onClick={() => handleContactClick(contact)}>{contact.name}</button>
                <button onClick={removeContact}>Remove</button>
              </li>
            ))
          : contacts.map((contact, index) => (
              <li key={index}>
                <ContactDetails contact={contact}></ContactDetails>
                <button onClick={() => handleContactClick(contact)}>{contact.name}</button>
                <button onClick={()=> removeContact(contact.email)}>Remove</button>
              </li>
            ))}
      </ul>

    </div>
  );
}

export default AddressBook;
