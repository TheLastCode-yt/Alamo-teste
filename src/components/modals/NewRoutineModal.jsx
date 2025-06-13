'use client';

import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useRoutine } from '@/context/RoutineContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Clock } from 'lucide-react';

export function NewRoutineModal() {
  const { modals, closeModal } = useModal();
  const { addRoutine } = useRoutine();
  const [formData, setFormData] = useState({
    time: '',
    title: '',
    solutions: [{ name: '', quantity: '' }],
    observations: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSolutionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.map((solution, i) =>
        i === index ? { ...solution, [field]: value } : solution
      ),
    }));
  };

  const addSolution = () => {
    setFormData(prev => ({
      ...prev,
      solutions: [...prev.solutions, { name: '', quantity: '' }],
    }));
  };

  const removeSolution = index => {
    if (formData.solutions.length > 1) {
      setFormData(prev => ({
        ...prev,
        solutions: prev.solutions.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Add routine with current timestamp and user-defined time
    const routineData = {
      ...formData,
      createdAt: new Date().toISOString(), // Para ordenação
    };

    addRoutine(routineData);

    // Reset form
    setFormData({
      time: '',
      title: '',
      solutions: [{ name: '', quantity: '' }],
      observations: '',
    });

    // Close modal
    closeModal('newRoutine');
  };

  const handleClose = () => {
    closeModal('newRoutine');
    // Reset form when closing
    setFormData({
      time: '',
      title: '',
      solutions: [{ name: '', quantity: '' }],
      observations: '',
    });
  };

  return (
    <Dialog open={modals.newRoutine} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Rotina</DialogTitle>
          <DialogDescription>
            Adicionar uma nova rotina para sua coleção. Preencha os detalhes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Horário
            </Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título da Rotina</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Título da Rotina"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Soluções</Label>
              <Button type="button" onClick={addSolution} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Solução
              </Button>
            </div>

            {formData.solutions.map((solution, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    placeholder="Solução Nome"
                    value={solution.name}
                    onChange={e =>
                      handleSolutionChange(index, 'name', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Quantidade (e.g., CHO:26G)"
                    value={solution.quantity}
                    onChange={e =>
                      handleSolutionChange(index, 'quantity', e.target.value)
                    }
                    required
                  />
                </div>
                {formData.solutions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeSolution(index)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              placeholder="Adicionar observações..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Criar Routina</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
