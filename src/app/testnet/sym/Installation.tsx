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
        code={`VER="1.21.6"
sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go$VER.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version`}
        rounded="xl"
      />



<CodeBox
        language="bash"
        title="Install Binary"
        code={`cd $HOME
git clone https://github.com/Orchestra-Labs/symphony
cd symphony
git checkout v0.4.1
make install`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Initialize The Node"
        code={`symphonyd init $MONIKER --chain-id symphony-testnet-4
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.symphonyd/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"symphony-testnet-4\"|" $HOME/.symphonyd/config/client.toml
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12157\"|" $HOME/.symphonyd/config/client.toml`}
        rounded="xl"
      />



<CodeBox
        language="bash"
        title="Download Genesis & Addrbook"
        code={`curl -L https://snapshot.sychonix.com/testnet/symphony/genesis.json > $HOME/.symphonyd/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/symphony/addrbook.json > $HOME/.symphonyd/config/addrbook.json`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Configure Seeds and Peers"
        code={`SEEDS="354d05a86bb1649f680a1c038f17f7f0ea83b4cc@symphony-testnet.sychonix.com:12156"
PEERS="$(curl -sS https://rpc-symphony-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.symphonyd/config/config.toml`}
        rounded="xl"
      />



<CodeBox
        language="bash"
        title="Update Port Configuration"
        code={`sed -i -e "s%:1317%:12117%; s%:8080%:12180%; s%:9090%:12190%; s%:9091%:12191%; s%:8545%:12145%; s%:8546%:12146%; s%:6065%:12165%" $HOME/.symphonyd/config/app.toml
sed -i -e "s%:26658%:12158%; s%:26657%:12157%; s%:6060%:12160%; s%:26656%:12156%; s%:26660%:12161%" $HOME/.symphonyd/config/config.toml`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Customize Pruning"
        code={`sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.symphonyd/config/app.toml`}
        rounded="xl"
      />



<CodeBox
        language="bash"
        title="Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer"
        code={`sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.25note\"|" $HOME/.symphonyd/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.symphonyd/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.symphonyd/config/config.toml`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Create Service File"
        code={`sudo tee /etc/systemd/system/symphonyd.service > /dev/null <<EOF
[Unit]
Description=symphony node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which symphonyd) start
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
        code={`curl "https://snapshot.sychonix.com/testnet/symphony/symphony-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.symphonyd"`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Enable the Service and Start the Node"
        code={`sudo systemctl daemon-reload
sudo systemctl enable symphonyd.service
sudo systemctl restart symphonyd.service && sudo journalctl -u symphonyd.service -f --no-hostname -o cat`}
        rounded="xl"
      />

    </div>
  );
};

export default Installation;
