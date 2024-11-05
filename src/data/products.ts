import { Produto } from '../types';

export const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Hambúrguer Clássico Angus',
    descricao: 'Hambúrguer de carne Angus premium com alface fresca, tomate e nosso molho secreto',
    preco: 32.90,
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['glúten', 'laticínios'],
  },
  {
    id: '2',
    nome: 'Batata Doce Crocante',
    descricao: 'Batatas doces cortadas à mão com sal marinho',
    preco: 18.90,
    imagem: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?auto=format&fit=crop&w=800&q=80',
    categoria: 'acompanhamento',
    disponivel: true,
  },
  {
    id: '3',
    nome: 'Porco na Lama',
    descricao: 'Suculento pulled pork defumado por 12h, coberto com molho barbecue caseiro e coleslaw crocante',
    preco: 38.90,
    imagem: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=800&q=80',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['glúten', 'laticínios'],
  },
  {
    id: '4',
    nome: 'Chicken Sour',
    descricao: 'Frango empanado na buttermilk, picles especial da casa, maionese de limão siciliano e rúcula',
    preco: 34.90,
    imagem: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['glúten', 'laticínios', 'ovo'],
  },
  {
    id: '5',
    nome: 'Cerveja Artesanal IPA',
    descricao: 'IPA local com notas cítricas e amargor equilibrado - 473ml',
    preco: 18.90,
    imagem: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=800&q=80',
    categoria: 'bebida',
    disponivel: true,
  },
  {
    id: '6',
    nome: 'Refrigerante Artesanal',
    descricao: 'Cola artesanal feita com ingredientes naturais - 355ml',
    preco: 12.90,
    imagem: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=800&q=80',
    categoria: 'bebida',
    disponivel: true,
  },
  {
    id: '7',
    nome: 'Milkshake de Doce de Leite',
    descricao: 'Milkshake cremoso com doce de leite caseiro e chantilly - 400ml',
    preco: 22.90,
    imagem: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    categoria: 'bebida',
    disponivel: true,
    alergenos: ['laticínios'],
  }
];