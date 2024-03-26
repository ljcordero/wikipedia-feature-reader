import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestLogger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  host: string;

  @Column()
  method: string;

  @Column()
  path: string;

  @Column()
  query: string;

  @Column()
  body: string;

  @Column()
  responseStatusCode: number;

  constructor(
    host: string,
    method: string,
    path: string,
    query: string,
    body: string,
    responseStatusCode: number,
  ) {
    this.host = host;
    this.method = method;
    this.path = path;
    this.query = query;
    this.body = body;
    this.responseStatusCode = responseStatusCode;
  }
}
