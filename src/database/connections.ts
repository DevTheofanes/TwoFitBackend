import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection().then(() => console.log('Sucesso ao conectar'));
