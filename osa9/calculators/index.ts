import express = require('express');
import calculateBmi from './bmiCalculator';

const app = express();

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
        res.status(400).send({ error: error.message });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});