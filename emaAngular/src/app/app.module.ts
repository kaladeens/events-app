import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListEvComponent } from './list-ev/list-ev.component';
import { AddEvComponent } from './add-ev/add-ev.component';
import { DelEvComponent } from './del-ev/del-ev.component';
import { ListSoldEvComponent } from './list-sold-ev/list-sold-ev.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NavComponent } from './nav/nav.component';
import { ErrorComponent } from './error/error.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { TimePipe } from './pipes/time.pipe';
import { ListCatPipe } from './pipes/list-cat.pipe';
import { StatsComponent } from './stats/stats.component';
import { EventsComponent } from './events/events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { TranslatorComponent } from './translator/translator.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UppercasePipe } from './uppercase.pipe';
import { StatsCategoryComponent } from './stats-category/stats-category.component';

const routes = [
  {path: '', component: IndexComponent},
  {path: 'sam/events/list', component:ListEvComponent },
  {path: 'sam/events/add', component:AddEvComponent },
  {path: 'sam/events/delete', component:DelEvComponent }, 
  {path: 'sam/translate', component:TranslatorComponent},
  {path: 'sam/events/update',component:UpdateEventComponent},
  {path: 'sam/events/list-sold', component:ListSoldEvComponent },
  {path: 'sam/event/:eventID', component: EventsComponent},
  {path: 'invalid', component: InvalidDataComponent},
  {path: 'sam/stats', component: StatsComponent},
  {path: '28872339/categories/add', component: AddCategoryComponent},
  {path: '28872339/categories/list', component: ListCategoriesComponent},
  {path: '28872339/categories/delete', component: DeleteCategoryComponent},
  {path: '28872339/categories/display/:categoryId', component: DisplayCategoryComponent},
  {path: '28872339/categories/update', component: UpdateCategoryComponent},
  {path: '28872339/stats', component: StatsCategoryComponent},

  {path: '**', component: ErrorComponent },
];
const config = {useHash:true,enableTracing:true};


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListEvComponent,
    AddEvComponent,
    DelEvComponent,
    ListSoldEvComponent,
    NavComponent,
    ErrorComponent,
    InvalidDataComponent,
    TimePipe,
    ListCatPipe,
    StatsComponent,
    EventsComponent,
    UpdateEventComponent,
    TranslatorComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    DeleteCategoryComponent,
    DisplayCategoryComponent,
    UpdateCategoryComponent,
    UppercasePipe,
    StatsCategoryComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes,config),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    HttpClientModule,
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
