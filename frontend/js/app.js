/**
 * Wayne Industries Security Management System - Frontend STANDALONE
 * Versão completa que funciona sem backend (dados mockados)
 * SEM REQUISIÇÕES HTTP - TUDO LOCAL
 */

// ===== DADOS MOCKADOS =====
const MOCK_USERS = [
    { id: 1, username: 'bruce.wayne', password: 'Batman2024!', name: 'Bruce Wayne', role: 'admin', department: 'Executive', access_level: 5 },
    { id: 2, username: 'alfred.pennyworth', password: 'Butler123!', name: 'Alfred Pennyworth', role: 'admin', department: 'Security', access_level: 5 },
    { id: 3, username: 'lucius.fox', password: 'Tech2024!', name: 'Lucius Fox', role: 'manager', department: 'R&D', access_level: 4 },
    { id: 4, username: 'barbara.gordon', password: 'Oracle123!', name: 'Barbara Gordon', role: 'manager', department: 'IT', access_level: 3 },
    { id: 5, username: 'dick.grayson', password: 'Nightwing1!', name: 'Dick Grayson', role: 'employee', department: 'Security', access_level: 2 },
    { id: 6, username: 'tim.drake', password: 'Robin2024!', name: 'Tim Drake', role: 'employee', department: 'Research', access_level: 2 }
];

const MOCK_RESOURCES = [
    { id: 1, name: 'Batmóvel Modelo X', type: 'vehicle', category: 'Veículos', location: 'Garagem Principal', status: 'available', quantity: 1, description: 'Veículo blindado de alta tecnologia' },
    { id: 2, name: 'Bat-Wing', type: 'vehicle', category: 'Veículos', location: 'Hangar 7', status: 'maintenance', quantity: 1, description: 'Aeronave de combate' },
    { id: 3, name: 'Grappling Gun', type: 'equipment', category: 'Equipamentos', location: 'Armory A', status: 'available', quantity: 15, description: 'Dispositivo de gancho e corda' },
    { id: 4, name: 'Batarang (Set)', type: 'equipment', category: 'Equipamentos', location: 'Armory A', status: 'available', quantity: 50, description: 'Projéteis em forma de morcego' },
    { id: 5, name: 'Bat-Computer Terminal', type: 'device', category: 'Tecnologia', location: 'Bat-Caverna', status: 'in_use', quantity: 3, description: 'Estação de trabalho avançada' },
    { id: 6, name: 'Batsuit Protótipo MK-V', type: 'equipment', category: 'Equipamentos', location: 'Lab 3', status: 'available', quantity: 2, description: 'Traje tático experimental' },
    { id: 7, name: 'Scanner de Ameaças', type: 'device', category: 'Tecnologia', location: 'Security Hub', status: 'available', quantity: 10, description: 'Dispositivo de detecção de ameaças' },
    { id: 8, name: 'Bat-Signal', type: 'device', category: 'Tecnologia', location: 'Telhado', status: 'available', quantity: 1, description: 'Sistema de sinalização de emergência' },
    { id: 9, name: 'Veículo de Patrulha', type: 'vehicle', category: 'Veículos', location: 'Garagem 2', status: 'available', quantity: 5, description: 'Veículos para patrulha urbana' },
    { id: 10, name: 'Kit Médico de Campo', type: 'equipment', category: 'Equipamentos', location: 'Medical Bay', status: 'available', quantity: 20, description: 'Suprimentos médicos de emergência' }
];

const MOCK_AREAS = [
    { id: 1, name: 'Bat-Caverna', location: 'Subsolo Nível 10', required_level: 5, description: 'Centro de operações principal', active: 1 },
    { id: 2, name: 'Laboratório R&D', location: 'Torre Wayne - Andar 52', required_level: 4, description: 'Pesquisa e desenvolvimento de tecnologia', active: 1 },
    { id: 3, name: 'Armário de Armas', location: 'Subsolo Nível 8', required_level: 4, description: 'Arsenal de equipamentos táticos', active: 1 },
    { id: 4, name: 'Sala de Servidores', location: 'Torre Wayne - Andar 45', required_level: 3, description: 'Infraestrutura de TI', active: 1 },
    { id: 5, name: 'Garagem de Veículos Especiais', location: 'Subsolo Nível 5', required_level: 3, description: 'Garagem de veículos táticos', active: 1 },
    { id: 6, name: 'Escritório Executivo', location: 'Torre Wayne - Cobertura', required_level: 4, description: 'Escritório do CEO', active: 1 }
];

