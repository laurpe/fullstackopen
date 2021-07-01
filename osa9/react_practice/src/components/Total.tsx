import React from "react";


interface CoursePart {
    name: string,
    exerciseCount: number
}

const Total = ({parts}: {parts: CoursePart[]}) => {
    const sum = parts.reduce((accumulator, current) => {
        return accumulator + current.exerciseCount
    }, 0)

    return (
        <div>Number of exercises: {sum}</div>
    )
}


export default Total