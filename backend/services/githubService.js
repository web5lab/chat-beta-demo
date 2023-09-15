const axios = require("axios");
const qs = require("qs");

const getGithubOathToken = async ({ code }) => {
  const rootUrl = "https://github.com/login/oauth/access_token";
  const options = {
    client_id: "cf1326a4b34906726e8e",
    client_secret: "f02e0ca212852d7561c61d4dcd1dfc8d737eb7a2",
    code,
  };

  const queryString = qs.stringify(options);

  try {
    const { data } = await axios.post(`${rootUrl}?${queryString}`, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const decoded = qs.parse(data);

    return decoded;
  } catch (err) {
    throw new Error(err);
  }
};

const getGithubUser = async ({ access_token }) => {
  try {
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  } catch (err) {
    // console.log("errr in github", err);
   return undefined
  }
};

module.exports = {
  getGithubOathToken,
  getGithubUser,
};
