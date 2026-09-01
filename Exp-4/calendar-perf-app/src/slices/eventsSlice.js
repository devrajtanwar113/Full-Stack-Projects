import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const generateMockEvents = () => {
  const events = [];
  const today = new Date();
  const titles = ['Meeting', 'Post Draft', 'Review', 'Publish', 'Design', 'Code Review', 'Testing'];
  const categories = ['Work', 'Personal', 'Social', 'Marketing'];

  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + Math.floor(Math.random() * 10) - 5);
    
    events.push({
      id: i + 1,
      title: titles[Math.floor(Math.random() * titles.length)] + ` ${i + 1}`,
      date: date.toISOString().split('T')[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `Event description for item ${i + 1}`,
      status: ['draft', 'scheduled', 'published'][Math.floor(Math.random() * 3)]
    });
  }
  return events;
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockEvents();
  }
);

const initialState = {
  events: [],
  loading: false,
  error: null
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // ✅ NEW: Add event
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    moveEvent: (state, action) => {
      const { id, newDate } = action.payload;
      const event = state.events.find(e => e.id === id);
      if (event) {
        event.date = newDate;
        event.status = 'scheduled';
        console.log(`✅ Event ${id} moved to ${newDate}`);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addEvent, updateEvent, deleteEvent, moveEvent } = eventsSlice.actions;
export default eventsSlice.reducer;