import React from "react";
import App from "../App";

export default function UserInfo(props) {
  let name = props.state.name;
  let country = props.state.country;

  console.log(name);

  return (
    <div>
      {name ? (
        <h1>
          Hi {name} from {country}
        </h1>
      ) : null}
    </div>
  );
}
