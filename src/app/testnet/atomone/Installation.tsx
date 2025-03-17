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
        code={`sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.13.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)`}
        rounded="xl"
      />


      <CodeBox
        language="bash"
        title="Install binary"
        code={`cd $HOME
git clone https://github.com/atomone-hub/atomone.git
cd atomone
git checkout v1.0.0
make install`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Initialize The Node"
        code={`atomoned init $MONIKER --chain-id atomone-testnet-1
sed -i -e "s|^node *=.*|node = \"tcp://localhost:13057\"|" $HOME/.atomone/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.atomone/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"atomone-testnet-1\"|" $HOME/.atomone/config/client.toml`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Download Genesis & Addrbook"
        code={`curl -L https://snapshot.sychonix.com/testnet/atomone/genesis.json > $HOME/.atomone/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/atomone/addrbook.json > $HOME/.atomone/config/addrbook.json`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Configure Seeds and Peers"
        code={`SEEDS="b16ab773dc794cdd3e0a3f561e8a15e3b3fe0613@atomone-testnet.sychonix.com:13056"
PEERS="$(curl -sS https://rpc-atomone-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.atomone/config/config.toml`}
        rounded="xl"
      />
            
<CodeBox
 language="bash"
 title="Update Port Configuration"
 code={`sed -i -e "s%:1317%:13017%; s%:8080%:13080%; s%:9090%:13090%; s%:9091%:13091%; s%:8545%:13045%; s%:8546%:13046%; s%:6065%:13065%" $HOME/.atomone/config/app.toml
sed -i -e "s%:26658%:13058%; s%:26657%:13057%; s%:6060%:13060%; s%:26656%:13056%; s%:26660%:13061%" $HOME/.atomone/config/config.toml`}
 rounded="xl"
/>
      
<CodeBox
 language="bash"
 title="Customize Pruning"
 code={`sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.atomone/config/app.toml`}
 rounded="xl"
/>
      
<CodeBox
 language="bash"
 title="Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer"
 code={`sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.025uatone\"|" $HOME/.atomone/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.atomone/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.atomone/config/config.toml`}
 rounded="xl"
/>
      
<CodeBox
 language="bash"
 title="Create Service File"
 code={`sudo tee /etc/systemd/system/atomoned.service > /dev/null <<EOF
[Unit]
Description=atomoned node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which atomoned) start
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
 code={`curl "https://snapshot.sychonix.com/testnet/atomone/atomone-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.atomone"`}
 rounded="xl"
/>
      
<CodeBox
 language="bash"
 title="Enable the Service and Start the Node"
 code={`sudo systemctl daemon-reload
sudo systemctl enable atomoned.service
sudo systemctl restart atomoned.service && sudo journalctl -u atomoned.service -f --no-hostname -o cat`}
 rounded="xl"
/>      
    </div>
  );
};

export default Installation;
