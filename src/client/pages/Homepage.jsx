import React, { useState } from "react";

const Homepage = () => {

  return (
    <div className="Page Homepage">
      <h1>Werk It! 🏋️‍♀️</h1>
      <p>A workout app. Werk It!</p>
      <button onClick={() => location.href="/login"}>Sign In 💪</button>
      <a href="/signup">Don't have an account? Sign up!</a>
    </div>
  );
};

export default Homepage;