let MOCK_ACCESS_LOGS = [
    { id: 1, user_id: 1, user_name: 'Bruce Wayne', user_role: 'admin', area_id: 1, area_name: 'Bat-Caverna', area_location: 'Subsolo Nível 10', action: 'access_request', status: 'granted', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, user_id: 3, user_name: 'Lucius Fox', user_role: 'manager', area_id: 2, area_name: 'Laboratório R&D', area_location: 'Torre Wayne - Andar 52', action: 'access_request', status: 'granted', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, user_id: 5, user_name: 'Dick Grayson', user_role: 'employee', area_id: 1, area_name: 'Bat-Caverna', area_location: 'Subsolo Nível 10', action: 'access_request', status: 'denied', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: 4, user_id: 2, user_name: 'Alfred Pennyworth', user_role: 'admin', area_id: 6, area_name: 'Escritório Executivo', area_location: 'Torre Wayne - Cobertura', action: 'access_request', status: 'granted', timestamp: new Date(Date.now() - 14400000).toISOString() },
    { id: 5, user_id: 4, user_name: 'Barbara Gordon', user_role: 'manager', area_id: 4, area_name: 'Sala de Servidores', area_location: 'Torre Wayne - Andar 45', action: 'access_request', status: 'granted', timestamp: new Date(Date.now() - 18000000).toISOString() }
];

let authToken = null;
let currentUser = null;

console.log('🦇 Wayne Industries - Dados mockados carregados');
console.log('📊 Usuários:', MOCK_USERS.length);
console.log('📦 Recursos:', MOCK_RESOURCES.length);
console.log('🔒 Áreas:', MOCK_AREAS.length);

// ===== AUTENTICAÇÃO (LOCAL - SEM API) =====

function login(username, password) {
    console.log('🔐 Tentando login LOCAL com:', username);
    
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    
    if (!user) {
        console.error('✗ Usuário não encontrado ou senha incorreta');
        throw new Error('Credenciais inválidas');
    }
    
    authToken = 'mock_token_' + Date.now();
    currentUser = { ...user };
    delete currentUser.password;
    
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    console.log('✓ Login bem-sucedido!', currentUser.name);
    
    return { token: authToken, user: currentUser };
}

function logout() {
    console.log('🚪 Logout...');
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    showScreen('login');
}

function checkAuth() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
        authToken = token;
        currentUser = JSON.parse(user);
        console.log('✓ Usuário já autenticado:', currentUser.name);
        return true;
    }
    
    console.log('⚠ Nenhum usuário autenticado');
    return false;
}

// ===== GERENCIAMENTO DE TELAS =====

