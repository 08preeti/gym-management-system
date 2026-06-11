const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app  = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(
  "mongodb+srv://preetichikkali422_db_user:Preeti123@cluster0.eolpnkb.mongodb.net/gymdb?retryWrites=true&w=majority&appName=Cluster0"
)
.then(async () => {
  console.log("✅ MongoDB Connected");

  await seedData();

  app.listen(PORT, () => {
    console.log(`✅ GymPro API running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

const memberSchema = new mongoose.Schema({
  name: String, email: String, phone: String, dob: String,
  gender: String, plan: String, fee: String, emergency: String,
  start: String, status: String, fees: String, weight: String,
  height: String, goal: String, workouts: Number, streak: Number,
  initials: String
});

const billSchema = new mongoose.Schema({
  member: String, memberId: String,
  items: [{ desc: String, qty: Number, rate: Number }],
  date: String, status: String
});

const notificationSchema = new mongoose.Schema({
  title: String, message: String, type: String,
  time: String, read: Boolean
});

const productSchema = new mongoose.Schema({
  name: String, category: String, price: Number,
  stock: Number, rating: Number, emoji: String,
  image: String, description: String
});

const dietSchema = new mongoose.Schema({
  meal: String, time: String, calories: Number,
  protein: String, carbs: String, fat: String,
  items: [String]
});


const Member       = mongoose.model('Member',       memberSchema);
const Bill         = mongoose.model('Bill',         billSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Product      = mongoose.model('Product',      productSchema);
const Diet         = mongoose.model('Diet',         dietSchema);


const seedData = async () => {
  const count = await Member.countDocuments();
  if (count === 0) {
    await Member.insertMany([
      { name: 'Sarah Jenkins',   email: 'sarah@email.com',   phone: '+1 555-0101', dob: '1995-06-14', gender: 'Female', plan: 'Premium', fee: 'Monthly - $49.99',   emergency: 'Tom Jenkins +1 555-0202',   start: '2024-01-15', status: 'Active',   fees: 'Paid', workouts: 142, streak: 7,  initials: 'SJ', weight: '62kg', height: '165cm', goal: 'Weight Loss'  },
      { name: 'Alex Johnson',    email: 'alex@email.com',    phone: '+1 555-0103', dob: '1990-03-22', gender: 'Male',   plan: 'VIP',     fee: 'Annual - $450.00',    emergency: 'Mary Johnson +1 555-0104',  start: '2023-01-10', status: 'Active',   fees: 'Paid', workouts: 298, streak: 14, initials: 'AJ', weight: '80kg', height: '178cm', goal: 'Muscle Gain' },
      { name: 'Rahul Mehta',     email: 'rahul@email.com',   phone: '+1 555-0105', dob: '1998-11-05', gender: 'Male',   plan: 'Basic',   fee: 'Quarterly - $129.99', emergency: 'Priya Mehta +1 555-0106',  start: '2024-03-01', status: 'Active',   fees: 'Due',  workouts: 45,  streak: 2,  initials: 'RM', weight: '72kg', height: '172cm', goal: 'Fitness'     },
      { name: 'Priya Patel',     email: 'priya@email.com',   phone: '+1 555-0107', dob: '1993-08-19', gender: 'Female', plan: 'Premium', fee: 'Monthly - $49.99',   emergency: 'Raj Patel +1 555-0108',    start: '2024-02-20', status: 'Inactive', fees: 'Due',  workouts: 31,  streak: 0,  initials: 'PP', weight: '57kg', height: '160cm', goal: 'Weight Loss' },
      { name: 'Marcus Williams', email: 'marcus@email.com',  phone: '+1 555-0109', dob: '1987-01-30', gender: 'Male',   plan: 'VIP',     fee: 'Annual - $450.00',    emergency: 'Lisa Williams +1 555-0110', start: '2022-06-05', status: 'Active',   fees: 'Paid', workouts: 511, streak: 21, initials: 'MW', weight: '90kg', height: '185cm', goal: 'Strength'    },
      { name: 'Aisha Khan',      email: 'aisha@email.com',   phone: '+1 555-0111', dob: '2000-04-12', gender: 'Female', plan: 'Basic',   fee: 'Monthly - $49.99',   emergency: 'Omar Khan +1 555-0112',    start: '2024-04-10', status: 'Active',   fees: 'Paid', workouts: 18,  streak: 4,  initials: 'AK', weight: '55kg', height: '158cm', goal: 'Flexibility' },
    ]);
    console.log('✅ Members seeded');
  }

  const prodCount = await Product.countDocuments();
  if (prodCount === 0) {
    await Product.insertMany([
      { name: 'Optimum Gold Whey Protein 2kg', category: 'Protein',     price: 89.99, stock: 15, rating: 4.8, emoji: '🥛', description: 'Premium whey protein isolate' },
      { name: 'C4 Original Pre-Workout',       category: 'Pre-Workout', price: 39.99, stock: 8,  rating: 4.6, emoji: '⚡', description: 'Explosive energy formula'     },
      { name: 'Pure Creatine Monohydrate 500g',category: 'Creatine',    price: 29.99, stock: 24, rating: 4.9, emoji: '💪', description: 'Micronized creatine'          },
    ]);
    console.log('✅ Products seeded');
  }

  const notifCount = await Notification.countDocuments();
  if (notifCount === 0) {
    await Notification.insertMany([
      { title: 'Fee Reminder',      message: 'Monthly fee is due in 3 days.',            type: 'warning', time: '2h ago', read: false },
      { title: 'New Class Added',   message: 'Zumba class added every Tuesday 6PM.',     type: 'info',    time: '1d ago', read: false },
      { title: 'Payment Confirmed', message: 'Payment of $49.99 received.',              type: 'success', time: '5d ago', read: true  },
    ]);
    console.log('✅ Notifications seeded');
  }

  const dietCount = await Diet.countDocuments();
  if (dietCount === 0) {
    await Diet.insertMany([
      { meal: 'Breakfast',         time: '7:00 AM',  calories: 420, protein: '28g', carbs: '55g', fat: '12g', items: ['Oatmeal with Blueberries', '2 Boiled Eggs', 'Green Tea'] },
      { meal: 'Lunch',             time: '1:00 PM',  calories: 650, protein: '52g', carbs: '68g', fat: '14g', items: ['Grilled Chicken Breast', 'Brown Rice', 'Steamed Broccoli'] },
      { meal: 'Dinner',            time: '7:30 PM',  calories: 580, protein: '45g', carbs: '48g', fat: '18g', items: ['Salmon Fillet', 'Sweet Potato', 'Mixed Salad'] },
    ]);
    console.log('✅ Diet seeded');
  }
};


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GymPro API running', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});


// MEMBERS
// ---------------------------------------------------
app.get('/api/members', async (req, res) => {
  try {
    const { search, status, plan } = req.query;
    let query = {};
    if (status) query.status = status;
    if (plan)   query.plan   = plan;
    let members = await Member.find(query);
    if (search) {
      const q = search.toLowerCase();
      members = members.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, count: members.length, data: members });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: member });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/members', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' });
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const member = await Member.create({ ...req.body, initials, workouts: 0, streak: 0 });
    res.status(201).json({ success: true, data: member });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    if (req.body.name) req.body.initials = req.body.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: member });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/members/:id/checkin', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { $inc: { workouts: 1, streak: 1 } },
      { new: true }
    );
    res.json({ success: true, message: `${member.name} checked in!`, data: member });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// BILLS
// --------------------
app.get('/api/bills', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const bills = await Bill.find(query);
    res.json({ success: true, count: bills.length, data: bills });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/bills', async (req, res) => {
  try {
    const bill = await Bill.create({ ...req.body, date: new Date().toISOString().slice(0, 10), status: 'Unpaid' });
    res.status(201).json({ success: true, data: bill });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/bills/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: bill });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/bills/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});


// NOTIFICATIONS
// --------------------
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, count: notifications.length, unread: notifications.filter(n => !n.read).length, data: notifications });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const notif = await Notification.create({ ...req.body, time: 'Just now', read: false });
    res.status(201).json({ success: true, data: notif });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/notifications/read-all', async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true });
    res.json({ success: true, message: 'All marked as read' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/notifications/:id/read', async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, data: notif });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/notifications/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});


// PRODUCTS
// --------------------
app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    let products = await Product.find(query);
    if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    res.json({ success: true, count: products.length, data: products });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, rating: 4.5 });
    res.status(201).json({ success: true, data: product });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: product });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});


// DIET
// ------------------------------------
app.get('/api/diet', async (req, res) => {
  try {
    const diet = await Diet.find();
    res.json({ success: true, data: diet });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.post('/api/diet', async (req, res) => {
  try {
    const plan = await Diet.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.put('/api/diet/:id', async (req, res) => {
  try {
    const plan = await Diet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: plan });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

app.delete('/api/diet/:id', async (req, res) => {
  try {
    await Diet.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});


// EXERCISES
// ----------------------------
app.get('/api/exercises', (req, res) => {
  res.json({ success: true, data: [
    { id: '1', name: 'Bench Press',    category: 'Chest',     sets: 4, reps: '10-12', rest: '90s',  muscle: 'Pectorals'        },
    { id: '2', name: 'Back Squats',    category: 'Legs',      sets: 4, reps: '8-10',  rest: '120s', muscle: 'Quadriceps'       },
    { id: '3', name: 'Deadlift',       category: 'Back',      sets: 3, reps: '6-8',   rest: '120s', muscle: 'Erector Spinae'   },
    { id: '4', name: 'Pull-ups',       category: 'Back',      sets: 3, reps: '8-12',  rest: '90s',  muscle: 'Latissimus Dorsi' },
    { id: '5', name: 'Shoulder Press', category: 'Shoulders', sets: 3, reps: '10-12', rest: '90s',  muscle: 'Deltoids'         },
    { id: '6', name: 'Treadmill Run',  category: 'Cardio',    sets: 1, reps: '30 min',rest: '—',    muscle: 'Full Body'        },
    { id: '7', name: 'Bicep Curls',    category: 'Arms',      sets: 3, reps: '12-15', rest: '60s',  muscle: 'Biceps'           },
    { id: '8', name: 'Tricep Dips',    category: 'Arms',      sets: 3, reps: '12-15', rest: '60s',  muscle: 'Triceps'          },
  ]});
});

// ANALYTICS
// ----------------------------------
app.get('/api/analytics', (req, res) => {
  res.json({ success: true, data: {
    monthlyData: [
      { month: 'Oct', revenue: 2800, members: 38 },
      { month: 'Nov', revenue: 3100, members: 42 },
      { month: 'Dec', revenue: 2650, members: 35 },
      { month: 'Jan', revenue: 3500, members: 48 },
      { month: 'Feb', revenue: 3200, members: 44 },
      { month: 'Mar', revenue: 3890, members: 53 },
    ],
    weeklyAttendance: [
      { day: 'Mon', count: 38 }, { day: 'Tue', count: 44 },
      { day: 'Wed', count: 52 }, { day: 'Thu', count: 47 },
      { day: 'Fri', count: 61 }, { day: 'Sat', count: 73 },
      { day: 'Sun', count: 29 },
    ],
  }});
});

// STATS
// --------------------------------
app.get('/api/stats', async (req, res) => {
  try {
    const members      = await Member.find();
    const bills        = await Bill.find();
    const products     = await Product.find();
    const notifications = await Notification.find();
    const activeMembers = members.filter(m => m.status === 'Active').length;
    const pendingFees   = members.filter(m => m.fees === 'Due').length;
    const paidBills     = bills.filter(b => b.status === 'Paid');
    const totalRevenue  = paidBills.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);
    res.json({ success: true, data: {
      totalMembers: members.length, activeMembers, pendingFees,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalBills: bills.length, totalProducts: products.length,
      lowStockItems: products.filter(p => p.stock <= 5).length,
      unreadNotifications: notifications.filter(n => !n.read).length,
      checkinsToday: 47,
    }});
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// AUTH
//--------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
  res.json({ success: true, data: { token: 'demo-token-' + Date.now(), role: role || 'Admin', user: { name: 'Admin User', email, role: role || 'Admin' } } });
});

