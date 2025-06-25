'use client';

import { useState } from 'react';


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
  
const page = () => {
    return (
        <div>
            Enter
        </div>
    );
}

export default page;