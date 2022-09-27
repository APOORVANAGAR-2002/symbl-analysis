import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioComponent } from './components/audio/audio.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TextComponent } from './components/text/text.component';
import { VideoComponent } from './components/video/video.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'video/:filename/:id', component: VideoComponent },
  { path: 'audio/:filename/:id', component: AudioComponent },
  { path: 'text/:filename/:id', component: TextComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
