import patientsData from '../../data/patients.json';
import {Patient} from '../types';
import { NonSensitivePatient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
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

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};