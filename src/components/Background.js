import React from "react";
import zIndex from "@material-ui/core/styles/zIndex";

const World = () => (
  <div style={{
    position: "absolute",
    borderColor:'black',
    backgroundImage:'url("../assets/water.png")',
    backgroundSize: "cover",
    backgroundRepeat:'no-repeat',
    width: "100%",
    height: "100%",
  zIndex:-1 }}
  />
);

export default World;
