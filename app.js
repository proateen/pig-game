/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 2 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
*/


var scores, roundScore, activePlayer, gamePlaying;

init(); // Initialise a new game, resets all the scores and sets player names back to default

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
};

document.querySelector('.btn-roll').addEventListener('click', function() { // Function for what happens when 'Roll dice' is clicked
if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the dice with the correct face according to the result we just got in step 1
    var diceDOM = document.querySelector('.dice') // Store the dice class selection in a variable for the sake of DRY
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice === 6 && savedDice === 6) {
        // Player loses score if 2 6's are rolled
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    } else if (dice !== 1) {
        // Add score
        roundScore += dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {    
        // Next player
        nextPlayer();
        document.querySelector('.dice').style.display = 'none';
    };
        savedDice = dice;
  };
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore

        // 2. Update the UI to reflect step 1
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Score selector

        var input = document.querySelector('.final-score').value;
        
        if(input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }
    
        // 3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Toggle active player
            nextPlayer();
        };
    };
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};
