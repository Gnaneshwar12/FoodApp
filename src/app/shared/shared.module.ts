import {NgModule, ModuleWithProviders} from '@angular/core';
//basic directive
import {CommonModule} from '@angular/common';
//used by components input, radio and rating
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputComponent} from './input/input.component';
import {RadioComponent} from './radio/radio.component';
import {RatingComponent} from './rating/rating.component';

import { RestaurantService } from '../restaurant/restaurant.service';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from '../order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import {NotificationService} from './messages/notification.service';
import { LoginService } from '../security/login/login.service';
import { LeaveOrderGuard} from '../order/leave-order.guard';
//to work with interceptors need this dependence
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../security/auth.interceptor';

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
              CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [OrderService, 
                      ShoppingCartService, 
                      RestaurantService, 
                      NotificationService,
                      LoginService,
                      LeaveOrderGuard, //criar classe, declarar como provider e associar na rota
                      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
                        //multi=true => to receive multi values
                    ]
                    
      }
  }

}