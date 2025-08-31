import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODOS_FEATURE_KEY, TodosState, selectAll, selectEntities } from './todos.reducer';

export const selectTodosState = createFeatureSelector<TodosState>(TODOS_FEATURE_KEY);

export const selectTodosAll = createSelector(selectTodosState, (state) => selectAll(state));
export const selectTodosEntities = createSelector(selectTodosState, (state) => selectEntities(state));
export const selectTodosLoading = createSelector(selectTodosState, (state) => state.loading);
export const selectTodosError = createSelector(selectTodosState, (state) => state.error);

export const selectCompletedTodos = createSelector(
  selectTodosAll,
  (todos) => todos.filter((t) => t.done)
);

export const selectActiveTodos = createSelector(
  selectTodosAll,
  (todos) => todos.filter((t) => !t.done)
);

export const selectCounts = createSelector(
  selectTodosAll,
  (todos) => {
    const completed = todos.filter((t) => t.done).length;
    return { total: todos.length, completed, active: todos.length - completed };
  }
);
