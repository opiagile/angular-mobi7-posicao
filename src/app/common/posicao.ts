export class Posicao {
    id!: number;
    placa!: string;
    dataPosicao!: Date;
    velocidade!: number;
    latitude!: number;
    longitude!: number;
    ignicao!: boolean;

    constructor(id: number, placa: string, dataPosicao: Date, velocidade: number, latitude: number, longitude: number, ignicao: boolean
    ) {
        this.id = id;
        this.placa = placa;
        this.dataPosicao = dataPosicao;
        this.velocidade = velocidade;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ignicao = ignicao;
    }

}
