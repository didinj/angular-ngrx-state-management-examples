import { Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { addTodo } from "../store/todos.actions";
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-input',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss'
})
export class TodoInputComponent {
  private store = inject(Store);
  titleCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  submitting = signal(false);

  submit() {
    const title = this.titleCtrl.value.trim();
    if (!title) return;
    this.submitting.set(true);
    this.store.dispatch(addTodo({ title }));
    this.titleCtrl.reset('');
    this.submitting.set(false);
  }
}
