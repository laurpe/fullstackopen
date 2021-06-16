
interface Bmi {
    height: number,
    weight: number,
    bmi: string
}

const calculateBmi = (height: number, weight: number): Bmi => {

    if (height <= 0 || weight <= 0) {
        throw new Error('Height or weight cannot be 0 or under');
    }

    if (height < 3) {
        throw new Error('Give height in centimeters');
    }
    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    let bmiText = '';

    if (bmi < 15) {
        bmiText = 'Very severely underweight';
    } else if (bmi >= 15 && bmi < 16) {
        bmiText = 'Severely undeweight';
    } else if (bmi >= 16 && bmi < 18.5) {
        bmiText = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiText = 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        bmiText = 'Overweight';
    } else if (bmi >= 30 && bmi < 35) {
        bmiText = 'Obese Class I (Moderately obese)';
    } else if (bmi >= 35 && bmi < 40) {
        bmiText = 'Obese Class II (Severely obese)';
    } else if (bmi >= 40) {
        bmiText = 'Obese Class III (Very severely obese)';
    }

    return {
        height: height,
        weight: weight,
        bmi: bmiText
    };
};

export default calculateBmi;