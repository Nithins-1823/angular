import { Routes } from '@angular/router';
import { UserResolver } from './service/user.resolver';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectTosignIn = () => redirectUnauthorizedTo('/auth/sign-in');

export const routes: Routes = [
    {path : '', component:WelcomePageComponent},
    
    {
        path: 'auth',
        loadChildren: () =>
          import('./components/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
        data: {
          AuthGuardPipe: redirectTosignIn,
        },
        resolve:{
          user:UserResolver
        }
      },
];
