# 🦇 Wayne Industries - Security Management System

![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0-green.svg)
![License](https://img.shields.io/badge/license-proprietary-red.svg)

Sistema completo de gerenciamento de segurança e recursos desenvolvido para as Indústrias Wayne.

## ⚡ Início Rápido

### Instalação

```bash
# 1. Instalar dependências
cd backend
pip install -r requirements.txt --break-system-packages

# 2. Iniciar servidor
python app.py
```

### Acesso

Abra seu navegador em: **http://localhost:5000**

### Credenciais de Teste

| Usuário | Senha | Nível |
|---------|-------|-------|
| bruce.wayne | Batman2024! | Admin (5) |
| lucius.fox | Tech2024! | Manager (4) |
| dick.grayson | Nightwing1! | Employee (2) |

## 🎯 Funcionalidades Principais

### ✅ Sistema de Segurança
- Autenticação com tokens seguros
- Autorização baseada em níveis (1-5)
- Controle de acesso a áreas restritas
- Logs de auditoria completos

### 📦 Gestão de Recursos
- Inventário de equipamentos e veículos
- CRUD completo com permissões
- Filtros por categoria e status
- Rastreamento de manutenção

### 📊 Dashboard Executivo
- Estatísticas em tempo real
- Gráficos interativos
- Feed de atividades recentes
- Alertas de segurança

## 🏗 Arquitetura

```
wayne_industries/
├── backend/
│   ├── app.py              # Servidor Flask
│   └── requirements.txt    # Dependências
├── frontend/
│   ├── index.html         # Interface principal
│   ├── css/styles.css     # Estilos
│   └── js/app.js          # Lógica JavaScript
├── database/
│   └── wayne_industries.db # Banco SQLite (auto-gerado)
└── docs/
    └── DOCUMENTACAO.md    # Documentação completa
```

## 🛠 Tecnologias

**Backend:** Python 3, Flask, SQLite  
**Frontend:** HTML5, CSS3, JavaScript ES6+  
**Segurança:** SHA-256, Tokens seguros, CORS

## 📚 Documentação

Documentação completa disponível em: [`docs/DOCUMENTACAO.md`](docs/DOCUMENTACAO.md)

Inclui:
- Guia de instalação detalhado
- API endpoints completos
- Estrutura do banco de dados
- Testes e validação
- Melhorias futuras

## 🔒 Segurança

- ✅ Senhas hasheadas (SHA-256)
- ✅ Tokens de sessão com expiração
- ✅ Proteção contra SQL injection
- ✅ Autorização baseada em roles
- ✅ CORS configurável

## 🧪 Testes

O sistema foi testado com:
- ✅ Autenticação e autorização
- ✅ CRUD de recursos
- ✅ Controle de acesso a áreas
- ✅ Logs e auditoria
- ✅ Dashboard e visualizações

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Usuário atual

### Recursos
- `GET /api/resources` - Listar recursos
- `POST /api/resources` - Criar recurso
- `PUT /api/resources/{id}` - Atualizar
- `DELETE /api/resources/{id}` - Deletar

### Áreas Restritas
- `GET /api/areas` - Listar áreas
- `POST /api/areas/{id}/access` - Solicitar acesso

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas
- `GET /api/dashboard/access-logs` - Logs

## 🎨 Design

**Tema:** Dark Mode inspirado em Batman/Gotham  
**Cores:** Dourado (#FFD700) e Azul Ciano (#00D4FF)  
**Fontes:** Orbitron (display) + Rajdhani (body)  
**Animações:** CSS3 com transições suaves

## 🚀 Próximos Passos

- [ ] Autenticação de dois fatores (2FA)
- [ ] Notificações push
- [ ] Relatórios em PDF
- [ ] API GraphQL
- [ ] Dashboard mobile nativo
- [ ] Websockets para tempo real

## 👤 Autor

**Desenvolvido por:** Claude (Anthropic)  
**Cliente:** Bruce Wayne / Wayne Industries  
**Propósito:** Projeto Final - Dev Full Stack  

## 📄 Licença

© 2026 Wayne Industries. Todos os direitos reservados.

---

## 🦇 "In the darkness, there is strength"

**Protegendo Gotham City através da tecnologia.**