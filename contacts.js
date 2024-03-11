const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contactsList = await listContacts();
  const contact = contactsList.find((item) => item.id === id);
  return contact || null;
}

async function removeContact(id) {
  const contactsList = await listContacts();
  const contactID = contactsList.findIndex((item) => item.id === id);

  if (contactID === -1) return null;

  const deletedContact = contactsList.splice(contactID, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return deletedContact[0];
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
