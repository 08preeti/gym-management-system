export const MEMBERS = [
  { id: 1, name: "Sarah Jenkins", email: "sarah@email.com", phone: "+1 555-0101", dob: "1995-06-14", gender: "Female", plan: "Premium", fee: "Monthly - $49.99", emergency: "Tom Jenkins +1 555-0202", start: "2024-01-15", status: "Active", fees: "Paid", workouts: 142, streak: 7, initials: "SJ", weight: "62kg", height: "165cm", goal: "Weight Loss" },
  { id: 2, name: "Alex Johnson", email: "alex@email.com", phone: "+1 555-0103", dob: "1990-03-22", gender: "Male", plan: "VIP", fee: "Annual - $450.00", emergency: "Mary Johnson +1 555-0104", start: "2023-01-10", status: "Active", fees: "Paid", workouts: 298, streak: 14, initials: "AJ", weight: "80kg", height: "178cm", goal: "Muscle Gain" },
  { id: 3, name: "Rahul Mehta", email: "rahul@email.com", phone: "+1 555-0105", dob: "1998-11-05", gender: "Male", plan: "Basic", fee: "Quarterly - $129.99", emergency: "Priya Mehta +1 555-0106", start: "2024-03-01", status: "Active", fees: "Due", workouts: 45, streak: 2, initials: "RM", weight: "72kg", height: "172cm", goal: "Fitness" },
  { id: 4, name: "Priya Patel", email: "priya@email.com", phone: "+1 555-0107", dob: "1993-08-19", gender: "Female", plan: "Premium", fee: "Monthly - $49.99", emergency: "Raj Patel +1 555-0108", start: "2024-02-20", status: "Inactive", fees: "Due", workouts: 31, streak: 0, initials: "PP", weight: "57kg", height: "160cm", goal: "Weight Loss" },
  { id: 5, name: "Marcus Williams", email: "marcus@email.com", phone: "+1 555-0109", dob: "1987-01-30", gender: "Male", plan: "VIP", fee: "Annual - $450.00", emergency: "Lisa Williams +1 555-0110", start: "2022-06-05", status: "Active", fees: "Paid", workouts: 511, streak: 21, initials: "MW", weight: "90kg", height: "185cm", goal: "Strength" },
  { id: 6, name: "Aisha Khan", email: "aisha@email.com", phone: "+1 555-0111", dob: "2000-04-12", gender: "Female", plan: "Basic", fee: "Monthly - $49.99", emergency: "Omar Khan +1 555-0112", start: "2024-04-10", status: "Active", fees: "Paid", workouts: 18, streak: 4, initials: "AK", weight: "55kg", height: "158cm", goal: "Flexibility" },
];

export const BILLS = [
  { id: "BILL-001", member: "Sarah Jenkins", memberId: "GYM-00001", items: [{ desc: "Monthly Membership - Premium", qty: 1, rate: 49.99 }, { desc: "Locker Rental", qty: 1, rate: 10.00 }], date: "2025-03-01", status: "Paid" },
  { id: "BILL-002", member: "Rahul Mehta", memberId: "GYM-00003", items: [{ desc: "Quarterly Plan - Basic", qty: 1, rate: 129.99 }], date: "2025-02-15", status: "Unpaid" },
  { id: "BILL-003", member: "Priya Patel", memberId: "GYM-00004", items: [{ desc: "Monthly Membership - Premium", qty: 1, rate: 49.99 }, { desc: "Personal Training Session", qty: 2, rate: 25.00 }], date: "2025-01-20", status: "Unpaid" },
  { id: "BILL-004", member: "Marcus Williams", memberId: "GYM-00005", items: [{ desc: "Annual Membership - VIP", qty: 1, rate: 450.00 }], date: "2025-01-01", status: "Paid" },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Fee Reminder", message: "Monthly fee is due in 3 days. Please make payment to avoid service interruption.", type: "warning", time: "2h ago", read: false },
  { id: 2, title: "New Class Added", message: "Zumba class added every Tuesday 6PM. Book your slot now!", type: "info", time: "1d ago", read: false },
  { id: 3, title: "Gym Closed Notice", message: "Gym will be closed on April 20th for maintenance. All sessions rescheduled.", type: "alert", time: "2d ago", read: true },
  { id: 4, title: "Payment Confirmed", message: "Payment of $49.99 received for March membership. Receipt ID: REC-2025-0312.", type: "success", time: "5d ago", read: true },
];

