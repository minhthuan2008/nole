const mineflayer = require('mineflayer');
const vec3 = require('vec3');
const keep_alive = require('./keep_alive.js')

const bot = mineflayer.createBot({
  host: 'M_thuann7Qn.aternos.me',
  port: 63131,
  username: 'ngu',
  skin: {
    url: 'https://example.com/your-skin-url.png' // Replace with your skin URL
  }
});

// Define the four target block positions
const targetBlockPositions = [
  vec3(360, 66, 122),  // Position 1
  vec3(361, 66, 122),  // Position 2
  vec3(362, 66, 122),  // Position 3
  vec3(363, 66, 122)   // Position 4
];

bot.on('login', () => {
  console.log('Bot logged in and ready to mine!');
});

bot.once('spawn', () => {
  let currentTargetIndex = 0;

  function mineLoop() {
    const targetBlockPos = targetBlockPositions[currentTargetIndex];
    const targetBlock = bot.blockAt(targetBlockPos);

    if (targetBlock && bot.canDigBlock(targetBlock)) {
      console.log(`Mining block: ${targetBlock.name} at ${targetBlock.position}`);
      bot.dig(targetBlock, (err) => {
        if (err) {
          console.log(`Error while mining: ${err}`);
        } else {
          console.log('Block mined successfully!');
        }
      });
    } else {
      console.log(`Waiting for block at position ${currentTargetIndex + 1} to become available...`);
    }

    // Move to the next target position after a delay
    setTimeout(() => {
      currentTargetIndex = (currentTargetIndex + 1) % targetBlockPositions.length; // Loop back to the first position
      mineLoop();
    }, 2000); // 2 seconds delay before checking the next position
  }

  mineLoop();  // Start the mining loop
});

bot.on('error', err => {
  console.log(`Bot error: ${err}`);
});

bot.on('end', () => {
  console.log('Bot disconnected from server.');
});
