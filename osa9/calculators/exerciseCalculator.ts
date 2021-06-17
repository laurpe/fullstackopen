
interface ExerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

// interface hoursAndTarget {
//     hours: Array<number>,
//     target: number
// }

// const parseArguments = (args: Array<string>): hoursAndTarget => {
//     if (args.length < 4) {
//         throw new Error('Not enough arguments!');
//     }

//     const hoursAndTarget: Array<number> = process.argv.slice(2).map(item => {
//         if (!isNaN(Number(item))) {
//             return Number(item);
//         } else {
//             throw new Error('Provided values were not numbers!');
//         }
//     });

//     const hours: Array<number> = hoursAndTarget.slice(1);

//     const target: number = hoursAndTarget[0];

//     return {
//         hours: hours,
//         target: target
//     };
// };


const exerciseCalculator = (hoursPerDay: Array<number>, target: number): ExerciseSummary => {

    const actualHoursPerDay = hoursPerDay.filter(h => h > 0);

    const trainingDays = actualHoursPerDay.length;

    const sum = actualHoursPerDay.reduce((accumulator: number, current: number) => {
        return accumulator + current;
    }, 0);

    const average = sum / hoursPerDay.length;

    const targetReached = (target: number, average: number): boolean => {
        if (average >= target) {
            return true;
        }

        return false;
    };

    const rating = (target: number, average: number): number => {
        if (average > target) {
            return 3;
        } else if (average === target) {
            return 2;
        } else if (average < target) {
            return 1;
        } else {
            throw new Error('Value of target or average incorrect');
        }
    };

    const ratingText = (rating: number): string => {
        if (rating === 3) {
            return 'good';
        } else if (rating === 2) {
            return 'ok';
        } else if (rating === 1) {
            return 'bad';
        } else {
            throw new Error('Value of rating incorrect');
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

export default exerciseCalculator;
