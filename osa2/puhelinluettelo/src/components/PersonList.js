import React from "react";
import personService from "../services/persons.js";

const PersonList = ({ persons, onPersonDelete, setNotification }) => {
  const handleDeleteClick = (person) => {
    deletePerson(person);
  };

  const deletePerson = (person) => {
    const result = window.confirm(
      `Are you sure you want tolöllö delete ${person.name} from the phonebook?`
    );

    if (result === true) {
      const personsWithoutDeletedPerson = persons.filter((p) => p !== person);

      personService
        .remove(person.id)
        .then(() => onPersonDelete(personsWithoutDeletedPerson))
        .catch(() => {
          setNotification({
            message: `${person.name} was already removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
      setNotification({
        message: `${person.name} was deleted from the phonebook`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => handleDeleteClick(person)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PersonList;
