import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const corsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Solo aplicar a solicitudes al backend
  if (req.url.includes('certichainbff.ddns.net')) {
    const corsReq = req.clone({
      withCredentials: true
    });
    return next(corsReq);
  }
  
  return next(req);
};
