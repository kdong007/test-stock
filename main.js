import yahoo from "yahoo-finance";
import _ from "lodash";
import numeral from "numeral";
import moment from "moment";

const interval = 100;

const stockQuery = {
    symbol: "FAS",
    from: "2016-06-01",
    to: "2019-02-17"
};

yahoo.historical(stockQuery, (err, quotes) => {
    quotes.reverse();

    const dateArr = _.map(quotes, ({ date }) =>
        moment(date).format("YYYY-MM-DD")
    );
    const priceArr = _.map(quotes, "close");
    const diffArr = _(priceArr)
        .map((price, index) =>
            _(priceArr)
                .slice(index + 1, index + 1 + interval)
                // .map(p => Math.abs(p - price))
                .map(p => Math.abs(p - price) / price)
                .map(p => numeral(p).format("00.00%"))
                .max()
        )
        .value();

    _.zip(dateArr, priceArr, diffArr).forEach(arr => console.log(arr));
});
