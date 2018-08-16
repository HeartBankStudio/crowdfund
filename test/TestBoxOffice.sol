pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HeartBankToken.sol";
import "../contracts/BoxOffice.sol";

contract TestBoxOffice {

    BoxOffice boxOffice;
    uint public initialBalance = 1 ether;

    function beforeEach() public {
        HeartBankToken kiitos = new HeartBankToken();
        boxOffice = new BoxOffice(address(kiitos), DeployedAddresses.BoxOfficeOracle());
        Assert.isTrue(kiitos.addAdmin(address(boxOffice)), "should add admin");
        Assert.isTrue(boxOffice.makeFilm(now + 28 days, 1 finney, 1 ether, "title", "symbol", "logline", "ipfshash", "ipfshash"), "should make film");
    }

    function testUpdateFilm() public {
        Assert.isTrue(boxOffice.updateFilm(0, now + 30 days, 2 finney, "title2", "symbol2", "logline2", "ipfshash2", "ipfshash2"), "should update film");
    }

    function testBuyTickets() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
    }

    function testSpendTicket() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
        Assert.isTrue(boxOffice.spendTicket(0), "should spend ticket");
    }

    function testWithdrawFund() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
        Assert.isTrue(boxOffice.withdrawFund(0, msg.sender, 1 finney, "to pay screenwriter"), "should withdraw from fund");
    }

    function testUpdateFees() public {
        Assert.isTrue(boxOffice.updateFees(3, 2), "should update fees");
    }

    function testReturnExcessPayment() public {
        Assert.isTrue(boxOffice.buyTickets.value(3 finney)(0, 2), "should purchase tickets");
        Assert.isTrue(boxOffice.returnExcessPayment(msg.sender, 1 finney), "should return excess payment");
    }

}
