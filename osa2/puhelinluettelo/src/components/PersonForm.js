import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({
  onPersonCreate,
  onPersonUpdate,
  persons,
  setNotification,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 100000),
    };

    if (nameIsAlreadyAdded()) {
      const result = window.confirm(
        `${newName} is already in the phonebook, do you want to replace the old number with a new one?`
      );

      if (result === true) {
        updateNumber(personObject);
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          onPersonCreate(response.data);
          setNotification({
            message: `${newName} was added to the phonebook`,
            type: "notification",
          });

          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setNotification({
            message: error.response.data.error,
            type: "error",
          });

          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const nameIsAlreadyAdded = () => {
    const sameNames = persons.filter((person) => person.name === newName);

    return sameNames.length !== 0 ? true : false;
  };

  const updateNumber = (person) => {
    const personNames = persons.map((person) => person.name);
    const indexOfPerson = personNames.indexOf(newName);
    const idOfPerson = persons[indexOfPerson].id;

    personService
      .update(idOfPerson, person)
      .then((response) => onPersonUpdate(response.data, indexOfPerson))
      .catch(() => {
        setNotification({
          message: `${newName} was already removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });

    setNotification({
      message: `Phone number of ${newName} was updated`,
      type: "notification",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
