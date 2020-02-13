import React from "react";

export default function UserInfo(props) {
  let name = props.state.name;
  let country = props.state.country;
  // console.log(name);
  return (
    <div className="userInfo">
      {name ? (
        <h1>
          Hi {name} 
        </h1>
      ) : null}
    </div>
  );
}
