const express = require("express");
const server = express();
server.use(express.json());

let goodData = [
  { title: "Pacman", genre: "Arcade", releaseYear: 1980 },
  {
    title: "Mrs Pacman",
    genre: "Arcade",
    releaseYear: 1982
  },
  {
    title: "Mortal Kombat",
    genre: "Arcade",
    releaseYear: 1990
  }
];

let postData = {
  title: "Pascale's Game",
  genre: "Arcade",
  releaseYear: 1980
};

let badData = [
  {
    genre: "Arcade",
    releaseYear: 1980
  },
  {
    title: "Pacman",
    releaseYear: 1980
  },
  {
    title: "Pacman",
    releaseYear: 1980
  }
];

server.get("/games", (req, res) => {
  return res.json(goodData);
});

server.post('/games', (req, res) =>{
  const games = req.body.games;
  goodData.push(req.body);
  res.status(200).json(goodData);
})

module.exports = server;
