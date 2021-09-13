import { Component, OnInit } from '@angular/core';
import { PontoInteresseService } from 'src/app/services/ponto-interesse.service';
import { PontoInteresse } from 'src/app/common/ponto-interesse';


@Component({
  selector: 'app-ponto-interesse',
  templateUrl: './ponto-interesse.component.html',
  styleUrls: ['./ponto-interesse.component.css']
})
export class PontoInteresseComponent implements OnInit {

  pontosInteresse: PontoInteresse[] = [];

  constructor(private pontoInteresseService: PontoInteresseService) { }

  ngOnInit(): void {
    this.listTodosPontos();
  }

  listTodosPontos() {
    this.pontoInteresseService.listarTodos().subscribe(
      data => {
        this.pontosInteresse = data;
      }
    )
  }

}
