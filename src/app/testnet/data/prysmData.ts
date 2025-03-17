export const prysmData = {
    name: "Prysm Network",
    chainId: "prysm-devnet-1",
    logo: "/logos/prysm.png", // Sesuaikan path logo sesuai struktur proyekmu
    description:
      "PRYSM Network is a modular blockchain focused on scalability, interoperability, and cost-efficiency. It enables seamless communication between blockchains using Inter-Blockchain Communication (IBC), allowing developers to build cross-chain applications efficiently.",
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
        code: `VER="1.21.6"
  sudo rm -rf /usr/local/go
  curl -Ls https://go.dev/dl/go$VER.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
  echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
  source $HOME/.bash_profile
  go version`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Install Binary",
        code: `cd $HOME
  rm -rf prysm
  git clone https://github.com/kleomedes/prysm prysm
  cd prysm
  git checkout v0.1.0-devnet
  make install`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Initialize The Node",
        code: `prysmd init "YourName" --chain-id prysm-devnet-1`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Download Genesis & Addrbook",
        code: `curl -L https://snapshot.sychonix.com/testnet/prysm/genesis.json > $HOME/.prysm/config/genesis.json
  curl -L https://snapshot.sychonix.com/testnet/prysm/addrbook.json > $HOME/.prysm/config/addrbook.json`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Configure Seeds and Peers",
        code: `SEEDS="b410c0c1c4c13c161d2ce9ecdb051470a5e57d61@prysm-testnet.sychonix.com:19756"
  PEERS="$(curl -sS https://rpc-prysm-t.sychonix.com/net_info | jq -r '.result.peers[] | "\\(.node_info.id)@\\(.remote_ip):\\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\\n|,|g;s|.$||')"
  sed -i -e "s|^seeds *=.*|seeds = '\\"$SEEDS\\"'|; s|^persistent_peers *=.*|persistent_peers = '\\"$PEERS\\"'|" $HOME/.prysm/config/config.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Customize Pruning",
        code: `sed -i \\
    -e 's|^pruning *=.*|pruning = "custom"|' \\
    -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \\
    -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \\
    $HOME/.prysm/config/app.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer",
        code: `sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \\"0.0uprysm\\"|" $HOME/.prysm/config/app.toml
  sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.prysm/config/config.toml
  sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/.prysm/config/config.toml`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Create Service File",
        code: `sudo tee /etc/systemd/system/prysmd.service > /dev/null <<EOF
  [Unit]
  Description=prysm testnet node
  After=network-online.target
  [Service]
  User=$USER
  ExecStart=$(which prysmd) start
  Restart=always
  RestartSec=3
  LimitNOFILE=65535
  [Install]
  WantedBy=multi-user.target
  EOF`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Download Current Snapshot",
        code: `curl "https://snapshot.sychonix.com/testnet/prysm/prysm-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.prysm"`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Enable the Service and Start the Node",
        code: `sudo systemctl daemon-reload
  sudo systemctl enable prysmd.service
  sudo systemctl restart prysmd.service && sudo journalctl -u prysmd.service -f --no-hostname -o cat`,
        rounded: "xl",
      },
    ],
  };