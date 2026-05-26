/*
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app  = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


let members = [
  { id: '1', name: 'Sarah Jenkins',   email: 'sarah@email.com',   phone: '+1 555-0101', dob: '1995-06-14', gender: 'Female', plan: 'Premium', fee: 'Monthly - $49.99',   emergency: 'Tom Jenkins +1 555-0202',   start: '2024-01-15', status: 'Active',   fees: 'Paid', workouts: 142, streak: 7,  initials: 'SJ', weight: '62kg', height: '165cm', goal: 'Weight Loss'  },
  { id: '2', name: 'Alex Johnson',    email: 'alex@email.com',    phone: '+1 555-0103', dob: '1990-03-22', gender: 'Male',   plan: 'VIP',     fee: 'Annual - $450.00',    emergency: 'Mary Johnson +1 555-0104',  start: '2023-01-10', status: 'Active',   fees: 'Paid', workouts: 298, streak: 14, initials: 'AJ', weight: '80kg', height: '178cm', goal: 'Muscle Gain' },
  { id: '3', name: 'Rahul Mehta',     email: 'rahul@email.com',   phone: '+1 555-0105', dob: '1998-11-05', gender: 'Male',   plan: 'Basic',   fee: 'Quarterly - $129.99', emergency: 'Priya Mehta +1 555-0106',  start: '2024-03-01', status: 'Active',   fees: 'Due',  workouts: 45,  streak: 2,  initials: 'RM', weight: '72kg', height: '172cm', goal: 'Fitness'     },
  { id: '4', name: 'Priya Patel',     email: 'priya@email.com',   phone: '+1 555-0107', dob: '1993-08-19', gender: 'Female', plan: 'Premium', fee: 'Monthly - $49.99',   emergency: 'Raj Patel +1 555-0108',    start: '2024-02-20', status: 'Inactive', fees: 'Due',  workouts: 31,  streak: 0,  initials: 'PP', weight: '57kg', height: '160cm', goal: 'Weight Loss' },
  { id: '5', name: 'Marcus Williams', email: 'marcus@email.com',  phone: '+1 555-0109', dob: '1987-01-30', gender: 'Male',   plan: 'VIP',     fee: 'Annual - $450.00',    emergency: 'Lisa Williams +1 555-0110', start: '2022-06-05', status: 'Active',   fees: 'Paid', workouts: 511, streak: 21, initials: 'MW', weight: '90kg', height: '185cm', goal: 'Strength'    },
  { id: '6', name: 'Aisha Khan',      email: 'aisha@email.com',   phone: '+1 555-0111', dob: '2000-04-12', gender: 'Female', plan: 'Basic',   fee: 'Monthly - $49.99',   emergency: 'Omar Khan +1 555-0112',    start: '2024-04-10', status: 'Active',   fees: 'Paid', workouts: 18,  streak: 4,  initials: 'AK', weight: '55kg', height: '158cm', goal: 'Flexibility' },
];

let bills = [
  { id: 'BILL-001', member: 'Sarah Jenkins',   memberId: 'GYM-00001', items: [{ desc: 'Monthly Membership - Premium', qty: 1, rate: 49.99 }, { desc: 'Locker Rental', qty: 1, rate: 10.00 }], date: '2025-03-01', status: 'Paid'   },
  { id: 'BILL-002', member: 'Rahul Mehta',     memberId: 'GYM-00003', items: [{ desc: 'Quarterly Plan - Basic', qty: 1, rate: 129.99 }],                                                       date: '2025-02-15', status: 'Unpaid' },
  { id: 'BILL-003', member: 'Priya Patel',     memberId: 'GYM-00004', items: [{ desc: 'Monthly Membership - Premium', qty: 1, rate: 49.99 }, { desc: 'Personal Training Session', qty: 2, rate: 25.00 }], date: '2025-01-20', status: 'Unpaid' },
  { id: 'BILL-004', member: 'Marcus Williams', memberId: 'GYM-00005', items: [{ desc: 'Annual Membership - VIP', qty: 1, rate: 450.00 }],                                                      date: '2025-01-01', status: 'Paid'   },
];

let notifications = [
  { id: '1', title: 'Fee Reminder',      message: 'Monthly fee is due in 3 days. Please make payment.',           type: 'warning', time: '2h ago', read: false },
  { id: '2', title: 'New Class Added',   message: 'Zumba class added every Tuesday 6PM. Book your slot now!',     type: 'info',    time: '1d ago', read: false },
  { id: '3', title: 'Gym Closed',        message: 'Gym closed April 20th for maintenance. Sessions rescheduled.', type: 'alert',   time: '2d ago', read: true  },
  { id: '4', title: 'Payment Confirmed', message: 'Payment of $49.99 received. Receipt: REC-2025-0312.',          type: 'success', time: '5d ago', read: true  },
];

let products = [
  { id: '1', name: 'Optimum Gold Whey Protein 2kg',      category: 'Protein',     price: 89.99, stock: 15, rating: 4.8, emoji: '🥛', image: null, description: 'Premium whey protein isolate'       },
  { id: '2', name: 'C4 Original Pre-Workout',            category: 'Pre-Workout', price: 39.99, stock: 8,  rating: 4.6, emoji: '⚡', image: null, description: 'Explosive energy formula'           },
  { id: '3', name: 'Multivitamin Daily Complex 90 Caps', category: 'Vitamins',    price: 24.99, stock: 3,  rating: 4.5, emoji: '💊', image: null, description: 'Complete daily vitamin support'     },
  { id: '4', name: 'Pure Creatine Monohydrate 500g',     category: 'Creatine',    price: 29.99, stock: 24, rating: 4.9, emoji: '💪', image: null, description: 'Micronized creatine monohydrate'    },
  { id: '5', name: 'BCAA 2:1:1 Amino Recovery 300g',     category: 'Protein',     price: 34.99, stock: 12, rating: 4.7, emoji: '🔬', image: null, description: 'Essential amino acid recovery blend' },
  { id: '6', name: 'Elite Steel Shaker Bottle 700ml',    category: 'Gear',        price: 14.99, stock: 45, rating: 4.4, emoji: '🧴', image: null, description: 'Leak-proof BPA-free shaker'         },
  { id: '7', name: 'Omega-3 Fish Oil 1000mg 120 Caps',   category: 'Vitamins',    price: 19.99, stock: 20, rating: 4.6, emoji: '🐟', image: null, description: 'Heart & joint health support'       },
  { id: '8', name: 'Mass Gainer Chocolate 5kg',          category: 'Protein',     price: 64.99, stock: 9,  rating: 4.3, emoji: '🍫', image: null, description: 'High-calorie mass building formula'  },
];

let dietPlans = [
  { id: '1', meal: 'Breakfast',         time: '7:00 AM',  calories: 420, protein: '28g', carbs: '55g', fat: '12g', items: ['Oatmeal with Blueberries', '2 Boiled Eggs', 'Green Tea'] },
  { id: '2', meal: 'Mid-Morning Snack', time: '10:00 AM', calories: 220, protein: '15g', carbs: '18g', fat: '10g', items: ['Greek Yogurt', 'Mixed Nuts (30g)'] },
  { id: '3', meal: 'Lunch',             time: '1:00 PM',  calories: 650, protein: '52g', carbs: '68g', fat: '14g', items: ['Grilled Chicken Breast', 'Brown Rice (200g)', 'Steamed Broccoli'] },
  { id: '4', meal: 'Pre-Workout Snack', time: '4:00 PM',  calories: 280, protein: '25g', carbs: '38g', fat: '3g',  items: ['Banana', 'Whey Protein Shake'] },
  { id: '5', meal: 'Dinner',            time: '7:30 PM',  calories: 580, protein: '45g', carbs: '48g', fat: '18g', items: ['Salmon Fillet', 'Sweet Potato', 'Mixed Salad'] },
];

let exercises = [
  { id: '1', name: 'Bench Press',    category: 'Chest',     sets: 4, reps: '10-12', rest: '90s',  muscle: 'Pectorals'        },
  { id: '2', name: 'Back Squats',    category: 'Legs',      sets: 4, reps: '8-10',  rest: '120s', muscle: 'Quadriceps'       },
  { id: '3', name: 'Deadlift',       category: 'Back',      sets: 3, reps: '6-8',   rest: '120s', muscle: 'Erector Spinae'   },
  { id: '4', name: 'Pull-ups',       category: 'Back',      sets: 3, reps: '8-12',  rest: '90s',  muscle: 'Latissimus Dorsi' },
  { id: '5', name: 'Shoulder Press', category: 'Shoulders', sets: 3, reps: '10-12', rest: '90s',  muscle: 'Deltoids'         },
  { id: '6', name: 'Treadmill Run',  category: 'Cardio',    sets: 1, reps: '30 min',rest: '—',    muscle: 'Full Body'        },
  { id: '7', name: 'Bicep Curls',    category: 'Arms',      sets: 3, reps: '12-15', rest: '60s',  muscle: 'Biceps'           },
  { id: '8', name: 'Tricep Dips',    category: 'Arms',      sets: 3, reps: '12-15', rest: '60s',  muscle: 'Triceps'          },
];


const billNum      = () => `BILL-${String(bills.length + 1).padStart(3, '0')}`;
const today        = () => new Date().toISOString().slice(0, 10);
const makeInitials = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GymPro API is running', timestamp: new Date() });
});


app.get('/api/members', (req, res) => {
  const { search, status, plan } = req.query;
  let result = [...members];
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q));
  }
  if (status) result = result.filter(m => m.status === status);
  if (plan)   result = result.filter(m => m.plan === plan);
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/members/:id', (req, res) => {
  const member = members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
  res.json({ success: true, data: member });
});

app.post('/api/members', (req, res) => {
  const { name, email, phone, dob, gender, plan, fee, emergency, start, status, fees, weight, height, goal } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
  const newMember = {
    id: uuidv4(), name, email,
    phone: phone || '', dob: dob || '', gender: gender || 'Male',
    plan: plan || 'Basic', fee: fee || 'Monthly - $49.99',
    emergency: emergency || '', start: start || today(),
    status: status || 'Active', fees: fees || 'Paid',
    weight: weight || '', height: height || '', goal: goal || 'Fitness',
    workouts: 0, streak: 0, initials: makeInitials(name),
  };
  members.push(newMember);
  res.status(201).json({ success: true, message: 'Member created', data: newMember });
});

app.put('/api/members/:id', (req, res) => {
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Member not found' });
  const updated = { ...members[idx], ...req.body, id: members[idx].id };
  if (req.body.name) updated.initials = makeInitials(req.body.name);
  members[idx] = updated;
  res.json({ success: true, message: 'Member updated', data: updated });
});

app.delete('/api/members/:id', (req, res) => {
  const idx = members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Member not found' });
  const deleted = members.splice(idx, 1)[0];
  res.json({ success: true, message: 'Member deleted', data: deleted });
});

app.post('/api/members/:id/checkin', (req, res) => {
  const member = members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
  member.workouts += 1;
  member.streak   += 1;
  res.json({ success: true, message: `${member.name} checked in!`, data: member });
});


app.get('/api/bills', (req, res) => {
  const { status } = req.query;
  let result = [...bills];
  if (status) result = result.filter(b => b.status === status);
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/bills/:id', (req, res) => {
  const bill = bills.find(b => b.id === req.params.id);
  if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
  res.json({ success: true, data: bill });
});

app.post('/api/bills', (req, res) => {
  const { member, memberId, items } = req.body;
  if (!member || !items || !items.length)
    return res.status(400).json({ success: false, message: 'Member and items are required' });
  const newBill = { id: billNum(), member, memberId: memberId || '', items, date: today(), status: 'Unpaid' };
  bills.push(newBill);
  res.status(201).json({ success: true, message: 'Bill created', data: newBill });
});

app.put('/api/bills/:id', (req, res) => {
  const idx = bills.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });
  bills[idx] = { ...bills[idx], ...req.body, id: bills[idx].id };
  res.json({ success: true, message: 'Bill updated', data: bills[idx] });
});

app.delete('/api/bills/:id', (req, res) => {
  const idx = bills.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });
  const deleted = bills.splice(idx, 1)[0];
  res.json({ success: true, message: 'Bill deleted', data: deleted });
});


app.get('/api/notifications', (req, res) => {
  res.json({ success: true, count: notifications.length, unread: notifications.filter(n => !n.read).length, data: notifications });
});

app.post('/api/notifications', (req, res) => {
  const { title, message, type } = req.body;
  if (!title || !message) return res.status(400).json({ success: false, message: 'Title and message are required' });
  const newNotif = { id: uuidv4(), title, message, type: type || 'info', time: 'Just now', read: false };
  notifications.unshift(newNotif);
  res.status(201).json({ success: true, message: 'Notification sent', data: newNotif });
});

app.put('/api/notifications/read-all', (req, res) => {
  notifications.forEach(n => (n.read = true));
  res.json({ success: true, message: 'All notifications marked as read' });
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notif = notifications.find(n => n.id === req.params.id);
  if (!notif) return res.status(404).json({ success: false, message: 'Notification not found' });
  notif.read = true;
  res.json({ success: true, message: 'Marked as read', data: notif });
});

app.delete('/api/notifications/:id', (req, res) => {
  const idx = notifications.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Notification not found' });
  notifications.splice(idx, 1);
  res.json({ success: true, message: 'Notification deleted' });
});


app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];
  if (category && category !== 'All') result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
  const { name, category, price, stock, emoji, image, description } = req.body;
  if (!name || price === undefined || stock === undefined)
    return res.status(400).json({ success: false, message: 'Name, price, and stock are required' });
  const newProduct = {
    id: uuidv4(), name, category: category || 'Protein',
    price: parseFloat(price), stock: parseInt(stock),
    emoji: emoji || '💪', image: image || null,
    description: description || '', rating: 4.5,
  };
  products.push(newProduct);
  res.status(201).json({ success: true, message: 'Product added', data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
  if (req.body.price !== undefined) products[idx].price = parseFloat(req.body.price);
  if (req.body.stock !== undefined) products[idx].stock = parseInt(req.body.stock);
  res.json({ success: true, message: 'Product updated', data: products[idx] });
});

app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  const deleted = products.splice(idx, 1)[0];
  res.json({ success: true, message: 'Product deleted', data: deleted });
});


app.get('/api/diet', (req, res) => res.json({ success: true, data: dietPlans }));

app.post('/api/diet', (req, res) => {
  const plan = { ...req.body, id: uuidv4() };
  dietPlans.push(plan);
  res.status(201).json({ success: true, data: plan });
});

app.put('/api/diet/:id', (req, res) => {
  const idx = dietPlans.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Plan not found' });
  dietPlans[idx] = { ...dietPlans[idx], ...req.body, id: dietPlans[idx].id };
  res.json({ success: true, data: dietPlans[idx] });
});

app.delete('/api/diet/:id', (req, res) => {
  const idx = dietPlans.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Plan not found' });
  dietPlans.splice(idx, 1);
  res.json({ success: true, message: 'Deleted' });
});


app.get('/api/exercises', (req, res) => res.json({ success: true, data: exercises }));


app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      monthlyData: [
        { month: 'Oct', revenue: 2800, members: 38 },
        { month: 'Nov', revenue: 3100, members: 42 },
        { month: 'Dec', revenue: 2650, members: 35 },
        { month: 'Jan', revenue: 3500, members: 48 },
        { month: 'Feb', revenue: 3200, members: 44 },
        { month: 'Mar', revenue: 3890, members: 53 },
      ],
      weeklyAttendance: [
        { day: 'Mon', count: 38 },
        { day: 'Tue', count: 44 },
        { day: 'Wed', count: 52 },
        { day: 'Thu', count: 47 },
        { day: 'Fri', count: 61 },
        { day: 'Sat', count: 73 },
        { day: 'Sun', count: 29 },
      ],
    },
  });
});


app.get('/api/stats', (req, res) => {
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const pendingFees   = members.filter(m => m.fees === 'Due').length;
  const paidBills     = bills.filter(b => b.status === 'Paid');
  const totalRevenue  = paidBills.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);
  const unpaidBills   = bills.filter(b => b.status === 'Unpaid');
  const pendingAmount = unpaidBills.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);
  const lowStockItems = products.filter(p => p.stock <= 5).length;
  res.json({
    success: true,
    data: {
      totalMembers:        members.length,
      activeMembers,
      pendingFees,
      totalRevenue:        parseFloat(totalRevenue.toFixed(2)),
      pendingAmount:       parseFloat(pendingAmount.toFixed(2)),
      totalBills:          bills.length,
      totalProducts:       products.length,
      lowStockItems,
      unreadNotifications: notifications.filter(n => !n.read).length,
      checkinsToday:       47,
    },
  });
});


app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token: 'demo-token-' + Date.now(),
      role:  role || 'Admin',
      user:  { name: 'Admin User', email, role: role || 'Admin' },
    },
  });
});

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ GymPro API Server running at http://localhost:${PORT}`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/stats`);
  console.log(`   GET  /api/analytics`);
  console.log(`   CRUD /api/members  /api/bills  /api/notifications  /api/products  /api/diet`);
  console.log(`   GET  /api/exercises`);
  console.log(`   POST /api/auth/login`);
}); 
*/


