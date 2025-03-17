export const dillData = {
    name: "Dill",
    chainId: "dill",
    logo: "/logos/dill.jpg",
    description: "Dill is a decentralized infrastructure layer.",
    installationSteps: [
      {
        language: "bash",
        title: "Update and install packages",
        code: `sudo apt update
  sudo apt install make clang pkg-config libssl-dev build-essential`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Install and Extract Binary",
        code: `curl -O https://dill-release.s3.ap-southeast-1.amazonaws.com/linux/dill.tar.gz
  tar -xzvf dill.tar.gz && cd dill`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Generate Validator Keys",
        code: `./dill_validators_gen new-mnemonic --num_validators=1 --chain=andes --folder=./`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Import your Keys to your Keystore",
        code: `./dill-node accounts import --andes --wallet-dir ./keystore --keys-dir validator_keys/ --accept-terms-of-use`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "Sample Output",
        code: `[2024-07-13 08:08:34]  INFO flags: Running on the Andes Beacon Chain Testnet
  Password requirements: at least 8 characters
  New wallet password:
  Confirm password:
  [2024-07-13 08:08:39]  INFO wallet: Successfully created new wallet walletPath=/home/ubuntu/dill/keystore
  [2024-07-13 08:08:39]  WARN client: You are using an insecure gRPC connection. If you are running your beacon node and validator on the same machines, you can ignore this message. If you want to know how to enable secure connections, see: https://docs.prylabs.network/docs/prysm-usage/secure-grpc
  [2024-07-13 08:08:39]  INFO accounts: importing validator keystores...
  [2024-07-13 08:08:39]  INFO accounts: checking directory for keystores: /home/ubuntu/dill/validator_keys
  Enter the password for your imported accounts:
  Importing accounts, this may take a while...
  Importing accounts... 100% [===================================================================================]  [1s:0s]
  [2024-07-13 08:08:44]  INFO local-keymanager: Reloaded validator keys into keymanager
  [2024-07-13 08:08:44]  INFO local-keymanager: Successfully imported validator key(s) pubkeys=0xxxxx
  [2024-07-13 08:08:44]  INFO accounts: Imported accounts [xxxxxx], view all of them by running 'accounts list'
  Ubuntu@ip-xxxxx:~/dill$`,
        rounded: "lg",
      },
      {
        language: "bash",
        title: "Start the light validator node",
        code: `echo {your-password} > walletPw.txt
  ./start_light.sh -p walletPw.txt`,
        rounded: "xl",
      },
      {
        language: "bash",
        title: "The node will output the following when started:",
        code: `Option --pwdfile, argument 'walletPw.txt'
  Remaining arguments:
  using password file at walletPw.txt
  start light node
  start light node done
  Ubuntu@xxxxx:~/dill$ nohup: redirecting stderr to stdout`,
        rounded: "lg",
      },
    ],
  };