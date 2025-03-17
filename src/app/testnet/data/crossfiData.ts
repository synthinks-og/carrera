export const crossfiData = {
  name: "Crossfi",
  chainId: "crossfi",
  logo: "/logos/crossfi.jpg",
  description: "Crossfi is a cross-chain bridging protocol for seamless asset transfers.",
  installationSteps: [
    {
      language: "bash",
      title: "Install Dependencies",
      code: `sudo apt update && sudo apt upgrade -y
sudo apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev aria2 -y`,
      rounded: "lg",
    },
    {
      language: "bash",
      title: "Install GO",
      code: `ver="1.21.1"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
go version`,
      rounded: "xl",
    },
    {
      language: "bash",
      title: "Install Binary",
      code: `cd $HOME && mkdir -p $HOME/go/bin
curl -L https://github.com/crossfichain/crossfi-node/releases/download/v0.3.0-prebuild3/crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz > crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz
tar -xvzf crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz
chmod +x $HOME/bin/crossfid
mv $HOME/bin/crossfid $HOME/go/bin
rm -rf crossfi-node_0.3.0-prebuild3_linux_amd64.tar.gz readme.md $HOME/bin`,
      rounded: "xl",
    },
    {
      language: "bash",
      title: "Initialize the Node",
      code: `crossfid init "your_node_name" --chain-id crossfi-evm-testnet-1
crossfid config chain-id crossfi-evm-testnet-1`,
      rounded: "lg",
    },
    {
      language: "bash",
      title: "Genesis",
      code: `curl -Ls https://ss-t.crossfi.nodestake.org/genesis.json > $HOME/.mineplex-chain/config/genesis.json`,
      rounded: "xl",
    },
    {
      language: "bash",
      title: "Addrbook",
      code: `curl -Ls https://ss-t.crossfi.nodestake.org/addrbook.json > $HOME/.mineplex-chain/config/addrbook.json`,
      rounded: "xl",
    },
    {
      language: "bash",
      title: "Seed & Gas",
      code: `sed -i -e 's|^seeds *=.*|seeds = "89752fa7945a06e972d7d860222a5eeaeab5c357@128.140.70.97:26656,dd83e3c7c4e783f8a46dbb010ec8853135d29df0@crossfi-testnet-seed.itrocket.net:36656"|' $HOME/.mineplex-chain/config/config.toml
sed -i -e 's|^minimum-gas-prices *=.*|minimum-gas-prices = "5000000000mpx"|' $HOME/.mineplex-chain/config/app.toml`,
      rounded: "lg",
    },
    {
      language: "bash",
      title: "Prunning",
      code: `sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.mineplex-chain/config/app.toml`,
      rounded: "xl",
    },
    {
      language: "bash",
      title: "Service",
      code: `sudo tee /etc/systemd/system/crossfid.service > /dev/null << EOF
[Unit]
Description=CrossFi node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which crossfid) start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF`,
      rounded: "xl",
    },
    {
      language: "bash",
      title: "Start",
      code: `sudo systemctl daemon-reload
sudo systemctl enable crossfid.service
sudo systemctl restart crossfid.service && sudo journalctl -u crossfid.service -f --no-hostname -o cat`,
      rounded: "lg",
    },
  ],
};