import React from 'react';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

const ADMIN_NAV = [
  { section: 'Main', items: [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'search',    icon: 'search',    label: 'Search'    },
  ]},
  { section: 'Members', items: [
    { id: 'add-member',     icon: 'person_add', label: 'Add Member'      },
    { id: 'manage-members', icon: 'group',      label: 'Manage Members'  },
    { id: 'member-profile', icon: 'badge',      label: 'Member Profile'  },
    { id: 'member-checkin', icon: 'how_to_reg', label: 'Member Check-In' },
  ]},
  { section: 'Finance', items: [
    { id: 'create-bill',   icon: 'receipt_long', label: 'Create Bill'      },
    { id: 'report-export', icon: 'bar_chart',    label: 'Reports & Export' },
  ]},
  { section: 'Content', items: [
    { id: 'notification-center', icon: 'notifications',   label: 'Notifications',   badge: true     },
    { id: 'diet-details',        icon: 'restaurant_menu', label: 'Diet Details'                     },
    { id: 'workout-tracker',     icon: 'fitness_center',  label: 'Workout Tracker'                  },
    { id: 'supplement-store',    icon: 'storefront',      label: 'Supplement Store'                 },
    { id: 'cart',                icon: 'shopping_cart',   label: 'Cart',            cartBadge: true },
  ]},
  { section: 'Support', items: [
    { id: 'feedback',        icon: 'rate_review',     label: 'Feedback'        },
    { id: 'contact-support', icon: 'support_agent',   label: 'Contact Support' },
    { id: 'edit-profile',    icon: 'manage_accounts', label: 'Edit Profile'    },
  ]},
];

const MEMBER_NAV = [
  { section: 'Main', items: [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  ]},
  { section: 'My Account', items: [
    { id: 'member-profile', icon: 'badge',      label: 'My Profile' },
    { id: 'member-checkin', icon: 'how_to_reg', label: 'Check-In'   },
  ]},
  { section: 'Health', items: [
    { id: 'diet-details',    icon: 'restaurant_menu', label: 'Diet Details'    },
    { id: 'workout-tracker', icon: 'fitness_center',  label: 'Workout Tracker' },
  ]},
  { section: 'Store', items: [
    { id: 'supplement-store', icon: 'storefront',    label: 'Supplement Store'                 },
    { id: 'cart',             icon: 'shopping_cart', label: 'Cart',            cartBadge: true },
  ]},
  { section: 'Support', items: [
    { id: 'notification-center', icon: 'notifications',   label: 'Notifications',  badge: true },
    { id: 'feedback',            icon: 'rate_review',     label: 'Feedback'                   },
    { id: 'contact-support',     icon: 'support_agent',   label: 'Contact Support'            },
    { id: 'edit-profile',        icon: 'manage_accounts', label: 'Edit Profile'               },
  ]},
];

export default function Sidebar({ activePage, onNavigate, onLogout, role = 'Admin', user }) {
  const { unreadCount, cart } = useApp();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const navItems  = role === 'Admin' ? ADMIN_NAV : MEMBER_NAV;
  const initials  = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : role === 'Admin' ? 'AD' : 'ME';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">🏋️</div>
        <div className="logo-text">Gym<span>Pro</span></div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="nav-section-label">{section.section}</div>
            {section.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item${activePage === item.id ? ' active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="material-symbols-outlined nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge    && unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
                {item.cartBadge && cartCount  > 0 && <span className="nav-badge">{cartCount}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="admin-chip">
          <div className="admin-avatar">{initials}</div>
          <div className="admin-info">
            <div className="admin-name">{user?.name || (role === 'Admin' ? 'Admin User' : 'Member')}</div>
            <div className="admin-role">{role === 'Admin' ? 'Gym Manager' : 'Gym Member'}</div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Logout">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}