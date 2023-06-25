import React, { useState } from "react";
import * as Components from "./Components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Login() {
  return (
    <Components.Container>
      <Components.Title>Welcome!</Components.Title>
      <Components.Paragraph>
        please connect your wallet for a deep dive into the Manor
      </Components.Paragraph>
      <ConnectButton
        chainStatus="none"
        showBalance={false}
        accountStatus="none"
      />
    </Components.Container>
  );
}

export default Login;
