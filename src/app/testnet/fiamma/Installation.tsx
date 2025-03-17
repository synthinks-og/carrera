"use client";

import React from "react";
import CodeBox from "./CodeBox";

const Installation: React.FC = () => {
  return (
    <div className="text-white">
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
        title="Install GO"
        code={`sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.23.2.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Install Binary"
        code={`cd $HOME
rm -rf fiamma
git clone https://github.com/fiamma-chain/fiamma.git
cd fiamma
git checkout v1.0.0
make install`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Initialize The Node"
        code={`fiammad init $MONIKER --chain-id fiamma-testnet-1
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12257\"|" $HOME/.fiamma/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.fiamma/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"fiamma-testnet-1\"|" $HOME/.fiamma/config/client.toml`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Download Genesis & Addrbook"
        code={`curl -L https://snapshot.sychonix.com/testnet/fiamma/genesis.json > $HOME/.fiamma/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/fiamma/addrbook.json > $HOME/.fiamma/config/addrbook.json`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Configure Seeds and Peers"
        code={`SEEDS="7b3421f0c36ed44a247ca1bdb281e2639e8e5e0e@fiamma-t.sychonix.com:12256"
PEERS="$(curl -sS https://rpc-fiamma-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.fiamma/config/config.toml`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Update Port Configuration"
        code={`sed -i -e "s%:1317%:11617%; s%:8080%:11680%; s%:9090%:11690%; s%:9091%:11691%; s%:8545%:11645%; s%:8546%:11646%; s%:6065%:11665%" $HOME/.fiamma/config/app.toml
sed -i -e "s%:26658%:11658%; s%:26657%:11657%; s%:6060%:11660%; s%:26656%:11656%; s%:26660%:11661%" $HOME/.fiamma/config/config.toml`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Customize Pruning"
        code={`sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.fiamma/config/app.toml`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer"
        code={`sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.00001ufia\"|" $HOME/.fiamma/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.fiamma/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.fiamma/config/config.toml`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Create Service File"
        code={`sudo tee /etc/systemd/system/fiammad.service > /dev/null <<EOF
[Unit]
Description=fiamma node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which fiammad) start
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
        code={`curl "https://snapshot.sychonix.com/testnet/fiamma/fiamma-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.fiamma"`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Enable the Service and Start the Node"
        code={`sudo systemctl daemon-reload
sudo systemctl enable fiammad.service
sudo systemctl restart fiammad.service && sudo journalctl -u fiammad.service -f --no-hostname -o cat`}
        rounded="xl"
      />

    </div>
  );
};

export default Installation;
