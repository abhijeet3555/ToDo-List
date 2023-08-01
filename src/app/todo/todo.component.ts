import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{

  todoForm !: FormGroup;
  Tasks : ITask[] = [];
  Inprogress : ITask[] = [];
  Done : ITask[] = [];
  updateIndex:any;
  isEditEnabled: boolean=false;
  constructor(private fb : FormBuilder) { }

ngOnInit(): void {
  this.todoForm = this.fb.group({
    item : ['', Validators.required]
  })
    
}
addTask(){
  this.Tasks.push({
    description:this.todoForm.value.item,
    done:false
  });
  this.todoForm.reset();

}
onEdit(item: ITask, i:number){
this.todoForm.controls['item'].setValue(item.description);
this.updateIndex=i;
this.isEditEnabled=true;
}

updateTask(){
  this.Tasks[this.updateIndex].description=this.todoForm.value.item;
  this.Tasks[this.updateIndex].done=false;
  this.todoForm.reset();
  this.updateIndex=undefined;
  this.isEditEnabled=false;
  
}

deleteTask(i: number){
  this.Tasks.splice(i,1)

}
deleteInProgressTask(i: number){
  this.Inprogress.splice(i,1)

}

deleteIDoneTask(i: number){
  this.Inprogress.splice(i,1)

}

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
