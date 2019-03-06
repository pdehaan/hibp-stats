const axios = require("axios");

async function getBreaches() {
  const { data } = await axios.get("https://monitor.firefox.com/hibp/breaches");
  return data;
}

exports.getBreaches = getBreaches;
