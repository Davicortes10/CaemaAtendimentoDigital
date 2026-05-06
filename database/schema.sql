-- =============================================================================
-- CAEMA - Sistema de Gerenciamento de Filas
-- Script de criação do banco de dados PostgreSQL
-- =============================================================================

-- Extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- TIPOS ENUM
-- =============================================================================

CREATE TYPE user_role AS ENUM ('gerente', 'atendente');
CREATE TYPE ticket_status AS ENUM ('waiting', 'called', 'in_service', 'completed', 'no_show');
CREATE TYPE attendance_quality AS ENUM ('excellent', 'good', 'regular', 'bad');
CREATE TYPE attendance_status AS ENUM ('completed', 'no_show');

-- =============================================================================
-- TABELAS
-- =============================================================================

-- 1. Cidades
CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL DEFAULT 'MA',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Lojas/Unidades
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 4. Tipos de Serviço
CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 5. Guichês
CREATE TABLE booths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    is_occupied BOOLEAN NOT NULL DEFAULT FALSE,
    attendant_id UUID REFERENCES users(id) ON DELETE SET NULL,
    current_ticket_id UUID, -- FK adicionada após criar tabela tickets
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Senhas/Tickets
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number VARCHAR(10) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE RESTRICT,
    booth_id UUID REFERENCES booths(id) ON DELETE SET NULL,
    attendant_id UUID REFERENCES users(id) ON DELETE SET NULL,
    service_type_id UUID REFERENCES service_types(id) ON DELETE SET NULL,
    status ticket_status NOT NULL DEFAULT 'waiting',
    recall_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    called_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- FK circular: booths.current_ticket_id -> tickets.id
ALTER TABLE booths
    ADD CONSTRAINT fk_booths_current_ticket
    FOREIGN KEY (current_ticket_id) REFERENCES tickets(id) ON DELETE SET NULL;

-- 7. Registro de Atendimentos (histórico desnormalizado para performance em relatórios)
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE RESTRICT,
    ticket_number VARCHAR(10) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    attendant_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE RESTRICT,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    booth_id UUID NOT NULL REFERENCES booths(id) ON DELETE RESTRICT,
    service_type_id UUID REFERENCES service_types(id) ON DELETE SET NULL,
    service_type VARCHAR(100),
    wait_time INTEGER NOT NULL DEFAULT 0,       -- em minutos
    service_time INTEGER NOT NULL DEFAULT 0,    -- em minutos
    total_time INTEGER NOT NULL DEFAULT 0,      -- em minutos
    quality attendance_quality,
    satisfaction INTEGER CHECK (satisfaction >= 1 AND satisfaction <= 5),
    status attendance_status NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 8. Sessões de token (opcional, para invalidar tokens no logout)
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- ÍNDICES
-- =============================================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_store_id ON users(store_id);

-- Stores
CREATE INDEX idx_stores_city_id ON stores(city_id);
CREATE INDEX idx_stores_is_active ON stores(is_active);

-- Booths
CREATE INDEX idx_booths_store_id ON booths(store_id);
CREATE INDEX idx_booths_attendant_id ON booths(attendant_id);
CREATE INDEX idx_booths_is_occupied ON booths(is_occupied);