function showScreen(screenName) {
    console.log('📺 Mostrando tela:', screenName);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function showView(viewName) {
    console.log('📍 Navegando para view:', viewName);
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const targetView = document.getElementById(`${viewName}-view`);
    const targetNav = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    
    if (targetView) {
        targetView.classList.add('active');
    }
    
    if (targetNav) {
        targetNav.classList.add('active');
    }
    
    loadViewData(viewName);
}

// ===== CARREGAMENTO DE DADOS (LOCAL - SEM API) =====

function loadViewData(viewName) {
    console.log('📥 Carregando dados para:', viewName);
    
    try {
        switch (viewName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'resources':
                loadResources();
                break;
            case 'areas':
                loadAreas();
                break;
            case 'users':
                loadUsers();
                break;
            case 'logs':
                loadLogs();
                break;
        }
    } catch (error) {
        console.error('❌ Erro ao carregar view:', error);
    }
}

function loadDashboard() {
    console.log('📊 Carregando dashboard...');
    
    // Estatísticas
    const totalUsers = MOCK_USERS.length;
    const availableResources = MOCK_RESOURCES.filter(r => r.status === 'available').length;
    const recentAccesses = MOCK_ACCESS_LOGS.filter(log => {
        const logTime = new Date(log.timestamp);
        const oneDayAgo = new Date(Date.now() - 86400000);
        return logTime > oneDayAgo;
    }).length;
    const deniedAccesses = MOCK_ACCESS_LOGS.filter(log => 
        log.status === 'denied' && new Date(log.timestamp) > new Date(Date.now() - 86400000)
    ).length;
    
    document.getElementById('stat-users').textContent = totalUsers;
    document.getElementById('stat-available').textContent = availableResources;
    document.getElementById('stat-accesses').textContent = recentAccesses;
    document.getElementById('stat-denied').textContent = deniedAccesses;
    
    console.log('✓ Estatísticas carregadas');
    
    // Gráficos
    const categoryData = {};
    MOCK_RESOURCES.forEach(r => {
        categoryData[r.category] = (categoryData[r.category] || 0) + 1;
    });
    renderCategoryChart(categoryData);
    
    const statusData = {};
    MOCK_RESOURCES.forEach(r => {
        statusData[r.status] = (statusData[r.status] || 0) + 1;
    });
    renderStatusChart(statusData);
    
    // Atividades
    const recentActivities = MOCK_ACCESS_LOGS.slice(0, 5);
    renderActivities(recentActivities);
    
    console.log('✓ Dashboard carregado com sucesso');
}

function renderCategoryChart(data) {
    const container = document.getElementById('resources-category-chart');
    if (!container) return;
    
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    
    let html = '';
    for (const [category, count] of Object.entries(data)) {
        const percentage = Math.round((count / total) * 100);
        html += `
            <div class="chart-bar">
                <div class="chart-label">${category}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${percentage}%">${count}</div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function renderStatusChart(data) {
    const container = document.getElementById('resources-status-chart');
    if (!container) return;
    
    const statusLabels = {
        'available': 'Disponível',
        'in_use': 'Em Uso',
        'maintenance': 'Manutenção',
        'retired': 'Aposentado'
    };
    
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    
    let html = '';
    for (const [status, count] of Object.entries(data)) {
        const percentage = Math.round((count / total) * 100);
        html += `
            <div class="chart-bar">
                <div class="chart-label">${statusLabels[status] || status}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${percentage}%">${count}</div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function renderActivities(activities) {
    const container = document.getElementById('recent-activities');
    if (!container) return;
    
    if (activities.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--text-muted);">Nenhuma atividade recente</p>';
        return;
    }
    
    let html = '';
    activities.forEach(activity => {
        const isGranted = activity.status === 'granted';
        const iconClass = isGranted ? 'success' : 'danger';
        const icon = isGranted ? '✓' : '✕';
        
        html += `
            <div class="activity-item">
                <div class="activity-icon ${iconClass}">${icon}</div>
                <div class="activity-details">
                    <div class="activity-title">${activity.user_name} - ${activity.area_name || 'N/A'}</div>
                    <div class="activity-subtitle">${activity.action} - ${activity.status}</div>
                </div>
                <div class="activity-time">${formatDateTime(activity.timestamp)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadResources(category = '', status = '') {
    console.log('📦 Carregando recursos...');
    
    let resources = [...MOCK_RESOURCES];
    
    if (category) {
        resources = resources.filter(r => r.category === category);
        console.log('🔍 Filtrado por categoria:', category);
    }
    if (status) {
        resources = resources.filter(r => r.status === status);
        console.log('🔍 Filtrado por status:', status);
    }
    
    renderResources(resources);
    console.log('✓ Recursos carregados:', resources.length);
}

function renderResources(resources) {
    const container = document.getElementById('resources-grid');
    if (!container) return;
    
    if (resources.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--text-muted); grid-column: 1/-1;">Nenhum recurso encontrado</p>';
        return;
    }
    
    const statusLabels = {
        'available': 'Disponível',
        'in_use': 'Em Uso',
        'maintenance': 'Manutenção',
        'retired': 'Aposentado'
    };
    
    let html = '';
    resources.forEach(resource => {
        const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.role === 'manager');
        
        html += `
            <div class="resource-card">
                <div class="resource-header">
                    <div>
                        <div class="resource-title">${resource.name}</div>
                        <div class="resource-type">${resource.category} - ${resource.type}</div>
                    </div>
                    <span class="resource-status ${resource.status}">${statusLabels[resource.status]}</span>
                </div>
                <div class="resource-details">
                    <div class="resource-detail">
                        <span class="resource-detail-label">Localização:</span>
                        <span class="resource-detail-value">${resource.location || 'N/A'}</span>
                    </div>
                    <div class="resource-detail">
                        <span class="resource-detail-label">Quantidade:</span>
                        <span class="resource-detail-value">${resource.quantity}</span>
                    </div>
                    ${resource.description ? `
                    <div class="resource-detail">
                        <span class="resource-detail-label">Descrição:</span>
                        <span class="resource-detail-value">${resource.description}</span>
                    </div>
                    ` : ''}
                </div>
                ${canEdit ? `
                <div class="resource-actions">
                    <button class="btn btn-small btn-secondary" onclick="editResource(${resource.id})">
                        Editar
                    </button>
                    <button class="btn btn-small btn-primary" onclick="viewResourceDetails(${resource.id})">
                        Detalhes
                    </button>
                </div>
                ` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadAreas() {
    console.log('🔒 Carregando áreas...');
    
    let areas = [...MOCK_AREAS];
    
    // Filtrar áreas baseado no nível de acesso
    if (currentUser && currentUser.role === 'employee') {
        areas = areas.filter(a => a.required_level <= currentUser.access_level);
        console.log('🔍 Áreas filtradas por nível de acesso:', currentUser.access_level);
    }
    
    renderAreas(areas);
    console.log('✓ Áreas carregadas:', areas.length);
}

function renderAreas(areas) {
    const container = document.getElementById('areas-grid');
    if (!container) return;
    
    if (areas.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--text-muted); grid-column: 1/-1;">Nenhuma área encontrada</p>';
        return;
    }
    
    const icons = ['🔒', '🏢', '🔬', '💻', '🚗', '👔'];
    
    let html = '';
    areas.forEach((area, index) => {
        const hasAccess = currentUser && currentUser.access_level >= area.required_level;
        const accessClass = hasAccess ? 'granted' : 'denied';
        const accessText = hasAccess ? 'Solicitar Acesso' : 'Acesso Negado';
        
        // Criar barras de nível
        let levelBars = '';
        for (let i = 1; i <= 5; i++) {
            const activeClass = i <= area.required_level ? 'active' : '';
            levelBars += `<div class="level-bar ${activeClass}"></div>`;
        }
        
        html += `
            <div class="area-card">
                <div class="area-header">
                    <div class="area-icon">${icons[index % icons.length]}</div>
                    <div>
                        <div class="area-title">${area.name}</div>
                        <div class="area-location">${area.location}</div>
                    </div>
                </div>
                <div class="area-level">
                    <div>
                        <div class="level-label">Nível Requerido</div>
                        <div class="level-value">${area.required_level}</div>
                    </div>
                    <div class="level-bars">
                        ${levelBars}
                    </div>
                </div>
                <div class="area-description">${area.description}</div>
                <div class="area-access">
                    <button class="btn btn-access ${accessClass}" 
                            onclick="requestAccess(${area.id})"
                            ${!hasAccess ? 'disabled' : ''}>
                        ${accessText}
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function requestAccess(areaId) {
    console.log('🔐 Solicitando acesso à área:', areaId);
    
    const area = MOCK_AREAS.find(a => a.id === areaId);
    if (!area) {
        console.error('❌ Área não encontrada');
        return;
    }
    
    const hasAccess = currentUser.access_level >= area.required_level;
    const status = hasAccess ? 'granted' : 'denied';
    const message = hasAccess ? 'Acesso concedido!' : 'Acesso negado: nível insuficiente';
    
    // Adicionar log
    const newLog = {
        id: MOCK_ACCESS_LOGS.length + 1,
        user_id: currentUser.id,
        user_name: currentUser.name,
        user_role: currentUser.role,
        area_id: area.id,
        area_name: area.name,
        area_location: area.location,
        action: 'access_request',
        status: status,
        timestamp: new Date().toISOString()
    };
    
    MOCK_ACCESS_LOGS.unshift(newLog);
    console.log('✓ Log de acesso adicionado:', newLog);
    
    showNotification(message, status === 'granted' ? 'success' : 'danger');
    
    // Atualizar dashboard se estiver ativo
    const dashboardView = document.getElementById('dashboard-view');
    if (dashboardView && dashboardView.classList.contains('active')) {
        loadDashboard();
    }
}

function loadUsers() {
    console.log('👥 Carregando usuários...');
    renderUsers(MOCK_USERS);
    console.log('✓ Usuários carregados:', MOCK_USERS.length);
}

function renderUsers(users) {
    const container = document.getElementById('users-table');
    if (!container) return;
    
    const roleLabels = {
        'admin': 'Administrador',
        'manager': 'Gerente',
        'employee': 'Funcionário'
    };
    
    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Usuário</th>
                    <th>Função</th>
                    <th>Departamento</th>
                    <th>Nível</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td><span class="badge ${user.role}">${roleLabels[user.role]}</span></td>
                <td>${user.department || 'N/A'}</td>
                <td><strong>${user.access_level}</strong></td>
                <td><span class="text-success">Ativo</span></td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

function loadLogs() {
    console.log('📝 Carregando logs...');
    renderLogs(MOCK_ACCESS_LOGS.slice(0, 50));
    console.log('✓ Logs carregados:', Math.min(50, MOCK_ACCESS_LOGS.length));
}

function renderLogs(logs) {
    const container = document.getElementById('logs-table');
    if (!container) return;
    
    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Data/Hora</th>
                    <th>Usuário</th>
                    <th>Função</th>
                    <th>Área</th>
                    <th>Ação</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    logs.forEach(log => {
        const statusClass = log.status === 'granted' ? 'granted' : 'denied';
        const statusText = log.status === 'granted' ? 'Concedido' : 'Negado';
        
        html += `
            <tr>
                <td>${formatDateTime(log.timestamp)}</td>
                <td>${log.user_name}</td>
                <td><span class="badge ${log.user_role}">${log.user_role}</span></td>
                <td>${log.area_name || 'N/A'}</td>
                <td>${log.action}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// ===== FUNÇÕES AUXILIARES =====

function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            return `${minutes} min atrás`;
        }
        return `${hours}h atrás`;
    }
    
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    console.log(`📢 Notificação [${type}]:`, message);
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        padding: 20px 32px;
        background: ${type === 'success' ? 'var(--success)' : type === 'danger' ? 'var(--danger)' : 'var(--info)'};
        color: var(--bg-space);
        border-radius: 14px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        z-index: 9999;
        animation: fadeIn 0.4s ease-out;
        font-weight: 700;
        font-size: 15px;
        letter-spacing: 0.5px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.4s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

function updateUserInfo() {
    if (!currentUser) {
        console.error('❌ Nenhum usuário para atualizar');
        return;
    }
    
    console.log('👤 Atualizando informações do usuário:', currentUser.name);
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = currentUser.role;
    
    const initials = currentUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    
    document.getElementById('user-initials').textContent = initials;
    
    // Mostrar/ocultar menus baseado na função
    if (currentUser.role === 'admin' || currentUser.role === 'manager') {
        const usersNav = document.getElementById('users-nav');
        const logsNav = document.getElementById('logs-nav');
        const addResourceBtn = document.getElementById('add-resource-btn');
        
        if (usersNav) usersNav.style.display = 'flex';
        if (logsNav) logsNav.style.display = 'flex';
        if (addResourceBtn) addResourceBtn.style.display = 'block';
        
        console.log('✓ Menus de admin/manager habilitados');
    }
}

// ===== FUNÇÕES GLOBAIS =====

window.editResource = function(id) {
    console.log('✏️ Editar recurso:', id);
    showNotification('Funcionalidade de edição em desenvolvimento', 'info');
};

window.viewResourceDetails = function(id) {
    const resource = MOCK_RESOURCES.find(r => r.id === id);
    if (resource) {
        console.log('👁️ Visualizar recurso:', resource.name);
        showNotification(`Visualizando: ${resource.name}`, 'info');
    }
};

window.requestAccess = requestAccess;

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #ffeb3b');
    console.log('%c 🦇 Wayne Industries Security System ', 'background: #ffeb3b; color: #000; font-size: 20px; font-weight: bold; padding: 14px; border-radius: 8px;');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #ffeb3b');
    console.log('');
    console.log('%c ✓ Modo STANDALONE ativo ', 'color: #00ff9f; font-size: 16px; font-weight: bold;');
    console.log('%c 📦 Todos os dados são locais (mockados) ', 'color: #00e5ff; font-size: 14px;');
    console.log('%c ⚡ Nenhuma requisição HTTP necessária ', 'color: #00e5ff; font-size: 14px;');
    console.log('');
    console.log('%c 🔐 Credenciais disponíveis: ', 'color: #ffeb3b; font-size: 14px; font-weight: bold;');
    console.log('%c   Admin:    bruce.wayne / Batman2024! ', 'color: #fff; font-size: 13px;');
    console.log('%c   Manager:  lucius.fox / Tech2024! ', 'color: #fff; font-size: 13px;');
    console.log('%c   Employee: dick.grayson / Nightwing1! ', 'color: #fff; font-size: 13px;');
    console.log('');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #ffeb3b');
    console.log('');
    
    // Verificar autenticação
    if (checkAuth()) {
        showScreen('app');
        updateUserInfo();
        showView('dashboard');
    } else {
        showScreen('login');
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔐 Processando login...');
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('login-error');
            
            if (!username || !password) {
                errorDiv.textContent = 'Por favor, preencha todos os campos';
                errorDiv.classList.add('show');
                return;
            }
            
            try {
                const result = login(username, password);
                errorDiv.classList.remove('show');
                showScreen('app');
                updateUserInfo();
                showView('dashboard');
                showNotification('Login realizado com sucesso!', 'success');
            } catch (error) {
                console.error('✗ Erro no login:', error);
                errorDiv.textContent = error.message;
                errorDiv.classList.add('show');
            }
        });
        console.log('✓ Event listener de login configurado');
    } else {
        console.error('❌ Formulário de login não encontrado!');
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
            showNotification('Logout realizado com sucesso', 'info');
        });
        console.log('✓ Event listener de logout configurado');
    }
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            if (view) {
                showView(view);
            }
        });
    });
    console.log('✓ Event listeners de navegação configurados');
    
    // Filtros de recursos
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            const status = statusFilter ? statusFilter.value : '';
            loadResources(category, status);
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            const status = e.target.value;
            const category = categoryFilter ? categoryFilter.value : '';
            loadResources(category, status);
        });
    }
    
    if (categoryFilter || statusFilter) {
        console.log('✓ Event listeners de filtros configurados');
    }
    
    console.log('');
    console.log('%c ✅ Sistema inicializado com sucesso! ', 'color: #00ff9f; font-size: 16px; font-weight: bold;');
    console.log('');
});

