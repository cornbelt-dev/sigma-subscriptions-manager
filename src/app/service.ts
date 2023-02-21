import { LENGTH_IN_MILISECONDS, ONE_ERG_IN_NANOERG, Service, ServiceConfig } from "sigma-subscriptions";

export class Config {

  configNFT: string = '';
  name: string = 'Service Name';
  description: string = 'Service Description';
  fee: number = 0.01;
  length: number = Number(LENGTH_IN_MILISECONDS.MINUTES_15);
  address: string = '';

  constructor(config?: ServiceConfig) {
    if (config) {
      this.configNFT = config.configNFT;
      this.name = config.name;
      this.description = config.description;
      this.fee = (Number(config.fee) / ONE_ERG_IN_NANOERG);
      this.length = Number(config.length);
      this.address = config?.address;
    }
  }

  map(): ServiceConfig {
    return {
      configNFT: this.configNFT,
      name: this.name,
      description: this.description,
      fee: BigInt(this.fee * ONE_ERG_IN_NANOERG),
      length: BigInt(this.length),
      address: this.address
    };
  }

}

export class SubscriptionService {

  config: Config = new Config();  
  tokenId: string = '';

  constructor(service?: Service) {
    if (service) {
      this.config = new Config(service.config);
      this.tokenId = service.tokenId;
    }
  }

}
