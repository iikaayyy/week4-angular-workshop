// server/listen.js
module.exports = (http) => {
    const PORT = 3000;
    http.listen(PORT, () =>
      console.log(`Socket server listening at http://localhost:${PORT}`)
    );
  };
  