// Adicionar CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

console.log('📜 Script app.js carregado');

// ===== MODAL DE RECURSOS =====

function openResourceModal(resourceId = null) {
    console.log('📝 Abrindo modal de recurso:', resourceId || 'novo');
    
    const modal = document.getElementById('resource-modal');
    const title = document.getElementById('resource-modal-title');
    const form = document.getElementById('resource-form');
    
    form.reset();
    
    if (resourceId) {
        // Editar recurso existente
        const resource = MOCK_RESOURCES.find(r => r.id === resourceId);
        if (resource) {
            title.textContent = 'Editar Recurso';
            document.getElementById('resource-id').value = resource.id;
            document.getElementById('resource-name').value = resource.name;
            document.getElementById('resource-type').value = resource.type;
            document.getElementById('resource-category').value = resource.category;
            document.getElementById('resource-location').value = resource.location;
            document.getElementById('resource-quantity').value = resource.quantity;
            document.getElementById('resource-status').value = resource.status;
            document.getElementById('resource-description').value = resource.description || '';
        }
    } else {
        // Novo recurso
        title.textContent = 'Adicionar Recurso';
        document.getElementById('resource-id').value = '';
    }
    
    modal.classList.add('active');
}

function closeResourceModal() {
    console.log('❌ Fechando modal de recurso');
    const modal = document.getElementById('resource-modal');
    modal.classList.remove('active');
}

