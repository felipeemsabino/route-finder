export class Posto {

  constructor(
    public nome: string,
    public endereco: string,
    public coordenadaX: string,
    public coordenadaY: string,
    public distancia: number,
    public ativo: string,
    public preco?: number,
    public bandeiraPosto?: number,
    public id?: number,
    public dataCadastro?: Date,
    public listaPrecosGNV?: any
  ){}
}
