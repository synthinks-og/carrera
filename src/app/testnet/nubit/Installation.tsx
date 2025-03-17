"use client";

import React from "react";
import CodeBox from "./CodeBox";

const Installation: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="font-bold mb-6 text-xl">Installation</h2>


      <CodeBox
        language="bash"
        title="Install dependencies"
        code={`sudo apt update && sudo apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Install GO"
        code={`ver="1.21.1"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
go version`}
        rounded="xl"
      />


<CodeBox
        language="bash"
        title="Install Binary"
        code={`curl -sL1 https://nubit.sh | bash`}
        rounded="lg"
      />wait until the node is running and then CTRL C to stop.


      <CodeBox
        language="bash"
        title="Create Service File"
        code={`sudo tee /etc/systemd/system/nubit.service > /dev/null << EOF
[Unit]
Description=Nubit Light Node
After=network-online.target
[Service]
User=$USER
ExecStart=/bin/bash -c 'curl -sL https://nubit.sh | bash'
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
        title="Enable Service"
        code={`sudo systemctl daemon-reload
sudo systemctl enable nubit`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Start Node"
        code={`sudo systemctl start nubit.service && sudo journalctl -u nubit.service -f --no-hostname -o cat`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Save Phrase"
        code={`cd nubit-node
sudo cat mnemonic.txt`}
        rounded="lg"
      />

    </div>
  );
};

export default Installation;
