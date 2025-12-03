declare module 'react-hook-form' {
  export function useForm(...args: any[]): any;
  export function Controller(...args: any[]): any;
  export type Control<T = any> = any;
  export const Controller: any;
}

declare module '@hookform/resolvers/zod' {
  export const zodResolver: any;
}
