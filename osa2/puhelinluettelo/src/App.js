import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import "./index.css";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const filterData = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (person) => {
    setPersons(persons.concat(person));
  };

  const deletePerson = (newPersons) => {
    setPersons(newPersons);
  };

  const updatePerson = (person, indexOfPerson) => {
    const personsCopy = [...persons];
    personsCopy[indexOfPerson] = person;

    setPersons(personsCopy);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} filterData={filterData} />

      <h2>Add a new person</h2>

      <PersonForm
        onPersonCreate={addPerson}
        onPersonUpdate={updatePerson}
        persons={persons}
        setNotification={setNotification}
      />

      <h2>Numbers</h2>
      <PersonList
        persons={personsToShow}
        onPersonDelete={deletePerson}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
