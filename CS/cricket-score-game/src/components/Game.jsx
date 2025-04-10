import React, { useState, useEffect } from 'react';

const availableBatsmen = ['Rohit Sharma', 'Shubman Gill', 'KL Rahul', 'Hardik Pandya', 'Ravindra Jadeja'];
const availableBowlers = ['Mitchell Starc', 'Josh Hazlewood', 'Adam Zampa'];

const Game = () => {
  const [teamScore, setTeamScore] = useState(0);
  const [currentBatsman, setCurrentBatsman] = useState(1);
  const [batsman1, setBatsman1] = useState('Virat Kohli');
  const [batsman2, setBatsman2] = useState('MS Dhoni');
  const [batsman1Score, setBatsman1Score] = useState(0);
  const [batsman1balls, setBatsman1Ball] = useState(0);
  const [batsman2Score, setBatsman2Score] = useState(0);
  const [batsman2balls, setBatsman2Ball] = useState(0);
  const [balls, setBalls] = useState(0);
  const [overs, setOvers] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [bowlerName, setBowlerName] = useState('Pat Cummins');
  const [BowlerWicket, setBowlerWickets] = useState(0);
  const [BowlsThrown, setBallsThrown] = useState(0);
  const [OverThrown, setOverThrown] = useState(0);
  const [RunsGiven, setRunsGiven] = useState(0);
  const [showBatsmanSelect, setShowBatsmanSelect] = useState(false);
  const [showBowlerSelect, setShowBowlerSelect] = useState(false);
  const [outPlayers, setOutPlayers] = useState([]);
  const [bowlerStats, setBowlerStats] = useState({});

  const isSelectingPlayer = showBatsmanSelect || showBowlerSelect;

  useEffect(() => {
    if (balls >= 6) {
      setOvers(prev => prev + 1);
      setOverThrown(prev => prev + 1);
      setBallsThrown(0);
      setBalls(0);
      switchStrike();
      setShowBowlerSelect(true);
    }
  }, [balls]);

  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) return 0;
    return ((runs / balls) * 100).toFixed(2);
  };

  const switchStrike = () => {
    setCurrentBatsman(prev => (prev === 1 ? 2 : 1));
  };

  const handleRun = (runs) => {
    if (isSelectingPlayer) {
      alert("Please select the next player before continuing!");
      return;
    }

    if (overs >= 20) {
      alert("Innings over! Maximum 20 overs reached.");
      return;
    }
    if (wickets >= 10) {
      alert("All Out!!! Can't Score Runs");
      return;
    }

    setTeamScore(prev => prev + runs);
    setRunsGiven(prevGiven => prevGiven + runs);

    if (currentBatsman === 1) {
      setBatsman1Score(prev => prev + runs);
      setBatsman1Ball(prevplay => prevplay + 1);
    } else {
      setBatsman2Score(prev => prev + runs);
      setBatsman2Ball(prevplay => prevplay + 1);
    }

    setBalls(prevBalls => prevBalls + 1);
    setBallsThrown(prevthrow => prevthrow + 1);

    if (runs === 1 || runs === 3) {
      switchStrike();
    }
  };

  const handleWide = () => {
    if (isSelectingPlayer) {
      alert("Please select the next player before continuing!");
      return;
    }

    if (overs < 20) {
      setTeamScore(prev => prev + 1);
    } else {
      alert("Innings over! Maximum 20 overs reached.");
    }
  };

  const handleWicket = () => {
    if (isSelectingPlayer) {
      alert("Please select the next player before continuing!");
      return;
    }

    if (wickets < 10) {
      setWickets(prev => prev + 1);
      setBalls(prevBalls => prevBalls + 1);
      setBallsThrown(prevThrow => prevThrow + 1);
      setBowlerWickets(prevWicket => prevWicket + 1);
      setOutPlayers(prev => [...prev, currentBatsman === 1 ? batsman1 : batsman2]);
      setShowBatsmanSelect(true);
    } else {
      alert("All out!");
    }
  };

  const selectBatsman = (name) => {
    if (outPlayers.includes(name)) {
      alert(`${name} is already out and cannot be selected again.`);
      return;
    }
    if (currentBatsman === 1) {
      setBatsman1(name);
      setBatsman1Score(0);
      setBatsman1Ball(0);
    } else {
      setBatsman2(name);
      setBatsman2Score(0);
      setBatsman2Ball(0);
    }
    setShowBatsmanSelect(false);
  };

  const selectBowler = (name) => {
    if (bowlerStats[name]) {
      const stats = bowlerStats[name];
      setBowlerWickets(stats.wickets);
      setRunsGiven(stats.runs);
      setOverThrown(stats.overs);
      setBallsThrown(stats.balls);
    } else {
      setBowlerWickets(0);
      setRunsGiven(0);
      setOverThrown(0);
      setBallsThrown(0);
    }
    setBowlerName(name);
    setShowBowlerSelect(false);
  };

  useEffect(() => {
    setBowlerStats(prevStats => ({
      ...prevStats,
      [bowlerName]: {
        wickets: BowlerWicket,
        runs: RunsGiven,
        overs: OverThrown,
        balls: BowlsThrown
      }
    }));
  }, [BowlerWicket, RunsGiven, OverThrown, BowlsThrown]);


  return (
    <div className="game-container">
      <h2>Cricket Score Game</h2>
      <div className="score-board">
        <div className="team-score">
          <h3>Team Score: {teamScore}/{wickets}</h3>
          <p>Overs: {overs}.{balls}</p>
        </div>
        <div className="batsman-scores">
          <div className={`batsman ${currentBatsman === 1 ? 'active' : ''}`}>
            <h4>{batsman1}: {batsman1Score}/{batsman1balls}</h4>
            <h4>SR: {calculateStrikeRate(batsman1Score, batsman1balls)}</h4>
          </div>
          <div className={`batsman ${currentBatsman === 2 ? 'active' : ''}`}>
            <h4>{batsman2}: {batsman2Score}/{batsman2balls}</h4>
            <h4>SR: {calculateStrikeRate(batsman2Score, batsman2balls)}</h4>
          </div>
          <div className="bowler">
            <h4>{bowlerName}:</h4>
            <h4>{BowlerWicket}-{RunsGiven}-{OverThrown}.{BowlsThrown}</h4>
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => handleRun(0)}>Dot Ball</button>
        <button onClick={() => handleRun(1)}>1 Run</button>
        <button onClick={() => handleRun(2)}>2 Runs</button>
        <button onClick={() => handleRun(3)}>3 Runs</button>
        <button onClick={() => handleRun(4)}>4 Runs</button>
        <button onClick={() => handleRun(6)}>6 Runs</button>
        <button onClick={handleWide}>Wide Ball</button>
        <button onClick={handleWicket}>Wicket</button>
      </div>

      {showBatsmanSelect && (
        <div className="select-popup">
          <h3>Select Next Batsman:</h3>
          {availableBatsmen.map((batsman, idx) => (
            <button key={idx} onClick={() => selectBatsman(batsman)}>{batsman}</button>
          ))}
        </div>
      )}

      {showBowlerSelect && (
        <div className="select-popup">
          <h3>Select New Bowler:</h3>
          {availableBowlers.map((bowler, idx) => (
            <button key={idx} onClick={() => selectBowler(bowler)}>{bowler}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
