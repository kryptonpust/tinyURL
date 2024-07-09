import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client, createClient } from 'node-zookeeper-client';
import { ZookeeperConfig } from '../env-config/configs/zookeeper.config';

@Injectable()
export class ZookeeperService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(ZookeeperService.name);
  private client: Client;
  private poolStartValue = 0;
  private poolEndValue = 0;

  constructor(private readonly zookeeperConfig: ZookeeperConfig) {}

  onModuleInit() {
    this.client = createClient(this.zookeeperConfig.connectionStrings);
    this.client.once('connected', () => {
      this.logger.log('Connected to ZooKeeper.');
      this.initializeCounter();
    });
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  private initializeCounter() {
    this.client.exists(this.zookeeperConfig.counterPath, (error, stat) => {
      if (error) {
        this.logger.error(error);
        return;
      }

      this.logger.debug(`Counter node exists: ${!!stat}`);

      if (!stat) {
        this.client.create(
          this.zookeeperConfig.counterPath,
          Buffer.from('0'),
          (error) => {
            if (error) {
              this.logger.error(error);
            } else {
              this.logger.debug('Counter node created.');
            }
          },
        );
      }
    });
  }

  private async incrementCounterBy(value: number): Promise<{
    prev_val: number;
    new_val: number;
  }> {
    return new Promise((resolve, reject) => {
      this.client.getData(this.zookeeperConfig.counterPath, (error, data) => {
        if (error) {
          return reject(error);
        }

        const prev_val = parseInt(data.toString(), 10);
        const new_val = prev_val + value;

        this.client.setData(
          this.zookeeperConfig.counterPath,
          Buffer.from(new_val.toString()),
          (error) => {
            if (error) {
              return reject(error);
            }

            resolve({ prev_val, new_val });
          },
        );
      });
    });
  }

  public async getNextValue(): Promise<number> {
    if (this.poolStartValue < this.poolEndValue) {
      return this.poolStartValue++;
    } else {
      this.logger.log('Local pool exhausted. Fetching new pool.');
      const { prev_val, new_val } = await this.incrementCounterBy(
        this.zookeeperConfig.poolChunkSize,
      );
      this.logger.log(`New pool fetched: ${prev_val} - ${new_val}`);
      this.poolStartValue = prev_val + 1;
      this.poolEndValue = new_val;
      return prev_val;
    }
  }
}
