import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(public id: number, public description: string, public done: boolean, public targetDate: Date){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
 
  todos: Todo[]
  message : string

  constructor(private todoService:TodoDataService, private router : Router) { }

  ngOnInit() {
    this.retrieveTodos();
  }

  retrieveTodos() {
    this.todoService.retrieveAllTodos('loc').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo('loc', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} successful`;
        this.retrieveTodos(); 
      }
    );
  }

  updateTodo(id) {
    console.log(`update todo ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }  
}
