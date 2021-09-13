import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Posicao } from 'src/app/common/posicao';
import { PosicoesService } from 'src/app/services/posicoes.service';
import { PontoInteresse } from 'src/app/common/ponto-interesse';
import { PontoInteresseService } from 'src/app/services/ponto-interesse.service';
import { Tempo } from 'src/app/common/tempo';

@Component({
  selector: 'app-tempo',
  templateUrl: './tempo.component.html',
  styleUrls: ['./tempo.component.css']
})
export class TempoComponent implements OnInit {

  placas!: String[];
  date: Date | undefined;
  posicoes!: Posicao[];
  selected: string | undefined;
  pontosInteresse: PontoInteresse[] | undefined;
  tempos!: Tempo[];
  showTable: boolean = false;

  constructor(private posicoesService: PosicoesService, private pontoInteresseService: PontoInteresseService) { }

  ngOnInit(): void {
    this.posicoesService.getPlacas().subscribe(data => {
      this.placas = data;
    });
    this.pontoInteresseService.listarTodos().subscribe(data => {
      this.pontosInteresse = data;
    });
  }

  buscar() {
    if (this.selected !== undefined && this.date !== undefined) {
      this.posicoesService.posicaoByPlacaData(this.selected, this.date).subscribe(data => {
        this.posicoes = data;
        if (this.posicoes !== null) {
          this.calcularTempo();
        }
      });
    }
  }

  calcularTempo() {
    let matches = this.calcPosicaoEmPontoInteresse();
    let placaPontosInteresse = this.insereCarroEmPos(matches);

    let pontosInteresseSum: Map<PontoInteresse, number>;
    let ultimaPos!: Posicao;
    let ultimoPonto!: PontoInteresse;
    this.tempos = [];

    for (let placa of placaPontosInteresse.keys()) {
      pontosInteresseSum = new Map<PontoInteresse, number>();
      
      for (let poiPos of placaPontosInteresse.get(placa)!) {
        for (let [ponto, pos] of poiPos) {
          if (!pontosInteresseSum.has(ponto)) {
            pontosInteresseSum.set(ponto, 0);
          } else {
            if (ponto.nome === ultimoPonto.nome) {
              let diff = Math.ceil(Math.abs((new Date(pos.dataPosicao)).getTime() - (new Date(ultimaPos.dataPosicao)).getTime()) / (1000 * 60));
              pontosInteresseSum.set(ponto, pontosInteresseSum.get(ponto)! + diff);
            }
          }
          ultimaPos = pos;
          ultimoPonto = ponto;
        }
      }

      for (let [poi, sum] of pontosInteresseSum) {
        this.tempos.push(new Tempo(placa, poi.nome, sum));
      }
    }
  
    this.showTable = true;
  }

  calcPosicaoEmPontoInteresse() {
    let dist: number;
    let arr: Posicao[] | undefined;
    let matches = new Map<PontoInteresse, Posicao[]>();
    if (this.pontosInteresse !== undefined) {
      for (let pontoInteresse of this.pontosInteresse) {
        for (let pos of this.posicoes) {
          dist = this.kmEntreCoordenadas(pontoInteresse.latitude, pontoInteresse.longitude, pos.latitude, pos.longitude);
          if (dist !== undefined && dist * 1000 < pontoInteresse.raio) {
            if (pontoInteresse !== undefined && matches.has(pontoInteresse)) {
              arr = matches.get(pontoInteresse);
              if (arr !== undefined) {
                arr.push(pos);
                matches.set(pontoInteresse, arr);
              }
            } else {
              matches.set(pontoInteresse, [pos]);
            }
          }
        }
      }
    }
    return matches;
  }

  kmEntreCoordenadas(lat1: number, lon1: number, lat2: number, lon2: number) {
    let earthRadiusKm = 6371;

    let dLat = this.degreesToRadians(lat2 - lat1);
    let dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  insereCarroEmPos(matches: Map<PontoInteresse, Posicao[]>) {
    let placaPontosInteresse = new Map<string, Map<PontoInteresse, Posicao>[]>();
    let tmpMap: Map<PontoInteresse, Posicao>;
    let arrTmp: Map<PontoInteresse, Posicao>[] | undefined;

    for (let key of matches.keys()) {
      for (let pos of matches.get(key)!) {
        tmpMap = new Map<PontoInteresse, Posicao>();
        tmpMap.set(key, pos);
        if (!placaPontosInteresse.has(pos.placa)) {
          placaPontosInteresse.set(pos.placa, [tmpMap]);
        } else {
          arrTmp = placaPontosInteresse.get(pos.placa);
          if (arrTmp !== undefined) {
            arrTmp.push(tmpMap);
            placaPontosInteresse.set(pos.placa, arrTmp);
          }
        }
      }
    }
    return placaPontosInteresse;
  }

  resetPlaca() {
    this.selected = undefined;
  }

  dateChange(event: MatDatepickerInputEvent<string>) {
    if (event.value !== null) {
      this.date = new Date(event.value);
    } else {
      this.date = undefined;
    }
  }

}
