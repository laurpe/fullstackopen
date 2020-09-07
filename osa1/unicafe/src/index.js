import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({label, value}) => (
  <tbody>
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  </tbody>
)

const Statistics = ({allClicks, good, bad, neutral, average, positive}) => {
  if (allClicks === undefined || allClicks.length === 0) {
    return (
      <div>no feedback given yet</div>
    )
  } else {
    return (
      <div>
        <table>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="average" value={average} />
          <StatisticLine label="positive" value={positive + " %"} />
        </table>
      </div>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleClickGood = () => {
    setGood(good + 1)
    setAll([...allClicks, 1])
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setAll([...allClicks, 0])
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setAll([...allClicks, -1])
  }

  const all = good + neutral + bad
  
  const positive = all === 0 ? 0 : good / all * 100

  const average = all === 0 ? 0 : (good - bad) / all
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
