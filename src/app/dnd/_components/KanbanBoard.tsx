
import { TaskCard } from './TaskCard';
import {useDroppable} from '@dnd-kit/core';

import { Column as ColumnType, Task } from './types';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function KanbanBoard({ column, tasks }: ColumnProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4 h-screen">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4 ">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}