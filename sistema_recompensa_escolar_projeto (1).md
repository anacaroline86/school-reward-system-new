# Sistema de Recompensa Escolar — Especificação do Projeto

## 1. Visão geral

O **Sistema de Recompensa Escolar** será uma aplicação web para organizar as notas escolares de um aluno e calcular automaticamente o valor financeiro correspondente a cada bimestre.

A ideia é utilizar o sistema para acompanhar o desempenho escolar e transformar as notas em uma recompensa financeira. Notas a partir de 8 geram recompensa, enquanto notas abaixo de 8 geram desconto.

O sistema deverá permitir consultar exatamente:

- as notas de cada matéria;
- o valor gerado ou descontado por cada nota;
- o resultado financeiro de cada bimestre;
- quais bimestres já foram fechados;
- quais valores já foram pagos;
- o histórico financeiro ao longo do ano.

> **Importante:** o valor é calculado e pago por bimestre. Cada bimestre possui seu próprio fechamento, resultado e status de pagamento.

---

# 2. Objetivo principal

Criar uma aplicação simples, visual e fácil de usar que permita:

1. Cadastrar as matérias do aluno.
2. Registrar as notas de cada bimestre.
3. Associar um valor financeiro a cada faixa de nota.
4. Calcular automaticamente recompensas e descontos.
5. Apresentar o valor final daquele bimestre.
6. Fechar o bimestre quando as notas forem definitivas.
7. Registrar quando o pagamento foi realizado.
8. Manter um histórico dos bimestres e valores pagos.
9. Permitir configurar os valores das notas sem precisar alterar o código.

---

# 3. Regra geral da recompensa

A regra principal será:

- **Notas >= 8:** geram valor positivo.
- **Notas < 8:** geram desconto.
- O resultado final do bimestre será a soma de todos os valores das matérias.
- O cálculo é feito independentemente para cada bimestre.
- O valor do bimestre será pago somente após o fechamento.
- Inicialmente, caso o resultado seja negativo, o sistema deverá considerar o valor a pagar como **R$0,00**, sem criar uma dívida para o próximo bimestre.

## Exemplo

Supondo a seguinte configuração:

| Nota | Valor |
|---:|---:|
| 10 | +R$20 |
| 9 | +R$15 |
| 8 | +R$10 |
| 7 | -R$10 |
| 6 | -R$15 |
| 5 | -R$20 |

Se o aluno tiver:

| Matéria | Nota | Resultado |
|---|---:|---:|
| Matemática | 10 | +R$20 |
| Português | 9 | +R$15 |
| História | 7 | -R$10 |
| Ciências | 6 | -R$15 |

Cálculo:

`20 + 15 - 10 - 15 = R$10`

Resultado do bimestre:

**R$10,00**

---

# 4. Tratamento das notas decimais

As notas podem possuir casas decimais, como:

- 8,5
- 9,5
- 7,5

A regra deverá ser definida antes da implementação definitiva.

### Regra inicialmente recomendada

Utilizar faixas:

- 8,0 até 8,9 → valor correspondente à nota 8
- 9,0 até 9,9 → valor correspondente à nota 9
- 10,0 → valor correspondente à nota 10
- 7,0 até 7,9 → valor correspondente à nota 7
- 6,0 até 6,9 → valor correspondente à nota 6
- 5,0 até 5,9 → valor correspondente à nota 5

Exemplo:

`8,5 → R$10`

`9,5 → R$15`

Essa regra pode ser alterada posteriormente caso seja desejado um cálculo proporcional.

---

# 5. Bimestres

O sistema terá quatro bimestres:

- 1º Bimestre
- 2º Bimestre
- 3º Bimestre
- 4º Bimestre

Cada bimestre terá seus próprios:

- notas;
- valores calculados;
- total positivo;
- total de descontos;
- resultado final;
- status de fechamento;
- status de pagamento;
- data de fechamento;
- data de pagamento.

## Exemplo

### 1º Bimestre

- Notas cadastradas: 8/8
- Total positivo: R$45,00
- Total de descontos: R$10,00
- Resultado: R$35,00
- Status: Fechado
- Pagamento: Pago

### 2º Bimestre

