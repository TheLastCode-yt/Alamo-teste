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
import { Plus, Trash2 } from 'lucide-react';

export function NewRoutineModal() {
  const { modals, closeModal } = useModal();
  const { addRoutine } = useRoutine();
  const [formData, setFormData] = useState({
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

    // Add routine using context
    addRoutine(formData);

    // Reset form
    setFormData({
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
      title: '',
      solutions: [{ name: '', quantity: '' }],
      observations: '',
    });
  };

  return (
    <Dialog open={modals.newRoutine} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Routine</DialogTitle>
          <DialogDescription>
            Add a new routine to your collection. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Routine Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter routine title"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Solutions</Label>
              <Button
                type="button"
                onClick={addSolution}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Solution
              </Button>
            </div>

            {formData.solutions.map((solution, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    placeholder="Solution name"
                    value={solution.name}
                    onChange={e =>
                      handleSolutionChange(index, 'name', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Quantity (e.g., CHO:26G)"
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
            <Label htmlFor="observations">Observations</Label>
            <Textarea
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              placeholder="Add any observations or notes..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create Routine</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
