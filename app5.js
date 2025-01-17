const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0; 
  let total = Number(req.query.total) || 0; 
  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement;
  if (hand === cpu) {
      judgement = '引き分け';
  } else if (
      (hand === 'グー' && cpu === 'チョキ') ||
      (hand === 'チョキ' && cpu === 'パー') ||
      (hand === 'パー' && cpu === 'グー')
  ) {
      judgement = '勝ち';
      win += 1; 
  } else {
      judgement = '負け';
  }
  total += 1; 
  const display = {
      your: hand,
      cpu: cpu,
      judgement: judgement,
      win: win,
      total: total,
  };

  res.render('janken', display);
});

app.get("/attimuite", (req, res) => {
  let win = Number(req.query.win) || 0; 
  let total = Number(req.query.total) || 0; 
  let playerDirection = req.query.direction; 
  const validDirections = ['上', '下', '左', '右'];
  
  // プレイヤーが方向を指定していない場合
  if (!validDirections.includes(playerDirection)) {
    return res.render('attimuite', {
      win: win,
      total: total,
      errorMessage: '「上」、「下」、「左」、「右」のいずれかを入力してください。',
      acchiResult: null  
    });
  }

  const cpuDirection = validDirections[Math.floor(Math.random() * validDirections.length)];

  let acchiResult;
  if (playerDirection === cpuDirection) {
    acchiResult = 'あなたの勝ち！';
    win += 1;  
  } else {
    acchiResult = '引き分けです。';
  }
  total += 1;  
  const display = {
    playerDirection: playerDirection,
    cpuDirection: cpuDirection,
    acchiResult: acchiResult,
    win: win,
    total: total,
    errorMessage: req.query.errorMessage || ''
  };

  res.render('attimuite', display);
});
app.get("/count", (req, res) => {
  const express = require('express');
  const app = express();
  const path = require('path');
  
  app.set('view engine', 'ejs');
 
  app.set('views', path.join(__dirname, 'views'));

      const inputText = req.query.inputText || '';  
      const charCount = inputText.length;  
      const doubleCount = charCount * 2;            
      const display = {
          inputText: inputText,   
          charCount: charCount,   
          doubleCount: doubleCount  
      };
  
      res.render('count', display);  
  });

 
  
app.listen(8080, () => console.log("Example app listening on port 8080!"));