const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs   = require('fs');
const path = require('path');

const app  = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// ─── FILE-BASED PERSISTENCE ───────────────────────────────────────────────────
const DATA_FILE = path.join(__dirname, 'data.json');

const DEFAULT_DATA = {
  members: [
    { id: '1', name: 'Sarah Jenkins',   email: 'sarah@email.com',   phone: '+1 555-0101', dob: '1995-06-14', gender: 'Female', plan: 'Premium', fee: 'Monthly - $49.99',   emergency: 'Tom Jenkins +1 555-0202',   start: '2024-01-15', status: 'Active',   fees: 'Paid', workouts: 142, streak: 7,  initials: 'SJ', weight: '62kg', height: '165cm', goal: 'Weight Loss'  },
    { id: '2', name: 'Alex Johnson',    email: 'alex@email.com',    phone: '+1 555-0103', dob: '1990-03-22', gender: 'Male',   plan: 'VIP',     fee: 'Annual - $450.00',    emergency: 'Mary Johnson +1 555-0104',  start: '2023-01-10', status: 'Active',   fees: 'Paid', workouts: 298, streak: 14, initials: 'AJ', weight: '80kg', height: '178cm', goal: 'Muscle Gain' },
    { id: '3', name: 'Rahul Mehta',     email: 'rahul@email.com',   phone: '+1 555-0105', dob: '1998-11-05', gender: 'Male',   plan: 'Basic',   fee: 'Quarterly - $129.99', emergency: 'Priya Mehta +1 555-0106',  start: '2024-03-01', status: 'Active',   fees: 'Due',  workouts: 45,  streak: 2,  initials: 'RM', weight: '72kg', height: '172cm', goal: 'Fitness'     },
    { id: '4', name: 'Priya Patel',     email: 'priya@email.com',   phone: '+1 555-0107', dob: '1993-08-19', gender: 'Female', plan: 'Premium', fee: 'Monthly - $49.99',   emergency: 'Raj Patel +1 555-0108',    start: '2024-02-20', status: 'Inactive', fees: 'Due',  workouts: 31,  streak: 0,  initials: 'PP', weight: '57kg', height: '160cm', goal: 'Weight Loss' },
    { id: '5', name: 'Marcus Williams', email: 'marcus@email.com',  phone: '+1 555-0109', dob: '1987-01-30', gender: 'Male',   plan: 'VIP',     fee: 'Annual - $450.00',    emergency: 'Lisa Williams +1 555-0110', start: '2022-06-05', status: 'Active',   fees: 'Paid', workouts: 511, streak: 21, initials: 'MW', weight: '90kg', height: '185cm', goal: 'Strength'    },
    { id: '6', name: 'Aisha Khan',      email: 'aisha@email.com',   phone: '+1 555-0111', dob: '2000-04-12', gender: 'Female', plan: 'Basic',   fee: 'Monthly - $49.99',   emergency: 'Omar Khan +1 555-0112',    start: '2024-04-10', status: 'Active',   fees: 'Paid', workouts: 18,  streak: 4,  initials: 'AK', weight: '55kg', height: '158cm', goal: 'Flexibility' },
  ],
  bills: [
    { id: 'BILL-001', member: 'Sarah Jenkins',   memberId: 'GYM-00001', items: [{ desc: 'Monthly Membership - Premium', qty: 1, rate: 49.99 }, { desc: 'Locker Rental', qty: 1, rate: 10.00 }], date: '2025-03-01', status: 'Paid'   },
    { id: 'BILL-002', member: 'Rahul Mehta',     memberId: 'GYM-00003', items: [{ desc: 'Quarterly Plan - Basic', qty: 1, rate: 129.99 }],                                                       date: '2025-02-15', status: 'Unpaid' },
    { id: 'BILL-003', member: 'Priya Patel',     memberId: 'GYM-00004', items: [{ desc: 'Monthly Membership - Premium', qty: 1, rate: 49.99 }, { desc: 'Personal Training Session', qty: 2, rate: 25.00 }], date: '2025-01-20', status: 'Unpaid' },
    { id: 'BILL-004', member: 'Marcus Williams', memberId: 'GYM-00005', items: [{ desc: 'Annual Membership - VIP', qty: 1, rate: 450.00 }],                                                      date: '2025-01-01', status: 'Paid'   },
  ],
  notifications: [
    { id: '1', title: 'Fee Reminder',      message: 'Monthly fee is due in 3 days. Please make payment.',           type: 'warning', time: '2h ago', read: false },
    { id: '2', title: 'New Class Added',   message: 'Zumba class added every Tuesday 6PM. Book your slot now!',     type: 'info',    time: '1d ago', read: false },
    { id: '3', title: 'Gym Closed',        message: 'Gym closed April 20th for maintenance. Sessions rescheduled.', type: 'alert',   time: '2d ago', read: true  },
    { id: '4', title: 'Payment Confirmed', message: 'Payment of $49.99 received. Receipt: REC-2025-0312.',          type: 'success', time: '5d ago', read: true  },
  ],
  products: [
    { id: '1', name: 'Optimum Gold Whey Protein 2kg',      category: 'Protein',     price: 89.99, stock: 15, rating: 4.8, emoji: '🥛', image: null, description: 'Premium whey protein isolate'       },
    { id: '2', name: 'C4 Original Pre-Workout',            category: 'Pre-Workout', price: 39.99, stock: 8,  rating: 4.6, emoji: '⚡', image: null, description: 'Explosive energy formula'           },
    { id: '3', name: 'Multivitamin Daily Complex 90 Caps', category: 'Vitamins',    price: 24.99, stock: 3,  rating: 4.5, emoji: '💊', image: null, description: 'Complete daily vitamin support'     },
    { id: '4', name: 'Pure Creatine Monohydrate 500g',     category: 'Creatine',    price: 29.99, stock: 24, rating: 4.9, emoji: '💪', image: null, description: 'Micronized creatine monohydrate'    },
    { id: '5', name: 'BCAA 2:1:1 Amino Recovery 300g',     category: 'Protein',     price: 34.99, stock: 12, rating: 4.7, emoji: '🔬', image: null, description: 'Essential amino acid recovery blend' },
    { id: '6', name: 'Elite Steel Shaker Bottle 700ml',    category: 'Gear',        price: 14.99, stock: 45, rating: 4.4, emoji: '🧴', image: null, description: 'Leak-proof BPA-free shaker'         },
    { id: '7', name: 'Omega-3 Fish Oil 1000mg 120 Caps',   category: 'Vitamins',    price: 19.99, stock: 20, rating: 4.6, emoji: '🐟', image: null, description: 'Heart & joint health support'       },
    { id: '8', name: 'Mass Gainer Chocolate 5kg',          category: 'Protein',     price: 64.99, stock: 9,  rating: 4.3, emoji: '🍫', image: null, description: 'High-calorie mass building formula'  },
  ],
  dietPlans: [
    { id: '1', meal: 'Breakfast',         time: '7:00 AM',  calories: 420, protein: '28g', carbs: '55g', fat: '12g', items: ['Oatmeal with Blueberries', '2 Boiled Eggs', 'Green Tea'] },
    { id: '2', meal: 'Mid-Morning Snack', time: '10:00 AM', calories: 220, protein: '15g', carbs: '18g', fat: '10g', items: ['Greek Yogurt', 'Mixed Nuts (30g)'] },
    { id: '3', meal: 'Lunch',             time: '1:00 PM',  calories: 650, protein: '52g', carbs: '68g', fat: '14g', items: ['Grilled Chicken Breast', 'Brown Rice (200g)', 'Steamed Broccoli'] },
    { id: '4', meal: 'Pre-Workout Snack', time: '4:00 PM',  calories: 280, protein: '25g', carbs: '38g', fat: '3g',  items: ['Banana', 'Whey Protein Shake'] },
    { id: '5', meal: 'Dinner',            time: '7:30 PM',  calories: 580, protein: '45g', carbs: '48g', fat: '18g', items: ['Salmon Fillet', 'Sweet Potato', 'Mixed Salad'] },
  ],
  users: [
    { id: '1', name: 'Admin User', email: 'admin@gym.com', password: 'admin123', role: 'Admin'  },
    { id: '2', name: 'Member User', email: 'member@gym.com', password: 'member123', role: 'Member' },
  ],
};

