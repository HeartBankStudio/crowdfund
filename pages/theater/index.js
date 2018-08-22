import React, { Component } from "react";
import { currentOracle, Kiitos, BoxOffice } from "../scripts/contracts";

class TicketBooth extends Component {
    static async getInitialProps() {
        const kiitos = await Kiitos.deployed();
        const supply = await kiitos.totalSupply();
        const boxOffice = await BoxOffice.deployed();
        const listingFee = await boxOffice.listingFee();
        const oracle = await currentOracle;
        const usdPriceOfEth = await oracle.usdPriceOfEth();

        return {supply: supply.toNumber(), listingFee: listingFee.toNumber(), usdPriceOfEth: usdPriceOfEth.toNumber()};
    }

    spendTicketButton() {}

    renderStageScreen() {} // show trailer // button goes to dark background with movie clip

    renderAudienceMembers() {}

    render() {
        return <div>{this.props.supply} {this.props.listingFee} {this.props.usdPriceOfEth}</div>;
    }
}

export default TicketBooth;