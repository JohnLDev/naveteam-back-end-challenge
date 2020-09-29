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
4. Agora com o repositório clonado você deverá criar um arquivo .env na raiz do projeto utilizando como exemplo o arquivo .env-exemple;
5. Por ultimo, instale as dependências utilizando o npm ou o yarn: `npm install` ou ` yarn`;

## insomnia
