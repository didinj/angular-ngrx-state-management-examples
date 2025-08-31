import { createReducer, on } from '@ngrx/store';
import {
  addTodoSuccess,
  deleteTodoSuccess,
  loadTodos,
  loadTodosFailure,
  loadTodosSuccess,
  toggleTodoSuccess,
} from './todos.actions';
import { Todo } from '../models/todo.model';
import {
  createEntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';

export const TODOS_FEATURE_KEY = 'todos';

export interface TodosState extends EntityState<Todo> {
  loading: boolean;
  error: string | null;
}

export const adapter = createEntityAdapter<Todo>({
  selectId: (t) => t.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt), // newest first
});

export const initialState: TodosState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const todosReducer = createReducer(
  initialState,

  // Load
  on(loadTodos, (state) => ({ ...state, loading: true, error: null })),
  on(loadTodosSuccess, (state, { todos }) =>
    adapter.setAll(todos, { ...state, loading: false })
  ),
  on(loadTodosFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Add
  on(addTodoSuccess, (state, { todo }) => adapter.addOne(todo, state)),

  // Toggle
  on(toggleTodoSuccess, (state, { id, changes }) =>
    adapter.updateOne({ id, changes } as Update<Todo>, state)
  ),

  // Delete
  on(deleteTodoSuccess, (state, { id }) => adapter.removeOne(id, state))
);

// Expose adapter selectors (we’ll wire these in selectors file)
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
