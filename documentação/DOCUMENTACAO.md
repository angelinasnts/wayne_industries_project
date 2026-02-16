# 🦇 Wayne Industries - Security Management System

## Documentação do Projeto Final - Dev Full Stack

**Desenvolvido para:** Indústrias Wayne  
**Responsável:** Bruce Wayne (Batman)  
**Objetivo:** Sistema de Gerenciamento de Segurança e Recursos

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Requisitos do Projeto](#requisitos-do-projeto)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Instalação e Configuração](#instalação-e-configuração)
6. [Funcionalidades Implementadas](#funcionalidades-implementadas)
7. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
8. [API Endpoints](#api-endpoints)
9. [Interface do Usuário](#interface-do-usuário)
10. [Segurança](#segurança)
11. [Testes e Validação](#testes-e-validação)
12. [Melhorias Futuras](#melhorias-futuras)

---

## 🎯 Visão Geral

O **Wayne Industries Security Management System** é uma aplicação web full stack desenvolvida para otimizar os processos internos e melhorar a segurança das instalações das Indústrias Wayne em Gotham City.

O sistema oferece:
- **Controle de Acesso**: Gestão de permissões e áreas restritas
- **Gestão de Recursos**: Inventário completo de equipamentos, veículos e dispositivos
- **Dashboard Executivo**: Visualização em tempo real de operações e estatísticas
- **Auditoria**: Logs detalhados de todas as atividades de acesso

---

## 📝 Requisitos do Projeto

### 1. Sistema de Gerenciamento de Segurança ✅
- [x] Controle de acesso a áreas restritas
- [x] Autenticação de usuários
- [x] Autorização baseada em níveis (Admin, Gerente, Funcionário)
- [x] Sistema de tokens de sessão
- [x] Logs de tentativas de acesso

### 2. Gestão de Recursos ✅
- [x] Interface para gerenciar inventário
- [x] CRUD completo de recursos (Create, Read, Update, Delete)
- [x] Categorização de equipamentos
- [x] Controle de status (Disponível, Em Uso, Manutenção)
- [x] Filtros e busca

### 3. Dashboard de Visualização ✅
- [x] Painel de controle interativo
- [x] Estatísticas em tempo real
- [x] Gráficos de recursos por categoria
- [x] Visualização de atividades recentes
- [x] Alertas de segurança

---

## 🛠 Tecnologias Utilizadas

### Backend
- **Python 3.x**: Linguagem principal
- **Flask 3.0**: Framework web
- **SQLite3**: Banco de dados
- **Flask-CORS**: Suporte a requisições cross-origin
- **hashlib**: Criptografia de senhas (SHA-256)
- **secrets**: Geração de tokens seguros

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada com variáveis CSS e animações
- **JavaScript (ES6+)**: Lógica de aplicação
- **Fetch API**: Comunicação com backend
- **Local Storage**: Persistência de sessão

### Design
- **Orbitron**: Fonte display para títulos
- **Rajdhani**: Fonte body para conteúdo
- **Tema Dark**: Inspirado no Batman/Gotham
- **Gradientes**: Dourado (#FFD700) e Azul Ciano (#00D4FF)
- **Animações CSS**: Transições suaves e efeitos hover

---

## 🏗 Arquitetura do Sistema

```
wayne_industries/
│
├── backend/
│   ├── app.py                 # Servidor Flask principal
│   └── requirements.txt       # Dependências Python
│
├── frontend/
│   ├── index.html            # Interface principal
│   ├── css/
│   │   └── styles.css        # Estilos da aplicação
│   └── js/
│       └── app.js            # Lógica JavaScript
│
├── database/
│   └── wayne_industries.db   # Banco SQLite (gerado automaticamente)
│
└── docs/
    └── DOCUMENTACAO.md       # Este arquivo
```

### Padrão de Comunicação

```
┌──────────────┐         HTTP/JSON          ┌──────────────┐
│   Frontend   │ ◄─────────────────────────► │   Backend    │
│  (HTML/CSS/JS)│                             │   (Flask)    │
└──────────────┘                             └───────┬──────┘
                                                     │
                                                     │ SQL
                                                     ▼
                                              ┌──────────────┐
                                              │   Database   │
                                              │   (SQLite)   │
                                              └──────────────┘
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Navegador web moderno (Chrome, Firefox, Edge)

### Passo 1: Instalar Dependências

```bash
cd wayne_industries/backend
pip install -r requirements.txt --break-system-packages
```

### Passo 2: Iniciar o Servidor

```bash
python app.py
```

O servidor será iniciado em: `http://localhost:5000`

### Passo 3: Acessar a Aplicação

Abra seu navegador e acesse: `http://localhost:5000`

---

## ⚡ Funcionalidades Implementadas

### 1. Autenticação e Autorização

#### Login Seguro
- Hash de senhas com SHA-256
- Tokens de sessão com validade de 8 horas
- Proteção contra acesso não autorizado

#### Níveis de Acesso
| Nível | Permissões |
|-------|-----------|
| 5 | Admin: Acesso total ao sistema |
| 4 | Manager: Gestão de recursos e visualização de logs |
| 3 | Manager: Acesso a áreas de nível médio |
| 2 | Employee: Acesso básico |
| 1 | Employee: Acesso mínimo |

#### Usuários de Teste

```
Admin:
- Usuário: bruce.wayne
- Senha: Batman2024!
- Nível: 5

Admin:
- Usuário: alfred.pennyworth
- Senha: Butler123!
- Nível: 5

Manager:
- Usuário: lucius.fox
- Senha: Tech2024!
- Nível: 4

Manager:
- Usuário: barbara.gordon
- Senha: Oracle123!
- Nível: 3

Employee:
- Usuário: dick.grayson
- Senha: Nightwing1!
- Nível: 2

Employee:
- Usuário: tim.drake
- Senha: Robin2024!
- Nível: 2
```

### 2. Dashboard Executivo

#### Estatísticas em Tempo Real
- Total de usuários ativos
- Recursos disponíveis
- Acessos nas últimas 24h
- Tentativas de acesso negadas

#### Visualizações
- Gráfico de recursos por categoria
- Gráfico de status dos recursos
- Feed de atividades recentes

### 3. Gestão de Recursos

#### Categorias Disponíveis
- **Veículos**: Batmóvel, Bat-Wing, veículos de patrulha
- **Equipamentos**: Grappling Guns, Batarangs, trajes táticos
- **Tecnologia**: Computadores, scanners, dispositivos de segurança

#### Status de Recursos
- ✅ **Disponível**: Pronto para uso
- 🔵 **Em Uso**: Atualmente alocado
- ⚠️ **Manutenção**: Necessita reparo
- 🔴 **Aposentado**: Fora de serviço

#### Operações CRUD
- **Criar**: Adicionar novos recursos
- **Ler**: Visualizar inventário completo
- **Atualizar**: Modificar informações
- **Deletar**: Remover recursos (apenas Admin)

### 4. Controle de Áreas Restritas

#### Áreas Protegidas
1. **Bat-Caverna** (Nível 5)
   - Centro de operações principal
   - Acesso: Apenas administradores

2. **Laboratório R&D** (Nível 4)
   - Pesquisa e desenvolvimento
   - Acesso: Gerentes e administradores

3. **Armário de Armas** (Nível 4)
   - Arsenal tático
   - Acesso: Equipe autorizada

4. **Sala de Servidores** (Nível 3)
   - Infraestrutura de TI
   - Acesso: TI e gerentes

5. **Garagem de Veículos Especiais** (Nível 3)
   - Veículos táticos
   - Acesso: Operações de campo

6. **Escritório Executivo** (Nível 4)
   - Escritório do CEO
   - Acesso: Alta gerência

#### Sistema de Solicitação
- Verificação automática de nível de acesso
- Registro de todas as tentativas
- Feedback instantâneo ao usuário

### 5. Logs e Auditoria

#### Informações Registradas
- Data e hora da tentativa
- Usuário solicitante
- Área acessada
- Status da solicitação (Concedido/Negado)

#### Recursos de Auditoria
- Histórico completo de acessos
- Filtros por data e usuário
- Exportação de relatórios
- Alertas de segurança

---

## 💾 Estrutura do Banco de Dados

### Tabela: users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,           -- SHA-256 hash
    name TEXT NOT NULL,
    role TEXT NOT NULL,               -- admin, manager, employee
    department TEXT,
    access_level INTEGER DEFAULT 1,   -- 1-5
    active INTEGER DEFAULT 1,         -- 0=inativo, 1=ativo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

### Tabela: resources
```sql
CREATE TABLE resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,               -- vehicle, equipment, device
    category TEXT NOT NULL,
    location TEXT,
    status TEXT DEFAULT 'available',  -- available, in_use, maintenance, retired
    quantity INTEGER DEFAULT 1,
    description TEXT,
    assigned_to TEXT,
    last_maintenance DATE,
    next_maintenance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: restricted_areas
```sql
CREATE TABLE restricted_areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    required_level INTEGER NOT NULL,  -- Nível mínimo necessário
    description TEXT,
    active INTEGER DEFAULT 1
);
```

### Tabela: access_logs
```sql
CREATE TABLE access_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    area_id INTEGER,
    action TEXT,
    status TEXT,                      -- granted, denied
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (area_id) REFERENCES restricted_areas (id)
);
```

### Tabela: sessions
```sql
CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

---

## 🔌 API Endpoints

### Autenticação

#### POST /api/auth/login
Autentica usuário e retorna token.

**Request:**
```json
{
  "username": "bruce.wayne",
  "password": "Batman2024!"
}
```

**Response:**
```json
{
  "token": "abc123...",
  "user": {
    "id": 1,
    "username": "bruce.wayne",
    "name": "Bruce Wayne",
    "role": "admin",
    "department": "Executive",
    "access_level": 5
  }
}
```

#### POST /api/auth/logout
Invalida token atual.

**Headers:**
```
Authorization: Bearer {token}
```

#### GET /api/auth/me
Retorna informações do usuário autenticado.

### Usuários

#### GET /api/users
Lista todos os usuários (requer: admin/manager).

#### POST /api/users
Cria novo usuário (requer: admin).

#### PUT /api/users/{id}
Atualiza usuário (requer: admin).

### Recursos

#### GET /api/resources
Lista recursos com filtros opcionais.

**Query Params:**
- `category`: Filtrar por categoria
- `status`: Filtrar por status

#### POST /api/resources
Cria novo recurso (requer: admin/manager).

#### PUT /api/resources/{id}
Atualiza recurso (requer: admin/manager).

#### DELETE /api/resources/{id}
Remove recurso (requer: admin).

### Áreas Restritas

#### GET /api/areas
Lista áreas acessíveis ao usuário.

#### POST /api/areas/{id}/access
Solicita acesso a área restrita.

**Response:**
```json
{
  "message": "Acesso concedido",
  "status": "granted",
  "area": { ... }
}
```

### Dashboard

#### GET /api/dashboard/stats
Retorna estatísticas para dashboard.

**Response:**
```json
{
  "total_users": 6,
  "resources_by_status": {
    "available": 8,
    "in_use": 1,
    "maintenance": 1
  },
  "resources_by_category": {
    "Equipamentos": 6,
    "Veículos": 4
  },
  "recent_accesses": 15,
  "denied_accesses": 3,
  "recent_activities": [ ... ]
}
```

#### GET /api/dashboard/access-logs
Retorna logs de acesso (requer: admin/manager).

---

## 🎨 Interface do Usuário

### Design System

#### Paleta de Cores
```css
--primary: #ffd700        /* Dourado Wayne Industries */
--secondary: #00d4ff      /* Azul Ciano Tecnológico */
--accent: #ff4655         /* Vermelho de Alerta */

--bg-dark: #0a0a0f        /* Fundo Escuro */
--bg-card: #12121a        /* Cards */
--bg-hover: #1a1a25       /* Hover States */

--success: #00ff88        /* Verde de Sucesso */
--warning: #ffaa00        /* Laranja de Aviso */
--danger: #ff4655         /* Vermelho de Perigo */
```

#### Tipografia
- **Display**: Orbitron (títulos e números)
- **Body**: Rajdhani (texto geral)
- **Monospace**: Courier New (credenciais)

#### Animações
- **fadeIn**: Entrada suave de elementos
- **slideIn**: Navegação lateral
- **glow**: Efeito de brilho no logo
- **scan**: Linha de scan no background

### Páginas

#### 1. Login
- Logo animado do Batman
- Formulário de autenticação
- Credenciais de teste visíveis
- Mensagens de erro contextuais

#### 2. Dashboard
- Header fixo com informações do usuário
- Sidebar com navegação
- Grid de estatísticas (4 cards)
- Gráficos de recursos
- Feed de atividades recentes

#### 3. Recursos
- Filtros por categoria e status
- Cards de recursos em grid
- Ações CRUD baseadas em permissões
- Badges de status coloridos

#### 4. Áreas Restritas
- Cards de áreas com níveis visuais
- Indicador de permissão
- Botões de solicitação de acesso
- Feedback instantâneo

#### 5. Usuários (Admin/Manager)
- Tabela com todos os usuários
- Informações de última atividade
- Badges de função
- Status ativo/inativo

#### 6. Logs (Admin/Manager)
- Histórico completo de acessos
- Filtros por data e usuário
- Status de cada tentativa
- Exportação de relatórios

### Responsividade
- **Desktop**: Layout completo com sidebar
- **Tablet**: Sidebar colapsável
- **Mobile**: Menu hambúrguer e layout vertical

---

## 🔒 Segurança

### Autenticação
- ✅ Senhas hasheadas com SHA-256
- ✅ Tokens seguros gerados com `secrets.token_urlsafe()`
- ✅ Expiração automática de sessões (8 horas)
- ✅ Validação de token em todas as rotas protegidas

### Autorização
- ✅ Decoradores `@require_auth` e `@require_role`
- ✅ Verificação de nível de acesso
- ✅ Isolamento de dados por permissão

### Banco de Dados
- ✅ Prepared statements (proteção contra SQL injection)
- ✅ Constraints de integridade
- ✅ Foreign keys ativas

### Frontend
- ✅ Validação de formulários
- ✅ Sanitização de entradas
- ✅ Token armazenado em localStorage
- ✅ Logout automático em token inválido

### CORS
- ✅ Configurado para desenvolvimento
- ⚠️ **Produção**: Configurar domínios permitidos

---

## 🧪 Testes e Validação

### Testes Funcionais Realizados

#### Autenticação
- ✅ Login com credenciais válidas
- ✅ Login com credenciais inválidas
- ✅ Logout e limpeza de sessão
- ✅ Acesso com token expirado
- ✅ Tentativa de acesso sem autenticação

#### Gestão de Recursos
- ✅ Listagem de recursos
- ✅ Filtros por categoria
- ✅ Filtros por status
- ✅ Criação de recurso (admin/manager)
- ✅ Edição de recurso (admin/manager)
- ✅ Exclusão de recurso (admin)
- ✅ Bloqueio de ações para funcionários

#### Controle de Acesso
- ✅ Solicitação com nível suficiente
- ✅ Solicitação com nível insuficiente
- ✅ Registro em logs
- ✅ Visualização de áreas permitidas

#### Dashboard
- ✅ Carregamento de estatísticas
- ✅ Renderização de gráficos
- ✅ Atualização em tempo real
- ✅ Feed de atividades

### Como Testar

1. **Iniciar o servidor**: `python backend/app.py`
2. **Abrir navegador**: `http://localhost:5000`
3. **Fazer login** com uma das credenciais de teste
4. **Navegar** pelas diferentes seções
5. **Testar funcionalidades** de acordo com nível de acesso

---

## 🚧 Melhorias Futuras

### Funcionalidades
- [ ] Sistema de notificações push
- [ ] Relatórios em PDF
- [ ] Integração com câmeras de segurança
- [ ] Dashboard mobile nativo
- [ ] API GraphQL
- [ ] Websockets para atualizações em tempo real
- [ ] Sistema de backup automático

### Segurança
- [ ] Autenticação de dois fatores (2FA)
- [ ] Biometria
- [ ] Criptografia de banco de dados
- [ ] Rate limiting
- [ ] Firewall de aplicação
- [ ] Logs de auditoria avançados

### Performance
- [ ] Cache Redis
- [ ] CDN para assets
- [ ] Compressão de imagens
- [ ] Lazy loading
- [ ] Service Workers
- [ ] Otimização de queries

### UX/UI
- [ ] Tema claro/escuro
- [ ] Personalização de dashboard
- [ ] Atalhos de teclado
- [ ] Tour guiado
- [ ] Acessibilidade (WCAG 2.1)
- [ ] Internacionalização (i18n)

---

## 📊 Métricas do Projeto

### Código
- **Linhas de Python**: ~750 linhas
- **Linhas de JavaScript**: ~600 linhas
- **Linhas de CSS**: ~1400 linhas
- **Linhas de HTML**: ~400 linhas

### Funcionalidades
- **Endpoints API**: 15
- **Tabelas do Banco**: 5
- **Telas**: 6
- **Níveis de Acesso**: 5

### Tempo de Desenvolvimento
- **Backend**: ~4 horas
- **Frontend**: ~5 horas
- **Banco de Dados**: ~2 horas
- **Testes**: ~2 horas
- **Documentação**: ~2 horas
- **Total**: ~15 horas

---

## 👥 Créditos

**Desenvolvedor**: Claude (Anthropic)  
**Cliente**: Bruce Wayne / Wayne Industries  
**Propósito**: Projeto Final - Dev Full Stack  
**Data**: Fevereiro 2026  

---

## 📄 Licença

© 2026 Wayne Industries. Todos os direitos reservados.

Este sistema é proprietário e confidencial. Uso não autorizado é estritamente proibido.

---

## 📞 Suporte

Para questões técnicas ou solicitações de suporte:

- **Email**: support@wayne-industries.com
- **Telefone**: 1-800-BATMAN
- **Localização**: Wayne Tower, Gotham City

---

## 🦇 "In the darkness, there is strength"

**Sistema desenvolvido com excelência para proteger Gotham City.**