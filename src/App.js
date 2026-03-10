import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import Home from './pages/Home';
import AddNoteModal from './components/AddNoteModal'; 
import { NoteProvider } from './context/NoteContext';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <NoteProvider>
      <div className="h-screen bg-sky-50 text-slate-900 font-sans flex flex-col overflow-hidden">
        {/* We'll update Navbar next to include the login button */}
        <Navbar onOpenModal={() => setIsModalOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Home />
          </main>
        </div>

        <AddNoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </NoteProvider>
  );
}

export default App;