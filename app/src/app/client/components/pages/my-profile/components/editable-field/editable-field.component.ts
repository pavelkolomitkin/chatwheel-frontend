import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.css']
})
export class EditableFieldComponent implements OnInit {

  isEditing: boolean = false;

  @Input('saving')
  isSaving: boolean = false;

  // set saving(value: boolean)
  // {
  //   this.isSaving = value;
  // }

  @ViewChild('formArea') formArea: ElementRef;

  @Output('onInit') editInitEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output('onCommit') editCommitEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output('onCancel') editCancelEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('document:keydown.escape', ['$event'])
  onDocumentKeydownEscapeHandler(event)
  {
    this.editCancelEmitter.emit();
    this.isEditing = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClickHandler(event)
  {
    if (
      this.formArea.nativeElement.contains(event.target) ||
      !this.isEditing
    )
    {
      return;
    }


    //debugger
    //console.log('CLICK ON THE DOCUMENT!');
    //debugger

    this.isEditing = false;
    this.editCommitEmitter.emit();
  }

  onEditClickHandler(event)
  {
    //console.log('CLICK ON THE BUTTON!');
    event.stopPropagation();

    this.isEditing = true;
    this.editInitEmitter.emit();
  }
}
