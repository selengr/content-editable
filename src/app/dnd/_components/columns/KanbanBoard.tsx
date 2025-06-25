

type Task = {
  id: string;
  title: string;
  status: 'todo' | 'pending' | 'done';
};

type InotialTask = [
  { id: '1', title: 'Design homepage', status: 'todo' },
  { id: '2', title: 'Implement API', status: 'pending' },
  { id: '3', title: 'Write documentation', status: 'done' },
  { id: '4', title: 'Fix login bug', status: 'todo' },
]

export default function KanbanBoard() {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6">Task Board</h1>
        
        <div className="flex gap-4">
          
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-4 text-red-500">To Do</h2>
            <div className="space-y-3">
              {/* Task cards would go here */}
              <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p>Task 1</p>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    );
  }