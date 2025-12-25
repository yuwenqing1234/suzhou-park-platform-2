/**
 * navbar.js
 * 负责渲染全局导航栏，并自动处理不同层级页面的路径跳转
 */

const Navbar = {
    // 基础菜单配置 (注意：这里只写相对于根目录的路径，不要加 '../' 或 '/')
    menuData: [
        { name: '首页', link: 'index.html', id: 'home' },
        { 
            name: '数据决策', 
            id: 'data',
            dropdown: [
                { name: '园区综合数据看板', link: 'pages/data/dashboard.html', icon: 'fa-chart-pie', color: 'text-blue-500' },
                { name: '区域产业图谱 (大屏)', link: 'pages/data/big-screen.html', icon: 'fa-map-location-dot', color: 'text-purple-500' }
            ]
        },
        { 
            name: '企业服务', 
            id: 'services',
            dropdown: [
                { name: '个性化 DAPP 应用', link: 'pages/services/dapp-store.html', icon: 'fa-cubes', color: 'text-orange-500' },
                { name: '政策服务 (申报/兑现)', link: 'pages/services/policy.html', icon: 'fa-file-signature', color: 'text-green-500' },
                { name: '企业培育 (高企/孵化)', link: 'pages/services/incubation.html', icon: 'fa-seedling', color: 'text-cyan-500' }
            ]
        },
        { 
            name: '产业运营', 
            id: 'operation',
            dropdown: [
                { name: '招商引资', link: 'pages/operation/investment.html', icon: 'fa-wand-magic-sparkles', color: 'text-indigo-500' },
                { name: '园企协同网络', link: 'pages/operation/ecosystem.html', icon: 'fa-network-wired', color: 'text-pink-500' }
            ]
        }
    ],

    /**
     * 核心逻辑：获取路径前缀
     * 如果当前页面在 pages/data/ 下，前缀应该是 ../../
     * 如果当前页面是 index.html，前缀应该是 空字符串
     */
    getPathPrefix: function() {
        const path = window.location.pathname;
        
        // 简单判断：如果路径包含 '/pages/'，说明在子文件夹里，需要回退两级
        // 注意：这种判断假设你的所有子页面都在 pages/xx/ 这样的二级目录下
        if (path.includes('/pages/')) {
            return '../../';
        }
        return '';
    },

    // 渲染函数
    render: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const prefix = this.getPathPrefix();

        // 动态生成 Logo 链接
        const homeLink = prefix + 'index.html';
        // 动态生成用户头像链接 (演示用)
        const userLink = prefix + 'pages/data/big-screen.html'; 

        let html = `
        <div class="container mx-auto px-4 lg:px-12 h-full flex items-center justify-between">
            <a href="${homeLink}" class="flex items-center gap-3 group">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-city"></i>
                </div>
                <div>
                    <h1 class="text-xl font-bold text-slate-800 tracking-tight">苏州产业园区 <span class="text-blue-600">运营大脑</span></h1>
                    <p class="text-[10px] text-slate-400 uppercase tracking-wider">SIP Operation Platform</p>
                </div>
            </a>

            <div class="hidden lg:flex items-center gap-1">
                ${this.menuData.map(item => this.renderMenuItem(item, prefix)).join('')}
            </div>

            <div class="flex items-center gap-4">
                <button onclick="window.location.href='${userLink}'" class="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium border border-transparent hover:border-blue-200">
                    <i class="fa-solid fa-tv"></i> 数据大屏
                </button>
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px] cursor-pointer shadow-md hover:shadow-lg transition-all">
                    <div class="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=fff" alt="User">
                    </div>
                </div>
            </div>
        </div>
        `;

        container.innerHTML = html;
        // 自动添加样式类，确保外观一致
        container.classList.add('fixed', 'top-0', 'w-full', 'z-40', 'glass-nav', 'h-20', 'transition-all', 'duration-300');
    },

    // 辅助：渲染单个菜单项
    renderMenuItem: function(item, prefix) {
        // 处理链接：加上前缀
        const itemLink = item.link ? (prefix + item.link) : 'javascript:void(0)';

        if (item.dropdown) {
            return `
            <div class="relative group">
                <button class="px-4 py-2 text-slate-600 font-medium hover:text-blue-600 flex items-center gap-1 group-hover:bg-slate-50 rounded-lg transition-colors">
                    ${item.name} <i class="fa-solid fa-angle-down text-xs text-slate-400"></i>
                </button>
                <div class="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    ${item.dropdown.map(sub => `
                        <a href="${prefix + sub.link}" class="block px-4 py-3 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-sm border-b border-slate-50 last:border-0">
                            <i class="fa-solid ${sub.icon} w-6 ${sub.color}"></i> ${sub.name} 
                        </a>
                    `).join('')}
                </div>
            </div>`;
        } else {
            return `<a href="${itemLink}" class="px-4 py-2 text-slate-600 font-bold hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors">${item.name}</a>`;
        }
    }
};

// 页面加载完成后自动渲染
document.addEventListener('DOMContentLoaded', () => {
    Navbar.render('navbar-placeholder');
});