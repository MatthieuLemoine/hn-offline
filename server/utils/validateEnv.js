module.exports = variables =>
  variables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing env variable ${variable}`);
    }
  });
