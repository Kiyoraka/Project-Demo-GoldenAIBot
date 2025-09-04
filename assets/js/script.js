// GoldenAI Staff Dashboard - Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Message tabs functionality
    initializeMessageTabs();
    
    // Form interactions
    initializeFormInteractions();
    
    // Responsive sidebar
    initializeResponsiveSidebar();
    
    console.log('GoldenAI Staff Dashboard initialized successfully');
});

// Navigation Management
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.dataset.page;
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show target page
            const targetPageElement = document.getElementById(targetPage + '-page');
            if (targetPageElement) {
                targetPageElement.classList.add('active');
            }
            
            // Update page title
            updatePageTitle(targetPage);
        });
    });
}

// Message Tabs Management
function initializeMessageTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const messageTextarea = document.querySelector('.message-textarea');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update placeholder text based on message type
            const messageType = this.dataset.type;
            updateMessagePlaceholder(messageType, messageTextarea);
        });
    });
}

// Form Interactions
function initializeFormInteractions() {
    // Preview button functionality
    const previewBtn = document.querySelector('.btn-secondary');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            const messageContent = document.querySelector('.message-textarea').value;
            if (messageContent.trim()) {
                showPreview(messageContent);
            } else {
                showNotification('Please enter a message to preview', 'warning');
            }
        });
    }
    
    // Send message button functionality
    const sendBtn = document.querySelector('.btn-primary');
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            const messageContent = document.querySelector('.message-textarea').value;
            const selectedTarget = document.querySelector('input[name="target"]:checked');
            
            if (messageContent.trim()) {
                sendMessage(messageContent, selectedTarget.id);
            } else {
                showNotification('Please enter a message to send', 'error');
            }
        });
    }
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                // Simulate logout
                showNotification('Logging out...', 'info');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        });
    }
}

// Responsive Sidebar
function initializeResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        addMobileMenuButton();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                addMobileMenuButton();
            }
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.remove();
            }
            sidebar.classList.remove('open');
        }
    });
}

// Helper Functions
function updatePageTitle(pageType) {
    const titles = {
        'main': 'Staff Dashboard',
        'signals': 'Signal Management',
        'messages': 'Bot Messages',
        'flow': 'Bot Flow Configuration',
        'users': 'User Management'
    };
    
    const subtitles = {
        'main': 'Signal Broadcasting & Bot Management',
        'signals': 'Create and broadcast trading signals',
        'messages': 'Compose and send custom bot messages',
        'flow': 'Configure automated conversation flows',
        'users': 'Manage user accounts and permissions'
    };
    
    const activePageHeader = document.querySelector('.page.active .page-header h1');
    const activePageSubtitle = document.querySelector('.page.active .page-subtitle');
    
    if (activePageHeader) {
        activePageHeader.textContent = titles[pageType] || 'Dashboard';
    }
    
    if (activePageSubtitle) {
        activePageSubtitle.textContent = subtitles[pageType] || '';
    }
}

function updateMessagePlaceholder(messageType, textarea) {
    const placeholders = {
        'announcement': 'Enter your announcement message...',
        'promotion': 'Enter your promotional message...',
        'reminder': 'Enter your reminder message...',
        'custom': 'Enter your custom message...'
    };
    
    if (textarea) {
        textarea.placeholder = placeholders[messageType] || 'Enter your message...';
    }
}

function showPreview(content) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.style.cssText = `
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #F8FAFC; font-size: 1.25rem; font-weight: 600;">Message Preview</h3>
            <button class="close-preview" style="background: none; border: none; color: #94A3B8; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>
        <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 8px; padding: 1rem;">
            <p style="color: #E2E8F0; line-height: 1.6; white-space: pre-wrap;">${content}</p>
        </div>
        <div style="margin-top: 1rem; text-align: right;">
            <button class="close-preview" style="background: linear-gradient(135deg, #F59E0B, #D97706); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">Close</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close functionality
    const closeButtons = overlay.querySelectorAll('.close-preview');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    });
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

function sendMessage(content, target) {
    // Simulate message sending
    showNotification('Sending message...', 'info');
    
    // Simulate API call delay
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        
        // Clear the form
        document.querySelector('.message-textarea').value = '';
        
        // Update metrics (simulate)
        updateMetrics();
    }, 2000);
}

function updateMetrics() {
    // Simulate metric updates
    const signalsCount = document.querySelector('.metric-card:nth-child(1) .metric-value');
    const usersCount = document.querySelector('.metric-card:nth-child(2) .metric-value');
    const deliveryRate = document.querySelector('.metric-card:nth-child(3) .metric-value');
    
    if (signalsCount) {
        const currentCount = parseInt(signalsCount.textContent);
        signalsCount.textContent = currentCount + 1;
    }
    
    // Animate the updated cards
    const cards = document.querySelectorAll('.metric-card');
    cards.forEach(card => {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        'info': '#3B82F6',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function addMobileMenuButton() {
    const mainContent = document.querySelector('.main-content');
    const sidebar = document.querySelector('.sidebar');
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.style.cssText = `
        position: fixed;
        top: 1rem;
        left: 1rem;
        background: linear-gradient(135deg, #F59E0B, #D97706);
        color: white;
        border: none;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1001;
        font-size: 1.2rem;
    `;
    
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    document.body.appendChild(menuBtn);
}

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading states and interactions
function addLoadingStates() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 1000);
            }
        });
    });
}