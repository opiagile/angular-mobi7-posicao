import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PosicoesComponent } from './components/posicoes/posicoes.component';
import { HttpClientModule } from '@angular/common/http';
import { PosicoesService } from './services/posicoes.service';
import { PontoInteresseService } from './services/ponto-interesse.service';
import { PontoInteresseComponent } from './components/ponto-interesse/ponto-interesse.component';
import { TempoComponent } from './components/tempo/tempo.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PosicoesComponent,
    PontoInteresseComponent,
    TempoComponent
  ],
  imports: [    
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [PosicoesService, PontoInteresseService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
