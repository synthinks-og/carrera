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
        code={`cd $HOME && mkdir -p go/bin/
git clone --depth 1 --branch v0.6.5.1 https://github.com/kopi-money/kopi.git ~/kopi
cd kopi
make install`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Initialize The Node"
        code={`kopid config set client chain-id kopi-test-6
kopid config set client node tcp://localhost:11657
kopid config set client keyring-backend os
kopid init $MONIKER --chain-id kopi-test-6`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Download Genesis & Addrbook"
        code={`curl -Ls https://snapshot-2.sychonix.com/testnet/kopi/genesis.json > $HOME/.kopid/config/genesis.json
curl -Ls https://snapshot-2.sychonix.com/testnet/kopi/addrbook.json > $HOME/.kopid/config/addrbook.json`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Configure Seeds and Peers"
        code={`SEEDS="12ce235e2f141237cff68cf0544a0de80e55bcea@kopi-testnet.sychonix.com:11656,7427da3a793f0c7f08f4034215b6f310e214fb28@95.217.154.60:26656"
PEERS="$(curl -sS https://rpc-kopi-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.kopid/config/config.toml`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Update Port Configuration"
        code={`sed -i -e "s%:1317%:11617%; s%:8080%:11680%; s%:9090%:11690%; s%:9091%:11691%; s%:8545%:11645%; s%:8546%:11646%; s%:6065%:11665%" $HOME/.kopid/config/app.toml
sed -i -e "s%:26658%:11658%; s%:26657%:11657%; s%:6060%:11660%; s%:26656%:11656%; s%:26660%:11661%" $HOME/.kopid/config/config.toml`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Customize Pruning"
        code={`sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.kopid/config/app.toml`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer"
        code={`sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0ukopi\"|" $HOME/.kopid/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.kopid/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.kopid/config/config.toml`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Create Service File"
        code={`sudo tee /etc/systemd/system/kopid.service > /dev/null <<EOF
[Unit]
Description=kopi testnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which kopid) start
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
        code={`curl "https://snapshot-2.sychonix.com/testnet/kopi/kopi-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.kopid"`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Enable the Service and Start the Node"
        code={`sudo systemctl daemon-reload
sudo systemctl enable kopid.service
sudo systemctl restart kopid.service && sudo journalctl -u kopid.service -f --no-hostname -o cat`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Create Validator"
        code={`kopid tendermint show-validator`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Create validator.json file"
        code={`sudo nano $HOME/.kopid/validator.json
{
  "pubkey": {"#pubkey"},
  "amount": "", 
  "moniker": "", 
  "identity": "",
  "website": "",
  "security": "", 
  "details": "", 
  "commission-rate": "0.05",
  "commission-max-rate": "0.2",
  "commission-max-change-rate": "0.05",
  "min-self-delegation": "1"
}`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        code={`kopid tx staking create-validator $HOME/.kopid/validator.json \
--from wallet \
--chain-id kopi-test-6`}
        rounded="lg"
      />
    </div>
  );
};

export default Installation;
