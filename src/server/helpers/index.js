module.exports = {
  // Checks if value is a null-like value
  isNully: (value) => {
    value = value.trim();
    return value === undefined || value === "" || value === null;
  },
};
