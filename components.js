// Import Addons component
const { Addons } = window;

// Theme Context
const ThemeContext = React.createContext();

// Link Icon Component
const LinkIcon = ({ color, icon }) => {
    const style = {
        backgroundColor: color,
        boxShadow: `0 4px 12px ${color}, 0 0 20px ${color}80`
    };

    return (
        <div className="link-icon" style={style}>
            <i className={icon}></i>
            <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
        </div>
    );
};

// Link Item Component
const LinkItem = ({ name, icon, color, link }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const colorVarName = color.replace('var(', '').replace(')', '');
    const shadowVar = `var(--box-shadow${colorVarName.replace('--', '-')})`;

    const getIconStyle = () => {
        if (isHovered) {
            return {
                backgroundColor: color,
                boxShadow: `0 6px 20px ${color}, 0 0 30px ${color}, 0 0 50px ${color}`
            };
        }
        return {
            backgroundColor: color,
            boxShadow: shadowVar
        };
    };

    const handleClick = (e) => {
        if (link) {
            e.preventDefault();
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            className="link-item hover-lift transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-color={colorVarName.replace('--', '')}
            onClick={handleClick}
            style={{ cursor: link ? 'pointer' : 'default' }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(e);
                }
            }}
            aria-label={`Open ${name}`}
        >
            <div className="link-icon" style={getIconStyle()}>
                <i className={icon} aria-hidden="true"></i>
                <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
            </div>
            <div className="link-name">{name}</div>
        </div>
    );
};

// Column of Links Component
const LinksColumn = ({ items }) => (
    <div className="links-column">
        {items.map((item, index) => (
            <LinkItem
                key={index}
                name={item.name}
                icon={item.icon}
                color={item.color}
                link={item.link}
            />
        ))}
    </div>
);

// Dashboard Links Component
const DashboardLinks = () => {
    const dashboardItems = [
        [
            { name: 'CHAT OPS', icon: 'fas fa-comments', color: 'var(--info)', link: 'https://chatops.aces.amazon.dev/' },
            { name: 'AI ASSISTANT', icon: 'fas fa-robot', color: 'var(--purple)', link: 'https://console.harmony.a2z.com/internal-ai-assistant/' },
            { name: 'EXCEL-IN', icon: 'fas fa-file-excel', color: 'var(--success)', link: 'https://share.amazon.com/sites/wro5-check-in/_layouts/15/start.aspx#/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2fsites%2fwro5%2dcheck%2din%2fShared%20Documents%2f2025&FolderCTID=0x0120007AD2977E7540F14A96408E778CA59CE4' },
            { name: 'QUIP', icon: 'fas fa-file-alt', color: 'var(--warning)', link: 'https://quip-amazon.com/browse' },
        ],
        [
            { name: 'SEZAM GATE', icon: 'fas fa-door-open', color: 'var(--info)', link: 'https://trans-logistics-eu.amazon.com/yms/sesameGateConsole#/WRO5' },
            { name: 'YARD', icon: 'fas fa-truck-loading', color: 'var(--highlight-orange)', link: 'https://trans-logistics-eu.amazon.com/yms/shipclerk/#/yard' },
            { name: 'EVENT HISTORY', icon: 'fas fa-history', color: 'var(--purple)', link: 'https://trans-logistics-eu.amazon.com/yms/eventHistory#/eventReport?yard=WRO5' },
            { name: 'FMC', icon: 'fas fa-chart-line', color: 'var(--highlight-blue)', link: 'https://trans-logistics-eu.amazon.com/fmc/execution' },
        ],
        [
            { name: 'YARD360', icon: 'fas fa-calendar-alt', color: 'var(--success)', link: 'https://trans-logistics-eu.amazon.com/yms/yard360/appointments' },
            { name: 'OUTBOUND', icon: 'fas fa-shipping-fast', color: 'var(--purple)', link: 'https://trans-logistics-eu.amazon.com/ssp/dock/hrz/ob' },
            { name: 'SL PANORAMA', icon: 'fas fa-th-large', color: 'var(--info)', link: 'https://sl-panorama.ots.amazon.dev/?models=wro5' },
            { name: 'GTDR CHECKLIST', icon: 'fas fa-clipboard-check', color: 'var(--warning)', link: 'https://www.amazonlogistics.eu/gtdr/checklist' },
        ],
    ];

    const bottomItems = [
        [
            { name: 'ACTIVATE', icon: 'fas fa-key', color: 'var(--danger)', link: 'https://activate.amazon-corp.com/' },
            { name: 'PASSWORD RESET', icon: 'fas fa-lock', color: 'var(--orange)', link: 'https://password-v2.corp.amazon.com/' },
        ],
        [
            { name: 'DOCK SEARCH', icon: 'fas fa-search', color: 'var(--pink)', link: 'https://fc-inbound-dock-hub-eu.aka.amazon.com/en_US/#/dockmaster/search/WRO5/appointmentSearch' },
            { name: 'DOCK SCHEDULE', icon: 'fas fa-calendar-check', color: 'var(--info)', link: 'https://fc-inbound-dock-hub-eu.aka.amazon.com/en_US/#/dockmaster/dayschedule/WRO5' },
        ],
        [
            { name: 'ISSUES', icon: 'fas fa-bug', color: 'var(--info)', link: 'https://issues.amazon.com/' },
            { name: 'PERMISSIONS', icon: 'fas fa-shield-alt', color: 'var(--purple)', link: 'https://permissions.amazon.com/' },
        ],
    ];

    return (
        <div className="dashboard-links fade-in">
            <h2 className="section-title">Dashboard Links</h2>
            <div className="links-container">
                {dashboardItems.map((column, index) => (
                    <LinksColumn key={index} items={column} />
                ))}
            </div>
            <div className="links-container bottom-links">
                {bottomItems.map((column, index) => (
                    <LinksColumn key={index} items={column} />
                ))}
            </div>
        </div>
    );
};

