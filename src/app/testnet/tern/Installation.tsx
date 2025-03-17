"use client";

import React from "react";
import CodeBox from "./CodeBox";

const Installation: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="font-bold mb-6 text-xl">Installation</h2>


      <CodeBox
        language="bash"
        title="Download Binary"
        code={`curl -L -o executor-linux-v0.27.0.tar.gz https://github.com/t3rn/executor-release/releases/download/v0.27.0/executor-linux-v0.27.0.tar.gz && tar -xzvf executor-linux-v0.27.0.tar.gz && rm -rf executor-linux-v0.27.0.tar.gz && cd executor/executor/bin`}
        rounded="lg"
      />

      <CodeBox
        language="bash"
        title="Create a service"
        code={`sudo tee /etc/systemd/system/t3rn-executor.service > /dev/null <<EOF
[Unit]
Description=t3rn Executor Service
After=network.target
[Service]
ExecStart=$HOME/executor/executor/bin/executor
Environment="NODE_ENV=testnet"
Environment="LOG_LEVEL=debug"
Environment="LOG_PRETTY=false"
Environment="PRIVATE_KEY_LOCAL=0xYour_private_keys"
Environment="ENABLED_NETWORKS=arbitrum-sepolia,base-sepolia,optimism-sepolia,l1rn"
Environment="EXECUTOR_PROCESS_PENDING_ORDERS_FROM_API=false"
Restart=always
RestartSec=5
User=testnet
[Install]
WantedBy=multi-user.target
EOF`}
        rounded="xl"
      />


<CodeBox
        language="bash"
        title="Enable and Start the t3rn Executor Node Service"
        code={`sudo systemctl daemon-reload
sudo systemctl enable t3rn-executor.service
sudo systemctl start t3rn-executor.service`}
        rounded="lg"
      />


      <CodeBox
        language="bash"
        title="Check Logs"
        code={`sudo journalctl -u t3rn-executor.service -f --no-hostname -o cat`}
        rounded="xl"
      />

    </div>
  );
};

export default Installation;
