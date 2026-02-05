# Documentação das APIs e Tabelas do Banco de Dados

Este documento descreve todas as APIs necessárias para o sistema de gerenciamento de filas CAEMA e as tabelas de banco de dados correspondentes.

---

## 📋 LISTA DE APIs

### 1. Autenticação

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/auth/login` | POST | Realiza login do usuário. Recebe email e senha, retorna token JWT e dados do usuário |
| `/auth/logout` | POST | Invalida o token do usuário |
| `/auth/me` | GET | Retorna dados do usuário autenticado |

**Request Login:**
```json
{
  "email": "usuario@caema.com",
  "password": "senha123"
}
```

**Response Login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "email": "usuario@caema.com",
    "role": "gerente | atendente",
    "storeId": "uuid (opcional, para atendentes)",
    "storeName": "Nome da Loja (opcional)"
  }
}
```

---

### 2. Dados Auxiliares

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/data/cities` | GET | Lista todas as cidades |
| `/data/stores` | GET | Lista todas as lojas (filtro opcional: cityId) |
| `/data/attendants` | GET | Lista todos os atendentes (filtro opcional: storeId) |

---

### 3. Guichês (Booths)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/booths` | GET | Lista guichês (filtro opcional: storeId) |
| `/booths` | POST | Cria novo guichê |
| `/booths/:id` | DELETE | Remove guichê (somente se desocupado) |
| `/booths/:id/occupy` | POST | Atendente ocupa guichê |
| `/booths/:id/leave` | POST | Atendente deixa guichê (validar se não há senha em atendimento) |

**Response Booth:**
```json
{
  "id": "uuid",
  "name": "Guichê 1",
  "storeId": "uuid",
  "isOccupied": true,
  "attendantId": "uuid",
  "attendantName": "Nome do Atendente",
  "currentTicketId": "uuid (opcional)"
}
```

---

### 4. Senhas/Tickets

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/tickets` | GET | Lista senhas (filtros: storeId, status) |
| `/tickets` | POST | Cria nova senha |
| `/tickets/waiting` | GET | Lista senhas em espera por loja |
| `/tickets/called` | GET | Lista últimas senhas chamadas (para painel TV) |
| `/tickets/call-next` | POST | Chama próxima senha para um guichê |
| `/tickets/:id/recall` | POST | Rechama senha (incrementa contador, marca no_show após 5x) |
| `/tickets/:id/start-service` | POST | Inicia atendimento |
| `/tickets/:id/end-service` | POST | Finaliza atendimento (com opção de chamar próxima ou pausar) |
| `/tickets/:id/no-show` | POST | Marca como cliente ausente |

**Response Ticket:**
```json
{
  "id": "uuid",
  "number": "A001",
  "customerName": "Nome do Cliente",
  "storeId": "uuid",
  "storeName": "Nome da Loja",
  "status": "waiting | called | in_service | completed | no_show",
  "boothId": "uuid",
  "boothName": "Guichê 1",
  "attendantId": "uuid",
  "attendantName": "Nome do Atendente",
  "createdAt": "2024-01-15T10:00:00Z",
  "calledAt": "2024-01-15T10:05:00Z",
  "startedAt": "2024-01-15T10:06:00Z",
  "completedAt": "2024-01-15T10:20:00Z",
  "recallCount": 0
}
```

---

### 5. Indicadores

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/indicators/summary` | GET | Resumo dos indicadores (TME, TMA, TMO médios) |
| `/indicators/attendants` | GET | Indicadores por atendente |
| `/indicators/stores` | GET | Indicadores por loja |
| `/indicators/cities` | GET | Indicadores por cidade |
| `/indicators/trend` | GET | Tendência dos indicadores ao longo do tempo |
| `/indicators/compare` | GET | Compara indicadores entre dois períodos |

**Filtros disponíveis:** cityId, storeId, attendantId, startDate, endDate

**Response Indicator:**
```json
{
  "tme": 5.2,
  "tma": 12.8,
  "tmo": 18.0,
  "totalAttendances": 150
}
```

---

### 6. Atendimentos (Histórico)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/attendances` | GET | Lista atendimentos com paginação |
| `/attendances/export` | GET | Exporta atendimentos para Excel (retorna arquivo) |

**Response Attendance:**
```json
{
  "id": "uuid",
  "ticketNumber": "A001",
  "customerName": "Nome do Cliente",
  "attendantId": "uuid",
  "attendantName": "Nome do Atendente",
  "storeId": "uuid",
  "storeName": "Nome da Loja",
  "cityId": "uuid",
  "cityName": "Nome da Cidade",
  "boothId": "uuid",
  "boothName": "Guichê 1",
  "serviceType": "Segunda Via de Conta",
  "waitTime": 5,
  "serviceTime": 12,
  "totalTime": 17,
  "quality": "excellent | good | regular | bad",
  "satisfaction": 5,
  "status": "completed | no_show",
  "date": "2024-01-15T10:20:00Z"
}
```

