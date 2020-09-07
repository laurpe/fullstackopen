import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.course.parts[0].name}
      </p>
      <p>
        {props.course.parts[1].name}
      </p>
      <p>
        {props.course.parts[2].name}
      </p>
    </div>
  )
}

const Total = (props) => {
  let total = 0
  for (let i = 0; i < props.course.parts.length - 1; i++) {
    total += props.course.parts[i].exercises
  }

  return (
    <div>
      <p>
        {total}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
