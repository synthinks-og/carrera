export const nubitData = {
    name: "Nubit",
    chainId: "nubit",
    logo: "/logos/nubit.jpg",
    description: "Nubit is a blockchain focused on decentralized data availability.",
    installationSteps: [
      {
        language: "bash",
        title: "Install dependencies",
        code: `sudo apt update && sudo apt upgrade -y
  apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y`,
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
        code: `curl -sL1 https://nubit.sh | bash`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Create Service File",
        code: `sudo tee /etc/systemd/system/nubit.service > /dev/null << EOF
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
  EOF`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Enable Service",
        code: `sudo systemctl daemon-reload
  sudo systemctl enable nubit`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Start Node",
        code: `sudo systemctl start nubit.service && sudo journalctl -u nubit.service -f --no-hostname -o cat`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Save Phrase",
        code: `cd nubit-node
  sudo cat mnemonic.txt`,
        rounded: "lg",
      },
    ],
  };