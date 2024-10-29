const axios = require("axios");
const price = async (req, res, next) => {
  const symbol = req.params.symbol;
  try {
    response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "9b5b5f6c-d6f9-428f-858e-eee8d0a195bb",
        },
      }
    );

    return res
      .status(200)
      .json({ price: response?.data?.data?.[symbol]?.quote?.USD?.price });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  price,
};
