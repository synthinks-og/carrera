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
        title="Install Go"
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
wget -O junctiond https://github.com/airchains-network/junction/releases/download/v0.2.0/junctiond-linux-amd64
chmod +x junctiond
mv junctiond $HOME/go/bin/`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Initialize The Node"
        code={`juntiond config node tcp://localhost:19657
junctiond config keyring-backend os
junctiond config chain-id junction
junctiond init "YourName" --chain-id junction`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Download Genesis & Addrbook"
        code={`curl -L https://snapshot.sychonix.com/testnet/airchains/genesis.json > $HOME/.junction/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/airchains/addrbook.json > $HOME/.junction/config/addrbook.json`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Configure Seeds and Peers"
        code={`sed -i -e 's|^seeds *=.*|seeds = "575e98598e9813a26576759c7ef70fd38d2516a4@junction-testnet-rpc.synergynodes.com:15656,04e2fdd6ec8f23729f24245171eaceae5219aa91@airchains-testnet-seed.itrocket.net:19656,aeaf101d54d47f6c99b4755983b64e8504f6132d@airchain-testnet-peer.dashnode.org:28656,bb26fc8cef05cee75d4cae3f25e17d74c7913967@airchains-t.seed.stavr.tech:4476,df949a46ae6529ae1e09b034b49716468d5cc7e9@testnet-seeds.stakerhouse.com:13756,48887cbb310bb854d7f9da8d5687cbfca02b9968@35.200.245.190:26656,60133849b4c83531eb2d835970035a0f08868658@65.109.93.124:28156,df2a56a208821492bd3d04dd2e91672657c79325@airchain-testnet-peer.cryptonode.id:27656,04e2fdd6ec8f23729f24245171eaceae5219aa91@airchains-testnet-seed.itrocket.net:19656,3dc2f101876e1a26730f99c06a5a2eb6e2cc2349@65.21.69.53:33656"|' $HOME/.junction/config/config.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Update Port Configuration"
        code={`sed -i -e "s%:1317%:19617%; s%:8080%:19680%; s%:9090%:19690%; s%:9091%:19691%; s%:8545%:19645%; s%:8546%:19646%; s%:6065%:19665%" $HOME/.junction/config/app.toml
sed -i -e "s%:26658%:19658%; s%:26657%:19657%; s%:6060%:19660%; s%:26656%:19656%; s%:26660%:19661%" $HOME/.junction/config/config.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Customize Pruning"
        code={`sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.junction/config/app.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer"
        code={`sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.00025amf\"|" $HOME/.junction/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.junction/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.junction/config/config.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Create Service File"
        code={`sudo tee /etc/systemd/system/junctiond.service > /dev/null <<EOF
[Unit]
Description=airchains testnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which junctiond) start
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
        code={`curl "https://snapshot.sychonix.com/testnet/airchains/airchains-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.junction"`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Enable the Service and Start the Node"
        code={`sudo systemctl daemon-reload
sudo systemctl enable junctiond.service
sudo systemctl restart junctiond.service && sudo journalctl -u junctiond.service -f --no-hostname -o cat`}
        rounded="xl"
      />

    </div>
  );
};

export default Installation;
