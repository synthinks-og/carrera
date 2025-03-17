"use client";

import React from "react";
import CodeBox from "./CodeBox";

const Installation: React.FC = () => {
  return (
    <div className="text-white w-full max-w-full overflow-x-hidden">
      <h2 className="font-bold mb-6 text-xl">Installation</h2>

      <CodeBox
        language="bash"
        title="Install Dependencies"
        code={`sudo apt update && sudo apt upgrade -y
sudo apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev aria2 -y`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Install Go"
        code={`sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.23.2.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Install Binary"
        code={`cd $HOME && mkdir -p go/bin/
git clone https://github.com/axone-protocol/axoned
cd axoned
git checkout v10.0.0
make install`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Initialize The Node"
        code={`axoned init $MONIKER --chain-id axone-dentrite-1
sed -i -e "s|^node *=.*|node = \\"tcp://localhost:12557\\"|" $HOME/.axoned/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \\"os\\"|" $HOME/.axoned/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \\"axone-dentrite-1\\"|" $HOME/.axoned/config/client.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Download Genesis & Addrbook"
        code={`curl -L https://snapshot.sychonix.com/testnet/axone/genesis.json > $HOME/.axoned/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/axone/addrbook.json > $HOME/.axoned/config/addrbook.json`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Configure Seeds and Peers"
        code={`SEEDS="5b1b9e288b538dfe2ea4600427cbde3a6ed58daf@axone-testnet.sychonix.com:12556"
PEERS="$(curl -sS https://rpc-axone-t.sychonix.com/net_info | jq -r '.result.peers[] | "\\(.node_info.id)@\\(.remote_ip):\\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '$SEEDS'|; s|^persistent_peers *=.*|persistent_peers = '$PEERS'|" $HOME/.axoned/config/config.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Update Port Configuration"
        code={`sed -i -e "s%:1317%:12517%; s%:8080%:12580%; s%:9090%:12590%; s%:9091%:12591%; s%:8545%:12545%; s%:8546%:12546%; s%:6065%:12565%" $HOME/.axoned/config/app.toml
sed -i -e "s%:26658%:12558%; s%:26657%:12557%; s%:6060%:12560%; s%:26656%:12556%; s%:26660%:12561%" $HOME/.axoned/config/config.toml`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Customize Pruning"
        code={`sed -i \\
  -e 's|^pruning *=.*|pruning = "custom"|' \\
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \\
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \\
  $HOME/.axoned/config/app.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer"
        code={`sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \\"0uaxone\\"|" $HOME/.axoned/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.axoned/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \\"null\\"/" $HOME/.axoned/config/config.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Create Service File"
        code={`sudo tee /etc/systemd/system/axoned.service > /dev/null <<EOF
[Unit]
Description=axone node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which axoned) start
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Download Current Snapshot"
        code={`curl "https://snapshot.sychonix.com/testnet/axone/axone-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.axoned"`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Enable the Service and Start the Node"
        code={`sudo systemctl daemon-reload
sudo systemctl enable axoned.service
sudo systemctl restart axoned.service && sudo journalctl -u axoned.service -f --no-hostname -o cat`}
        rounded="xl"
      />
    </div>
  );
};

export default Installation;