// Load data from file, or seed from defaults if file doesn't exist yet
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      // Merge: keep any keys from defaults that are missing in the saved file
      return { ...DEFAULT_DATA, ...parsed };
    } catch (e) {
      console.warn('⚠️  data.json is corrupted, resetting to defaults.');
      return { ...DEFAULT_DATA };
    }
  }
  // First run — write defaults to disk
  saveData(DEFAULT_DATA);
  return { ...DEFAULT_DATA };
}

function saveData(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
}

// Load once at startup; all routes read/write this object
let db = loadData();

// Convenience references (they always point into db)
const getMembers       = () => db.members;
const getBills         = () => db.bills;
const getNotifications = () => db.notifications;
const getProducts      = () => db.products;
const getDietPlans     = () => db.dietPlans;
const getUsers         = () => db.users;

// Call after every mutation
const persist = () => saveData(db);

console.log(`✅ Data loaded from disk: ${db.members.length} members, ${db.bills.length} bills, ${db.users.length} users`);

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const billNum      = () => `BILL-${String(getBills().length + 1).padStart(3, '0')}`;
const today        = () => new Date().toISOString().slice(0, 10);
const makeInitials = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

// ─── HEALTH ───────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GymPro API is running', timestamp: new Date() });
});

// ─── MEMBERS ──────────────────────────────────────────────────────────────────
app.get('/api/members', (req, res) => {
  const { search, status, plan } = req.query;
  let result = [...getMembers()];
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q));
  }
  if (status) result = result.filter(m => m.status === status);
  if (plan)   result = result.filter(m => m.plan   === plan);
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/members/:id', (req, res) => {
  const member = getMembers().find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
  res.json({ success: true, data: member });
});

