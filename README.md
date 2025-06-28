# 🔐 Broadcast

Sistema tipo SaaS para gerenciamento de conexões, contatos e mensagens com agendamento. Criado com foco em performance, escalabilidade e experiência do usuário.

---

## 🚀 Tecnologias utilizadas

- **[Vite](https://vitejs.dev/)** + **React** + **TypeScript**
- **[Firebase](https://firebase.google.com/)** (Auth, Firestore, Functions)
- **[Material UI (MUI)](https://mui.com/)** — Componentes modernos
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização utilitária
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** — Validação de formulários
- **[React IMask](https://imask.js.org/react/)** — Máscaras de input

---

## 🧪 Funcionalidades

- ✅ **Autenticação Firebase** com cadastro, login e logout
- ✅ **CRUD de Conexões**
- ✅ **CRUD de Contatos**
- ✅ **Envio e agendamento de mensagens**
- ✅ **Filtro de mensagens agendadas/enviadas**
- ✅ **Atualização em tempo real com onSnapshot**
- ✅ **Função agendada para envio automático de mensagens**
- ✅ **Layout responsivo (3 colunas → 3 linhas em telas pequenas)**

---

## ⚙️ Como rodar localmente

1. **Clone o repositório**

```bash
git clone https://github.com/Taiog/broadcast.git
cd broadcast
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure suas variáveis de ambiente**
   Crie um arquivo .env baseado no .env.example:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
...
```

4. **Inicie o projeto**

```bash
npm run dev
```

## 🔥 Deploy das Firebase Functions

As funções ficam em functions/src. Para fazer deploy:

```bash
firebase deploy --only functions
```

## 📝 Notas sobre agendamento de mensagens

A função updateScheduledMessages roda a cada 1 minuto e altera o status de mensagens agendadas para enviada, respeitando a data/hora programada (scheduledAt).

Ela usa collectionGroup("messages") para buscar em todos os caminhos.