- Notas cadastradas: 8/8
- Total positivo: R$50,00
- Total de descontos: R$5,00
- Resultado: R$45,00
- Status: Fechado
- Pagamento: Pendente

---

# 6. Fechamento do bimestre

O fechamento será uma etapa importante do sistema.

Enquanto o bimestre estiver aberto:

- notas podem ser alteradas;
- matérias podem ser preenchidas;
- o valor pode ser recalculado.

Quando o usuário clicar em:

**Fechar Bimestre**

o sistema deverá:

1. Confirmar a ação.
2. Calcular o resultado definitivo.
3. Salvar o resultado.
4. Registrar a data de fechamento.
5. Alterar o status para `Fechado`.
6. Impedir alterações nas notas daquele bimestre.

Mensagem sugerida:

> "Depois de fechar o bimestre, as notas não poderão mais ser alteradas. Deseja continuar?"

---

# 7. Registro de pagamento

Depois que o valor for efetivamente entregue ao aluno, o usuário poderá clicar em:

**Marcar como pago**

O sistema deverá registrar:

- status do pagamento;
- valor pago;
- data do pagamento.

Exemplo:

```text
1º Bimestre

Valor: R$50,00
Fechado em: 20/08/2026
Pago em: 22/08/2026

Status: Pago
```

O pagamento só deverá estar disponível depois que o bimestre estiver fechado.

---

# 8. Telas da aplicação

A aplicação será inicialmente dividida em cinco áreas principais.

## 8.1 Dashboard

Será a página inicial.

Deverá apresentar:

### Bimestre atual

- número do bimestre;
- quantidade de notas cadastradas;
- quantidade de notas >= 8;
- quantidade de notas < 8;
- total positivo;
- total de descontos;
- valor final;
- status do bimestre;
- status do pagamento.

### Resumo anual

Exemplo:

| Bimestre | Resultado | Status |
|---|---:|---|
| 1º | R$35,00 | Pago |
| 2º | R$50,00 | Pago |
| 3º | R$40,00 | Pendente |
| 4º | — | Aberto |

Também deverá mostrar:

**Total pago no ano: R$85,00**

---

# 9. Tela de notas

A tela de notas permitirá cadastrar as notas de cada matéria.

Exemplo:

### 1º Bimestre

| Matéria | Nota | Valor |
|---|---:|---:|
| Português | 9,0 | +R$15 |
| Matemática | 10,0 | +R$20 |
| História | 7,0 | -R$10 |
| Geografia | 8,0 | +R$10 |
| Ciências | 9,0 | +R$15 |

O sistema deverá atualizar os valores automaticamente conforme as notas forem inseridas.

No final:

**Total positivo: R$50,00**

**Descontos: R$10,00**

**Valor do bimestre: R$40,00**

---

# 10. Tela de histórico

A tela de histórico deverá permitir visualizar todos os bimestres do ano.

Exemplo:

| Bimestre | Resultado | Fechamento | Pagamento |
|---|---:|---|---|
| 1º | R$50,00 | 20/08/2026 | Pago |
| 2º | R$35,00 | 15/10/2026 | Pago |
| 3º | R$70,00 | 10/12/2026 | Pendente |
| 4º | — | — | Aberto |

Também poderá apresentar indicadores:

- Total pago no ano.
- Média das notas.
- Melhor bimestre.
- Pior bimestre.
- Quantidade de notas >= 8.
- Quantidade de notas < 8.

---

# 11. Tela de configurações

Os valores das notas não deverão ficar fixos no código.

O usuário deverá conseguir alterar as recompensas.

Exemplo:

| Nota | Valor |
|---:|---:|
| 10 | R$20 |
| 9 | R$15 |
| 8 | R$10 |
| 7 | -R$10 |
| 6 | -R$15 |
| 5 | -R$20 |

Também poderá configurar:

- nome do aluno;
- ano letivo;
- matérias;
- valores das notas;
- quantidade de bimestres, caso futuramente seja necessário.

---

# 12. Cadastro de matérias

O sistema deverá permitir cadastrar as matérias.

Exemplo:

- Português
- Matemática
- História
- Geografia
- Ciências
- Inglês
- Educação Física
- Artes