app.post('/api/members', (req, res) => {
  const { name, email, phone, dob, gender, plan, fee, emergency, start, status, fees, weight, height, goal } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
  const newMember = {
    id: uuidv4(), name, email,
    phone: phone || '', dob: dob || '', gender: gender || 'Male',
    plan: plan || 'Basic', fee: fee || 'Monthly - $49.99',
    emergency: emergency || '', start: start || today(),
    status: status || 'Active', fees: fees || 'Paid',
    weight: weight || '', height: height || '', goal: goal || 'Fitness',
    workouts: 0, streak: 0, initials: makeInitials(name),
  };
  db.members.push(newMember);
  persist();
  res.status(201).json({ success: true, message: 'Member created', data: newMember });
});

app.put('/api/members/:id', (req, res) => {
  const idx = db.members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Member not found' });
  const updated = { ...db.members[idx], ...req.body, id: db.members[idx].id };
  if (req.body.name) updated.initials = makeInitials(req.body.name);
  db.members[idx] = updated;
  persist();
  res.json({ success: true, message: 'Member updated', data: updated });
});

app.delete('/api/members/:id', (req, res) => {
  const idx = db.members.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Member not found' });
  const deleted = db.members.splice(idx, 1)[0];
  persist();
  res.json({ success: true, message: 'Member deleted', data: deleted });
});

