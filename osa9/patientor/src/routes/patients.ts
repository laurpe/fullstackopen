import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        res.json(patientsService.getPatient(req.params.id));
    } catch(error) {
        res.status(404).send(error.message);
    }
});

export default router;