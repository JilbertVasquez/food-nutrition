import { Component } from '@angular/core';
import { UsersHealthComponent } from './users-health/users-health.component';

@Component({
    selector: 'app-user',
    imports: [UsersHealthComponent],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent {}