app.post('/api/members/:id/checkin', (req, res) => {
  const member = db.members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
  member.workouts += 1;
  member.streak   += 1;
  persist();
  res.json({ success: true, message: `${member.name} checked in!`, data: member });
});

// ─── BILLS ────────────────────────────────────────────────────────────────────
app.get('/api/bills', (req, res) => {
  const { status } = req.query;
  let result = [...getBills()];
  if (status) result = result.filter(b => b.status === status);
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/bills/:id', (req, res) => {
  const bill = getBills().find(b => b.id === req.params.id);
  if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
  res.json({ success: true, data: bill });
});

app.post('/api/bills', (req, res) => {
  const { member, memberId, items } = req.body;
  if (!member || !items || !items.length)
    return res.status(400).json({ success: false, message: 'Member and items are required' });
  const newBill = { id: billNum(), member, memberId: memberId || '', items, date: today(), status: 'Unpaid' };
  db.bills.push(newBill);
  persist();
  res.status(201).json({ success: true, message: 'Bill created', data: newBill });
});

app.put('/api/bills/:id', (req, res) => {
  const idx = db.bills.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });
  db.bills[idx] = { ...db.bills[idx], ...req.body, id: db.bills[idx].id };
  persist();
  res.json({ success: true, message: 'Bill updated', data: db.bills[idx] });
});