function saveResource(event) {
    event.preventDefault();
    
    const id = document.getElementById('resource-id').value;
    const name = document.getElementById('resource-name').value;
    const type = document.getElementById('resource-type').value;
    const category = document.getElementById('resource-category').value;
    const location = document.getElementById('resource-location').value;
    const quantity = parseInt(document.getElementById('resource-quantity').value);
    const status = document.getElementById('resource-status').value;
    const description = document.getElementById('resource-description').value;
    
    if (id) {
        // Editar recurso existente
        const index = MOCK_RESOURCES.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            MOCK_RESOURCES[index] = {
                ...MOCK_RESOURCES[index],
                name,
                type,
                category,
                location,
                quantity,
                status,
                description
            };
            console.log('✓ Recurso atualizado:', name);
            showNotification('Recurso atualizado com sucesso!', 'success');
        }
    } else {
        // Criar novo recurso
        const newId = Math.max(...MOCK_RESOURCES.map(r => r.id)) + 1;
        const newResource = {
            id: newId,
            name,
            type,
            category,
            location,
            status,
            quantity,
            description
        };
        MOCK_RESOURCES.push(newResource);
        console.log('✓ Novo recurso criado:', name);
        showNotification('Recurso criado com sucesso!', 'success');
    }
    
    closeResourceModal();
    loadResources();
}

