import { Cliente } from "../clientes/cliente";

export class Pedido {
    id: number;
    cliente: Cliente;
    dataPedido: string;
    status: string;
    detalhes: string;
    valor: number;
}