import { Produto } from '../types';

export const produtos: Produto[] = [
  {
    id: '1',
    nome: {
      pt: 'Hambúrguer Clássico Angus',
      en: 'Classic Angus Burger',
    },
    descricao: {
      pt: 'Hambúrguer de carne Angus premium com alface fresca, tomate e nosso molho secreto',
      en: 'Premium Angus beef burger with fresh lettuce, tomato, and our secret sauce',
    },
    preco: 32.90,
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['allergenGluten', 'allergenDairy'],
    reviews: [
      { id: 'rev1', author: 'João', rating: 5, comment: 'O melhor hambúrguer que já comi!' },
      { id: 'rev2', author: 'Maria', rating: 4, comment: 'Muito bom, mas um pouco caro.' },
    ],
  },
  {
    id: '2',
    nome: {
      pt: 'Batata Doce Crocante',
      en: 'Crispy Sweet Potato Fries',
    },
    descricao: {
      pt: 'Batatas doces cortadas à mão com sal marinho',
      en: 'Hand-cut sweet potatoes with sea salt',
    },
    preco: 18.90,
    imagem: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?auto=format&fit=crop&w=800&q=80',
    categoria: 'acompanhamento',
    disponivel: true,
    reviews: [
      { id: 'rev3', author: 'Pedro', rating: 5, comment: 'Super crocantes e saborosas.' },
    ],
  },
  {
    id: '3',
    nome: {
      pt: 'Porco na Lama',
      en: 'Pig in the Mud',
    },
    descricao: {
      pt: 'Suculento pulled pork defumado por 12h, coberto com molho barbecue caseiro e coleslaw crocante',
      en: 'Juicy pulled pork smoked for 12h, topped with homemade barbecue sauce and crispy coleslaw',
    },
    preco: 38.90,
    imagem: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=800&q=80',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['allergenGluten', 'allergenDairy'],
  },
  {
    id: '4',
    nome: {
      pt: 'Chicken Sour',
      en: 'Sour Chicken',
    },
    descricao: {
      pt: 'Frango empanado na buttermilk, picles especial da casa, maionese de limão siciliano e rúcula',
      en: 'Buttermilk battered chicken, special house pickles, Sicilian lemon mayonnaise, and arugula',
    },
    preco: 34.90,
    imagem: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    categoria: 'hamburguer',
    disponivel: true,
    alergenos: ['allergenGluten', 'allergenDairy', 'allergenEgg'],
  },
  {
    id: '5',
    nome: {
      pt: 'Cerveja Artesanal IPA',
      en: 'Craft Beer IPA',
    },
    descricao: {
      pt: 'IPA local com notas cítricas e amargor equilibrado - 473ml',
      en: 'Local IPA with citrus notes and balanced bitterness - 473ml',
    },
    preco: 18.90,
    imagem: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=800&q=80',
    categoria: 'bebida',
    disponivel: true,
  },
  {
    id: '6',
    nome: {
      pt: 'Refrigerante Artesanal',
      en: 'Craft Soda',
    },
    descricao: {
      pt: 'Cola artesanal feita com ingredientes naturais - 355ml',
      en: 'Artisanal cola made with natural ingredients - 355ml',
    },
    preco: 12.90,
    imagem: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=800&q=80',
    categoria: 'bebida',
    disponivel: true,
  },
  {
    id: '7',
    nome: {
      pt: 'Milkshake de Doce de Leite',
      en: 'Dulce de Leche Milkshake',
    },
    descricao: {
      pt: 'Milkshake cremoso com doce de leite caseiro e chantilly - 400ml',
      en: 'Creamy milkshake with homemade dulce de leche and whipped cream - 400ml',
    },
    preco: 22.90,
    imagem: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    categoria: 'bebida',
    disponivel: true,
    alergenos: ['allergenDairy'],
  }
];