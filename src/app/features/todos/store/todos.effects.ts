import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTodo, addTodoFailure, addTodoSuccess,
  deleteTodo, deleteTodoFailure, deleteTodoSuccess,
  loadTodos, loadTodosFailure, loadTodosSuccess,
  toggleTodo, toggleTodoFailure, toggleTodoSuccess
} from './todos.actions';
import { TodosService } from '../../../core/services/todos.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private api: TodosService) { }

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.api.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((err) => of(loadTodosFailure({ error: err.message ?? 'Load failed' })))
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap(({ title }) =>
        this.api.add(title).pipe(
          map((todo) => addTodoSuccess({ todo })),
          catchError((err) => of(addTodoFailure({ error: err.message ?? 'Add failed' })))
        )
      )
    )
  );

  toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTodo),
      mergeMap(({ id }) =>
        this.api.toggle(id).pipe(
          map(({ id, changes }) => toggleTodoSuccess({ id, changes })),
          catchError((err) => of(toggleTodoFailure({ error: err.message ?? 'Toggle failed' })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(({ id }) => deleteTodoSuccess({ id })),
          catchError((err) => of(deleteTodoFailure({ error: err.message ?? 'Delete failed' })))
        )
      )
    )
  );
}
