export const gaianetData = {
    name: "GaiaNet",
    chainId: "gaianet", // Saya asumsikan chainId, sesuaikan jika ada nilai spesifik
    logo: "/logos/gaianet.jpeg", // Sesuaikan path logo sesuai struktur proyekmu
    description:
      "GaiaNet is a decentralized computing infrastructure that enables everyone to create, deploy, scale, and monetize their own AI agents that reflect their styles, values, knowledge, and expertise. It allows individuals and businesses to create AI agents. Each GaiaNet node provides decentralized AI computation capabilities.",
    installationSteps: [
      {
        language: "bash",
        title: "Install GaiaNet Node",
        code: `curl -sSfL 'https://github.com/GaiaNet-AI/gaianet-node/releases/latest/download/install.sh' | bash
  source ~/.bashrc`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Initialize with Qwen-1.5-0.5b-chat Model",
        code: `gaianet init --config https://raw.githubusercontent.com/GaiaNet-AI/node-configs/main/qwen-1.5-0.5b-chat/config.json`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Start the Node",
        code: `gaianet start`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Install Binary for Auto Chat Script",
        code: `git clone https://github.com/iyogz/gaian
  cd gaian`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Edit Node ID in Script",
        code: `nano gaian.js
  # Change "NodeIdGaia" with your GaiaNet node ID`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Start the Auto Chat Script",
        code: `screen -Rd gaianbot
  npm i
  node gaian.js`,
        rounded: "xl",
      },
    ],
  };