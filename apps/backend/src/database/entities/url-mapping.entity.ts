import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from '@dev101_cloud/nestjs-cassandra-module';

@Entity({
  table_name: 'url_mapping',
  key: ['short_url'],
})
export class URLMappingEntity {
  @Column({
    name: 'short_url',
    type: 'text',
    rule: {
      required: true,
    },
  })
  short_url: string;
  @Column({
    name: 'long_url',
    type: 'text',
    rule: {
      required: true,
    },
  })
  long_url: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
