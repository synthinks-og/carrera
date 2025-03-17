export const chainflipData = {
    name: "Chainflip",
    chainId: "chainflip",
    logo: "/logos/chainflip.png",
    description: "Chainflip is a decentralized protocol enabling cross-chain swaps, similar to Uniswap, allowing users to swap assets between blockchains without wrapped tokens or traditional bridging, using competitive JIT AMM pricing.",
    installationSteps: [
      {
        language: "bash",
        title: "Adding Chainflip APT Repo",
        code: `sudo mkdir -p /etc/apt/keyrings
  curl -fsSL repo.chainflip.io/keys/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/chainflip.gpg`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Verify the key’s authenticity",
        code: `gpg --show-keys /etc/apt/keyrings/chainflip.gpg`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Add Chainflip’s Repo to apt sources list",
        code: `echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/chainflip.gpg] https://repo.chainflip.io/perseverance/$(lsb_release -c -s) $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/chainflip.list`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Installing The Packages",
        code: `sudo apt update
  sudo apt install -y chainflip-cli chainflip-node chainflip-engine1.1`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Generating Validator Keys",
        code: `chainflip-cli generate-keys --path /etc/chainflip/keys`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Create Default Configurations for the CFE",
        code: `# Default configurations for the CFE
  [node_p2p]
  node_key_file = "/etc/chainflip/keys/node_key_file"
  ip_address = "IP_ADDRESS_OF_YOUR_NODE"
  port = "8078"
   
  [state_chain]
  ws_endpoint = "ws://127.0.0.1:9944"
  signing_key_file = "/etc/chainflip/keys/signing_key_file"
   
  [eth]
  # Ethereum private key file path. This file should contain a hex-encoded private key.
  private_key_file = "/etc/chainflip/keys/ethereum_key_file"
   
  [eth.rpc]
  ws_endpoint = "wss://my_local_geth_node:8546"
  http_endpoint = "https://my_local_geth_node:8545"
   
  # Optional
  # [eth.backup_rpc]
  # ws_endpoint = "wss://some_public_rpc.com:443/<secret_access_key>"
  # http_endpoint = "https://some_public_rpc.com:443/<secret_access_key>"
   
  [dot.rpc]
  ws_endpoint = "wss://rpc-pdot.chainflip.io:443"
  http_endpoint = "https://rpc-pdot.chainflip.io:443"
   
  # Optional
  # [dot.backup_rpc]
  # ws_endpoint = "wss://rpc-pdot2.chainflip.io:443"
  # http_endpoint = "https://rpc-pdot2.chainflip.io:443"
   
  [btc.rpc]
  basic_auth_user = "flip"
  basic_auth_password = "flip"
  http_endpoint = "http://a108a82b574a640359e360cf66afd45d-424380952.eu-central-1.elb.amazonaws.com"
   
  # Optional
  # [btc.backup_rpc]
  # basic_auth_user = "flip2"
  # basic_auth_password = "flip2"
  # http_endpoint = "http://second-node-424380952.eu-central-1.elb.amazonaws.com"
   
  # Optional (default: 36079)
  # [logging]
  # command_server_port = 36079`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Start the Node",
        code: `sudo systemctl start chainflip-node`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Check the service status",
        code: `systemctl status chainflip-node`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Check the Node Logs",
        code: `journalctl -f -u chainflip-node.service`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Restart the Node",
        code: `sudo systemctl restart chainflip-node`,
        rounded: "xl",
      },
    ],
  };