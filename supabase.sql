-- Cole este código no Supabase: SQL Editor > New query > Run

-- 1) Tabela de perfis: guarda os dados extras de cada usuário
create table public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text,
  perfil text check (perfil in ('responsavel', 'professor')),
  criado_em timestamptz not null default now()
);

-- 2) Segurança: cada pessoa só enxerga e altera o próprio perfil
alter table public.perfis enable row level security;

create policy "Ver o próprio perfil"
  on public.perfis for select
  using (auth.uid() = id);

create policy "Atualizar o próprio perfil"
  on public.perfis for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 3) Libera a tabela para usuárias logadas pela API
--    (necessário se "Automatically expose new tables" estiver desligado)
grant select, update on public.perfis to authenticated;

-- 4) Ao criar a conta, cria o perfil automaticamente
create function public.criar_perfil()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.perfis (id, nome, perfil)
  values (
    new.id,
    new.raw_user_meta_data ->> 'nome',
    new.raw_user_meta_data ->> 'perfil'
  );
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_perfil();
