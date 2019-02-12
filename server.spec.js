const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("get route", () => {
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
    it("should return an OK status code from the get route", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/games");
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("realse year should always be an integer", async () => {
      const response = await request(server).get("/games");
      expect(response.body[0].releaseYear).toBeGreaterThan(1970);
    });

    it("should always return an array", async () => {
      const response = await request(server).get("/games").send(goodData);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});

describe("post route", () => {
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

  let postData = {
    title: "Pascale's Game",
    genre: "Arcade",
    releaseYear: 1980
  };

  it("should return an OK status code from the post route", async () => {
    const expectedStatusCode = 200;
    const response = await request(server)
      .post("/games")
      .set("Accept", "application/json");
    expect(response.status)
      .toEqual(expectedStatusCode)
    
  
  });

  it("should return a 422 status code if required information is not complete", async () => {
    request(server)
      .post("/games")
      .send(badData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(422)
      .expect('"games not created, incomplete info provided"')
    });

    it("should return a JSON object fron the post route", async () => {
      const response = await request(server).post("/games");
      expect(response.type).toEqual("application/json");
    });
 
});
