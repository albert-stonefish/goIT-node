const method = require("./contacts.js");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      method.listContacts();
      break;
    case "get":
      method.getContactById(id);
      break;
    case "add":
      method.addContact(name, email, phone);
      break;
    case "remove":
      method.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
