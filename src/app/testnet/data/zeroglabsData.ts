export const zeroglabsData = {
    name: "0G Labs",
    chainId: "zgtendermint_16600-2", // Chain ID sesuai dengan yang diberikan
    logo: "/logos/0g.jpg", // Sesuaikan path logo sesuai struktur proyekmu
    description:
      "0G is the first decentralized AI operating system with a Layer 1 ecosystem for AI and Web3. Its modular architecture ensures scalability, interoperability, and security, enabling seamless data availability and decentralized AI applications (dApps) without fragmentation.",
    installationSteps: [
      {
        language: "bash",
        title: "Install Dependencies",
        code: `sudo apt update && sudo apt upgrade -y
  sudo apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev aria2 -y`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Install Go",
        code: `sudo rm -rf /usr/local/go
  curl -Ls https://go.dev/dl/go1.21.13.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
  eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
  eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Install Binary",
        code: `cd $HOME
  rm -rf 0g-chain
  wget -O 0gchaind https://github.com/0glabs/0g-chain/releases/download/v0.5.1/0gchaind-linux-v0.5.1
  chmod +x $HOME/0gchaind
  sudo mv $HOME/0gchaind $HOME/go/bin`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Initialize The Node",
        code: `0gchaind init $MONIKER --chain-id zgtendermint_16600-2
  sed -i -e "s|^node *=.*|node = \\"tcp://localhost:13357\\"|" $HOME/.0gchain/config/client.toml
  sed -i -e "s|^keyring-backend *=.*|keyring-backend = \\"os\\"|" $HOME/.0gchain/config/client.toml
  sed -i -e "s|^chain-id *=.*|chain-id = \\"zgtendermint_16600-2\\"|" $HOME/.0gchain/config/client.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Download Genesis & Addrbook",
        code: `curl -L https://snapshot.sychonix.com/testnet/og/genesis.json > $HOME/.0gchain/config/genesis.json
  curl -L https://snapshot.sychonix.com/testnet/og/addrbook.json > $HOME/.0gchain/config/addrbook.json`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Configure Seeds and Peers",
        code: `SEEDS="59527333172e098dd101f9371e0f39ae26f3e0a7@og-testnet.sychonix.com:13356"
  PEERS="$(curl -sS https://rpc-og-t.sychonix.com/net_info | jq -r '.result.peers[] | "\\(.node_info.id)@\\(.remote_ip):\\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\\n|,|g;s|.$||')"
  sed -i -e "s|^seeds *=.*|seeds = '\\"$SEEDS\\"'|; s|^persistent_peers *=.*|persistent_peers = '\\"$PEERS\\"'|" $HOME/.0gchain/config/config.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Update Port Configuration",
        code: `sed -i -e "s%:1317%:13317%; s%:8080%:13380%; s%:9090%:13390%; s%:9091%:13391%; s%:8545%:13345%; s%:8546%:13346%; s%:6065%:13365%" $HOME/.0gchain/config/app.toml
  sed -i -e "s%:26658%:13358%; s%:26657%:13357%; s%:6060%:13360%; s%:26656%:13356%; s%:26660%:13361%" $HOME/.0gchain/config/config.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Customize Pruning",
        code: `sed -i \\
    -e 's|^pruning *=.*|pruning = "custom"|' \\
    -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \\
    -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \\
    $HOME/.0gchain/config/app.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer",
        code: `sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \\"0ua0gi\\"|" $HOME/.0gchain/config/app.toml
  sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.0gchain/config/config.toml
  sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/.0gchain/config/config.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Create Service File",
        code: `sudo tee /etc/systemd/system/0gchaind.service > /dev/null <<EOF
  [Unit]
  Description=0G node
  After=network-online.target
  [Service]
  User=$USER
  WorkingDirectory=$HOME/.0gchain
  ExecStart=$(which 0gchaind) start --home $HOME/.0gchain --log_output_console
  Restart=on-failure
  RestartSec=5
  LimitNOFILE=65535
  [Install]
  WantedBy=multi-user.target
  EOF`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Download Current Snapshot",
        code: `curl "https://snapshot.sychonix.com/testnet/og/og-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.0gchain"`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Enable the Service and Start the Node",
        code: `sudo systemctl daemon-reload
  sudo systemctl enable 0gchaind.service
  sudo systemctl restart 0gchaind.service && sudo journalctl -u 0gchaind.service -f --no-hostname -o cat`,
        rounded: "xl",
      },
    ],
  };