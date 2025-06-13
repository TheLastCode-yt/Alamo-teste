'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Filter, Plus, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useModal } from '@/context/ModalContext';
import { useRoutine } from '@/context/RoutineContext';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, title-asc, title-desc
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { routines } = useRoutine();
  const { openModal } = useModal();

  // Função para filtrar rotinas
  const filteredRoutines = routines.filter(
    routine =>
      routine.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.solutions.some(solution =>
        solution.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Função para ordenar rotinas
  const sortedRoutines = [...filteredRoutines].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'oldest':
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'time-asc':
        return (a.time || '').localeCompare(b.time || '');
      case 'time-desc':
        return (b.time || '').localeCompare(a.time || '');
      default:
        return 0;
    }
  });

  const handleSearch = () => {
    // Additional search logic can be implemented here
    console.log('Searching for:', searchTerm);
  };

  const handleAdvancedFilter = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <section className="flex-1 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Cadastros</h1>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-lg font-semibold text-primary w-full sm:w-fit">
              Alamo
            </span>

            <Button variant="default" size="sm">
              <Image
                width={17}
                height={15}
                alt="check square icon"
                src="/icons/check-square.svg"
                className="mr-2"
              />{' '}
              Tarefas
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Image
                  width={17}
                  height={15}
                  alt="inbox icon"
                  src="/icons/inbox.svg"
                />
              </Button>
              <Button variant="outline" size="sm">
                <Image
                  width={15}
                  height={15}
                  alt="circle alert icon"
                  src="/icons/circle-alert.svg"
                />
              </Button>
              <Button variant="outline" size="sm">
                <Image
                  width={16}
                  height={18}
                  alt="settings icon"
                  src="/icons/settings.svg"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Gestão de rotinas de laboratório
          </h2>

          <Button onClick={() => openModal('newRoutine')}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Rotina
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar rotinas..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleSearch} variant="default">
              Buscar
            </Button>

            <Button
              onClick={handleAdvancedFilter}
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtragem Avançada
            </Button>
          </div>
        </div>

        {/* Advanced Filters Dropdown */}
        {showAdvancedFilters && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais Recente</SelectItem>
                  <SelectItem value="oldest">Menos Recente</SelectItem>
                  <SelectItem value="title-asc">Título A-Z</SelectItem>
                  <SelectItem value="title-desc">Título Z-A</SelectItem>
                  <SelectItem value="time-asc">Horário ↑</SelectItem>
                  <SelectItem value="time-desc">Horário ↓</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div>
          {sortedRoutines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {searchTerm ? 'Nenhuma rotina encontrada' : 'No routines found'}
              </p>
              <Button
                onClick={() => openModal('newRoutine')}
                className="mt-4"
                variant="outline"
              >
                {searchTerm ? 'Limpar busca' : 'Create your first routine'}
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[500px] w-full rounded-md border">
              <div className="space-y-4 pr-4">
                {sortedRoutines.map((routine, index) => (
                  <div
                    key={routine.id}
                    className={`p-6 rounded-lg transition-colors hover:shadow-md text-[#414552]
                   ${index % 2 === 0 ? 'bg-white' : 'bg-[#F5F6F8]'}`}
                  >
                    {/* Routine Header with Time and Title */}
                    <div className="flex items-center gap-4 mb-[6px]">
                      {routine.time && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium">
                            {routine.time} -
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold flex-1">
                        {routine.title}
                      </h3>
                      {routine.createdAt && (
                        <span className="text-xs">
                          {new Date(routine.createdAt).toLocaleDateString(
                            'pt-BR'
                          )}
                        </span>
                      )}
                    </div>

                    {/* Solutions */}
                    <div className="space-y-2 mb-[12px] px-3">
                      {routine.solutions.map((solution, solutionIndex) => (
                        <div
                          key={solutionIndex}
                          className="flex items-center gap-4 justify-between"
                        >
                          <span className="font-medium">{solution.name}</span>
                          <span className="text-sm">{solution.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {routine.observations && (
                      <div className="px-3">
                        <p className="text-sm text-[#898383]">
                          <span className="font-medium">Observação:</span>{' '}
                          {routine.observations}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}
        </div>

        {sortedRoutines.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Mostrando {sortedRoutines.length} de {routines.length} rotinas
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        )}
      </div>
    </section>
  );
}