// Other - links
const otherLinks = [
    [
        { name: 'YARD', icon: 'fas fa-tasks', color: 'var(--highlight-blue)', link: 'todo.html' },
        { name: 'OUTBOUND', icon: 'fas fa-paper-plane', color: 'var(--success)', link: 'https://outbound.example.com' },
        { name: 'DEV PANORAMA', icon: 'fas fa-code', color: 'var(--purple)', link: 'https://dev.example.com' },
        { name: 'TOOLS-DEV', icon: 'fas fa-tools', color: 'var(--info)', link: 'tools.html' },
    ],
    [
        { name: 'DEVICE ACTIVATION', icon: 'fas fa-lock', color: 'var(--danger)', link: 'https://device.example.com' },
        { name: 'PASSWORD RESET', icon: 'fas fa-key', color: 'var(--orange)', link: 'https://password.example.com' },
        { name: 'DOCKMASTER SEARCH', icon: 'fas fa-search', color: 'var(--pink)', link: 'https://dockmaster-search.example.com' },
        { name: 'DOCKMASTER', icon: 'fas fa-ship', color: 'var(--info)', link: 'https://dockmaster.example.com' },
    ]
];

const OtherLinks = () => {
    return (
        <div className="other-links fade-in">
            <h2 className="section-title">Other Links</h2>
            <div className="links-container">
                {otherLinks.map((column, index) => (
                    <LinksColumn key={index} items={column} />
                ))}
            </div>
        </div>
    );
};

