import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const sidebarStyle = {
    width: '280px',
    backgroundColor: '#1a202c',
    color: 'white',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    display: 'block',
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#3182ce',
  };

  return (
    <aside style={sidebarStyle}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Brewery Explorer
        </h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#cbd5e0' }}>
          Discover amazing breweries
        </p>
      </div>

      <nav>
        <Link 
          to="/" 
          style={location.pathname === '/' ? activeLinkStyle : linkStyle}
          onMouseEnter={(e) => {
            if (location.pathname !== '/') {
              e.target.style.backgroundColor = '#2d3748';
            }
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== '/') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          📊 Dashboard
        </Link>
        
        <Link 
          to="/analytics" 
          style={location.pathname === '/analytics' ? activeLinkStyle : linkStyle}
          onMouseEnter={(e) => {
            if (location.pathname !== '/analytics') {
              e.target.style.backgroundColor = '#2d3748';
            }
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== '/analytics') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          📈 Analytics
        </Link>
      </nav>

      <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#a0aec0' }}>
        <p style={{ margin: 0 }}>Data from Open Brewery DB</p>
        <p style={{ margin: '0.25rem 0 0 0' }}>Updated in real-time</p>
      </div>
    </aside>
  );
}

export default Sidebar;
