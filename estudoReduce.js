// USOS DE REDUCE

// SOMAR: Usar reduce para somar valores em um array é um dos usos mais comuns.

const numeros = [1, 2, 3, 4, 5];
const soma = numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
console.log(soma); // Saída: 15

// CONTAR FREQUÊNCIA: Contar a frequência de cada item em um array.

const frutas = ['maçã', 'banana', 'laranja', 'maçã', 'laranja', 'banana', 'maçã'];
const frequencia = frutas.reduce((acumulador, fruta) => {
  // Se a fruta ainda não existe no acumulador, inicializa com 0 e incrementa em 1
  acumulador[fruta] = (acumulador[fruta] || 0) + 1;
  return acumulador;
}, {});
console.log(frequencia); // Saída: { maçã: 3, banana: 2, laranja: 2 }

// AGRUPAR POR PROPRIEDADE: Agrupar objetos em um array por uma propriedade específica

const pessoas = [
  { nome: 'Alice', idade: 21 },
  { nome: 'Bob', idade: 21 },
  { nome: 'Charlie', idade: 25 }
];
const agrupadoPorIdade = pessoas.reduce((acumulador, pessoa) => {
  // Se a idade ainda não existe no acumulador, inicializa com um array vazio e adiciona a pessoa
  (acumulador[pessoa.idade] = acumulador[pessoa.idade] || []).push(pessoa);
  return acumulador;
}, {});
console.log(agrupadoPorIdade);
// Saída: { '21': [ { nome: 'Alice', idade: 21 }, { nome: 'Bob', idade: 21 } ], '25': [ { nome: 'Charlie', idade: 25 } ] }

// TRANSFORMAR EM OBJETO: Transformar um array de objetos em um único objeto com uma chave específica.

const produtos = [
  { id: 1, nome: 'Laptop', preco: 1000 },
  { id: 2, nome: 'Mouse', preco: 50 },
  { id: 3, nome: 'Teclado', preco: 100 }
];
const mapaDeProdutos = produtos.reduce((acumulador, produto) => {
  // Adiciona cada produto ao acumulador usando o id como chave
  acumulador[produto.id] = produto;
  return acumulador;
}, {});
console.log(mapaDeProdutos);
// Saída: { '1': { id: 1, nome: 'Laptop', preco: 1000 }, '2': { id: 2, nome: 'Mouse', preco: 50 }, '3': { id: 3, nome: 'Teclado', preco: 100 } }

// REMOVER DUPLICATAS: Criar um array com elementos únicos.

const numerosRepetidos = [1, 2, 3, 4, 4, 5, 6, 6];
const numerosUnicos = numerosRepetidos.reduce((acumulador, numero) => {
  // Adiciona o número ao acumulador apenas se ele ainda não está presente
  if (!acumulador.includes(numero)) {
    acumulador.push(numero);
  }
  return acumulador;
}, []);
console.log(numerosUnicos); // Saída: [1, 2, 3, 4, 5, 6]

// EXECUTAR ASSÍNCRONO: Executar operações assíncronas em série, acumulando resultados.

const urls = ['url1', 'url2', 'url3'];

const buscarDados = async (url) => {
  // Simula uma chamada de API que retorna dados após 1 segundo
  return new Promise((resolve) => setTimeout(() => resolve(`Dados de ${url}`), 1000));
};

const buscarTodosDados = async (listaUrls) => {
  const resultados = await listaUrls.reduce(async (promessaAcumulada, url) => {
    // Espera a promessa acumulada para continuar
    const acumulador = await promessaAcumulada;
    // Faz a chamada assíncrona para buscar dados
    const dados = await buscarDados(url);
    // Adiciona os dados ao acumulador
    acumulador.push(dados);
    return acumulador;
  }, Promise.resolve([])); // Inicia com uma promessa resolvida com um array vazio

  return resultados;
};

buscarTodosDados(urls).then(console.log);
// Saída (depois de 3 segundos): ['Dados de url1', 'Dados de url2', 'Dados de url3']

// ACHATAR MATRIZ: Quando você tem um array de arrays e quer achatá-lo em um único array, reduce é muito útil.

const matrizAninhada = [[1, 2], [3, 4], [5, 6]];

const matrizAchatada = matrizAninhada.reduce((acumulador, valorAtual) => {
  // Concatena o array atual ao acumulador
  return acumulador.concat(valorAtual);
}, []);

console.log(matrizAchatada); // Saída: [1, 2, 3, 4, 5, 6]

// CALCULAR MÉDIA: Calcular a média dos valores em um array pode ser feito eficientemente com reduce.

const notas = [10, 7, 4, 8];

const media = notas.reduce((acumulador, notaAtual, indice, array) => {
  // Soma a nota atual ao acumulador
  acumulador += notaAtual;
  // Se é o último elemento, divide pela quantidade de elementos para obter a média
  if (indice === array.length - 1) {
    return acumulador / array.length;
  }
  return acumulador;
}, 0);

console.log(media); // Saída: 7.25

// ENCADEAR PROMISES: Se você precisa executar uma série de promises sequencialmente, reduce pode ser usado para encadear essas promises.

const funcoesPromise = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3)
];

const encadearPromises = funcoesPromise.reduce((acumulador, funcaoAtual) => {
  // Encadeia a execução da função atual na promessa acumulada
  return acumulador.then(funcaoAtual);
}, Promise.resolve());

encadearPromises.then(resultado => {
  console.log(resultado); // Saída: 3 (resultado da última promise)
});

// REMOVER FALSY: Remover valores falsy (como null, undefined, 0, false, NaN, e strings vazias) de um array.

const arrayComValoresFalsos = [0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34];

const arrayCompactado = arrayComValoresFalsos.reduce((acumulador, valorAtual) => {
  // Adiciona ao acumulador apenas se o valor atual for truthy
  if (valorAtual) {
    acumulador.push(valorAtual);
  }
  return acumulador;
}, []);

console.log(arrayCompactado); // Saída: [1, 2, 3, 'a', 's', 34]

// INVERTER LINHAS E COLUNAS: Transformar uma matriz (array de arrays) de modo que as linhas se tornem colunas e vice-versa.

const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const matrizTransposta = matriz[0].map((_, indiceColuna) => 
  // Cria uma nova linha para cada coluna
  matriz.reduce((acumulador, linha) => {
    // Adiciona o elemento da linha atual na coluna correspondente ao acumulador
    acumulador.push(linha[indiceColuna]);
    return acumulador;
  }, [])
);

console.log(matrizTransposta);
// Saída: [
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9]
// ]

// FILTRAR E MAPEAR: Se você quiser filtrar e mapear um array em uma única passagem, você pode usar reduce para realizar ambas as operações ao mesmo tempo.
// Exemplo: elevar ao quadrado apenas os números pares.

const sequenciaNumerica = [1, 2, 3, 4, 5, 6];

const quadradosPares = sequenciaNumerica.reduce((acumulador, numero) => {
  // Verifica se o número é par e adiciona ao acumulador o quadrado do número
  if (numero % 2 === 0) {
    acumulador.push(numero * numero);
  }
  return acumulador;
}, []);

console.log(quadradosPares); // Saída: [4, 16, 36]