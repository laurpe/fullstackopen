import patientsData from '../../data/patients';
import {Entry, Patient, NonSensitivePatient, NewPatient, NewEntry} from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatient = (id: string): Patient => {

  const patient = patients.find(patient => patient.id === id);

  if (patient === undefined) {
    throw new Error(`patient not found with id ${id}`);
  }

  return patient;
};

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  
  return newPatient;
};

const getEntries = (patientId: string): Entry[] => {
  const patient = getPatient(patientId);

  return patient.entries;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const patientToChange = getPatient(patientId);

  patientToChange.entries.push(newEntry);

  return newEntry;
};


export default {
  getPatient,
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getEntries,
  addEntry
};