app.delete('/api/bills/:id', (req, res) => {
  const idx = db.bills.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });
  const deleted = db.bills.splice(idx, 1)[0];
  persist();
  res.json({ success: true, message: 'Bill deleted', data: deleted });
});

app.get('/api/notifications', (req, res) => {
  const notifs = getNotifications();
  res.json({ success: true, count: notifs.length, unread: notifs.filter(n => !n.read).length, data: notifs });
});

app.post('/api/notifications', (req, res) => {
  const { title, message, type } = req.body;
  if (!title || !message) return res.status(400).json({ success: false, message: 'Title and message are required' });
  const newNotif = { id: uuidv4(), title, message, type: type || 'info', time: 'Just now', read: false };
  db.notifications.unshift(newNotif);
  persist();
  res.status(201).json({ success: true, message: 'Notification sent', data: newNotif });
});

app.put('/api/notifications/read-all', (req, res) => {
  db.notifications.forEach(n => (n.read = true));
  persist();
  res.json({ success: true, message: 'All notifications marked as read' });
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notif = db.notifications.find(n => n.id === req.params.id);
  if (!notif) return res.status(404).json({ success: false, message: 'Notification not found' });
  notif.read = true;
  persist();
  res.json({ success: true, message: 'Marked as read', data: notif });
});

