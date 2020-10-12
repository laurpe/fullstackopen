import React from 'react'

const Header = ({course}) => {
    return (
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  
  const Content = ({course}) => {
  
    const totalExercises =  course.parts.reduce(function(sum, parts) {
      return sum + parts.exercises
    }, 0)
  
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part} /> )}
        <b>Total of {totalExercises} exercises</b>
      </div>
    )
  }
  
  const Part = ({part}) => {
    
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Course = (props) => {
    const {course} = props
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
      </div>
    )
  }

export default Course