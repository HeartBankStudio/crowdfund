const BoxOffice = artifacts.require("BoxOffice.sol");

contract('BoxOffice Film', accounts => {

  const owner = accounts[0];
  let boxOffice;

  beforeEach(async () => {
    const salesEndTime = Date.now() + 28*60*60*24;
    const price = web3.toWei(1, "finney");
    const ticketSupply = web3.toWei(1, "ether");
    const movieName = "Casablanca";
    const ticketSymbol = "CSBC";
    const logline = "An American expatriate meets a former lover, with unforeseen complications.";
    const poster = "ipfs hash";
    const trailer = "ipfs hash";

    boxOffice = await BoxOffice.deployed();
    await boxOffice.makeFilm(salesEndTime, price, ticketSupply, movieName, ticketSymbol, logline, poster, trailer);
  });

  it("should update film and token", async () => {
    const salesEndTime_ = Date.now() + 28*60*60*24;
    const price_ = web3.toWei(1, "finney");
    const movieName_ = "Casablanca";
    const ticketSymbol_ = "CSBC";
    const logline_ = "An American expatriate meets a former lover, with unforeseen complications.";
    const poster_ = "ipfs hash";
    const trailer_ = "ipfs hash";
   
    boxOffice.FilmUpdated().watch((err, res) => {
      ({filmIndex, salesEndTime, price, movieName, ticketSymbol, logline, poster, trailer} = res.args);
    });

    await boxOffice.updateFilm(0, salesEndTime_, price_, movieName_, ticketSymbol_, logline_, poster_, trailer_);
    
    assert.equal(filmIndex, 0);
    assert.equal(salesEndTime, salesEndTime_);
    assert.equal(price, price_);
    assert.equal(movieName, movieName_);
    assert.equal(ticketSymbol, ticketSymbol_);
    assert.equal(logline, logline_);
    assert.equal(poster, poster_);
    assert.equal(trailer, trailer_);
  });

  it("should purchase movie tickets", async () => {
   
  });

  it("should spend movie ticket", async () => {
   
  });

  it("should withdraw from fund", async () => {
   
  });

  it("should get audience members", async () => {
   
  });

  it("should authenticate audience member", async () => {
   
  });

  it("should get withdrawal", async () => {
   
  });

  it("should get film summary", async () => {
   
  });

  it("should get film stats", async () => {
   
  });

  it("should get box office stats", async () => {
   
  });

});