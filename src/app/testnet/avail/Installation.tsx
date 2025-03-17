"use client";

import React from "react";
import CodeBox from "./CodeBox";

const Installation: React.FC = () => {
  return (
    <div className="text-white">
    <h2 className="font-bold mb-6 text-xl">Installation</h2>

      <CodeBox
        language="bash"
        title="Update and install packages"
        code={`sudo apt update
sudo apt install make clang pkg-config libssl-dev build-essential`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Create directory"
        code={`mkdir -p $HOME/avail-node
mkdir -p $HOME/avail-node/data
mkdir -p $HOME/avail-node/systemd`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Extract Binary"
        code={`cd avail-node
wget https://github.com/availproject/avail/releases/download/v1.8.0.0/amd64-ubuntu-2204-data-avail.tar.gz`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Extract File"
        code={`tar -xvzf amd64-ubuntu-2204-data-avail.tar.gz
cp amd64-ubuntu-2204-data-avail data-avail`}
        rounded="xl"
      />

      <CodeBox
        language="bash"
        title="Create a service file"
        code={`sudo tee $HOME/avail-node/systemd/availd.service > /dev/null <<EOF
[Unit]
Description=Avail Validator
After=network.target
StartLimitIntervalSec=0
[Service]
User=$(whoami)
Type=simple
Restart=always
RestartSec=120
ExecStart=$HOME/avail-node/data-avail --base-path $HOME/avail-node/data --chain goldberg --port 30333 --validator --name "YOUR_NAME"
[Install]
WantedBy=multi-user.target
EOF`}
        rounded="xl"
      />
      
<CodeBox
 language="bash"
 title="Enable and start the service"
 code={`sudo ln -sf $HOME/avail-node/systemd/availd.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable availd`}
 rounded="xl"
/>

<CodeBox
 language="bash"
 title="Start node"
 code={`sudo systemctl start availd`}
 rounded="xl"
/>
<CodeBox
 language="bash"
 title="Check node logs"
 code={`sudo journalctl -fu availd`}
 rounded="xl"
/>
<CodeBox
 language="bash"
 title="The node will output the following when started:"
 code={`2023-06-03 20:36:29 Avail Node
2023-06-03 20:36:29 ✌️  version 1.6.0-99b85257d6b
2023-06-03 20:36:29 ❤️  by Anonymous, 2017-2023
2023-06-03 20:36:29 📋 Chain specification: Avail Kate Testnet
2023-06-03 20:36:29 🏷  Node name: Carrera
2023-06-03 20:36:29 👤 Role:Authority
2023-06-03 20:36:29 💾 Database: RocksDb at /User/thunder/code/avail/data/chains/Avail Testnet_6831251e-0222-11ee-a2c3-c90377335962/db/full
2023-06-03 20:36:29 ⛓  Native runtime: data-avail-9 (data-avail-0.tx1.au11)
2023-06-03 20:36:35 👶 Creating empty BABE epoch changes on what appears to be first startup.
2023-06-03 20:36:35 🏷  Local node identity is: 12D3KooWPt7odw3aeq7azZDugXjNuUvQNPU58n1VRBzY1YBqsjkr
2023-06-03 20:36:35 Prometheus metrics extended with avail metrics
2023-06-03 20:36:35 💻 Operating system: macos
2023-06-03 20:36:35 💻 CPU architecture: aarch64
2023-06-03 20:36:35 📦 Highest known block at #0
2023-06-03 20:36:35 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-06-03 20:36:35 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 🏁 CPU score: 724.71 MiBs
2023-06-03 20:36:35 🏁 Memory score: 41.49 GiBs
2023-06-03 20:36:35 🏁 Disk score (seq. writes): 1.91 GiBs
2023-06-03 20:36:35 🏁 Disk score (rand. writes): 454.66 MiBs`}
 rounded="xl"
/>
    </div>
  );
};

export default Installation;
