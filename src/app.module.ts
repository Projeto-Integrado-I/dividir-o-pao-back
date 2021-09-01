import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RecursoModule } from './modules/recurso/recurso.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemPedidoModule } from './modules/item-pedido/item-pedido.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { FuncaoModule } from './modules/funcao/funcao.module';
import { VoluntarioModule } from './modules/voluntario/voluntario.module';
import { DoacoesModule } from './modules/doacoes/doacoes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      autoLoadEntities: true,
      logging: true,
      timezone: 'Z',
    }),
    UserModule,
    RecursoModule,
    ItemPedidoModule,
    PedidoModule,
    VoluntarioModule,
    FuncaoModule,
    DoacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
