import { Component, OnInit } from '@angular/core';
import { PosicoesService } from 'src/app/services/posicoes.service';
import { Posicao } from 'src/app/common/posicao';

@Component({
  selector: 'app-posicoes',
  templateUrl: './posicoes.component.html',
  styleUrls: ['./posicoes.component.css']
})
export class PosicoesComponent implements OnInit {

  posicoes: Posicao[] = [];

  constructor(private posicoesService: PosicoesService) { }

  ngOnInit(): void {
    this.listTodasPosicoes();
  }

  listTodasPosicoes() {
    this.posicoesService.listarTodos().subscribe(
      data => {
        this.posicoes = data;
      }
    )
  }


}
