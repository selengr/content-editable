'use client';
import { useState } from 'react';
import type { Task, Column as ColumnType } from './_components/types';
import { KanbanBoard } from './_components/KanbanBoard';


const COLUMNS: ColumnType[] = [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'DONE', title: 'Done' },
  ];
  
  const INITIAL_TASKS: Task[] = [
    {
      id: '1',
      title: 'Research Project',
      description: 'Gather requirements and create initial documentation',
      status: 'TODO',
    },
    {
      id: '2',
      title: 'Design System',
      description: 'Create component library and design tokens',
      status: 'TODO',
    },
    {
      id: '3',
      title: 'API Integration',
      description: 'Implement REST API endpoints',
      status: 'IN_PROGRESS',
    },
    {
      id: '4',
      title: 'Testing',
      description: 'Write unit tests for core functionality',
      status: 'DONE',
    },
  ];
  
const page = () => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

    <div className="p-4">
    <div className="flex gap-8">

        {COLUMNS.map((column) => {
          return (
            <KanbanBoard
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          );
        })}

    </div>
  </div>
}

export default page;