As matérias deverão ser reutilizadas nos quatro bimestres.

---

# 13. Modelo de dados inicial

Mesmo que a primeira versão não tenha banco de dados, devemos pensar na estrutura dos dados.

Exemplo conceitual:

```javascript
const aluno = {
    nome: "João",
    ano: 2026,

    materias: [
        "Português",
        "Matemática",
        "História",
        "Geografia"
    ],

    bimestres: {
        primeiro: {
            notas: {},
            totalPositivo: 0,
            totalDescontos: 0,
            valorTotal: 0,
            fechado: false,
            pago: false,
            dataFechamento: null,
            dataPagamento: null
        },

        segundo: {
            notas: {},
            totalPositivo: 0,
            totalDescontos: 0,
            valorTotal: 0,
            fechado: false,
            pago: false,
            dataFechamento: null,
            dataPagamento: null
        },

        terceiro: {
            notas: {},
            totalPositivo: 0,
            totalDescontos: 0,
            valorTotal: 0,
            fechado: false,
            pago: false,
            dataFechamento: null,
            dataPagamento: null
        },

        quarto: {
            notas: {},
            totalPositivo: 0,
            totalDescontos: 0,
            valorTotal: 0,
            fechado: false,
            pago: false,
            dataFechamento: null,
            dataPagamento: null
        }
    }
};
```

> Esse código é apenas um modelo conceitual neste momento. A estrutura poderá ser refinada durante a implementação.

---

# 14. Tecnologias

## Primeira versão

A primeira versão deverá utilizar somente:

- HTML
- CSS
- JavaScript
- LocalStorage

### Por que começar assim?

Porque o objetivo é aprender e construir o projeto ao mesmo tempo.

Isso permitirá praticar:

- HTML semântico;
- CSS;
- JavaScript;
- variáveis;
- funções;
- arrays;
- objetos;
- condicionais;
- loops;
- eventos;
- manipulação do DOM;
- formulários;
- validações;
- LocalStorage.

---

# 15. Evolução futura

Depois que a primeira versão estiver funcionando, o projeto poderá evoluir.

## Versão 2

Adicionar:

- Node.js
- Express
- API REST
- banco de dados.

Arquitetura:

```text
Frontend
    ↓
API
    ↓
Node.js + Express
    ↓
Banco de dados
```

## Versão 3

Possível arquitetura profissional:

```text
Frontend
    ↓
React
    ↓
API REST
    ↓
Node.js
    ↓
PostgreSQL
```

Possíveis funcionalidades futuras:

- login;
- múltiplos alunos;
- diferentes usuários;
- acesso pelo celular;
- backup dos dados;
- gráficos;
- notificações;
- metas;
- histórico de anos anteriores.

---

# 16. Estrutura inicial de pastas

A primeira versão poderá começar assim:

```text
sistema-notas/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── notas.js
│   └── calculadora.js
│
└── assets/
```

## Responsabilidade dos arquivos

### `index.html`

Estrutura da aplicação.

### `style.css`

Visual e layout.

### `app.js`

Inicialização e controle geral da aplicação.

### `notas.js`

Cadastro e manipulação das notas.

### `calculadora.js`

Regras para transformar notas em valores financeiros.

---

# 17. Arquitetura da regra de cálculo

A função principal deverá seguir uma lógica semelhante a:

```text
Receber nota
     ↓
Identificar faixa da nota
     ↓
Buscar valor configurado
     ↓
Retornar recompensa ou desconto
```

Para o bimestre:

```text
Notas de todas as matérias
        ↓
Calcular valor de cada nota
        ↓
Separar positivos e descontos
        ↓
Somar os valores
        ↓
Aplicar regra de valor mínimo
        ↓
Resultado final do bimestre
```

Exemplo:

```text
Matemática 10 → +20
Português 9   → +15
História 7    → -10
Ciências 6    → -15
                    ↓
              +20 +15 -10 -15
                    ↓
                  R$10
```

---

# 18. MVP — Produto mínimo viável

Não será necessário construir o sistema inteiro de uma vez.

O desenvolvimento será dividido em pequenas etapas.

