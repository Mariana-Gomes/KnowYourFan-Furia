# ⚡ Teste Técnico  

O desafio propunha o desenvolvimento de uma solução que coletasse informações detalhadas sobre um **fã de esports**. A proposta era criar uma aplicação que ajudasse os clubes a entenderem melhor seus fãs, aplicando a estratégia de **Know Your Fan** para oferecer experiências e serviços exclusivos.

## 💻 A Aplicação

![KnowYourFan](https://github.com/user-attachments/assets/3be81289-14f1-4fec-b326-6c123cf45d64)

## 🔗 Acesse o Projeto

**Deploy Vercel:** [https://know-your-fan-furia-gamma.vercel.app/](https://know-your-fan-furia-gamma.vercel.app/)

## 👩🏻‍💻 Tecnologias Utilizadas  
- **ReactJS**: Biblioteca para a criação de interfaces de usuário, utilizada para construir o front-end da aplicação.
- **TailwindCSS**: Framework utilitário para estilização rápida e responsiva, permitindo um design altamente customizável sem sair do código HTML.
- **Vite**: Ferramenta de build moderna, focada em desenvolvimento rápido com React e suporte nativo a TypeScript.
- **React-Hook-Form**: Biblioteca para gerenciar formulários de forma eficiente em React, com integração simplificada e validação de dados.  
- **Axios**: Biblioteca para realizar requisições HTTP, utilizada para consumir APIs e fazer a comunicação com servidores. 
- **Firebase**: Plataforma de desenvolvimento que fornece backend como serviço, oferecendo funcionalidades como autenticação, banco de dados em tempo real e hospedagem.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança e facilidade na manutenção do código
- **Tesseract.JS**: Biblioteca JavaScript para OCR (Reconhecimento Óptico de Caracteres), utilizada para extrair texto de imagens.
- **Yup**: Biblioteca para validação de esquemas de dados, frequentemente usada com React-Hook-Form para validação de formulários.
- **Twitch API**: API que permite acessar informações sobre canais, usuários, streams e jogos, facilitando a integração de recursos da plataforma em aplicações web.
- **Vercel**: Plataforma de hospedagem para aplicações front-end, oferece deploy rápido e integração contínua com repositórios Git.

## 🖐️ Funcionalidades

- Criar conta;
- Realizar login com uma conta existente;
- Comentar em publicações de outros usuários;
- Curtir publicações;
- Editar o perfil do usuário (alterando nome, foto, banner e biografia);
- Preencher um formulário com informações pessoais, como CPF, e-mail, endereço e interesses;
- Obter selo de **usuario verificado**;
- Acessar a lista de criadores oficiais da plataforma;
- Verificar quais criadores você segue ou não;
- Submeter documentos para validação de identidade.

## 🔐 Configuração das Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para armazenar informações sensíveis, como chaves de API do Firebase e da Twitch. Essas variáveis não estão incluídas no repositório, por motivos de segurança.

1. **Crie o seu próprio arquivo `.env`**

No diretório raiz do projeto renomeie o arquivo `.env.example` para `.env`

2. **Preencha com os seus próprios valores**

Você precisará criar um projeto no Firebase e configurar os seguintes serviços:

- Crie um novo projeto web no Firebase;
- Após o registro, copie as credenciais fornecidas e substitua no arquivo `.env`
- Ative os serviços **Authentication** (ative o método de login Email/Senha) e o **Firestore Database**;

## ⚙️ Instruções para Rodar o Projeto  
1. **Clone o repositório**  
```bash
git clone https://github.com/Mariana-Gomes/KnowYourFan-Furia
cd KnowYourFan-Furia
```

2. **Instale as dependências**

```bash
npm install
```

- Rode a apliação utilizando:

```bash
npm run dev
```
