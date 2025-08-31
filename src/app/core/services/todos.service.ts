import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, map } from 'rxjs';
import { Todo } from '../../features/todos/models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  // Simulated backend state (in-memory)
  private data: Record<string, Todo> = {};

  getTodos(): Observable<Todo[]> {
    // seed a few if empty
    if (Object.keys(this.data).length === 0) {
      const seed: Todo[] = [
        this.make('Write NgRx tutorial'),
        this.make('Refactor components to standalone'),
        this.make('Ship demo with Material'),
      ];
      seed.forEach((t) => (this.data[t.id] = t));
    }
    return of(Object.values(this.data)).pipe(delay(400));
  }

  add(title: string): Observable<Todo> {
    if (!title.trim()) return throwError(() => new Error('Title is required'));
    const todo = this.make(title);
    this.data[todo.id] = todo;
    return of(todo).pipe(delay(250));
  }

  toggle(id: string): Observable<{ id: string; changes: Partial<Todo> }> {
    const todo = this.data[id];
    if (!todo) return throwError(() => new Error('Todo not found'));
    const changes = { done: !todo.done };
    this.data[id] = { ...todo, ...changes };
    return of({ id, changes }).pipe(delay(200));
  }

  delete(id: string): Observable<{ id: string }> {
    if (!this.data[id]) return throwError(() => new Error('Todo not found'));
    delete this.data[id];
    return of({ id }).pipe(delay(200));
  }

  // helpers
  private make(title: string): Todo {
    return {
      id: cryptoRandomId(),
      title: title.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
  }
}

// Simple unique id generator (no external deps)
function cryptoRandomId(): string {
  // Prefer crypto if available (browser env)
  if ('crypto' in globalThis && 'getRandomValues' in crypto) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
