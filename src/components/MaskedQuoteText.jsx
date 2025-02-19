import React from "react";

const MaskedQuoteText = ({ base, revealed }) => {
  return (
    <p>
      {base
        .split("")
        .map((char, index) =>
          /[a-zA-Z]/.test(char) && !revealed.has(char.toLowerCase())
            ? "_"
            : char
        )
        .join("")}
    </p>
  );
};

export default MaskedQuoteText;
