export const chasmData = {
    name: "Chasm",
    chainId: "chasm",
    logo: "/logos/chasm.png",
    description: "Chasm is a distributed competitive AI inferencing network that delivers the best performing, highest quality, and most cost-efficient inferences to its users.",
    installationSteps: [
      {
        language: "bash",
        title: "Update and install packages",
        code: `sudo apt update && sudo apt upgrade -y`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Install Docker",
        code: `sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Create Folder",
        code: `mkdir chasm
  cd chasm`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Setup Environment",
        code: `nano .env
  
  PORT=3001
  LOGGER_LEVEL=debug
  ORCHESTRATOR_URL=https://orchestrator.chasm.net
  SCOUT_NAME=NAMASCOUTKAMU
  SCOUT_UID=DARIMINTSCOUT
  WEBHOOK_API_KEY=your_Webhook_API_Key
  WEBHOOK_URL=http://your_VPS_ip:3001/
  
  PROVIDERS=groq
  MODEL=gemma2-9b-it
  GROQ_API_KEY=your_Groq_API_Key
  
  OPENROUTER_API_KEY=
  OPENAI_API_KEY=`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Start and run Node with Docker",
        code: `docker pull johnsonchasm/chasm-scout
  docker run -d --restart=always --env-file ./.env -p 3001:3001 --name scout johnsonchasm/chasm-scout`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Check if your node is running successfully",
        code: `curl localhost:3001`,
        rounded: "xl",
      },
    ],
  };