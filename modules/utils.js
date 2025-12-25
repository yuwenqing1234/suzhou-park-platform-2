// assets/js/layout.js

/**
 * 菜单配置数据
 * 严格对应需求文档中的功能点结构
 */
const menuConfig = [
    {
        title: "个性化数据服务",
        icon: "fa-chart-pie",
        path: "pages/dashboard.html", // 指向数据大屏页
        children: [] // 实际页面内通过 Tab 切换：综合看板、能力展示、产业图谱
    },
    {
        title: "招商引资",
        icon: "fa-wand-magic-sparkles",
        path: "pages/investment.html",
        children: []
    },
    {
        title: "企业培育",
        icon: "fa-seedling",
        path: "pages/cultivation.html",
        children: []
    },
    {
        title: "成果转化",
        icon: "fa-flask",
        path: "pages/dashboard.html?tab=achievement", // 复用Dashboard页，参数控制
        children: []
    },
    {
        title: "政策服务",
        icon: "fa-file-signature",
        path: "pages/policy.html",
        children: []
    },
    {
        title: "园企协同网络",
        icon: "fa-network-wired",
        path: "pages/collab.html",
        children: []
    }
];

/**
 * 渲染侧边栏菜单
 * @param {string} activePath - 当前页面路径，用于高亮
 */
function renderSidebar(activePath) {
    const sidebar = document.getElementById('sidebar-menu');
    if (!sidebar) return;

    // 1. 头部 Logo
    let html = `
        <div style="height: 64px; display: flex; align-items: center; padding: 0 20px; border-bottom: 1px solid #e5e7eb;">
            <i class="fa-solid fa-city" style="color: #1677ff; font-size: 20px; margin-right: 10px;"></i>
            <span style="font-weight: bold; font-size: 16px; color: #1f2937;">苏州二级节点平台</span>
        </div>
        <div style="padding: 16px; flex: 1; overflow-y: auto;">
    `;

    // 2. 菜单列表
    // 自动处理路径：如果当前在 pages 目录，链接需要相对于 pages，
    // 如果是 index.html (门户)，则需要特殊处理。
    // 这里假设我们都在 pages 目录下引用此脚本，或者统一使用相对根目录的路径。
    // 为了简单，我们统一使用相对路径调整。
    
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const prefix = isRoot ? '' : '../';

    html += `<ul style="display: flex; flex-direction: column; gap: 4px;">`;
    
    // 添加“返回门户”按钮
    html += `
        <li>
            <a href="${prefix}index.html" class="menu-link ${isRoot ? 'active' : ''}" style="display: flex; align-items: center; padding: 10px 12px; border-radius: 6px; color: #4b5563; font-size: 14px; transition: 0.2s;">
                <i class="fa-solid fa-house" style="width: 24px;"></i>
                <span>门户首页</span>
            </a>
        </li>
        <li style="margin: 8px 0; border-top: 1px solid #f3f4f6;"></li>
    `;

    menuConfig.forEach(item => {
        // 简单的高亮逻辑：如果当前URL包含菜单路径的文件名
        const currentFile = window.location.pathname.split('/').pop();
        const targetFile = item.path.split('/').pop().split('?')[0]; // 移除参数
        const isActive = currentFile === targetFile;
        
        // 针对 Dashboard 多 Tab 的特殊高亮处理 (可选)
        // const isAchievement = window.location.search.includes('tab=achievement');
        
        const activeStyle = isActive 
            ? 'background: #eff6ff; color: #1677ff; font-weight: 500;' 
            : 'color: #4b5563; hover:bg-gray-50;';

        html += `
            <li>
                <a href="${prefix}${item.path}" style="display: flex; align-items: center; padding: 10px 12px; border-radius: 6px; font-size: 14px; transition: 0.2s; ${activeStyle}">
                    <i class="fa-solid ${item.icon}" style="width: 24px;"></i>
                    <span>${item.title}</span>
                </a>
            </li>
        `;
    });

    html += `</ul></div>`;
    
    // 3. 底部用户信息
    html += `
        <div style="padding: 16px; border-top: 1px solid #e5e7eb; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #bfdbfe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1e40af; font-weight: bold;">管</div>
            <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 500;">园区管理员</div>
                <div style="font-size: 12px; color: #9ca3af;">苏州工业园</div>
            </div>
            <i class="fa-solid fa-right-from-bracket" style="cursor: pointer; color: #9ca3af;" title="退出"></i>
        </div>
    `;

    sidebar.innerHTML = html;
}

// 自动执行渲染
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
});