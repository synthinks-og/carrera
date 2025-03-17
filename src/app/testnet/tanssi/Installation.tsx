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
        code={`apt update && apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev libgmp3-dev tar clang bsdmainutils ncdu unzip llvm libudev-dev make protobuf-compiler -y`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Download Binary"
        code={`wget https://github.com/moondance-labs/tanssi/releases/download/v0.5.1/tanssi-node && \
chmod +x ./tanssi-node`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Create tanssi-data"
        code={`adduser tanssi_service --system --no-create-home
mkdir /var/lib/tanssi-data
sudo chown -R tanssi_service /var/lib/tanssi-data
mv ./tanssi-node /var/lib/tanssi-data`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Create a Systemd Service"
        code={`sudo tee /etc/systemd/system/tanssi.service > /dev/null << EOF
[Unit]
Description="Tanssi systemd service"
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=tanssi_service
SyslogIdentifier=tanssi
SyslogFacility=local7
KillSignal=SIGHUP
ExecStart=/var/lib/tanssi-data/tanssi-node \
--chain=dancebox \
--name=YOUR_NODE_NAME \
--sync=warp \
--base-path=/var/lib/tanssi-data/para \
--state-pruning=2000 \
--blocks-pruning=2000 \
--collator \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--database paritydb \
-- \
--name=tanssi-appchain \
--base-path=/var/lib/tanssi-data/container \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
-- \
--chain=westend_moonbase_relay_testnet \
--name=YOUR_NODE_NAME \
--sync=fast \
--base-path=/var/lib/tanssi-data/relay \
--state-pruning=2000 \
--blocks-pruning=2000 \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--database paritydb \
[Install]
WantedBy=multi-user.target
EOF`}
        rounded="xl"
      />

<CodeBox
        language="bash"
        title="Enable service and Start the Node"
        code={`systemctl enable tanssi.service
systemctl daemon-reload
systemctl restart tanssi.service && journalctl -f -u tanssi.service`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Create new Wallet"
        code={`./tanssi-node key generate -w24`}
        rounded="xl"
      />
    </div>
  );
};

export default Installation;
