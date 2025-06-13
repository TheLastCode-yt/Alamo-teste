'use client';

import { useState } from 'react';
import {
  Search,
  Settings,
  Filter,
  CheckSquare,
  Plus,
  Inbox,
  CircleAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/context/ModalContext';
import { useRoutine } from '@/context/RoutineContext';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { routines } = useRoutine();
  const { openModal } = useModal();

  const filteredRoutines = routines.filter(
    routine =>
      routine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.solutions.some(solution =>
        solution.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleSearch = () => {
    // Additional search logic can be implemented here
    console.log('Searching for:', searchTerm);
  };

  const handleAdvancedFilter = () => {
    // Advanced filter logic
    console.log('Opening advanced filters');
  };

  return (
    <section className="flex-1 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Cadastros</h1>

          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-primary">Alamo</span>

            <Button variant="default" size="sm">
              <CheckSquare className="h-4 w-4 mr-2" />
              Tarefas
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Inbox className="h-6 w-6 text-primary" />
              </Button>
              <Button variant="ghost" size="sm">
                <CircleAlert className="h-6 w-6 text-primary" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-6 w-6 text-primary" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Gestão de rotinas de laboratório
          </h2>

          <Button onClick={() => openModal('newRoutine')}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Rotina
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search routines..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button onClick={handleSearch} variant="default">
            Search
          </Button>

          <Button onClick={handleAdvancedFilter} variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filtering
          </Button>
        </div>

        <div className="space-y-4">
          {filteredRoutines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No routines found</p>
              <Button
                onClick={() => openModal('newRoutine')}
                className="mt-4"
                variant="outline"
              >
                Create your first routine
              </Button>
            </div>
          ) : (
            filteredRoutines.map((routine, index) => (
              <div
                key={routine.id}
                className={`p-6 rounded-lg border ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                {/* Routine Title */}
                <h3 className="text-xl font-semibold mb-4">{routine.title}</h3>

                {/* Solutions */}
                <div className="space-y-2 mb-4">
                  {routine.solutions.map((solution, solutionIndex) => (
                    <div
                      key={solutionIndex}
                      className="flex items-center gap-4"
                    >
                      <span className="text-sm text-muted-foreground">
                        Solution:
                      </span>
                      <span className="font-medium">{solution.name}</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {solution.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {routine.observations && (
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm">
                      <span className="font-medium">Observations:</span>{' '}
                      {routine.observations}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {filteredRoutines.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Showing {filteredRoutines.length} of {routines.length} routines
          </div>
        )}
      </div>
    </section>
  );
}