## MVP 1 — Primeiro cálculo

Objetivo:

- criar uma página;
- informar uma nota;
- clicar em calcular;
- mostrar o valor correspondente.

Exemplo:

```text
Matéria: Matemática

Nota: [ 9 ]

[ CALCULAR ]

Nota: 9
Valor: +R$15
```

---

## MVP 2 — Várias matérias

Adicionar:

- várias matérias;
- várias notas;
- valor individual;
- total do bimestre.

---

## MVP 3 — Bimestres

Adicionar:

- 1º bimestre;
- 2º bimestre;
- 3º bimestre;
- 4º bimestre.

---

## MVP 4 — Fechamento

Adicionar:

- botão de fechar bimestre;
- bloqueio de alterações;
- data de fechamento;
- resultado definitivo.

---

## MVP 5 — Pagamento

Adicionar:

- status pendente;
- status pago;
- data de pagamento;
- histórico financeiro.

---

## MVP 6 — LocalStorage

Salvar os dados no navegador para que eles continuem disponíveis depois de fechar a aplicação.

---

## MVP 7 — Dashboard

Criar:

- resumo do bimestre;
- resumo anual;
- total pago;
- médias;
- indicadores.

---

# 19. Regras de negócio

As regras principais deverão ser:

### RN01 — Nota mínima

Notas iguais ou superiores a 8 geram recompensa.

### RN02 — Desconto

Notas abaixo de 8 geram desconto.

### RN03 — Cálculo independente

Cada bimestre deverá possuir seu próprio cálculo.

### RN04 — Fechamento

Um bimestre fechado não poderá ter suas notas alteradas.

### RN05 — Pagamento

Um bimestre só poderá ser marcado como pago depois de fechado.

### RN06 — Resultado negativo

Inicialmente, o valor a pagar será limitado a R$0,00. Não haverá dívida automática para o próximo bimestre.

### RN07 — Configuração

Os valores das notas deverão ser configuráveis.

### RN08 — Histórico

Bimestres fechados deverão permanecer disponíveis para consulta.

### RN09 — Persistência

Os dados deverão ser armazenados para não serem perdidos ao fechar o navegador.

---

# 20. Validações

O sistema deverá impedir situações inválidas.

Exemplos:

- nota vazia;
- nota menor que 0;
- nota maior que 10;
- matéria sem nome;
- pagamento sem fechamento;
- alteração de bimestre fechado.

Mensagem de exemplo:

> "A nota deve estar entre 0 e 10."

---

# 21. Experiência do usuário

A interface deverá ser:

- simples;
- limpa;
- fácil de entender;
- responsiva;
- adequada para computador e celular.

O aluno deverá conseguir entender rapidamente:

**Como foram minhas notas?**

**Quanto eu ganhei?**

**Quanto eu perdi?**

**Quanto vou receber?**

---

# 22. Ideias futuras de gamificação

Depois que o sistema básico estiver funcionando, podemos adicionar recursos para aumentar a motivação:

### 🏆 Conquistas

Exemplos:

- "Primeiro 10"
- "Todas as notas acima de 8"
- "Bimestre perfeito"
- "3 bimestres acima de 8"

### 🔥 Sequência

Mostrar:

> 4 bimestres consecutivos sem nota abaixo de 8.

### 📈 Evolução

Comparar:

```text
1º Bimestre: média 7,8
2º Bimestre: média 8,2
3º Bimestre: média 8,7
```

### 🎯 Meta

Exemplo:

> Meta: ganhar R$50 neste bimestre.

Mostrar uma barra de progresso.

---

# 23. Possível dashboard futuro

