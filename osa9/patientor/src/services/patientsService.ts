import patientsData from '../../data/patients.json';
import {Patient} from '../types';
import { NonSensitivePatient } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients
};