import React from 'react';


interface CoursePart {
    name: string,
    exerciseCount: number
}

const Content = ({parts}: {parts: CoursePart[]}) => {

    return (
        <div>
            {parts.map(part => (
                <p key={part.name}>{part.name} {part.exerciseCount}</p>
            ))}
        </div>
    )
}

export default Content