function deleteResource(id) {
    if (!confirm('Tem certeza que deseja excluir este recurso?')) {
        return;
    }
    
    const index = MOCK_RESOURCES.findIndex(r => r.id === id);
    if (index !== -1) {
        const name = MOCK_RESOURCES[index].name;
        MOCK_RESOURCES.splice(index, 1);
        console.log('🗑️ Recurso excluído:', name);
        showNotification('Recurso excluído com sucesso!', 'success');
        loadResources();
    }
}

// ===== MODAL DE USUÁRIOS =====

function openUserModal(userId = null) {
    console.log('👤 Abrindo modal de usuário:', userId || 'novo');
    
    const modal = document.getElementById('user-modal');
    const title = document.getElementById('user-modal-title');
    const form = document.getElementById('user-form');
    const passwordGroup = document.getElementById('password-group');
    const passwordInput = document.getElementById('user-password');
    
    form.reset();
    
    if (userId) {
        // Editar usuário existente
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user) {
            title.textContent = 'Editar Usuário';
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-username').value = user.username;
            document.getElementById('user-role').value = user.role;
            document.getElementById('user-level').value = user.access_level;
            document.getElementById('user-department').value = user.department || '';
            
            // Senha não é obrigatória ao editar
            passwordInput.required = false;
            passwordInput.placeholder = 'Deixe em branco para não alterar';
        }
    } else {
        // Novo usuário
        title.textContent = 'Adicionar Usuário';
        document.getElementById('user-id').value = '';
        passwordInput.required = true;
        passwordInput.placeholder = 'Mínimo 8 caracteres';
    }
    
    modal.classList.add('active');
}

