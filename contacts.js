const fs = require("fs");
const path = require("path");

const contactPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const contacts = JSON.parse(data);
      console.table(contacts);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const contacts = JSON.parse(data);
      const contact = contacts.filter((user) => user.id === contactId);
      if (contact.length === 0) {
        console.log("this isn`t the contact you are looking for");
      } else {
        console.table(contact);
      }
    }
    return;
  });
}

function removeContact(contactId) {
  fs.readFile(contactPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter((user) => user.id !== contactId);

      if (contacts.length === newContacts.length) {
        console.log("nothihg to remove, check id input");
      } else {
        const newContactsJSON = JSON.stringify(newContacts);
        fs.writeFile(contactPath, newContactsJSON, "utf8", (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("contact removed sucessfully");
          }
        });
      }
    }
  });
  return;
}

function addContact(name, email, phone) {
  const newContact = [{ id: undefined, name, email, phone }];

  fs.readFile(contactPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const contacts = JSON.parse(data);
      let newContactId = contacts[contacts.length - 1].id + 1;
      newContact[0].id = newContactId;
      const newContacts = contacts.concat(newContact);
      const newContactsJSON = JSON.stringify(newContacts);
      fs.writeFile(contactPath, newContactsJSON, "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("contact added successfully");
        }
      });
    }
  });

  return;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