```text
┌─────────────────────────────────────────────┐
│              📚 NOTAS DO JOÃO               │
├─────────────────────────────────────────────┤
│                                             │
│  2º BIMESTRE                                │
│                                             │
│  Média                  8,7                 │
│  Notas ≥ 8             7/8                  │
│                                             │
│  💰 VALOR DO BIMESTRE                        │
│                                             │
│             R$ 50,00                        │
│                                             │
│  🟢 Recompensas: R$65                       │
│  🔴 Descontos:   R$15                       │
│                                             │
│  [ FECHAR BIMESTRE ]                        │
│                                             │
├─────────────────────────────────────────────┤
│  HISTÓRICO                                  │
│                                             │
│  1º Bimestre       R$35       ✅ Pago       │
│  2º Bimestre       R$50       ⏳ Pendente   │
│  3º Bimestre       —          🔓 Aberto     │
│  4º Bimestre       —          🔓 Aberto     │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 24. Ordem de desenvolvimento

A ordem recomendada será:

1. Definir definitivamente os valores das notas.
2. Definir a regra das notas decimais.
3. Definir as matérias.
4. Instalar e configurar o ambiente.
5. Criar o projeto.
6. Criar `index.html`.
7. Criar `style.css`.
8. Criar o primeiro JavaScript.
9. Fazer o cálculo de uma nota.
10. Fazer o cálculo de várias notas.
11. Criar o conceito de bimestre.
12. Criar o fechamento.
13. Criar o pagamento.
14. Criar o histórico.
15. Adicionar LocalStorage.
16. Criar o Dashboard.
17. Melhorar o design.
18. Testar e corrigir os casos de erro.
19. Versionar o projeto com Git.
20. Futuramente migrar para backend e banco de dados.

---

# 25. Objetivo de aprendizado

Além de criar uma aplicação útil, este projeto servirá como projeto de estudo para desenvolver conhecimentos de programação.

## JavaScript

Praticar:

- variáveis;
- tipos de dados;
- operadores;
- condicionais;
- funções;
- arrays;
- objetos;
- métodos de arrays;
- eventos;
- DOM;
- módulos;
- armazenamento local;
- validação;
- tratamento de erros.

## Desenvolvimento web

Praticar:

- HTML;
- CSS;
- responsividade;
- organização de arquivos;
- arquitetura de projeto.

## Git

Praticar:

- repositório;
- commits;
- branches;
- GitHub;
- histórico de alterações.

## Futuramente

- Node.js;
- Express;
- APIs;
- banco de dados;
- React;
- autenticação;
- deploy.

---

# 26. Primeira tarefa do projeto

Não começar criando todas as telas.

O primeiro objetivo será:

> **Fazer o computador receber uma nota e descobrir quanto aquela nota vale.**

Exemplo:

```text
Entrada:
Nota = 9

Processamento:
9 → faixa da nota 9 → R$15

Saída:
"Essa nota vale R$15"
```

Depois disso, evoluiremos para várias notas e, finalmente, para o cálculo completo do bimestre.

---

# 27. Decisões pendentes antes da implementação

Antes de começar a escrever a lógica definitiva, precisamos confirmar:

- [ ] Valor de cada nota.
- [ ] Como notas decimais serão tratadas.
- [ ] Quais matérias o aluno possui.
- [ ] Se todas as matérias terão o mesmo peso.
- [ ] Se todas as notas terão o mesmo valor financeiro.
- [ ] Se uma nota abaixo de 8 pode gerar resultado negativo.
- [ ] Confirmar que resultado negativo vira R$0,00.
- [ ] Confirmar que não haverá dívida entre bimestres.
- [ ] Confirmar se o valor é pago somente após o fechamento.
- [ ] Confirmar se haverá possibilidade de reabrir um bimestre fechado futuramente.

---

# 28. Visão final do projeto

A aplicação deverá seguir este fluxo:

```text
                    ┌──────────────┐
                    │   CADASTRO   │
                    │   DO ALUNO   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   MATÉRIAS   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │    NOTAS     │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   CÁLCULO    │
                    │ DA RECOMPENSA│
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   RESULTADO  │
                    │  BIMESTRAL   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   FECHAR     │
                    │   BIMESTRE   │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   PAGAMENTO  │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │   HISTÓRICO  │
                    └──────────────┘
```

## Resultado esperado

Ao final, teremos uma aplicação web funcional que transforma as notas escolares em um sistema de recompensa, mantendo o histórico de cada bimestre e dos pagamentos.

O projeto também será utilizado como projeto prático de aprendizado de desenvolvimento web, começando com HTML, CSS e JavaScript e podendo evoluir posteriormente para uma arquitetura com React, Node.js, API e banco de dados.
