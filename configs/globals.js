// const { ConnectionStrings } = require("../../lesson08/configs/globals");
require("dotenv").config();

const configurations = {
  ConnectionStrings: {
    MongoDB: "mongodb+srv://carlos:3KDCgnBktDPMRbZ4@cluster0.7wsvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
  Authentication: {
    GitHub: {
      ClientId: process.env.GITHUB_CLIENT_ID,
      ClientSecret: process.env.GITHUB_CLIENT_SECRET,
      CallbackUrl: process.env.GITHUB_CALLBACK_URL,
    },
    Google: {
      ClientId: process.env.GOOGLE_CLIENT_ID,
      ClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      CallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
  },
};

module.exports = configurations;
