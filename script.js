

const gridTilesEmoji = ['❤','😎','😜','😊','👌','✌','👍','😁'];
const emojiName = ['heart','mode','wink','smiley','awesome','victory','good','smile'];
const emojis = [...gridTilesEmoji, ...gridTilesEmoji]; 
let shuffledEmojis = shuffleArray(emojis);
let flippedTiles = [];
let flippedIndices = [];
let matchedTiles = 0;

const tileContainer = document.querySelector('.tile-container');

for (let i = 0; i < shuffledEmojis.length; i++) {
    let tile = generateTile(shuffledEmojis[i], emojiName[i % emojiName.length], i);
    tileContainer.appendChild(tile);
}


function generateTile(emoji, name, index) {
    let element = document.createElement('div');
    element.className = 'tile';
    element.setAttribute('data-emoji', emoji);
    element.setAttribute('data-name', name);
    element.setAttribute('data-index', index);
    element.innerText = '';
    element.addEventListener('click', flipTile);
    return element;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function flipTile() {
    let index = this.getAttribute('data-index');

    if (this.className.indexOf('flipped') !== -1 || flippedTiles.length === 2) {
        return;
    }

    this.className += ' flipped';
    this.innerText = this.getAttribute('data-emoji');
    flippedTiles.push(this);
    flippedIndices.push(index);

    if (flippedTiles.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    let index1 = flippedIndices[0];
    let index2 = flippedIndices[1];
    let tile1 = flippedTiles[0];
    let tile2 = flippedTiles[1];

    if (tile1.getAttribute('data-emoji') === tile2.getAttribute('data-emoji')) {
        tile1.className += ' matched';
        tile2.className += ' matched';
        matchedTiles += 2;
    } else {
        tile1.className = tile1.className.replace('flipped', '');
        tile1.innerText = '';
        tile2.className = tile2.className.replace('flipped', '');
        tile2.innerText = '';
    }

    flippedTiles = [];
    flippedIndices = [];

    if (matchedTiles === emojis.length) {
        setTimeout(function() {alert('Congratulations! You matched all tiles!'); }, 300);
    }
}



