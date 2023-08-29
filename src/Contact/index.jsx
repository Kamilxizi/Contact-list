import React, { useState } from "react";
import "./style.css";

const ContactBook = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = () => {
    if (name && phoneNumber) {
      const newContact = {
        id: Date.now(),
        name,
        photo,
        phoneNumber,
      };

      setContacts([...contacts, newContact]);
      setName("");
      setPhoto("");
      setPhoneNumber("");
    }
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setSelectedContact(contactToEdit);
    setName(contactToEdit.name);
    setPhoto(contactToEdit.photo);
    setPhoneNumber(contactToEdit.phoneNumber);
  };

  const updateContact = () => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContact.id
        ? {
            ...contact,
            name,
            photo,
            phoneNumber,
          }
        : contact
    );

    setContacts(updatedContacts);
    setSelectedContact(null);
    setName("");
    setPhoto("");
    setPhoneNumber("");
  };

  return (
    <div className="container">
      <h2>Contact Book</h2>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {selectedContact ? (
          <div>
            <button onClick={updateContact}>Save</button>
            <button onClick={() => setSelectedContact(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={addContact}>Add Contact</button>
        )}
      </div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <img className="img" src={contact.photo} alt={contact.name} />
            <div>
              <h3>{contact.name}</h3>
              <p>{contact.phoneNumber}</p>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
              <button onClick={() => editContact(contact.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactBook;
