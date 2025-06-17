// Proporcionar global para entornos de navegador
(window as any).global = window;

// Polyfill para process
(window as any).process = {
  env: { DEBUG: undefined },
  version: '',
  nextTick: (cb: Function) => setTimeout(cb, 0)
};

// Polyfill para Buffer
import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;

// Polyfill adicional para evitar errores con btoa/atob en algunos navegadores
if (!window.atob) {
  console.warn('Polyfill para atob/btoa añadido');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
  window.atob = function(input: string) {
    const str = input.replace(/=+$/, '');
    let output = '';
    
    for (let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    
    return output;
  };
  
  window.btoa = function(input: string) {
    let output = '';
    for (let block = 0, charCode, i = 0, map = chars;
      input.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)
    ) {
      charCode = input.charCodeAt(i += 3/4);
      block = block << 8 | charCode;
    }
    return output;
  };
}

// Fix para URL polyfill usado por amazon-cognito-identity-js
if (typeof (URL as any).createObjectURL === 'undefined') {
  (URL as any).createObjectURL = () => {
    console.warn('URL.createObjectURL polyfill invoked');
    return '';
  };
}
