# Naveteam-back-end-challenge

Solução do desafio proposto pela Nave, para a vaga de desenvolvedor Back-end NodeJS.
API construída com Node.JS, PostgreSQL, Express, TypeScript e TypeORM.

## Conteúdo


# Antes de começar
## Instalação

1. Instale o node na versão LTS;
2. Instale o postgresSQL localmente(Não recomendado) ou através do docker(Recomendado);
  *  Caso opte por instalar o docker este é um tutorial de instalação para todos os sistemas operacionais;
  
  [![Docker](https://www.ortussolutions.com/__media/logos/docker.png)](https://www.notion.so/Instala-o-do-Docker-8230846ae2c547b2988f2aca91fc1edf) 
  
  
3. Com o docker instalado será necessário criar um container para isso devemos digitar no terminal:
`docker run --name nome_do_container -e POSTGRES_PASSWORD=senha_que_será_usada_no_.env -p 5432:5432  -d postgres`
o retorno será o nome do container caso o comando tenha sucesso;
4. Com o container criado, o proximo passo é acessar o banco de dados através de um software de sua escolha(recomendo dbeaver) e criar uma database e guarde o nome pois ele será utilizado no .env
5. Agora com o repositório clonado você deverá criar um arquivo .env na raiz do projeto utilizando como exemplo o arquivo .env-exemple;
6. Instale as dependências utilizando o npm ou o yarn: `npm install` ou ` yarn`;
7. Vamos rodar as migrações para deixar seu banco de dados no formato correto, digite no console `yarn typeorm migration:run` ou `npm run dev:server` e todas as migrações devem ser rodadas e está tudo pronto para os testes.
8. Por ultimo, é só iniciar a api digitando no console:`yarn dev:server` ou `npm run dev:server`

## insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=naveteam-back-end-challenge&uri=https://raw.githubusercontent.com/JohnLDev/naveteam-back-end-challenge/master/Insomnia.json?token=AQVFH2YHBLBM6N3AAKYUZAC7PTKWK)

## Boas práticas aplicadas não especificadas no teste
* Utilização de uma lib para geração de id(uuid) como forma de aumentar a segurança;
* Separation of concerns;
* Adição das colunas created_at e updated_at nas tabelas do banco para manutenção das inserções e edições de informações; 
* Utilização das configuração de acesso ao banco e secret jwt em variáveis ambiente para maior segurança;
* Captura de exceções de forma global com mensagem e código de erros específicos;

# Funcionalidades

## ER Dirgram
![ER Diagram](https://i.ibb.co/Y8vwG36/Screenshot-1.png)

## Authentication

### Rota Signup
__Método:POST__

URL:`http://localhost:3333/authentication/signup`
* Rota recebe através do body da request nome(opcional), email(obrigatório) e senha(obrigatório) e cria um registro no banco de dados com o usuario.

``` 
body da request:
{
	"name":"User",
	"email":"exemple@gmail.com",
	"password":"exemple"

}
```
```
response:
{
  "user": {
    "id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
    "name": "User",
    "email": "exemple@gmail.com",
    "created_at": "2020-09-29T23:51:55.890Z",
    "updated_at": "2020-09-29T23:51:55.890Z"
  }
}
```
Obs: 
1. senha foi ocultada da resposta como forma de aumentar a segurança do usuário.

### Rota Login
__Método:POST__

URL:`http://localhost:3333/authentication/login`
* Rota recebe através do body da request o email e senha de um usuário e caso o usuário esteja cadastrado ela devolve um token jwt.
``` 
body da request:
{
	"email":"exemple@gmail.com",
	"password":"exemple"
}
```
```
response:
{
  "user": {
    "id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
    "name": "User",
    "email": "exemple@gmail.com",
    "created_at": "2020-09-29T23:51:55.890Z",
    "updated_at": "2020-09-29T23:51:55.890Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDE0NjkxMDEsImV4cCI6MTYwMTQ3NjMwMSwic3ViIjoiZDQ0YTA5MTYtNWRmZS00MmI3LWI4MjQtZDVmZmZiMTBiNDliIn0.dI94C4EdMxoxo8gY9gC60MHzr3OoLMOVbmrWOo3AjU8"
}
```
Obs: 
1. A senha foi ocultada da resposta como forma de aumentar a segurança do usuário.
2. Nesse momento voce terá que alterar o token nas variáveis de ambiente do insomnia(atalho: ctrl + e) para obter acesso às proximas rotas.

## Navers

### Index
__Método:GET__

URL:`http://localhost:3333/navers/index`
* Rota para a listagem de navers com ou sem filtros, ela pode ser filtrada atráves dos queryparams. Exemplo:`http://localhost:3333/navers/index?name=John&job_role=desenvolvedor&admission_date=2000-10-17`


```
response:
{
  [
  {
    "id": "41c11d5e-a193-40f0-a925-eaccfbef3295",
    "name": "John ",
    "birthdate": "1999-05-15",
    "admission_date": "2000-10-17",
    "job_role": "desenvolvedor",
    "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
    "created_at": "2020-09-30T01:14:38.367Z",
    "updated_at": "2020-09-30T01:14:38.367Z"
  },
  {
    "id": "018c8c4a-3bca-490f-9176-149ea508fb95",
    "name": "Johnzinho",
    "birthdate": "1999-05-15",
    "admission_date": "2000-10-17",
    "job_role": "desenvolvedor",
    "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
    "created_at": "2020-09-30T01:15:07.481Z",
    "updated_at": "2020-09-30T01:15:07.481Z"
  }
]
```
Obs: 
1. O parametro name da query foi feito com includes para facilitar a busca por nomes.
2. O usuário só pode listar seus próprios Navers.

### Show
__Método:GET__

URL:`http://localhost:3333/navers/show/:id`
* Rota recebe através do param id o identificador unico(uuid) de um naver e retorna o naver de forma detalhada.
URL EXEMPLO:`http://localhost:3333/navers/show/a4c31cf3-be4b-4351-8de0-6a46a4553930`
```
response:
{
  "id": "a4c31cf3-be4b-4351-8de0-6a46a4553930",
  "name": "John Lenon",
  "birthdate": "1909-04-14",
  "admission_date": "2020-09-19",
  "job_role": "Back-end brabo",
  "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
  "created_at": "2020-09-29T23:52:32.155Z",
  "updated_at": "2020-09-30T15:54:55.578Z",
  "projects": [
    {
      "id": "5dae36ab-35d8-4217-8e43-e6d564f288c4",
      "name": "Projeto Bom2",
      "user_id": "8c5e6a94-1dec-4e70-bc30-68ef4aeb2844",
      "created_at": "2020-09-29T19:08:02.406Z",
      "updated_at": "2020-09-29T19:08:02.406Z"
    },
    {
      "id": "27179da2-411a-4c22-90bc-d97420b3b3ba",
      "name": "Projeto Muito Bom",
      "user_id": "8c5e6a94-1dec-4e70-bc30-68ef4aeb2844",
      "created_at": "2020-09-29T20:24:13.648Z",
      "updated_at": "2020-09-29T20:42:59.527Z"
    }
  ]
}

```
Obs: 
1. O usuário só pode detalhar seus próprios Navers

 ### Store
 __Método:POST__

URL:`http://localhost:3333/navers/store`
* Recebe atráves do body da request as informações necessárias para criação de um Naver.
``` 
body da request:
{
        "name": "John Lenon",
        "birthdate": "1999-05-15",
        "admission_date": "2000-10-17",
        "job_role": "desenvolvedor back-end",
        "projects": ["16707990-3241-4ed1-a8bc-5b0314535ddb"]
 }
```
Obs: 
1. O array de projects também pode ser enviado vazio para o naver não ser vinculado a um projeto
```
response:
{
  "name": "John Lenon",
  "birthdate": "1999-05-15",
  "admission_date": "2000-10-17",
  "job_role": "desenvolvedor back-end",
  "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
  "projects": [
    {
      "id": "16707990-3241-4ed1-a8bc-5b0314535ddb",
      "name": "Projeto BOMBADÃO",
      "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
      "created_at": "2020-09-30T07:36:46.295Z",
      "updated_at": "2020-09-30T07:36:46.295Z"
    }
  ],
  "id": "394f9c64-1c43-4821-ac81-99bf91bef649",
  "created_at": "2020-09-30T16:04:11.312Z",
  "updated_at": "2020-09-30T16:04:11.312Z"
}

```

### Update
__Método:PUT__

URL:`http://localhost:3333/navers/update/:id`
*Rota recebe através do param id o identificador unico(uuid) de um naver e através do body da request as informações que deseja alterar de um naver
``` 
body da request:
{
        "name": "John Lenon",
        "birthdate": "1999-04-14",
        "admission_date": "2020-09-19",
        "job_role": "Back-end brabo",
        "projects": ["5dae36ab-35d8-4217-8e43-e6d564f288c4","27179da2-411a-4c22-90bc-d97420b3b3ba"]
        
}
```
Obs: 
1. Caso não queria atualizar todas as informações de um naver elas podem ser envidadas iguais as atuais ou não serem enviadas.
```
response:
{
  "id": "a4c31cf3-be4b-4351-8de0-6a46a4553930",
  "name": "John Lenon",
  "birthdate": "1999-04-14",
  "admission_date": "2020-09-19",
  "job_role": "Back-end brabo",
  "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
  "created_at": "2020-09-29T23:52:32.155Z",
  "updated_at": "2020-09-30T16:24:48.575Z",
  "projects": [
    {
      "id": "5dae36ab-35d8-4217-8e43-e6d564f288c4",
      "name": "Projeto Bom2",
      "user_id": "8c5e6a94-1dec-4e70-bc30-68ef4aeb2844",
      "created_at": "2020-09-29T19:08:02.406Z",
      "updated_at": "2020-09-29T19:08:02.406Z"
    },
    {
      "id": "27179da2-411a-4c22-90bc-d97420b3b3ba",
      "name": "Projeto Muito Bom",
      "user_id": "8c5e6a94-1dec-4e70-bc30-68ef4aeb2844",
      "created_at": "2020-09-29T20:24:13.648Z",
      "updated_at": "2020-09-29T20:42:59.527Z"
    }
  ]
}
 
```

### Delete
__Método:DELETE__

URL:`http://localhost:3333/navers/delete/:id`
*Rota recebe através do param id o identificador unico(uuid) de um naver e caso o naver exista e seja do usuário retornara Naver deleted
```
response:
{
  "message": "Naver Deleted"
}
```
Obs: 
1. O usuário só pode deletar seus próprios navers 

## Projects

### Index
__Método:GET__

URL:`http://localhost:3333/projects/index`
* Rota para a listagem de projetos com ou sem filtros, ela pode ser filtrada por nome atráves dos queryparams. Exemplo:`http://localhost:3333/projects/index?name=Projeto%20Bom`

```
response:
[
  {
    "id": "b48b90f0-434a-42a0-bb4a-b3c24efae7c9",
    "name": "Projeto Bom",
    "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
    "created_at": "2020-09-30T16:36:40.435Z",
    "updated_at": "2020-09-30T16:36:40.435Z"
  }
]
```
Obs: 
1. O usuário só pode listar seus próprios projetos 

### Show
__Método:GET__

URL:`http://localhost:3333/projects/show/:id`
* Rota recebe através do param id o identificador unico(uuid) de um projeto e retorna o projeto de forma detalhada.
URL EXEMPLO:`http://localhost:3333/projects/show/b48b90f0-434a-42a0-bb4a-b3c24efae7c9`


```
response:
{
  "id": "b48b90f0-434a-42a0-bb4a-b3c24efae7c9",
  "name": "Projeto Muito Bom",
  "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
  "created_at": "2020-09-30T16:36:40.435Z",
  "updated_at": "2020-09-30T16:40:54.703Z",
  "navers": [
    {
      "id": "bd341e85-78c3-484f-b7f8-5983577817de",
      "name": "John Lenon",
      "birthdate": "1999-05-15",
      "admission_date": "2020-06-12",
      "job_role": "desenvolvedor",
      "user_id": "8c5e6a94-1dec-4e70-bc30-68ef4aeb2844",
      "created_at": "2020-09-29T23:19:33.091Z",
      "updated_at": "2020-09-29T23:19:33.091Z"
    },
    {
      "id": "c25577d5-13ba-461d-b59a-d9100eb772e3",
      "name": "John Lenon",
      "birthdate": "1999-05-15",
      "admission_date": "2000-10-17",
      "job_role": "desenvolvedor back-end",
      "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
      "created_at": "2020-09-30T16:07:14.038Z",
      "updated_at": "2020-09-30T16:07:14.038Z"
    }
  ]
} 
```
Obs: 
1. O usuário só pode detalhar seus próprios projetos
### Store
__Método:POST__

URL:`http://localhost:3333/projects/store`
* Rota recebe através do body da request as informações necessárias para criação de um projeto e retorna o projeto criado.

``` 
body da request:
{
        "name": "Projeto Bom",
        "navers": ["c25577d5-13ba-461d-b59a-d9100eb772e3"]
}
```
Obs: 
1. O array de navers também pode ser enviado vazio para o projeto
 não possuir nenhum naver vinculado a ele.
```
response:
{
  "name": "Projeto Bom",
  "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
  "navers": [
    {
      "id": "c25577d5-13ba-461d-b59a-d9100eb772e3",
      "name": "John Lenon",
      "birthdate": "1999-05-14T03:00:00.000Z",
      "admission_date": "2000-10-16T02:00:00.000Z",
      "job_role": "desenvolvedor back-end",
      "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
      "created_at": "2020-09-30T16:07:14.038Z",
      "updated_at": "2020-09-30T16:07:14.038Z"
    }
  ],
  "id": "ebefae5b-300d-4cff-b566-0b3ef24ff147",
  "created_at": "2020-09-30T16:44:54.188Z",
  "updated_at": "2020-09-30T16:44:54.188Z"
}

```

### Update
__Método:PUT__

URL:`http://localhost:3333/projects/update/:id`
* Rota recebe através do param id o idenficiador unico(uuid) de um projeto e através do body da request as informações que serão atualizadas de projeto e retorna o projeto atualizado.

``` 
body da request:
{
        "name": "Projeto Muito Bom",
        "navers": ["bd341e85-78c3-484f-b7f8-5983577817de","c25577d5-13ba-461d-b59a-d9100eb772e3"]
}

```
Obs: 
1. O array de navers também pode ser enviado vazio para o projeto
 não possuir nenhum naver vinculado a ele.
2. caso não queria atualizar todas as informações de um naver elas podem ser envidadas iguais as atuais ou não serem enviadas.
```
response:
{
  "name": "Projeto Bom",
  "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
  "navers": [
    {
      "id": "c25577d5-13ba-461d-b59a-d9100eb772e3",
      "name": "John Lenon",
      "birthdate": "1999-05-14T03:00:00.000Z",
      "admission_date": "2000-10-16T02:00:00.000Z",
      "job_role": "desenvolvedor back-end",
      "user_id": "d44a0916-5dfe-42b7-b824-d5fffb10b49b",
      "created_at": "2020-09-30T16:07:14.038Z",
      "updated_at": "2020-09-30T16:07:14.038Z"
    }
  ],
  "id": "ebefae5b-300d-4cff-b566-0b3ef24ff147",
  "created_at": "2020-09-30T16:44:54.188Z",
  "updated_at": "2020-09-30T16:44:54.188Z"
}

```
### Delete
__Método:DELETE__

URL:`http://localhost:3333/projects/delete/:id`
*Rota recebe através do param id o identificador unico(uuid) de um projeto e caso o projeto exista e seja do usuário retornara Project deleted
```
response:
{
  "message": "Project Deleted"
}
```
Obs: 
1. O usuário só pode deletar seus próprios projetos 

# Dificuldades encontradas
Em quesito de código não consigo pensar em nenhuma dificuldade pontual, pois já estava habituado as tecnologias e estratégias empregadas.

# Considerações finais
Foi simplemente incrível ter a oportunidade de realizar um projeto real, de uma empresa que gosto e que colocou a prova diversos conhecimentos novos e antigos que possuia. Sinto que o teste agregou muito sobre as etapas de desenvolvimento de um projeto e fase de testes. Durante o teste me perdi diversas vezes no tempo, pois foi um projeto incrivelmente satisfatório de realizar.
Por fim gostária de agradecer a oportunidade e espero que gostem do teste.