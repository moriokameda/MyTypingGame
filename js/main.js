'use strict'

{
  const words = [
    'apple',
    'sky',
    'blue',
    'set',
  ];
  let word = words[Math.floor(Math.random() * words.length)];
  let loc;
  let score;
  let miss;
  const timeLimit = 3 * 1000;
  let starttime;
  let isPlaying = false;

  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');


  const target = document.getElementById('target');
  // target.textContent = word;
  function updateTarget() {
    let placeholder = '';
    for(let i = 0; i < loc ; i++){
      placeholder += '_';
    }
    target.textContent = placeholder +word.substring(loc);
  }

  function updateTimer() {
    const timeLeft = starttime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timeoutId = setTimeout(() => {
      updateTimer()
    }, 10);

    if (timeLeft < 0){
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        // alert('Game Over');
        showResult();
      }, 100);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {
    const acuuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${acuuracy.toFixed(2)} % accuracy`);
  }


  window.addEventListener('click', () => {
    if (isPlaying === true){
      return
    }
    isPlaying = true;
    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent  = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    starttime = Date.now();
    updateTimer()
  });

  window.addEventListener('keydown', e => {
    if (isPlaying !== true){
      return;
    }
    console.log(e.key);
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}