function closeUserModal() {
    console.log('❌ Fechando modal de usuário');
    const modal = document.getElementById('user-modal');
    modal.classList.remove('active');
}

function saveUser(event) {
    event.preventDefault();
    
    const id = document.getElementById('user-id').value;
    const name = document.getElementById('user-name').value;
    const username = document.getElementById('user-username').value;
    const password = document.getElementById('user-password').value;
    const role = document.getElementById('user-role').value;
    const access_level = parseInt(document.getElementById('user-level').value);
    const department = document.getElementById('user-department').value;
    
    // Validar senha (mínimo 8 caracteres se for novo usuário ou se foi preenchida)
    if (password && password.length < 8) {
        showNotification('A senha deve ter no mínimo 8 caracteres', 'danger');
        return;
    }
    
    // Verificar se username já existe (exceto se estiver editando o mesmo usuário)
    const existingUser = MOCK_USERS.find(u => u.username === username);
    if (existingUser && (!id || existingUser.id !== parseInt(id))) {
        showNotification('Este nome de usuário já está em uso', 'danger');
        return;
    }
    
    if (id) {
        // Editar usuário existente
        const index = MOCK_USERS.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            MOCK_USERS[index] = {
                ...MOCK_USERS[index],
                name,
                username,
                role,
                access_level,
                department
            };
            
            // Atualizar senha apenas se foi fornecida
            if (password) {
                MOCK_USERS[index].password = password;
            }
            
            console.log('✓ Usuário atualizado:', name);
            showNotification('Usuário atualizado com sucesso!', 'success');
        }
    } else {
        // Criar novo usuário
        const newId = Math.max(...MOCK_USERS.map(u => u.id)) + 1;
        const newUser = {
            id: newId,
            username,
            password,
            name,
            role,
            department,
            access_level
        };
        MOCK_USERS.push(newUser);
        console.log('✓ Novo usuário criado:', name);
        showNotification('Usuário criado com sucesso!', 'success');
    }
    
    closeUserModal();
    loadUsers();
}

function deleteUser(id) {
    // Não permitir excluir o próprio usuário
    if (currentUser && currentUser.id === id) {
        showNotification('Você não pode excluir seu próprio usuário!', 'danger');
        return;
    }
    
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
        return;
    }
    
    const index = MOCK_USERS.findIndex(u => u.id === id);
    if (index !== -1) {
        const name = MOCK_USERS[index].name;
        MOCK_USERS.splice(index, 1);
        console.log('🗑️ Usuário excluído:', name);
        showNotification('Usuário excluído com sucesso!', 'success');
        loadUsers();
    }
}

