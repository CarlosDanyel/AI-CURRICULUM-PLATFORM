'use client';

import { Button } from '@/components/ui/button';
import { BaseDiaploProps, Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { duplicateResume } from '@/db/actions';
import { useMutation } from '@tanstack/react-query';

import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type FormData = {
  title: string;
};

export const DuplicateResumeDialog = (props: BaseDiaploProps) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const methods = useForm<FormData>();

  const resumeId = params.id as string;

  const { mutate: handleDuplicateResume, isLoading } = useMutation({
    mutationFn: (title: string) => duplicateResume(resumeId, title),
    onSuccess: newResume => {
      toast.success('Currílo duplicado com sucesso!');
      setOpen(false);
      router.push(`/dashboard/resumes/${newResume.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    handleDuplicateResume(data.title);
  };

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Duplicar Currículo"
      description="Sera criado um novo currículo com o mesmo conteúdo atual. Insira um novo valor!"
      content={
        <form
          className="flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            control={methods.control}
            name="title"
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <Input placeholder=" Novo título" {...field} />
            )}
          />

          <div className="flex mt-4 ml-auto gap-2">
            <Button variant={'secondary'} onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button disabled={isLoading} type="submit">
              Duplicar
            </Button>
          </div>
        </form>
      }
    />
  );
};