export const SUPPLEMENTS = [
  { id: 1, name: "Optimum Gold Whey Protein 2kg", category: "Protein", price: 89.99, stock: 15, rating: 4.8, emoji: "🥛" },
  { id: 2, name: "C4 Original Pre-Workout Icy Blue", category: "Pre-Workout", price: 39.99, stock: 8, rating: 4.6, emoji: "⚡" },
  { id: 3, name: "Multivitamin Daily Complex 90 Caps", category: "Vitamins", price: 24.99, stock: 3, rating: 4.5, emoji: "💊" },
  { id: 4, name: "Pure Creatine Monohydrate 500g", category: "Creatine", price: 29.99, stock: 24, rating: 4.9, emoji: "💪" },
  { id: 5, name: "BCAA 2:1:1 Amino Recovery 300g", category: "Protein", price: 34.99, stock: 12, rating: 4.7, emoji: "🔬" },
  { id: 6, name: "Elite Steel Shaker Bottle 700ml", category: "Gear", price: 14.99, stock: 45, rating: 4.4, emoji: "🧴" },
  { id: 7, name: "Omega-3 Fish Oil 1000mg 120 Caps", category: "Vitamins", price: 19.99, stock: 20, rating: 4.6, emoji: "🐟" },
  { id: 8, name: "Mass Gainer Chocolate 5kg", category: "Protein", price: 64.99, stock: 9, rating: 4.3, emoji: "🍫" },
];

export const DIET_PLANS = [
  { meal: "Breakfast", items: ["Oatmeal with Blueberries", "2 Boiled Eggs", "Green Tea"], calories: 420, protein: "28g", carbs: "55g", fat: "12g", time: "7:00 AM" },
  { meal: "Mid-Morning Snack", items: ["Greek Yogurt", "Mixed Nuts (30g)"], calories: 220, protein: "15g", carbs: "18g", fat: "10g", time: "10:00 AM" },
  { meal: "Lunch", items: ["Grilled Chicken Breast", "Brown Rice (200g)", "Steamed Broccoli"], calories: 650, protein: "52g", carbs: "68g", fat: "14g", time: "1:00 PM" },
  { meal: "Pre-Workout Snack", items: ["Banana", "Whey Protein Shake"], calories: 280, protein: "25g", carbs: "38g", fat: "3g", time: "4:00 PM" },
  { meal: "Dinner", items: ["Salmon Fillet", "Sweet Potato", "Mixed Salad"], calories: 580, protein: "45g", carbs: "48g", fat: "18g", time: "7:30 PM" },
];

export const EXERCISES = [
  { id: 1, name: "Bench Press", category: "Chest", sets: 4, reps: "10-12", rest: "90s", muscle: "Pectorals" },
  { id: 2, name: "Back Squats", category: "Legs", sets: 4, reps: "8-10", rest: "120s", muscle: "Quadriceps" },
  { id: 3, name: "Deadlift", category: "Back", sets: 3, reps: "6-8", rest: "120s", muscle: "Erector Spinae" },
  { id: 4, name: "Pull-ups", category: "Back", sets: 3, reps: "8-12", rest: "90s", muscle: "Latissimus Dorsi" },
  { id: 5, name: "Shoulder Press", category: "Shoulders", sets: 3, reps: "10-12", rest: "90s", muscle: "Deltoids" },
  { id: 6, name: "Treadmill Run", category: "Cardio", sets: 1, reps: "30 min", rest: "—", muscle: "Full Body" },
  { id: 7, name: "Bicep Curls", category: "Arms", sets: 3, reps: "12-15", rest: "60s", muscle: "Biceps" },
  { id: 8, name: "Tricep Dips", category: "Arms", sets: 3, reps: "12-15", rest: "60s", muscle: "Triceps" },
];

export const MONTHLY_DATA = [
  { month: "Oct", revenue: 2800, members: 38 },
  { month: "Nov", revenue: 3100, members: 42 },
  { month: "Dec", revenue: 2650, members: 35 },
  { month: "Jan", revenue: 3500, members: 48 },
  { month: "Feb", revenue: 3200, members: 44 },
  { month: "Mar", revenue: 3890, members: 53 },
];

export const WEEKLY_ATTENDANCE = [
  { day: "Mon", count: 38 },
  { day: "Tue", count: 44 },
  { day: "Wed", count: 52 },
  { day: "Thu", count: 47 },
  { day: "Fri", count: 61 },
  { day: "Sat", count: 73 },
  { day: "Sun", count: 29 },
];
