/* eslint-disable sonarjs/cognitive-complexity */
import React, { useState, useCallback, useEffect } from 'react';

import Header from '../Header';
import Title from '../Title';
import Controls from '../Controls';
import SettingsPanel from '../SettingsPanel';
import Timer from '../Timer';
import ErrorBoundry from '../ErrorBoundry';

import classes from './App.scss';

const radius = 180;
const circumference = 2 * Math.PI * radius;

const App = () => {
  // user value
  const [workingTime, setWorkingTime] = useState(2); // min
  const [littleBreakTime, setLittleBreakTime] = useState(1); // min
  const [bigBreakTime, setBigBreakTime] = useState(3); // min
  const [pomodorosInRound, setPomodorosInRound] = useState(2); // qty
  const [pomodorosInDay, setPomodorosInDay] = useState(10); // qty
  // timer status
  const [mode, setMode] = useState('stopped');
  const [isActive, setIsActive] = useState(false);

  // count
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // timer info
  const [title, setTitle] = useState('Let`s get to work!');
  const [timeLeft, setTimeLeft] = useState(workingTime * 60);

  // settings panel
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // svg settings
  const [step, setStep] = useState(circumference / (workingTime * 60));
  const [dashOffset, setDashOffset] = useState(circumference);

  const resetTimer = useCallback(() => {
    setTitle('Let`s get to work!');
    setTimeLeft(workingTime * 60);
    setMode('stopped');
    setIsActive(false);
    setStep(circumference / (workingTime * 60));
    setDashOffset(circumference);
    setCompletedPomodoros(0);
  }, [workingTime]);

  useEffect(() => {
    let intervalID;
    if (isActive) {
      intervalID = setInterval(() => {
        // каждый тик уменьшаем timeLeft
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        // каждый тик уменьшаем заполнение на шаг
        setDashOffset((prevDashOffset) => prevDashOffset - step);
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [isActive, step]);

  // обновить когда изменяем рабочее время
  useEffect(() => {
    setTimeLeft(workingTime * 60);
    setStep(circumference / (workingTime * 60));
    setDashOffset(circumference);
  }, [workingTime]);

  // обновление на изменение времени tick
  useEffect(() => {
    // время работы истекло
    if (mode === 'working' && timeLeft === 0) {
      const nowCompletedPomodoros = completedPomodoros + 1;
      setCompletedPomodoros(nowCompletedPomodoros);

      // закончить работу
      if (nowCompletedPomodoros === pomodorosInDay) {
        resetTimer();
        return;
      }

      // выбрать перерыв
      if (nowCompletedPomodoros === pomodorosInRound) {
        setMode('bigBreak');
        setTitle('Big break, warm up!');
        setStep(circumference / (bigBreakTime * 60));
        setTimeLeft(bigBreakTime * 60);
        setDashOffset(circumference);
      } else {
        setMode('littleBreak');
        setTitle('Take a short break and carry on!');
        setStep(circumference / (littleBreakTime * 60));
        setTimeLeft(littleBreakTime * 60);
        setDashOffset(circumference);
      }
      return;
    }

    // время перерыва истекло, уходим работать
    if ((mode === 'littleBreak' || mode === 'bigBreak') && timeLeft === 0) {
      setMode('working');
      setStep(circumference / (workingTime * 60));
      setDashOffset(circumference);
      setTitle(`Stay focus for ${workingTime} minutes.`);
      setTimeLeft(workingTime * 60);
    }
  }, [
    bigBreakTime,
    completedPomodoros,
    littleBreakTime,
    mode,
    pomodorosInDay,
    pomodorosInRound,
    resetTimer,
    timeLeft,
    workingTime,
  ]);

  const startTimer = () => {
    setMode('working');
    setTitle(`Stay focus for ${workingTime} minutes.`);
    setIsActive(true);
  };

  const stopTimer = () => {
    if (isActive) {
      setTitle('Keep going!');
    }
    setIsActive(false);
    setMode('stopped');
  };

  const toggleSettingsPanel = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  // work time change
  const increaseWorkTime = () => {
    setWorkingTime((prevState) => prevState + 1);
  };

  const decreaseWorkTime = () => {
    setWorkingTime((prevState) => prevState - 1);
  };

  // little breal time change
  const increaseLittleBreakTime = () => {
    setLittleBreakTime((prevState) => prevState + 1);
  };

  const decreaseLittleBreakTime = () => {
    setLittleBreakTime((prevState) => prevState - 1);
  };

  // big breal time change
  const increaseBigBreakTime = () => {
    setBigBreakTime((prevState) => prevState + 1);
  };

  const decreaseBigBreakTime = () => {
    setBigBreakTime((prevState) => prevState - 1);
  };

  // pomodoros in round change
  const increasePomodorosInRound = () => {
    setPomodorosInRound((prevState) => prevState + 1);
  };

  const decreasePomodorosInRound = () => {
    setPomodorosInRound((prevState) => prevState - 1);
  };

  // pomodoros in day change
  const increasePomodorosInDay = () => {
    setPomodorosInDay((prevState) => prevState + 1);
  };

  const decreasePomodorosInDay = () => {
    setPomodorosInDay((prevState) => prevState - 1);
  };

  return (
    <div className={classes.App}>
      <Header toggleSettingsPanel={toggleSettingsPanel} />

      <main className={classes.Main}>
        <Title title={title} />
        <ErrorBoundry>
          <Timer
            radius={radius}
            circumference={circumference}
            dashOffset={dashOffset}
            timeLeft={timeLeft}
            completedPomodoros={completedPomodoros}
            pomodorosInDay={pomodorosInDay}
          />
        </ErrorBoundry>
        <Controls
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          isActive={isActive}
        />
      </main>

      <SettingsPanel
        isOpenSettings={isOpenSettings}
        decreaseWorkTime={decreaseWorkTime}
        workingTime={workingTime}
        increaseWorkTime={increaseWorkTime}
        decreaseLittleBreakTime={decreaseLittleBreakTime}
        littleBreakTime={littleBreakTime}
        increaseLittleBreakTime={increaseLittleBreakTime}
        decreaseBigBreakTime={decreaseBigBreakTime}
        bigBreakTime={bigBreakTime}
        increaseBigBreakTime={increaseBigBreakTime}
        decreasePomodorosInDay={decreasePomodorosInDay}
        pomodorosInDay={pomodorosInDay}
        increasePomodorosInDay={increasePomodorosInDay}
        decreasePomodorosInRound={decreasePomodorosInRound}
        pomodorosInRound={pomodorosInRound}
        increasePomodorosInRound={increasePomodorosInRound}
      />
    </div>
  );
};

export default App;
