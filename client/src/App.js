import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/UI';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Login            from './pages/Login';
import Dashboard        from './pages/Dashboard';
import AddMember        from './pages/AddMember';
import ManageMembers    from './pages/ManageMembers';
import MemberProfile    from './pages/MemberProfile';
import MemberCheckIn    from './pages/MemberCheckIn';
import CreateBill       from './pages/CreateBill';
import ReportExport     from './pages/ReportExport';
import NotificationCenter from './pages/NotificationCenter';
import DietDetails      from './pages/DietDetails';
import WorkoutTracker   from './pages/WorkoutTracker';
import SupplementStore  from './pages/SupplementStore';
import Cart             from './pages/Cart';
import Search           from './pages/Search';
import EditProfile      from './pages/EditProfile';
import Feedback         from './pages/Feedback';
import ContactSupport   from './pages/ContactSupport';

import './styles/global.css';
import './pages/SupplementStore.css';

const PAGE_TITLES = {
  'dashboard':           { title: 'Dashboard',          subtitle: 'Overview & Analytics'          },
  'add-member':          { title: 'Add New Member',     subtitle: 'Register a new gym member'     },
  'manage-members':      { title: 'Manage Members',     subtitle: 'View, edit & delete members'   },
  'member-profile':      { title: 'Member Profile',     subtitle: 'Detailed member information'   },
  'member-checkin':      { title: 'Member Check-In',    subtitle: 'Mark attendance & access pass' },
  'create-bill':         { title: 'Create Bill',        subtitle: 'Generate digital receipts'     },
  'report-export':       { title: 'Reports & Export',   subtitle: 'Analytics and data export'     },
  'notification-center': { title: 'Notifications',      subtitle: 'Send and manage notifications' },
  'diet-details':        { title: 'Diet Details',       subtitle: 'Meal plans & nutrition info'   },
  'workout-tracker':     { title: 'Workout Tracker',    subtitle: 'Track your active session'     },
  'supplement-store':    { title: 'Supplement Store',   subtitle: 'Manage & sell supplements'     },
  'cart':                { title: 'Cart',               subtitle: 'Your shopping cart'            },
  'search':              { title: 'Search',             subtitle: 'Find members and records'      },
  'edit-profile':        { title: 'Edit Profile',       subtitle: 'Account & gym settings'        },
  'feedback':            { title: 'Feedback',           subtitle: 'Member reviews & ratings'      },
  'contact-support':     { title: 'Contact Support',    subtitle: 'Get help from our team'        },
};

function AppShell() {
  const [page, setPage]                   = useState('dashboard');
  const [editMember, setEditMember]       = useState(null);
  const [profileMember, setProfileMember] = useState(null);

  const navigate = (targetPage, data) => {
    if (targetPage !== 'add-member')     setEditMember(null);
    if (targetPage === 'member-profile' && data) setProfileMember(data);
    setPage(targetPage);
  };

  const handleEditMember = (member) => {
    setEditMember(member);
    setPage('add-member');
  };

  const pt = PAGE_TITLES[page] || { title: page, subtitle: '' };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':          return <Dashboard onNavigate={navigate} />;
      case 'add-member':         return <AddMember onNavigate={navigate} editData={editMember} onCancelEdit={() => setEditMember(null)} />;
      case 'manage-members':     return <ManageMembers onNavigate={navigate} onEditMember={handleEditMember} />;
      case 'member-profile':     return <MemberProfile member={profileMember} onBack={() => navigate('search')} />;
      case 'member-checkin':     return <MemberCheckIn />;
      case 'create-bill':        return <CreateBill />;
      case 'report-export':      return <ReportExport />;
      case 'notification-center':return <NotificationCenter />;
      case 'diet-details':       return <DietDetails />;
      case 'workout-tracker':    return <WorkoutTracker />;
      case 'supplement-store':   return <SupplementStore onNavigate={navigate} />;
      case 'cart':               return <Cart onNavigate={navigate} />;
      case 'search':             return <Search onNavigate={navigate} onSelectMember={(m) => setProfileMember(m)} />;
      case 'edit-profile':       return <EditProfile />;
      case 'feedback':           return <Feedback />;
      case 'contact-support':    return <ContactSupport />;
      default:                   return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={page} onNavigate={navigate} onLogout={() => window.location.reload()} />
      <div className="main-content">
        <Topbar title={pt.title} subtitle={pt.subtitle} onNavigate={navigate} />
        <main className="page-content">{renderPage()}</main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) {
    return (
      <AppProvider>
        <Login onLogin={() => setLoggedIn(true)} />
        <ToastContainer />
      </AppProvider>
    );
  }
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
