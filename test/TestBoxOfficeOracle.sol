pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "../contracts/BoxOfficeOracleStorage.sol";
import "../contracts/BoxOfficeOracle.sol";

contract TestBoxOfficeOracle {

    BoxOfficeOracle oracle;

    function beforeEach() public {
        BoxOfficeOracleStorage store = new BoxOfficeOracleStorage();
        oracle = new BoxOfficeOracle(address(store));
        store.addAdmin(address(oracle));
    }

    function testOwner() public {
        Assert.equal(oracle.owner(), address(this), "should return address of admin");
    }

    function testUsdPriceOfEth() public {
        Assert.equal(oracle.usdPriceOfEth(), 1, "should return price of ether in USD");
    }

    function testConvertToUsd() public {
        Assert.isTrue(oracle.setPrice(300), "should set new price of ether in USD");
        Assert.equal(oracle.convertToUsd(1 ether), 300, "should convert wei to USD");
    }

    function testUpdatePrice() public {
        Assert.isTrue(oracle.updatePrice(), "should emit event for oracle to catch");
    }

    function testSetPrice() public {
        Assert.isTrue(oracle.setPrice(300), "should set new price of ether in USD");
        Assert.equal(oracle.usdPriceOfEth(), 300, "should return new price of ether in USD");
    }

    function testKill() public {
        Assert.isTrue(address(oracle).call(bytes4(keccak256("kill()"))), "should self-destruct");
    }

}