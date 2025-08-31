import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

// Load
export const loadTodos = createAction('[Todos] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: string }>()
);

// Add
export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ title: string }>()
);
export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction(
  '[Todos] Add Todo Failure',
  props<{ error: string }>()
);

// Toggle
export const toggleTodo = createAction(
  '[Todos] Toggle Todo',
  props<{ id: string }>()
);
export const toggleTodoSuccess = createAction(
  '[Todos] Toggle Todo Success',
  props<{ id: string; changes: Partial<Todo> }>()
);
export const toggleTodoFailure = createAction(
  '[Todos] Toggle Todo Failure',
  props<{ error: string }>()
);

// Delete
export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>()
);
export const deleteTodoSuccess = createAction(
  '[Todos] Delete Todo Success',
  props<{ id: string }>()
);
export const deleteTodoFailure = createAction(
  '[Todos] Delete Todo Failure',
  props<{ error: string }>()
);
