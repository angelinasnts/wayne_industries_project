"""
Wayne Industries Security Management System - Backend
Desenvolvido para controle de acesso e gestão de recursos
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import hashlib
import secrets
import os
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# Configurações
DATABASE = '../database/wayne_industries.db'
SECRET_KEY = secrets.token_hex(32)

# Banco de dados
def get_db():
    """Conecta ao banco de dados"""
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    """Inicializa o banco de dados com tabelas e dados de exemplo"""
    db = get_db()
    cursor = db.cursor()
    
    # Tabela de usuários
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('employee', 'manager', 'admin')),
            department TEXT,
            access_level INTEGER DEFAULT 1,
            active INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        )
    ''')
    
    # Tabela de recursos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS resources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            category TEXT NOT NULL,
            location TEXT,
            status TEXT DEFAULT 'available' CHECK(status IN ('available', 'in_use', 'maintenance', 'retired')),
            quantity INTEGER DEFAULT 1,
            description TEXT,
            assigned_to TEXT,
            last_maintenance DATE,
            next_maintenance DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabela de áreas restritas
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS restricted_areas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            required_level INTEGER NOT NULL,
            description TEXT,
            active INTEGER DEFAULT 1
        )
    ''')
    
    # Tabela de logs de acesso
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS access_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            area_id INTEGER,
            action TEXT,
            status TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (area_id) REFERENCES restricted_areas (id)
        )
    ''')
    
    # Tabela de sessões
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Inserir usuários de exemplo
    users = [
        ('bruce.wayne', 'Batman2024!', 'Bruce Wayne', 'admin', 'Executive', 5),
        ('alfred.pennyworth', 'Butler123!', 'Alfred Pennyworth', 'admin', 'Security', 5),
        ('lucius.fox', 'Tech2024!', 'Lucius Fox', 'manager', 'R&D', 4),
        ('barbara.gordon', 'Oracle123!', 'Barbara Gordon', 'manager', 'IT', 3),
        ('dick.grayson', 'Nightwing1!', 'Dick Grayson', 'employee', 'Security', 2),
        ('tim.drake', 'Robin2024!', 'Tim Drake', 'employee', 'Research', 2),
    ]
    
    for username, password, name, role, dept, level in users:
        hashed = hashlib.sha256(password.encode()).hexdigest()
        cursor.execute('''
            INSERT OR IGNORE INTO users (username, password, name, role, department, access_level)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (username, hashed, name, role, dept, level))
    
    # Inserir recursos de exemplo
    resources = [
        ('Batmóvel Modelo X', 'vehicle', 'Veículos', 'Garagem Principal', 'available', 1, 'Veículo blindado de alta tecnologia'),
        ('Bat-Wing', 'vehicle', 'Veículos', 'Hangar 7', 'maintenance', 1, 'Aeronave de combate'),
        ('Grappling Gun', 'equipment', 'Equipamentos', 'Armory A', 'available', 15, 'Dispositivo de gancho e corda'),
        ('Batarang (Set)', 'equipment', 'Equipamentos', 'Armory A', 'available', 50, 'Projéteis em forma de morcego'),
        ('Bat-Computer Terminal', 'device', 'Tecnologia', 'Bat-Caverna', 'in_use', 3, 'Estação de trabalho avançada'),
        ('Batsuit Protótipo MK-V', 'equipment', 'Equipamentos', 'Lab 3', 'available', 2, 'Traje tático experimental'),
        ('Scanner de Ameaças', 'device', 'Tecnologia', 'Security Hub', 'available', 10, 'Dispositivo de detecção de ameaças'),
        ('Bat-Signal', 'device', 'Tecnologia', 'Telhado', 'available', 1, 'Sistema de sinalização de emergência'),
        ('Veículo de Patrulha', 'vehicle', 'Veículos', 'Garagem 2', 'available', 5, 'Veículos para patrulha urbana'),
        ('Kit Médico de Campo', 'equipment', 'Equipamentos', 'Medical Bay', 'available', 20, 'Suprimentos médicos de emergência'),
    ]
    
    for name, type_, category, location, status, qty, desc in resources:
        cursor.execute('''
            INSERT OR IGNORE INTO resources (name, type, category, location, status, quantity, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (name, type_, category, location, status, qty, desc))
    
    # Inserir áreas restritas
    areas = [
        ('Bat-Caverna', 'Subsolo Nível 10', 5, 'Centro de operações principal'),
        ('Laboratório R&D', 'Torre Wayne - Andar 52', 4, 'Pesquisa e desenvolvimento de tecnologia'),
        ('Armário de Armas', 'Subsolo Nível 8', 4, 'Arsenal de equipamentos táticos'),
        ('Sala de Servidores', 'Torre Wayne - Andar 45', 3, 'Infraestrutura de TI'),
        ('Garagem de Veículos Especiais', 'Subsolo Nível 5', 3, 'Garagem de veículos táticos'),
        ('Escritório Executivo', 'Torre Wayne - Cobertura', 4, 'Escritório do CEO'),
    ]
    
    for name, location, level, desc in areas:
        cursor.execute('''
            INSERT OR IGNORE INTO restricted_areas (name, location, required_level, description)
            VALUES (?, ?, ?, ?)
        ''', (name, location, level, desc))
    
    db.commit()
    db.close()

# Decorador de autenticação
def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token de autenticação necessário'}), 401
        
        token = token.replace('Bearer ', '')
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
            SELECT s.user_id, u.username, u.name, u.role, u.access_level
            FROM sessions s
            JOIN users u ON s.user_id = u.id
            WHERE s.token = ? AND s.expires_at > ? AND u.active = 1
        ''', (token, datetime.now()))
        
        session = cursor.fetchone()
        db.close()
        
        if not session:
            return jsonify({'error': 'Token inválido ou expirado'}), 401
        
        request.user = {
            'id': session['user_id'],
            'username': session['username'],
            'name': session['name'],
            'role': session['role'],
            'access_level': session['access_level']
        }
        
        return f(*args, **kwargs)
    return decorated_function

def require_role(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if request.user['role'] not in roles:
                return jsonify({'error': 'Permissão negada'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# ===== ROTAS DE AUTENTICAÇÃO =====

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Autentica usuário e retorna token de sessão"""
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Usuário e senha são obrigatórios'}), 400
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('''
        SELECT id, username, name, role, department, access_level
        FROM users
        WHERE username = ? AND password = ? AND active = 1
    ''', (username, hashed_password))
    
    user = cursor.fetchone()
    
    if not user:
        db.close()
        return jsonify({'error': 'Credenciais inválidas'}), 401
    
    # Criar sessão
    token = secrets.token_urlsafe(32)
    expires_at = datetime.now() + timedelta(hours=8)
    
    cursor.execute('''
        INSERT INTO sessions (user_id, token, expires_at)
        VALUES (?, ?, ?)
    ''', (user['id'], token, expires_at))
    
    # Atualizar último login
    cursor.execute('''
        UPDATE users SET last_login = ? WHERE id = ?
    ''', (datetime.now(), user['id']))
    
    db.commit()
    db.close()
    
    return jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'username': user['username'],
            'name': user['name'],
            'role': user['role'],
            'department': user['department'],
            'access_level': user['access_level']
        }
    })