app.delete('/api/notifications/:id', (req, res) => {
  const idx = db.notifications.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Notification not found' });
  db.notifications.splice(idx, 1);
  persist();
  res.json({ success: true, message: 'Notification deleted' });
});

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let result = [...getProducts()];
  if (category && category !== 'All') result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/products/:id', (req, res) => {
  const product = getProducts().find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
  const { name, category, price, stock, emoji, image, description } = req.body;
  if (!name || price === undefined || stock === undefined)
    return res.status(400).json({ success: false, message: 'Name, price, and stock are required' });
  const newProduct = {
    id: uuidv4(), name, category: category || 'Protein',
    price: parseFloat(price), stock: parseInt(stock),
    emoji: emoji || '💪', image: image || null,
    description: description || '', rating: 4.5,
  };
  db.products.push(newProduct);
  persist();
  res.status(201).json({ success: true, message: 'Product added', data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  db.products[idx] = { ...db.products[idx], ...req.body, id: db.products[idx].id };
  if (req.body.price !== undefined) db.products[idx].price = parseFloat(req.body.price);
  if (req.body.stock !== undefined) db.products[idx].stock = parseInt(req.body.stock);
  persist();
  res.json({ success: true, message: 'Product updated', data: db.products[idx] });
});

app.delete('/api/products/:id', (req, res) => {
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  const deleted = db.products.splice(idx, 1)[0];
  persist();
  res.json({ success: true, message: 'Product deleted', data: deleted });
});

// ─── DIET ─────────────────────────────────────────────────────────────────────
app.get('/api/diet', (req, res) => res.json({ success: true, data: getDietPlans() }));

app.post('/api/diet', (req, res) => {
  const plan = { ...req.body, id: uuidv4() };
  db.dietPlans.push(plan);
  persist();
  res.status(201).json({ success: true, data: plan });
});