// ThemeProvider Component
const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(true);

    React.useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkTheme(false);
            document.body.classList.add('light-theme');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        if (isDarkTheme) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        // Dispatch custom event for theme manager
        document.dispatchEvent(new CustomEvent('themeChange'));
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Header Component
const Header = () => {
    const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);
    const [bgAnimationsDisabled, setBgAnimationsDisabled] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const savedBgAnimationState = localStorage.getItem('bgAnimationsDisabled');
        if (savedBgAnimationState === 'true') {
            setBgAnimationsDisabled(true);
            const dashboardContainer = document.querySelector('.dashboard-container');
            if (dashboardContainer) {
                dashboardContainer.classList.add('bg-animations-disabled');
            }
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleBgAnimations = () => {
        const newState = !bgAnimationsDisabled;
        setBgAnimationsDisabled(newState);
        const dashboardContainer = document.querySelector('.dashboard-container');
        if (dashboardContainer) {
            dashboardContainer.classList.toggle('bg-animations-disabled', newState);
        }
        localStorage.setItem('bgAnimationsDisabled', newState.toString());
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <span className="logo-icon">
                    <i className="fas fa-cube"></i>
                </span>
                <span className="logo-text">VeniceOS</span>
            </div>

            <div className="user-controls">
                <button className="control-btn" onClick={toggleTheme} title="Toggle theme">
                    <i className={isDarkTheme ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>
                <div className="dropdown">
                    <button className="control-btn" title="Search">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="dropdown">
                    <button className="control-btn" title="Notifications">
                        <i className="fas fa-bell"></i>
                    </button>
                </div>
                <div className="dropdown">
                    <div className="user-avatar">JD</div>
                </div>
            </div>
        </header>
    );
};

// Seven-Segment Digit Component
const LEDDigit = ({ value }) => {
    const digitMap = {
        '0': ['a', 'b', 'c', 'd', 'e', 'f'],
        '1': ['b', 'c'],
        '2': ['a', 'b', 'd', 'e', 'g'],
        '3': ['a', 'b', 'c', 'd', 'g'],
        '4': ['b', 'c', 'f', 'g'],
        '5': ['a', 'c', 'd', 'f', 'g'],
        '6': ['a', 'c', 'd', 'e', 'f', 'g'],
        '7': ['a', 'b', 'c'],
        '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '9': ['a', 'b', 'c', 'd', 'f', 'g']
    };

    const activeSegments = digitMap[value] || [];

    return (
        <div className="led-digit">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(segment => (
                <div
                    key={segment}
                    className={`led-segment led-segment-${segment} ${activeSegments.includes(segment) ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="dashboard-footer">
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} <span style={{ background: 'linear-gradient(90deg, #4A90E2, #67B26F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}><i className="fas fa-cube"></i> VeniceOS</span>. All rights reserved.</p>
                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

// Tool Card Component
const ToolCard = ({ title, description, icon, color, link }) => (
    <div className="tool-card" style={{ borderColor: color }}>
        <div className="tool-icon" style={{ backgroundColor: color }}>
            <i className={icon}></i>
        </div>
        <div className="tool-content">
            <h3 className="tool-title">{title}</h3>
            <p className="tool-description">{description}</p>
        </div>
        <a href={link} className="tool-link">
            <i className="fas fa-arrow-right"></i>
        </a>
    </div>
);

// Tools Grid Component
const ToolsGrid = () => {
    const tools = [
        [
            { name: 'IMGPRO', icon: 'fas fa-image', color: 'var(--success)', link: '#', target: '_blank' },
            { name: 'IMGADD', icon: 'fas fa-camera', color: 'var(--warning)', link: '#', target: '_blank' },
            { name: 'TOOLSDEV', icon: 'fas fa-tools', color: 'var(--info)', link: '#', target: '_blank' },
            { name: 'PROJECTVIEW', icon: 'fas fa-eye', color: 'var(--purple)', link: '#', target: '_blank' },
            { name: 'UNIVERSAL', icon: 'fas fa-play', color: 'var(--highlight-orange)', link: '#', target: '_blank' },
            { name: 'LIVECODE', icon: 'fas fa-code', color: 'var(--danger)', link: '#', target: '_blank' },
            { name: 'EDYTORVS', icon: 'fas fa-edit', color: 'var(--info)', link: '#', target: '_blank' },
            { name: 'MARKDOWN', icon: 'fas fa-file-alt', color: 'var(--warning)', link: '#', target: '_blank' }
        ],
        [
            { name: 'W5UI', icon: 'fas fa-desktop', color: 'var(--danger)', link: '#', target: '_blank' },
            { name: 'ARKUSZ', icon: 'fas fa-table', color: 'var(--success)', link: '#', target: '_blank' },
            { name: 'PANEL', icon: 'fas fa-columns', color: 'var(--purple)', link: '#', target: '_blank' },
            { name: 'ZOOMFRAME', icon: 'fas fa-search-plus', color: 'var(--info)', link: '#', target: '_blank' },
            { name: 'CODENOTE', icon: 'fas fa-sticky-note', color: 'var(--highlight-blue)', link: '#', target: '_blank' },
            { name: 'TEXTMOD', icon: 'fas fa-font', color: 'var(--warning)', link: '#', target: '_blank' },
            { name: 'TOOLSLINK', icon: 'fas fa-link', color: 'var(--success)', link: '#', target: '_blank' },
            { name: 'EDYTORTXT', icon: 'fas fa-file-word', color: 'var(--info)', link: '#', target: '_blank' }
        ],
        [
            { name: 'TXTPRO', icon: 'fas fa-file-alt', color: 'var(--purple)', link: '#', target: '_blank' },
            { name: 'TEXTIMG', icon: 'fas fa-file-image', color: 'var(--warning)', link: '#', target: '_blank' },
            { name: 'TOOLSLINK1', icon: 'fas fa-external-link-alt', color: 'var(--success)', link: '#', target: '_blank' },
            { name: 'MOTABLE', icon: 'fas fa-table', color: 'var(--info)', link: '#', target: '_blank' },
            { name: 'INCSVDEV', icon: 'fas fa-file-csv', color: 'var(--danger)', link: '#', target: '_blank' },
            { name: 'WEBTOOLS', icon: 'fas fa-globe', color: 'var(--highlight-orange)', link: '#', target: '_blank' },
            { name: 'TASKDAY', icon: 'fas fa-calendar-day', color: 'var(--purple)', link: '#', target: '_blank' },
            { name: 'PROJECTDEV', icon: 'fas fa-project-diagram', color: 'var(--success)', link: '#', target: '_blank' }
        ]
    ];

    return (
        <div className="dashboard-links fade-in">
            <h2 className="section-title">Tools-Dev</h2>
            <div className="links-container">
                {tools.map((column, index) => (
                    <LinksColumn key={index} items={column} />
                ))}
            </div>
        </div>
    );
};

// Tool Item Component
const ToolItem = ({ name, status }) => {
    const getIconColor = () => {
        switch (status) {
            case 'check':
                return 'var(--success)';
            case 'warning':
                return 'var(--danger)';
            case 'calendar':
                return 'var(--danger)';
            case 'upload':
                return 'var(--warning)';
            case 'code':
                return 'var(--info)';
            case 'next':
                return 'var(--purple)';
            case 'camera':
                return 'var(--warning)';
            case 'minus':
                return 'var(--info)';
            case 'user':
                return 'var(--danger)';
            case 'bolt':
                return 'var(--danger)';
            case 'globe':
                return 'var(--warning)';
            case 'text':
                return 'var(--info)';
            case 'star':
                return 'var(--warning)';
            case 'file':
                return 'var(--info)';
            default:
                return 'var(--success)';
        }
    };

    const getIconClass = () => {
        switch (status) {
            case 'check':
                return 'fas fa-check';
            case 'warning':
                return 'fas fa-exclamation';
            case 'calendar':
                return 'fas fa-calendar';
            case 'upload':
                return 'fas fa-cloud-upload-alt';
            case 'code':
                return 'fas fa-code';
            case 'next':
                return 'fas fa-chevron-right';
            case 'camera':
                return 'fas fa-camera';
            case 'minus':
                return 'fas fa-minus';
            case 'user':
                return 'fas fa-user';
            case 'bolt':
                return 'fas fa-bolt';
            case 'globe':
                return 'fas fa-globe';
            case 'text':
                return 'fas fa-font';
            case 'star':
                return 'fas fa-star';
            case 'file':
                return 'fas fa-file-alt';
            default:
                return 'fas fa-check';
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const color = getIconColor();

    // Extract the color variable name (e.g., --success, --info)
    const colorVarName = color.replace('var(', '').replace(')', '');

    // Get the box-shadow variable based on the color
    const shadowVar = `var(--box-shadow${colorVarName.replace('--', '-')})`;

    const getIconStyle = () => {
        if (isHovered) {
            return {
                backgroundColor: color,
                boxShadow: `0 6px 20px ${color}, 0 0 30px ${color}, 0 0 50px ${color}`
            };
        }
        return {
            backgroundColor: color,
            boxShadow: shadowVar
        };
    };

    return (
        <div
            className="link-item hover-lift transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-color={colorVarName.replace('--', '')}
        >
            <div className="link-icon" style={getIconStyle()}>
                <i className={getIconClass()}></i>
                <div className="link-icon-light icon-glow" style={{ backgroundColor: color }}></div>
            </div>
            <div className="link-name">{name}</div>
        </div>
    );
};

// Tools Startup Component
const ToolsStartup = () => {
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format date like "czwartek, 10 kwietnia 2025"
    const rawDate = date.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    // Capitalize the first letter
    const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

    return (
        <div className="tools-startup">
            {/* Date Display */}
            <div className="date-time-display">
                <div className="date-display">
                    <i className="fas fa-calendar-alt"></i>
                    <span id="current-date">{formattedDate}</span>
                </div>
            </div>

            {/* Related Pages */}
            <div className="related-pages">
                <h3 className="related-pages-title">Related Pages</h3>
                <div className="related-pages-grid">
                    {relatedPages.map((page, index) => (
                        <a key={index} href={page.href} className="related-page-item">
                            <i className={page.icon}></i>
                            <span>{page.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Shared Navigation Bar Component
const SharedNavBar = () => {
    const currentPath = window.location.pathname;

    return (
        <nav className="shared-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <i className="fas fa-cube"></i>
                    <span>VeniceOS</span>
                </div>
                <ul className="nav-list">
                    <li>
                        <a
                            href="index.html"
                            className={`nav-link ${currentPath.includes('index.html') ? 'active' : ''}`}
                        >
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="tools.html"
                            className={`nav-link ${currentPath.includes('tools.html') ? 'active' : ''}`}
                        >
                            <i className="fas fa-tools"></i>
                            <span>Tools</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="inne.html"
                            className={`nav-link ${currentPath.includes('inne.html') ? 'active' : ''}`}
                        >
                            <i className="fas fa-th-large"></i>
                            <span>Inne</span>
                        </a>
                    </li>
                </ul>
                <div className="nav-controls">
                    <button className="theme-toggle" onClick={() => document.dispatchEvent(new CustomEvent('themeChange'))}>
                        <i className="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};









