import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import { ModeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { signIn } from '@/lib/auth';
import Link from 'next/link';
import { Tooltip } from '@/components/ui/tooltip';

type Providers = 'github' | 'google' | 'linkedin';

export default function LoginPage() {
  const handleLogin = async (form: FormData) => {
    'use server';

    const provider = form.get('provider') as Providers;

    await signIn(provider, { redirectTo: '/dashboard/resumes' });
  };

  console.log('env', process.env.DATABASE_URL!);

  return (
    <div className="grid grid-cols-[1.1fr,1fr] h-screen overflow-hidden">
      <aside>
        <Image
          width={1000}
          height={800}
          src={'/images/auth-bg.png'}
          alt="Uma mulher segurando em suas mãos e  olhando para o celular sorridente, o celular ilumina o seu rosto"
          className="w-full h-full object-cover"
          quality={100}
        />
      </aside>
      <form
        className="p-10 mx-auto w-full max-w-[700px] flex justify-center flex-col"
        action={handleLogin}
      >
        <div className="flex items-center justify-between mb-10">
          <Link href={'/'} className="w-[30px]">
            <Tooltip content="Voltar ao inicio">
              <Logo className={'max-w-[30px]'} />
            </Tooltip>
          </Link>
          <ModeToggle />
        </div>
        <h1 className="text-2xl font-title font-bold">Entrar na sua conta</h1>
        <p className="text-sm text-muted-foreground">
          Caso <b>não tenha conta</b>, ela sera criada automaticamente.
        </p>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            variant={'outline'}
            className="w-full gap-2"
            type="submit"
            name="provider"
            value={'github'}
          >
            <FaGithub size={20} />
            Entrar com Github
          </Button>
          <Button
            className="w-full gap-2"
            type="submit"
            name="provider"
            value={'linkedin'}
            variant={'outline'}
          >
            <FaLinkedin size={20} />
            Entrar com Linkedin
          </Button>
          <Button
            className="w-full gap-2"
            type="submit"
            name="provider"
            value={'google'}
          >
            <FcGoogle size={20} />
            Entrar com Google
          </Button>
        </div>
      </form>
    </div>
  );
}