@app.route('/api/auth/logout', methods=['POST'])
@require_auth
def logout():
    """Invalida token de sessão"""
    token = request.headers.get('Authorization').replace('Bearer ', '')
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM sessions WHERE token = ?', (token,))
    db.commit()
    db.close()
    
    return jsonify({'message': 'Logout realizado com sucesso'})

@app.route('/api/auth/me', methods=['GET'])
@require_auth
def get_current_user():
    """Retorna informações do usuário autenticado"""
    return jsonify({'user': request.user})

# ===== ROTAS DE USUÁRIOS =====

@app.route('/api/users', methods=['GET'])
@require_auth
@require_role('admin', 'manager')
def get_users():
    """Lista todos os usuários"""
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        SELECT id, username, name, role, department, access_level, active, created_at, last_login
        FROM users
        ORDER BY name
    ''')
    users = [dict(row) for row in cursor.fetchall()]
    db.close()
    
    return jsonify({'users': users})

@app.route('/api/users', methods=['POST'])
@require_auth
@require_role('admin')
def create_user():
    """Cria novo usuário"""
    data = request.json
    
    required_fields = ['username', 'password', 'name', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400
    
    hashed_password = hashlib.sha256(data['password'].encode()).hexdigest()
    
    db = get_db()
    cursor = db.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO users (username, password, name, role, department, access_level)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (data['username'], hashed_password, data['name'], data['role'], 
              data.get('department', ''), data.get('access_level', 1)))
        db.commit()
        user_id = cursor.lastrowid
        db.close()
        
        return jsonify({'message': 'Usuário criado com sucesso', 'id': user_id}), 201
    except sqlite3.IntegrityError:
        db.close()
        return jsonify({'error': 'Nome de usuário já existe'}), 400

@app.route('/api/users/<int:user_id>', methods=['PUT'])
@require_auth
@require_role('admin')
def update_user(user_id):
    """Atualiza usuário"""
    data = request.json
    
    db = get_db()
    cursor = db.cursor()
    
    updates = []
    values = []
    
    if 'name' in data:
        updates.append('name = ?')
        values.append(data['name'])
    if 'role' in data:
        updates.append('role = ?')
        values.append(data['role'])
    if 'department' in data:
        updates.append('department = ?')
        values.append(data['department'])
    if 'access_level' in data:
        updates.append('access_level = ?')
        values.append(data['access_level'])
    if 'active' in data:
        updates.append('active = ?')
        values.append(data['active'])
    
    if not updates:
        return jsonify({'error': 'Nenhum campo para atualizar'}), 400
    
    values.append(user_id)
    cursor.execute(f'''
        UPDATE users SET {', '.join(updates)} WHERE id = ?
    ''', values)
    
    db.commit()
    db.close()
    
    return jsonify({'message': 'Usuário atualizado com sucesso'})

# ===== ROTAS DE RECURSOS =====

@app.route('/api/resources', methods=['GET'])
@require_auth
def get_resources():
    """Lista todos os recursos"""
    category = request.args.get('category')
    status = request.args.get('status')
    
    db = get_db()
    cursor = db.cursor()
    
    query = 'SELECT * FROM resources WHERE 1=1'
    params = []
    
    if category:
        query += ' AND category = ?'
        params.append(category)
    if status:
        query += ' AND status = ?'
        params.append(status)
    
    query += ' ORDER BY name'
    
    cursor.execute(query, params)
    resources = [dict(row) for row in cursor.fetchall()]
    db.close()
    
    return jsonify({'resources': resources})

@app.route('/api/resources', methods=['POST'])
@require_auth
@require_role('admin', 'manager')
def create_resource():
    """Cria novo recurso"""
    data = request.json
    
    required_fields = ['name', 'type', 'category']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('''
        INSERT INTO resources (name, type, category, location, status, quantity, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (data['name'], data['type'], data['category'], data.get('location', ''),
          data.get('status', 'available'), data.get('quantity', 1), data.get('description', '')))
    
    db.commit()
    resource_id = cursor.lastrowid
    db.close()
    
    return jsonify({'message': 'Recurso criado com sucesso', 'id': resource_id}), 201