---

### 7. Painel TV (Tempo Real)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/tv/called-tickets` | GET | Retorna senhas chamadas para exibição |
| `ws://api/ws/tv` | WebSocket | Conexão em tempo real para atualizações de senhas |

**Eventos WebSocket:**
- `TICKET_CALLED`: Nova senha chamada
- `TICKET_RECALLED`: Senha rechamada
- `TICKET_STARTED`: Atendimento iniciado

---

## 🗄️ TABELAS DO BANCO DE DADOS

### 1. `users` - Usuários do Sistema

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| name | VARCHAR(255) | Nome completo |
| email | VARCHAR(255) | Email (único) |
| password_hash | VARCHAR(255) | Senha criptografada |
| role | ENUM | 'gerente' ou 'atendente' |
| store_id | UUID | FK para stores (opcional, para atendentes) |
| is_active | BOOLEAN | Se o usuário está ativo |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

---

### 2. `cities` - Cidades

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| name | VARCHAR(100) | Nome da cidade |
| state | VARCHAR(2) | Sigla do estado (MA) |
| is_active | BOOLEAN | Se está ativa |
| created_at | TIMESTAMP | Data de criação |

---

### 3. `stores` - Lojas/Unidades

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| name | VARCHAR(255) | Nome da loja |
| city_id | UUID | FK para cities |
| address | TEXT | Endereço completo |
| is_active | BOOLEAN | Se está ativa |
| created_at | TIMESTAMP | Data de criação |

---

### 4. `booths` - Guichês

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| name | VARCHAR(50) | Nome do guichê (ex: "Guichê 1") |
| store_id | UUID | FK para stores |
| is_occupied | BOOLEAN | Se está ocupado |
| attendant_id | UUID | FK para users (atendente atual) |
| current_ticket_id | UUID | FK para tickets (senha atual) |
| created_at | TIMESTAMP | Data de criação |

---

### 5. `tickets` - Senhas

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| number | VARCHAR(10) | Número da senha (ex: "A001") |
| customer_name | VARCHAR(255) | Nome do cliente |
| store_id | UUID | FK para stores |
| booth_id | UUID | FK para booths (quando chamada) |
| attendant_id | UUID | FK para users (atendente) |
| status | ENUM | 'waiting', 'called', 'in_service', 'completed', 'no_show' |
| recall_count | INTEGER | Contador de rechamadas (max 5) |
| created_at | TIMESTAMP | Quando a senha foi gerada |
| called_at | TIMESTAMP | Quando foi chamada |
| started_at | TIMESTAMP | Quando iniciou atendimento |
| completed_at | TIMESTAMP | Quando finalizou |

---

### 6. `attendances` - Registro de Atendimentos

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| ticket_id | UUID | FK para tickets |
| ticket_number | VARCHAR(10) | Número da senha |
| customer_name | VARCHAR(255) | Nome do cliente |
| attendant_id | UUID | FK para users |
| store_id | UUID | FK para stores |
| city_id | UUID | FK para cities |
| booth_id | UUID | FK para booths |
| service_type | VARCHAR(100) | Tipo de serviço |
| wait_time | INTEGER | Tempo de espera em minutos |
| service_time | INTEGER | Tempo de atendimento em minutos |
| total_time | INTEGER | Tempo total em minutos |
| quality | ENUM | 'excellent', 'good', 'regular', 'bad' |
| satisfaction | INTEGER | Nota de satisfação (1-5) |
| status | ENUM | 'completed', 'no_show' |
| created_at | TIMESTAMP | Data do atendimento |

---

### 7. `service_types` - Tipos de Serviço

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária |
| name | VARCHAR(100) | Nome do serviço |
| description | TEXT | Descrição |
| is_active | BOOLEAN | Se está ativo |

---

## 🔐 REGRAS DE NEGÓCIO IMPORTANTES

1. **Autenticação:** Todas as rotas (exceto login e painel TV) requerem token JWT válido
2. **Permissões:**
   - Gerente: acesso total ao sistema
   - Atendente: acesso apenas ao gerenciamento de filas
3. **Validação de Saída do Guichê:** Atendente só pode sair se não houver senha em status 'called' ou 'in_service'
4. **Rechamadas:** Após 5 rechamadas, a senha é marcada como 'no_show' automaticamente
5. **Cálculo de Indicadores:**
   - TME = Tempo entre criação da senha e chamada
   - TMA = Tempo entre início e fim do atendimento
   - TMO = TME + TMA

---

## 📡 WEBSOCKET (Tempo Real)

Para o painel TV, recomenda-se implementar WebSocket:

```
ws://api.example.com/ws/tv?storeId={storeId}
```

**Eventos enviados pelo servidor:**
```json
{
  "type": "TICKET_CALLED",
  "ticket": { ... }
}
```

Alternativamente, pode-se usar polling a cada 2-3 segundos na rota `/tv/called-tickets`.
