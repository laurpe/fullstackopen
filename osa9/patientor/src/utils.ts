import {NewPatient, Gender, Entry} from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('incorrect or missing birthdate');
    }
    return dateOfBirth;
};

const ssnRegex = /^[0-9]{6}[+Aa-][0-9]{3}[A-z0-9]$/;

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !ssnRegex.test(ssn)) {
        throw new Error('incorrect or missing social security number');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation');
    }
    return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (entries && Array.isArray(entries)) {
        const entriesWrongType = entries.filter((entry) => {
            if (entry.type !== "HealthCheck" || entry.type !== "OccupationalHealthcare" || entry.type !== "Hospital") {
                return true;
            }
            return false;
        });

        if (entriesWrongType.length === 0) {
            return entries as Entry[];
        }
    }

    throw new Error('incorrect or missing entries');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };

    return newPatient;
};

export default toNewPatient;