import {NewPatient, Gender, Entry, NewEntry, Diagnosis, HealthCheckRating, SickLeave, Discharge} from './types';

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
export const toNewPatient = (object: any): NewPatient => {
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

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {

    const entry = object as NewEntry;

    const baseEntry = {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    };

    switch (entry.type) {
        case "HealthCheck":
            return {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(entry.employerName),
                sickLeave: parseSickLeave(entry.sickLeave)
            };
        case "Hospital":
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: parseDischarge(entry.discharge)
            };
        default:
            return assertNever(entry);
    }
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('incorrect or missing description');
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('incorrect or missing date');
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('incorrect or missing specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> | undefined => {
    if (diagnosisCodes) {
        if (Array.isArray(diagnosisCodes)) {
            for (let i = 0; i < diagnosisCodes.length; i++) {
                if (!isString(diagnosisCodes[i])) {
                    throw new Error('incorrect diagnosis codes');
                }
            }
        }
        return diagnosisCodes as Array<Diagnosis['code']>;
    }
    return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('incorrect or missing healthcheck rating');
    }
    return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('incorrect or missing employer name');
    }
    return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (object: any): object is SickLeave => {
    if (object === undefined) {
        return true;
    }
    if (object && object['startDate'] && object['endDate'] && isString(object['startDate']) && isString(object['endDate'])) {
        return true;
    }
    
    return false;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if (!isSickLeave(sickLeave)) {
        throw new Error('incorrect sick leave values');
    }

    return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (obj: any): obj is Discharge => {
    if (!obj || !obj['date'] || !obj['criteria'] || !isString(obj['date']) || !isString(obj['criteria'])) {
        return false;
    }
    return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('incorrect or missing discharge info');
    }

    return discharge;
};