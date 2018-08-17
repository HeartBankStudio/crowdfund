import React, { Component } from "react";
import web3, { Kiitos, BoxOffice, currentOracle } from "../contracts";

class TicketBooth extends Component {
    async componentDidMount() {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();
        console.log(supply.toNumber(), usdPriceOfEth.toNumber());
    }

    render() {
        return <div>Homepage!</div>;
    }
}

export default TicketBooth;