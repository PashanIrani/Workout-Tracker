import React, { useState } from "react";
import '../styles/Homepage.scss'

const Homepage = () => {

  return (
    <div className="Page Homepage">
      <h1>🏋️‍♀️ Werk It! 🏋️‍♀️</h1>
      <p>CMPT 354's workout app of choice!</p>

      <div className="image-container">
        <img className="homepage-image" src="https://media1.giphy.com/media/Uno27COfoYlH2/giphy.gif?cid=ecf05e474b63yaefr0avpa0wywmvp93747213wtpbfps1ftg&rid=giphy.gif&ct=g" alt="welcome image" />
      </div>

      <div className="button-container">
        <button onClick={() => location.href="/login"}>Sign In 💪</button>
        <a href="/signup">Don't have an account? Sign up!</a>
      </div>

      <p id="copyright">© 2022 Pashan Irani, Khanh Vy Bui & Bhakti Bhanushali</p>
    </div>
  );
};

export default Homepage;