app.put('/api/diet/:id', (req, res) => {
  const idx = db.dietPlans.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Plan not found' });
  db.dietPlans[idx] = { ...db.dietPlans[idx], ...req.body, id: db.dietPlans[idx].id };
  persist();
  res.json({ success: true, data: db.dietPlans[idx] });
});

app.delete('/api/diet/:id', (req, res) => {
  const idx = db.dietPlans.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Plan not found' });
  db.dietPlans.splice(idx, 1);
  persist();
  res.json({ success: true, message: 'Deleted' });
});

// ─── EXERCISES (read-only seed data) ─────────────────────────────────────────
const exercises = [
  { id: '1', name: 'Bench Press',    category: 'Chest',     sets: 4, reps: '10-12', rest: '90s',  muscle: 'Pectorals'        },
  { id: '2', name: 'Back Squats',    category: 'Legs',      sets: 4, reps: '8-10',  rest: '120s', muscle: 'Quadriceps'       },
  { id: '3', name: 'Deadlift',       category: 'Back',      sets: 3, reps: '6-8',   rest: '120s', muscle: 'Erector Spinae'   },
  { id: '4', name: 'Pull-ups',       category: 'Back',      sets: 3, reps: '8-12',  rest: '90s',  muscle: 'Latissimus Dorsi' },
  { id: '5', name: 'Shoulder Press', category: 'Shoulders', sets: 3, reps: '10-12', rest: '90s',  muscle: 'Deltoids'         },
  { id: '6', name: 'Treadmill Run',  category: 'Cardio',    sets: 1, reps: '30 min',rest: '—',    muscle: 'Full Body'        },
  { id: '7', name: 'Bicep Curls',    category: 'Arms',      sets: 3, reps: '12-15', rest: '60s',  muscle: 'Biceps'           },
  { id: '8', name: 'Tricep Dips',    category: 'Arms',      sets: 3, reps: '12-15', rest: '60s',  muscle: 'Triceps'          },
];
app.get('/api/exercises', (req, res) => res.json({ success: true, data: exercises }));

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      monthlyData: [
        { month: 'Oct', revenue: 2800, members: 38 },
        { month: 'Nov', revenue: 3100, members: 42 },
        { month: 'Dec', revenue: 2650, members: 35 },
        { month: 'Jan', revenue: 3500, members: 48 },
        { month: 'Feb', revenue: 3200, members: 44 },
        { month: 'Mar', revenue: 3890, members: 53 },
      ],
      weeklyAttendance: [
        { day: 'Mon', count: 38 }, { day: 'Tue', count: 44 }, { day: 'Wed', count: 52 },
        { day: 'Thu', count: 47 }, { day: 'Fri', count: 61 }, { day: 'Sat', count: 73 }, { day: 'Sun', count: 29 },
      ],
    },
  });
});

// ─── STATS ────────────────────────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const members       = getMembers();
  const bills         = getBills();
  const products      = getProducts();
  const notifications = getNotifications();
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const pendingFees   = members.filter(m => m.fees === 'Due').length;
  const paidBills     = bills.filter(b => b.status === 'Paid');
  const totalRevenue  = paidBills.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);
  const unpaidBills   = bills.filter(b => b.status === 'Unpaid');
  const pendingAmount = unpaidBills.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);
  const lowStockItems = products.filter(p => p.stock <= 5).length;
  res.json({
    success: true,
    data: {
      totalMembers:        members.length,
      activeMembers,
      pendingFees,
      totalRevenue:        parseFloat(totalRevenue.toFixed(2)),
      pendingAmount:       parseFloat(pendingAmount.toFixed(2)),
      totalBills:          bills.length,
      totalProducts:       products.length,
      lowStockItems,
      unreadNotifications: notifications.filter(n => !n.read).length,
      checkinsToday:       47,
    },
  });
});

// ─── AUTH ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

  // Check against persisted users
  const user = getUsers().find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  // If a role was requested, it must match the user's actual role
  if (role && role !== user.role) {
    return res.status(403).json({ success: false, message: `This account is not a ${role} account` });
  }

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token: 'demo-token-' + Date.now(),
      role:  user.role,
      user:  { name: user.name, email: user.email, role: user.role },
    },
  });
});

// Register a new user account
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email, and password are required' });

  const exists = getUsers().find(u => u.email === email);
  if (exists) return res.status(409).json({ success: false, message: 'An account with this email already exists' });

  const newUser = { id: uuidv4(), name, email, password, role: role || 'Member' };
  db.users.push(newUser);
  persist();
  res.status(201).json({ success: true, message: 'Account created', data: { name: newUser.name, email: newUser.email, role: newUser.role } });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ GymPro API running at http://localhost:${PORT}`);
  console.log(`💾 Data persisted to: ${DATA_FILE}`);
  console.log(`   Default accounts:  admin@gym.com / admin123  (Admin)`);
  console.log(`                      member@gym.com / member123 (Member)`);
});