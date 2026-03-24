# 🚀 Flowset

> Troque de contexto na hora. Abra todos os seus apps com um clique.

![Electron](https://img.shields.io/badge/Electron-191970?style=flat&logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows-blue)

Flowset é um app desktop para Windows que permite criar perfis de trabalho e abrir todos os seus programas de uma vez, com um único clique.

Chega de abrir manualmente o VS Code, o Slack, o navegador e o Spotify toda vez que você senta pra trabalhar. Com o Flowset você cria um perfil chamado "Trabalho" e abre tudo de uma vez.

## Como funciona

1. Crie um perfil com nome, emoji e cor personalizados
2. Adicione os aplicativos que você usa naquele contexto (`.exe`, `.bat` ou `.lnk`)
3. Clique em iniciar — o Flowset abre tudo em sequência

Exemplos de perfis:
- **Trabalho** — abre o editor de código, cliente de email, Teams e o navegador
- **Estudos** — abre o Notion, Anki, YouTube e o ambiente de desenvolvimento
- **Games** — abre a Steam, Discord e fecha os apps desnecessários

## Tecnologias

- **Electron** — framework para apps desktop com JavaScript
- **HTML + CSS + JavaScript** (vanilla, sem frameworks)
- **electron-store** — persistência local dos perfis

## Como rodar localmente

Pré-requisitos: Node.js instalado.

```bash
git clone https://github.com/Augustuuuuu/flowset.git
cd flowset
npm install
```

## Run (dev)

```bash
npm start
```

## Como gerar o executável

```bash
npm run build
```

O executável `.exe` será gerado na pasta `dist/`.

## Motivação

Projeto pessoal criado para resolver um problema real do dia a dia: perder tempo abrindo os mesmos aplicativos repetidamente ao mudar de contexto entre trabalho, estudos e lazer.

---

Feito por [Augusto Saboia](https://www.linkedin.com/in/augustosaboia/)
