const axios = require("axios");

async function getBreaches() {
  const res = await axios.get("https://haveibeenpwned.com/api/v2/breaches", {headers: {"User-Agent": "hibp-stats/1.0.0"}});
  return res.data;
}

exports.getBreaches = getBreaches;
