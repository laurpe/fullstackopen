
const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];

interface ExerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const exerciseCalculator = (hoursPerDay: Array<number>, target: number): ExerciseSummary => {
    if (hoursPerDay.length !== 7) {
        throw new Error('You must give exercise hours for every day of the week!');
    }

    const actualHoursPerDay = hoursPerDay.filter(h => h > 0);

    const trainingDays = actualHoursPerDay.length;

    const sum = actualHoursPerDay.reduce((accumulator: number, current: number) => {
        return accumulator + current;
    }, 0);

    const average = sum/hoursPerDay.length;

    const targetReached = (target: number, average: number): boolean => {
        if (average >= target) {
            return true;
        }

        return false;
    };

    const rating = (target: number, average: number): number => {
        if (average > target) {
            return 3;
        }
        if (average === target) {
            return 2;
        }
        if (average < target) {
            return 1;
        }
    };

    const ratingText = (rating: number): string => {
        if (rating === 3) {
            return 'good';
        }
        if (rating === 2) {
            return 'ok';
        }
        if (rating === 1) {
            return 'bad';
        }
    };

    const result: ExerciseSummary = {
        periodLength: hoursPerDay.length,
        trainingDays: trainingDays,
        success: targetReached(target, average),
        rating: rating(target, average),
        ratingDescription: ratingText(rating(target, average)),
        target: target,
        average: average
    };

    return result;
};

try {
    console.log(exerciseCalculator(exerciseHours, 2));
} catch (error) {
    console.log('Error: ', error.message);
}
