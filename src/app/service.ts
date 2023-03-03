import { LENGTH_IN_MILISECONDS, ONE_ERG_IN_NANOERG, Service, ServiceConfig, Subscription } from "sigma-subscriptions";
import { msToTime } from "src/app/util";

export class Config {

  configNFT: string = '';
  name: string = '';
  description: string = '';
  fee: number = 0.01;
  length: number = Number(LENGTH_IN_MILISECONDS.MONTH);
  lengthDisplay: string = msToTime(Number(LENGTH_IN_MILISECONDS.MONTH));
  address: string = '';

  constructor(config?: ServiceConfig) {
    if (config) {
      this.configNFT = config.configNFT;
      this.name = config.name;
      this.description = config.description;
      this.fee = (Number(config.fee) / ONE_ERG_IN_NANOERG);
      this.length = Number(config.length);
      this.lengthDisplay = msToTime(Number(config.length));
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
  tokenId: string | undefined = '';

  constructor(service?: Service) {
    if (service) {
      this.config = new Config(service.config);
      this.tokenId = service.tokenId;
    }
  }

}
  
export class SubscriptionDetails {

  boxId: string = '';
  walletAddress: string  = '';
  tokenId: string = '';
  fee: number = 0;
  startDate: Date | undefined = undefined;
  endDate: Date | undefined = undefined;
  suggestRenewal: boolean = false;
  expired: boolean = true;
  service: SubscriptionService = new SubscriptionService();  

  constructor(subscription?: Subscription) {
    if (subscription) {
      this.boxId = subscription.boxId;
      this.walletAddress = subscription.walletAddress ?? '';
      this.tokenId = subscription.tokenId ?? '';
      this.fee = (Number(subscription.fee) / ONE_ERG_IN_NANOERG);
      this.startDate = subscription.startDate;
      this.endDate = subscription.endDate;
      this.suggestRenewal = subscription.suggestRenewal;
      this.expired = subscription.expired;
      if (subscription.service){
        this.service = new SubscriptionService(subscription.service);
      }
    }
  }

}