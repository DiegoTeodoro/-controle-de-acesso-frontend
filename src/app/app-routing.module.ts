import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroVisitanteComponent } from '../app/cadastro/cadastro-visitante/cadastro-visitante.component'

const routes: Routes = [
  { path: 'cadastro', component: CadastroVisitanteComponent },
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
