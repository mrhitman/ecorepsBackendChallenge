function getEnvValue(name, defaultValue) {
  const value = process.env[name];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return value;
  }

  throw new Error(`No requrired env variable:${name}`);
}

module.exports = {
  getEnvValue,
}