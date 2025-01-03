// globals.d.ts
declare global {
    interface Window {
      $: typeof import('jquery');
      jQuery: typeof import('jquery');
    }
  }
  
  // Cette ligne est nécessaire pour que ce fichier soit traité comme un module.
  export {};
  