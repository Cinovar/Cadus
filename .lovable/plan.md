

## Problema

No mobile (390px), os formularios de cadastro tem espacamento excessivo entre os elementos — icon hero, titulo, divider, campos, botao — criando muito "ar" e fazendo o formulario parecer vazio e desproporcional.

## Plano

### 1. Compactar classes globais no mobile (`src/index.css`)

- `.card-cadus`: reduzir padding mobile de `p-5` para `p-4`
- `.icon-hero`: reduzir de `w-12 h-12 mb-4` para `w-10 h-10 mb-3`
- `.step-header`: reduzir `mb-4` para `mb-3`
- `.step-header h2`: manter `text-xl`
- `.step-header p`: manter `text-[13px]`, reduzir `mt-1.5` para `mt-1`
- `.step-divider`: reduzir `mb-4` para `mb-3`
- `.btn-primary`: reduzir `py-3.5` para `py-3`, `min-height` de `50px` para `46px`
- `.btn-back`: reduzir `mt-3` para `mt-2`, `py-2.5` para `py-2`, `min-height` de `44px` para `40px`
- `.step-badge`: reduzir `mt-2.5` para `mt-2`

### 2. Reduzir margin do botao Continuar em todos os steps

Em todos os componentes de step, o botao Continuar usa `mt-6 md:mt-8`. Mudar para `mt-4 md:mt-8` nos seguintes arquivos:
- `StepPatientName.tsx`
- `StepPatientCPF.tsx`
- `StepPatientBirthdate.tsx`
- `StepPatientGender.tsx`
- `StepPatientContact.tsx`
- `StepPatientAddress.tsx`
- `StepPatientSus.tsx`
- `StepPatientComplaint.tsx`
- `StepPatientAccess.tsx`

### 3. Ajustar container do Registration (`src/pages/Registration.tsx`)

- Reduzir padding do content area de `py-4 px-3` para `py-3 px-3`

### Resultado esperado

Todos os elementos ficam mais proximos e proporcionais no mobile, sem espaco desperdicado, mantendo o desktop inalterado.

### Arquivos editados
- `src/index.css`
- `src/pages/Registration.tsx`
- 9 componentes de step (botao mt-6 → mt-4)