@app.route('/api/resources/<int:resource_id>', methods=['PUT'])
@require_auth
@require_role('admin', 'manager')
def update_resource(resource_id):
    """Atualiza recurso"""
    data = request.json
    
    db = get_db()
    cursor = db.cursor()
    
    updates = []
    values = []
    
    for field in ['name', 'type', 'category', 'location', 'status', 'quantity', 'description', 'assigned_to']:
        if field in data:
            updates.append(f'{field} = ?')
            values.append(data[field])
    
    updates.append('updated_at = ?')
    values.append(datetime.now())
    
    if not updates:
        return jsonify({'error': 'Nenhum campo para atualizar'}), 400
    
    values.append(resource_id)
    cursor.execute(f'''
        UPDATE resources SET {', '.join(updates)} WHERE id = ?
    ''', values)
    
    db.commit()
    db.close()
    
    return jsonify({'message': 'Recurso atualizado com sucesso'})

@app.route('/api/resources/<int:resource_id>', methods=['DELETE'])
@require_auth
@require_role('admin')
def delete_resource(resource_id):
    """Remove recurso"""
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM resources WHERE id = ?', (resource_id,))
    db.commit()
    db.close()
    
    return jsonify({'message': 'Recurso removido com sucesso'})

# ===== ROTAS DE ÁREAS RESTRITAS =====

@app.route('/api/areas', methods=['GET'])
@require_auth
def get_areas():
    """Lista áreas restritas acessíveis ao usuário"""
    db = get_db()
    cursor = db.cursor()
    
    # Mostrar todas as áreas para admin/manager, apenas acessíveis para employees
    if request.user['role'] in ['admin', 'manager']:
        cursor.execute('SELECT * FROM restricted_areas WHERE active = 1 ORDER BY required_level DESC')
    else:
        cursor.execute('''
            SELECT * FROM restricted_areas 
            WHERE active = 1 AND required_level <= ?
            ORDER BY required_level DESC
        ''', (request.user['access_level'],))
    
    areas = [dict(row) for row in cursor.fetchall()]
    db.close()
    
    return jsonify({'areas': areas})

@app.route('/api/areas/<int:area_id>/access', methods=['POST'])
@require_auth
def request_access(area_id):
    """Solicita acesso a uma área restrita"""
    db = get_db()
    cursor = db.cursor()
    
    # Verificar se área existe
    cursor.execute('SELECT * FROM restricted_areas WHERE id = ? AND active = 1', (area_id,))
    area = cursor.fetchone()
    
    if not area:
        db.close()
        return jsonify({'error': 'Área não encontrada'}), 404
    
    # Verificar nível de acesso
    if request.user['access_level'] < area['required_level']:
        status = 'denied'
        message = 'Acesso negado: nível de permissão insuficiente'
    else:
        status = 'granted'
        message = 'Acesso concedido'
    
    # Registrar log
    cursor.execute('''
        INSERT INTO access_logs (user_id, area_id, action, status)
        VALUES (?, ?, ?, ?)
    ''', (request.user['id'], area_id, 'access_request', status))
    
    db.commit()
    db.close()
    
    return jsonify({
        'message': message,
        'status': status,
        'area': dict(area)
    })

