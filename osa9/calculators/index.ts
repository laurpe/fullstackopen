import express = require('express');
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const getHeightAndWeight = () => {
        if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
            const height = Number(req.query.height);
            const weight = Number(req.query.weight);

            return {
                height: height,
                weight: weight
            };
        } else {
            throw new Error('Malformatted parameters');
        }
    };

    try {
        const { height, weight } = getHeightAndWeight();
        const bmi = calculateBmi(height, weight);
        res.status(200).send(JSON.stringify(bmi));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            throw error;
        }
    }
});

app.post('/exercises', (req, res) => {
    const getExercisesAndTarget = () => {
        if (!req.body.daily_exercises || !req.body.target) {
            throw new Error('parameters missing');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (req.body.daily_exercises.every((item: any) => {return typeof item === 'number';}) && !isNaN(req.body.target)) {
            return {
                daily_exercises: req.body.daily_exercises,
                target: req.body.target
            };
        }

        throw new Error('malformatted parameters');
    };


    try {
        const { daily_exercises, target } = getExercisesAndTarget();
        const result = exerciseCalculator(daily_exercises, target);
        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            throw error;
        }
    }
});



const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});