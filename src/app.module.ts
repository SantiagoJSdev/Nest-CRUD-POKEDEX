import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';  
import { envConfigurations } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({

  imports: [
    ConfigModule.forRoot({
      load: [envConfigurations], //cargamos las variables de entorno debi de haber creado un archivo app.config.ts y en pokemon servir inyectamos el servicio de configuracion y en su modulo importamos ConfigModule
      validationSchema: JoiValidationSchema
    }), // debe ir primero para que las variables de entorno esten disponibles
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),//Agregar contenido static
    }),
    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'pokemonsdb'
    }), //conexion db
    PokemonModule,
    CommonModule,
    SeedModule
  ]
})
export class AppModule { }
