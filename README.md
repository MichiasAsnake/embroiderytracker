# Embroidery Order Tracker

A comprehensive web application for tracking embroidery orders, machine timers, and production statistics.

## Features

### 🏭 Machine Management

- **4 Pre-configured Machines**: 2 single-head machines, 1 six-head machine, and 1 eight-head machine
- **Built-in Timers**: Start, pause, and stop timers for each machine
- **Real-time Status**: Visual indicators showing which machines are running or idle
- **Time Tracking**: Persistent elapsed time tracking for each machine

### 📋 Order Management

- **Complete Order Details**: Title, job number, quantity, panel number, thread colors, machine speed, due date
- **Flexible Due Dates**: Set due dates from today up to 1 month out
- **Machine Assignment**: Assign orders to specific machines or leave unassigned
- **Status Tracking**: Track orders through pending, in-progress, paused, and completed states
- **Multi-color Support**: Add multiple thread colors per order

### 📊 Statistics & Analytics

- **Real-time Dashboard**: Overview of total orders, completed orders, total panels, and quantity
- **Production Tracking**: Keep running counts of overall panels and quantities
- **Daily Statistics**: Track daily production metrics
- **Visual Indicators**: Color-coded status indicators and due date warnings

### 💾 Data Persistence

- **Local Storage**: All data is stored locally in your browser
- **No External Dependencies**: Works completely offline
- **Automatic Saving**: All changes are automatically saved

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Creating Orders

1. Click the "Create Order" button on the dashboard
2. Fill in all required fields:
   - Title and job number
   - Quantity and panel number
   - Thread colors (add multiple if needed)
   - Machine speed in RPM
   - Due date
3. Optionally assign to a machine immediately
4. Click "Create Order"

### Managing Machines

1. Each machine card shows:
   - Current timer (running or elapsed time)
   - Active status
   - Currently assigned order (if any)
2. To start production:
   - Assign an order to the machine
   - Click "Start" to begin the timer
   - Use "Pause" or "Stop" as needed

### Tracking Progress

- Orders automatically update status when machines start/stop
- Completed orders update statistics
- Dashboard shows real-time production metrics

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Storage**: Browser Local Storage

## Project Structure

```
embroidery/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── CreateOrderForm.tsx
│   ├── MachineCard.tsx
│   ├── OrderList.tsx
│   └── StatisticsCard.tsx
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Utility functions
│   └── storage.ts         # Local storage management
└── ...configuration files
```

## Contributing

This is a custom embroidery shop management tool. Feel free to modify and extend based on your specific needs.

## License

This project is for personal/business use.
#   e m b r o i d e r y t r a c k e r  
 