export class PontoInteresse {
    id!: number;
    nome!: string;
    raio!: number;
    latitude!: number;
    longitude!: number;

    constructor(id: number, nome: string, raio: number, latitude: number, longitude: number) {
        this.id = id;
        this.nome = nome;
        this.raio = raio;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
