# naveteam-back-end-challenge

Solução do desafio proposto pela Nave, para a vaga de desenvolvedor Back-end NodeJS.
API construída com Node.JS, PostgreSQL, Express e TypeORM.

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
6. Por ultimo, instale as dependências utilizando o npm ou o yarn: `npm install` ou ` yarn`;

## insomnia
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=naveteam-back-end-challenge&uri=https://raw.githubusercontent.com/JohnLDev/naveteam-back-end-challenge/master/Insomnia.json?token=AQVFH2YHBLBM6N3AAKYUZAC7PTKWK)


# Funcionalidades

## ER Dirgram
![ER Diagram](https://i.ibb.co/Y8vwG36/Screenshot-1.png)

### Signup

``