# ===== ROTAS DE DASHBOARD =====

@app.route('/api/dashboard/stats', methods=['GET'])
@require_auth
def get_dashboard_stats():
    """Retorna estatísticas para o dashboard"""
    db = get_db()
    cursor = db.cursor()
    
    # Total de usuários ativos
    cursor.execute('SELECT COUNT(*) as total FROM users WHERE active = 1')
    total_users = cursor.fetchone()['total']
    
    # Total de recursos por status
    cursor.execute('''
        SELECT status, COUNT(*) as count
        FROM resources
        GROUP BY status
    ''')
    resources_by_status = {row['status']: row['count'] for row in cursor.fetchall()}
    
    # Total de recursos por categoria
    cursor.execute('''
        SELECT category, COUNT(*) as count
        FROM resources
        GROUP BY category
    ''')
    resources_by_category = {row['category']: row['count'] for row in cursor.fetchall()}
    
    # Acessos nas últimas 24h
    cursor.execute('''
        SELECT COUNT(*) as total
        FROM access_logs
        WHERE timestamp > datetime('now', '-1 day')
    ''')
    recent_accesses = cursor.fetchone()['total']
    
    # Acessos negados nas últimas 24h
    cursor.execute('''
        SELECT COUNT(*) as total
        FROM access_logs
        WHERE status = 'denied' AND timestamp > datetime('now', '-1 day')
    ''')
    denied_accesses = cursor.fetchone()['total']
    
    # Atividades recentes
    cursor.execute('''
        SELECT 
            al.action,
            al.status,
            al.timestamp,
            u.name as user_name,
            ra.name as area_name
        FROM access_logs al
        JOIN users u ON al.user_id = u.id
        LEFT JOIN restricted_areas ra ON al.area_id = ra.id
        ORDER BY al.timestamp DESC
        LIMIT 10
    ''')
    recent_activities = [dict(row) for row in cursor.fetchall()]
    
    # Recursos que precisam manutenção
    cursor.execute('''
        SELECT name, location, last_maintenance
        FROM resources
        WHERE status = 'maintenance'
        ORDER BY last_maintenance ASC
        LIMIT 5
    ''')
    maintenance_needed = [dict(row) for row in cursor.fetchall()]
    
    db.close()
    
    return jsonify({
        'total_users': total_users,
        'resources_by_status': resources_by_status,
        'resources_by_category': resources_by_category,
        'recent_accesses': recent_accesses,
        'denied_accesses': denied_accesses,
        'recent_activities': recent_activities,
        'maintenance_needed': maintenance_needed
    })

@app.route('/api/dashboard/access-logs', methods=['GET'])
@require_auth
@require_role('admin', 'manager')
def get_access_logs():
    """Retorna logs de acesso"""
    limit = request.args.get('limit', 50, type=int)
    
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('''
        SELECT 
            al.id,
            al.action,
            al.status,
            al.timestamp,
            u.name as user_name,
            u.role as user_role,
            ra.name as area_name,
            ra.location as area_location
        FROM access_logs al
        JOIN users u ON al.user_id = u.id
        LEFT JOIN restricted_areas ra ON al.area_id = ra.id
        ORDER BY al.timestamp DESC
        LIMIT ?
    ''', (limit,))
    
    logs = [dict(row) for row in cursor.fetchall()]
    db.close()
    
    return jsonify({'logs': logs})

# ===== ROTA PRINCIPAL =====

@app.route('/')
def serve_frontend():
    """Serve o frontend"""
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve arquivos estáticos"""
    return send_from_directory('../frontend', path)

# ===== INICIALIZAÇÃO =====

if __name__ == '__main__':
    # Criar diretório do banco se não existir
    os.makedirs(os.path.dirname(DATABASE), exist_ok=True)
    
    # Inicializar banco de dados
    init_db()
    
    print('=' * 60)
    print('Wayne Industries Security Management System')
    print('=' * 60)
    print('\nServidor iniciado em: http://localhost:5000')
    print('\nUsuários de exemplo:')
    print('  Admin:    bruce.wayne / Batman2024!')
    print('  Admin:    alfred.pennyworth / Butler123!')
    print('  Manager:  lucius.fox / Tech2024!')
    print('  Employee: dick.grayson / Nightwing1!')
    print('\n' + '=' * 60 + '\n')
    
    app.run(debug=True, host='0.0.0.0', port=5000)