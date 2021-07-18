import React from 'react';


interface CoursePart {
    name: string,
    exerciseCount: number
}

const Total = ({ parts }: {parts: CoursePart[]}) => {
    const sum = parts.reduce((accumulator, current) => {
        return accumulator + current.exerciseCount;
    }, 0);

    return (
        <div>
            <p>Number of exercises {sum}</p>
        </div>
    );
};


export default Total;