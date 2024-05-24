#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generateNumber = () => {
  const numbers = [];
  while (numbers.length < 4) {
    const random = Math.floor(Math.random() * 10);
    if (!numbers.includes(random)) {
      numbers.push(random);
    }
  }
  return numbers.join('');
};

const countCowsAndBulls = (secret, guess) => {
  let cows = 0;
  let bulls = 0;

  for (let i = 0; i < secret.length; i += 1) {
    if (secret[i] === guess[i]) {
      bulls += 1;
    } else if (secret.includes(guess[i])) {
      cows += 1;
    }
  }

  return { cows, bulls };
};

const playGame = () => {
  const secretNumber = generateNumber();
  let attempts = 0;
  const maxAttempts = 10;
  console.log('Добро пожаловать в "Быки и коровы"! \nУгадайте 4-значное число без повторяющихся цифр. \nВедите ваше число: ');

  rl.on('line', (input) => {
    if (attempts >= maxAttempts) {
      console.log(`К сожалению, вы исчерпали все ${maxAttempts} попыток. Загаданное число было: ${secretNumber}`);
      rl.close();
    } else if (input.length !== 4 || !/^\d+$/.test(input) || new Set(input).size !== input.length) {
      console.log('Пожалуйста, введите 4-значный номер без повторяющихся цифр.');
    } else {
      const result = countCowsAndBulls(secretNumber, input);
      attempts += 1;
      if (result.bulls === 4) {
        console.log(`Поздравляю! Вы угадали число с ${attempts} попытки.`);
        rl.close();
      } else {
        console.log(`Коров: ${result.cows}, Быков: ${result.bulls}`);
      }
    }
  });
};

playGame();
