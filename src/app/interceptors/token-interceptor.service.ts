import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUT…97WlWTcwPKms5eA_rRvsQmVKn1YpmzVu-HA1ln7T-9xQLfhkg';
    const { accessToken } = { accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjYyOTc4NzUxODE0Njk2OTYiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiZnY3V2dWSzZXb0pPQk9sMTlZc2prQ3AzQTViSmU2ZldAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjYyNDc4MjE2LCJleHAiOjE2NjI1NjQ2MTYsImF6cCI6ImZ2N1dnVks2V29KT0JPbDE5WXNqa0NwM0E1YkplNmZXIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.oQ_fGiBZlQuknlprcUu1ojZl_B4WhLFXxGFMz_dl6jshlll_4-HvLs1gZ1dWdqUuTMIWX0AScaSB-WTopuFvonKy6TyAqTvWf1AuFBA38aV7gzy2qdy7dnaPlxXIrF7JBAgn_QvptN-Ya6hIXDjzJVCjMeHSchD-qH8F25R6xCjHDF-WxTuKwrra0hGR1lSy7I3gXQQAQJqH5yR_uWZN5pOal8zBX1N-Igf4d_BM6te7hO6lJYCM59DeKgBnDAi3YzWFftrGOUVMo6NS4D0RIXsfQadywhQUKZg1j7lEyz33bznMlEEsO5HTD4AvGJRqaJQT7X7HofFzCqhxbrOBdA", };
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer 84305843058985495803495jfkdhgjhf`,
        },
      });
    }

    return next.handle(req);
  }

}
