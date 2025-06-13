import * as React from 'react';
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground dark:bg-input/30',
        'flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none',
        'md:text-sm disabled:cursor-not-allowed disabled:opacity-50',

        'focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]',

        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
