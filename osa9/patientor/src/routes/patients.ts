import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const newPatient = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation 
    });
    res.json(newPatient);

    //sain tehtyä newPatient-addmetodin ja tämän
});

export default router;