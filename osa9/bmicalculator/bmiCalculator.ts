const calculateBmi = (height: number, weight: number) => {
    if (height <= 0 || weight <= 0) {
        throw new Error('Height or weight cannot be 0 or under');
    }

    if (height < 3) {
        throw new Error('Give height in centimeters')
    }
    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    let result = 'bmi message';

    if (bmi < 15) {
        result = 'Very severely underweight';
    } else if (bmi >= 15 && bmi < 16) {
        result = 'Severely undeweight';
    } else if (bmi >= 16 && bmi < 18.5) {
        result = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        result = 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        result = 'Overweight';
    } else if (bmi >= 30 && bmi < 35) {
        result = 'Obese Class I (Moderately obese)';
    } else if (bmi >= 35 && bmi < 40) {
        result = 'Obese Class II (Severely obese)';
    } else if (bmi >= 40) {
        result = 'Obese Class III (Very severely obese)';
    }

    return result;
}

try {
    console.log(calculateBmi(180, 74));
} catch (error) {
    console.log('Error message: ', error.message);
}
