import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: {part: CoursePart}) => {

    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                </div>
            );
        case 'groupProject':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    Project exercises {part.groupProjectCount}
                </div>
            );
        case 'submission':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                    Submit to {part.exerciseSubmissionLink}
                </div>
            );
        case 'special':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>{part.description}</p>
                    Required skills: {part.requirements.join(', ')}
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;