// ===== ATUALIZAR FUNÇÕES GLOBAIS =====

window.editResource = function(id) {
    openResourceModal(id);
};

window.viewResourceDetails = function(id) {
    const resource = MOCK_RESOURCES.find(r => r.id === id);
    if (resource) {
        openResourceModal(id);
    }
};

window.deleteResource = deleteResource;

window.openResourceModal = openResourceModal;
window.closeResourceModal = closeResourceModal;
window.saveResource = saveResource;

window.openUserModal = openUserModal;
window.closeUserModal = closeUserModal;
window.saveUser = saveUser;
window.deleteUser = deleteUser;

console.log('✓ Funções de CRUD carregadas');

// ===== RENDERIZAÇÃO COM BOTÕES DE AÇÃO =====

// Sobrescrever renderUsers para incluir botões de ação
const originalRenderUsers = renderUsers;
renderUsers = function(users) {
    const container = document.getElementById('users-table');
    if (!container) return;
    
    const roleLabels = {
        'admin': 'Administrador',
        'manager': 'Gerente',
        'employee': 'Funcionário'
    };
    
    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Usuário</th>
                    <th>Função</th>
                    <th>Departamento</th>
                    <th>Nível</th>
                    <th>Status</th>
                    <th style="text-align: center;">Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        const isCurrentUser = currentUser && currentUser.id === user.id;
        html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td><span class="badge ${user.role}">${roleLabels[user.role]}</span></td>
                <td>${user.department || 'N/A'}</td>
                <td><strong>${user.access_level}</strong></td>
                <td><span class="text-success">✓ Ativo</span></td>
                <td>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <button class="btn btn-small btn-secondary" onclick="openUserModal(${user.id})" title="Editar" style="min-width: auto; padding: 8px 12px;">
                            ✏️ Editar
                        </button>
                        ${!isCurrentUser ? `
                        <button class="btn btn-small" style="min-width: auto; padding: 8px 12px; background: rgba(255,0,84,0.1); border: 1px solid var(--danger); color: var(--danger);" onclick="deleteUser(${user.id})" title="Excluir">
                            🗑️ Excluir
                        </button>
                        ` : `<span style="color: var(--text-muted); font-size: 12px;">(você)</span>`}
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
};

// Sobrescrever renderResources para incluir botão de deletar
const originalRenderResources = renderResources;
renderResources = function(resources) {
    const container = document.getElementById('resources-grid');
    if (!container) return;
    
    if (resources.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--text-muted); grid-column: 1/-1;">Nenhum recurso encontrado</p>';
        return;
    }
    
    const statusLabels = {
        'available': 'Disponível',
        'in_use': 'Em Uso',
        'maintenance': 'Manutenção',
        'retired': 'Aposentado'
    };
    
    let html = '';
    resources.forEach(resource => {
        const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.role === 'manager');
        
        html += `
            <div class="resource-card">
                <div class="resource-header">
                    <div>
                        <div class="resource-title">${resource.name}</div>
                        <div class="resource-type">${resource.category} - ${resource.type}</div>
                    </div>
                    <span class="resource-status ${resource.status}">${statusLabels[resource.status]}</span>
                </div>
                <div class="resource-details">
                    <div class="resource-detail">
                        <span class="resource-detail-label">Localização:</span>
                        <span class="resource-detail-value">${resource.location || 'N/A'}</span>
                    </div>
                    <div class="resource-detail">
                        <span class="resource-detail-label">Quantidade:</span>
                        <span class="resource-detail-value">${resource.quantity}</span>
                    </div>
                    ${resource.description ? `
                    <div class="resource-detail">
                        <span class="resource-detail-label">Descrição:</span>
                        <span class="resource-detail-value">${resource.description}</span>
                    </div>
                    ` : ''}
                </div>
                ${canEdit ? `
                <div class="resource-actions">
                    <button class="btn btn-small btn-secondary" onclick="editResource(${resource.id})">
                        ✏️ Editar
                    </button>
                    ${currentUser.role === 'admin' ? `
                    <button class="btn btn-small" style="background: rgba(255,0,84,0.1); border: 1px solid var(--danger); color: var(--danger);" onclick="deleteResource(${resource.id})">
                        🗑️ Excluir
                    </button>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
};

console.log('✓ Funções de renderização com ações atualizadas');