//Function that updates the date at the bottom
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const timezoneString = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
    document.getElementById('update-time').textContent = timeString;
    document.getElementById('timezone').textContent = timezoneString;
}
setInterval(updateTime, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ethereumPriceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=cad';
var message = document.getElementById('message');
var fearAndGreedIndexUrl = 'http://api.alternative.me/fng/';
var message1 = document.getElementById('message1');
var thumb = document.getElementById('image');
var bitcoinPriceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad';
var message2 = document.getElementById('message2');

//display etherium price
function updateEtheriumPrice() {
  fetch(ethereumPriceUrl)
    .then(response => response.json())
    .then(data => {
      var price = data.ethereum.cad;
      message.textContent = 'Ethereum is currently $' + price + '.';
    })
    .catch(error => {
      console.error('Error fetching Ethereum price:', error);
      message.textContent = 'Error fetching Ethereum price';
    });
}

//display bitcoin price
function updateBitCoinPrice() {
  fetch(bitcoinPriceUrl)
    .then(response => response.json())
    .then(data => {
      var price = data.bitcoin.cad;
      message2.textContent = 'Bitcoin is currently $' + price + '.';
    })
    .catch(error => {
        console.error('Error fetching Bitcoin price:', error);
        message2.textContent = 'Error fetching Bitcoin price';
      });
}

//display fear and greed index
function checkFearAndGreedIndex() {
  fetch(fearAndGreedIndexUrl)
    .then(response => response.json())
    .then(data => {
      const fearAndGreedIndex = data.data[0].value;
      if(fearAndGreedIndex > 55 && fearAndGreedIndex <= 75) {
        message1.textContent = `It's NOT a good time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 55-75.`;
        thumb.src = 'images/down.png';
      } 
      else if(fearAndGreedIndex > 45 && fearAndGreedIndex <= 55){
        message1.textContent = `It's an okay time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 45-55.`;
        thumb.src = 'images/up.png';
      }
      else if(fearAndGreedIndex > 25 && fearAndGreedIndex <= 45) {
        message1.textContent = `It IS a good time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 25-45.`;
        thumb.src = 'images/up.png';
      }
      else if(fearAndGreedIndex => 0 && fearAndGreedIndex <= 25) {
        message1.textContent = `It IS a very good time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 0-25.`;
        thumb.src = 'images/up.png';
      }
      else if(fearAndGreedIndex > 75 && fearAndGreedIndex <= 100) {
        message1.textContent = `It's a VERY BAD time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 75-100.`;
        thumb.src = 'images/down.png';
      }
    })
    .catch(error => {
      message.textContent = 'Error fetching Crypto Fear and Greed Index.';
    });
}

//Loads the google chrome extension when clicked
document.addEventListener('DOMContentLoaded', function() { 
  updateEtheriumPrice();
  updateBitCoinPrice();
  checkFearAndGreedIndex();
  setInterval(checkFearAndGreedIndex, 60000);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayEthGraph() {
  fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=cad&days=30')
    .then(response => response.json())
    .then(data => {
      const prices = data.prices.map(price => {
        return {
          x: new Date(price[0]),
          y: price[1]
        };
      });
    const currentMonth = new Date();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const ctx = document.getElementById('ethChart');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price of Etherium Over a Month',
          data: prices,
          backgroundColor: 'rgba(0, 119, 204, 0.3)',
          borderColor: 'rgba(0, 119, 204, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  });
}

function displayBitcoinGraph() {
  fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=30')
    .then(response => response.json())
    .then(data => {
      const prices = data.prices.map(price => {
        return {
          x: new Date(price[0]),
          y: price[1]
        };
      });
    const currentMonth = new Date();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const ctx = document.getElementById('ethChart');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price of Bitcoin Over a Month',
          data: prices,
          backgroundColor: 'rgba(0, 119, 204, 0.3)',
          borderColor: 'rgba(0, 119, 204, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  });
}

//Event Listener that opens etherium graph
const container = document.querySelector('.container');
const ethButton = document.querySelector('.currentEtheriumPrice');
const bitcoinButton = document.querySelector('.currentBitcoinPrice');
ethButton.addEventListener('click', () => {
  if(container.style.height === '300px') {
    container.style.height = '75px';
  }
  else {
    container.style.height = '300px';
    displayEthGraph();
  }  
});

//Event Listener that opens bitcoin graph
bitcoinButton.addEventListener('click', () => {
  if(container.style.height === '300px') {
    container.style.height = '75px';
  }
  else {
    container.style.height = '300px';
    displayBitcoinGraph();
  }  
});