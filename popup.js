function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const timezoneString = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
    document.getElementById('update-time').textContent = timeString;
    document.getElementById('timezone').textContent = timezoneString;
}
setInterval(updateTime, 1000);

document.addEventListener('DOMContentLoaded', function() {
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
              message1.textContent = `It's not a good time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 55-75.`;
              thumb.src = 'images/down.png';
            } 
            else if(fearAndGreedIndex > 45 && fearAndGreedIndex <= 55){
              message1.textContent = `It's an okay time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 45-55.`;
              thumb.src = 'images/up.png';
            }
            else if(fearAndGreedIndex > 25 && fearAndGreedIndex <= 45) {
              message1.textContent = `It's a good time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 25-45.`;
              thumb.src = 'images/up.png';
            }
            else if(fearAndGreedIndex => 0 && fearAndGreedIndex <= 25) {
              message1.textContent = `It's a very good time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 0-25.`;
              thumb.src = 'images/up.png';
            }
            else if(fearAndGreedIndex > 75 && fearAndGreedIndex <= 100) {
              message1.textContent = `It's a very bad time to buy crypto. \nThe Fear and Greed Index is ${fearAndGreedIndex} and within \nthe Greed range of 75-100.`;
              thumb.src = 'images/down.png';
            }
          })
          .catch(error => {
            message.textContent = 'Error fetching Crypto Fear and Greed Index.';
          });
      }
      
      updateEtheriumPrice();
      updateBitCoinPrice();
      checkFearAndGreedIndex();
      setInterval(updatePrice, 60000); // Update the price every minute
      setInterval(checkFearAndGreedIndex, 60000);
    });