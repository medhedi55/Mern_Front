import { useCallback, useEffect, useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('mon_compteur_valeur');
    return parseInt(saved, 10) || 0;
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('No clicks yet');
  const [totalClics, setTotalClics] = useState(0);
  const [historique, setHistorique] = useState(() => {
    const saved = localStorage.getItem('mon_compteur_historique');
    try {
      const actions = JSON.parse(saved);
      return Array.isArray(actions) ? actions : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.title = 'Counter: ' + count;
  }, [count]);

  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  const updateCount = useCallback((change) => {
    const nextCount = count + change;
    if (nextCount > 50) {
      window.alert('Maximum threshold of 50 reached!');
      return;
    }
    if (nextCount < -50) {
      window.alert('Minimum threshold of -50 reached!');
      return;
    }

    setCount(nextCount);
    setMessage(change > 0 ? 'Added ' + step : 'Subtracted ' + step);
    setTotalClics((previous) => previous + 1);
    setHistorique((previous) => [...previous, (change > 0 ? '+' : '-') + step]);
  }, [count, step]);

  function handleReset() {
    setCount(0);
    setMessage('Reset to zero');
    setTotalClics((previous) => previous + 1);
    setHistorique([]);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        updateCount(event.key === 'ArrowUp' ? step : -step);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, updateCount]);

  function getStyleClass() {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  }

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>
      <div className="btn-group">
        <button className="btn btn-dec" onClick={() => updateCount(-step)}>-{step}</button>
        <button className="btn btn-reset" onClick={handleReset}>Reset</button>
        <button className="btn btn-inc" onClick={() => updateCount(step)}>+{step}</button>
      </div>
      <div className="step-control">
        <label htmlFor="step">Increment Step:</label>
        <select id="step" value={step} onChange={(event) => setStep(parseInt(event.target.value, 10))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="history-card">
        <p><strong>Last Action:</strong> {message}</p>
        <p><strong>Total Clicks:</strong> {totalClics}</p>
        {historique.length > 0 && (
          <p><strong>History:</strong> {historique.join(', ')}</p>
        )}
      </div>
    </div>
  );
}
