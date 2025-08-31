import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { loadTodos, toggleTodo, deleteTodo } from '../store/todos.actions';
import { selectTodosLoading, selectCounts, selectActiveTodos, selectCompletedTodos } from '../store/todos.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [
    AsyncPipe, DatePipe, NgIf, NgFor,
    MatListModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatDividerModule, MatTooltipModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  private store = inject(Store);

  loading$ = this.store.select(selectTodosLoading);
  counts$ = this.store.select(selectCounts);
  active$ = this.store.select(selectActiveTodos);
  completed$ = this.store.select(selectCompletedTodos);

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggle(id: string) {
    this.store.dispatch(toggleTodo({ id }));
  }
  remove(id: string) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
