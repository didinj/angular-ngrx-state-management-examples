import { Component, signal } from '@angular/core';
import { TodoInputComponent } from './features/todos/components/todo-input.component';
import { TodoListComponent } from './features/todos/components/todo-list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [TodoInputComponent, TodoListComponent, MatToolbarModule, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngrx-demo');
}