-- Tickets
CREATE INDEX idx_tickets_store_id ON tickets(store_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_booth_id ON tickets(booth_id);
CREATE INDEX idx_tickets_attendant_id ON tickets(attendant_id);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
CREATE INDEX idx_tickets_store_status ON tickets(store_id, status);

-- Attendances
CREATE INDEX idx_attendances_attendant_id ON attendances(attendant_id);
CREATE INDEX idx_attendances_store_id ON attendances(store_id);
CREATE INDEX idx_attendances_city_id ON attendances(city_id);
CREATE INDEX idx_attendances_created_at ON attendances(created_at);
CREATE INDEX idx_attendances_status ON attendances(status);
CREATE INDEX idx_attendances_store_date ON attendances(store_id, created_at);
CREATE INDEX idx_attendances_city_date ON attendances(city_id, created_at);

-- Sessions
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token_hash ON sessions(token_hash);

-- =============================================================================
-- TRIGGER: Atualizar updated_at automaticamente
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- DADOS INICIAIS (SEED)
-- =============================================================================

-- Cidades do Maranhão
INSERT INTO cities (name, state) VALUES
    ('São Luís', 'MA'),
    ('Imperatriz', 'MA'),
    ('Caxias', 'MA'),
    ('Timon', 'MA'),
    ('Codó', 'MA');

-- Lojas
INSERT INTO stores (name, city_id, address) VALUES
    ('Loja Centro - São Luís', (SELECT id FROM cities WHERE name = 'São Luís'), 'Rua do Centro, 100 - Centro, São Luís/MA'),
    ('Loja Cohama - São Luís', (SELECT id FROM cities WHERE name = 'São Luís'), 'Av. Daniel de La Touche, 500 - Cohama, São Luís/MA'),
    ('Loja Centro - Imperatriz', (SELECT id FROM cities WHERE name = 'Imperatriz'), 'Rua Godofredo Viana, 200 - Centro, Imperatriz/MA'),
    ('Loja Maranhão Novo - Imperatriz', (SELECT id FROM cities WHERE name = 'Imperatriz'), 'Av. Babaçulândia, 300 - Maranhão Novo, Imperatriz/MA'),
    ('Loja Centro - Caxias', (SELECT id FROM cities WHERE name = 'Caxias'), 'Praça Duque de Caxias, 50 - Centro, Caxias/MA'),
    ('Loja Centro - Timon', (SELECT id FROM cities WHERE name = 'Timon'), 'Rua Coelho Neto, 150 - Centro, Timon/MA'),
    ('Loja Centro - Codó', (SELECT id FROM cities WHERE name = 'Codó'), 'Rua São Benedito, 80 - Centro, Codó/MA');

-- Tipos de Serviço
INSERT INTO service_types (name, description) VALUES
    ('Segunda Via de Conta', 'Emissão de segunda via de fatura'),
    ('Ligação Nova', 'Solicitação de nova ligação de água'),
    ('Religação', 'Religação de água após corte'),
    ('Mudança de Titularidade', 'Transferência de titularidade da conta'),
    ('Negociação de Débitos', 'Parcelamento ou negociação de dívidas'),
    ('Reclamação', 'Registro de reclamação ou ouvidoria'),
    ('Outros', 'Outros serviços não categorizados');

-- Usuário Gerente (senha: caema123)
-- Hash gerado com bcrypt - no backend use bcrypt.hash('caema123', 10)
INSERT INTO users (name, email, password_hash, role) VALUES
    ('Gerente CAEMA', 'gerente@caema.com', '$2a$10$placeholder_hash_gerente', 'gerente');

-- Usuário Atendente (senha: caema123)
INSERT INTO users (name, email, password_hash, role, store_id) VALUES
    ('Atendente CAEMA', 'atendente@caema.com', '$2a$10$placeholder_hash_atendente', 'atendente',
     (SELECT id FROM stores WHERE name = 'Loja Centro - São Luís'));

-- Guichês iniciais para Loja Centro - São Luís
INSERT INTO booths (name, store_id) VALUES
    ('Guichê 1', (SELECT id FROM stores WHERE name = 'Loja Centro - São Luís')),
    ('Guichê 2', (SELECT id FROM stores WHERE name = 'Loja Centro - São Luís')),
    ('Guichê 3', (SELECT id FROM stores WHERE name = 'Loja Centro - São Luís'));

-- =============================================================================
-- VIEWS ÚTEIS PARA INDICADORES
-- =============================================================================

-- View: Resumo de indicadores por loja
CREATE OR REPLACE VIEW vw_store_indicators AS
SELECT
    s.id AS store_id,
    s.name AS store_name,
    c.id AS city_id,
    c.name AS city_name,
    COALESCE(AVG(a.wait_time), 0) AS tme,
    COALESCE(AVG(a.service_time), 0) AS tma,
    COALESCE(AVG(a.total_time), 0) AS tmo,
    COUNT(a.id) AS total_attendances
FROM stores s
JOIN cities c ON c.id = s.city_id
LEFT JOIN attendances a ON a.store_id = s.id
GROUP BY s.id, s.name, c.id, c.name;

-- View: Resumo de indicadores por atendente
CREATE OR REPLACE VIEW vw_attendant_indicators AS
SELECT
    u.id AS attendant_id,
    u.name AS attendant_name,
    s.id AS store_id,
    s.name AS store_name,
    c.id AS city_id,
    c.name AS city_name,
    COALESCE(AVG(a.wait_time), 0) AS tme,
    COALESCE(AVG(a.service_time), 0) AS tma,
    COALESCE(AVG(a.total_time), 0) AS tmo,
    COUNT(a.id) AS total_attendances
FROM users u
JOIN stores s ON s.id = u.store_id
JOIN cities c ON c.id = s.city_id
LEFT JOIN attendances a ON a.attendant_id = u.id
WHERE u.role = 'atendente'
GROUP BY u.id, u.name, s.id, s.name, c.id, c.name;

-- View: Resumo de indicadores por cidade
CREATE OR REPLACE VIEW vw_city_indicators AS
SELECT
    c.id AS city_id,
    c.name AS city_name,
    COALESCE(AVG(a.wait_time), 0) AS tme,
    COALESCE(AVG(a.service_time), 0) AS tma,
    COALESCE(AVG(a.total_time), 0) AS tmo,
    COUNT(a.id) AS total_attendances
FROM cities c
LEFT JOIN attendances a ON a.city_id = c.id
GROUP BY c.id, c.name;
