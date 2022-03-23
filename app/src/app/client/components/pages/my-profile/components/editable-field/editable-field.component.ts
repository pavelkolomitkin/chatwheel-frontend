import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.css']
})
export class EditableFieldComponent implements OnInit {

  @Input()
  isEditing: boolean = false;

  @Input('saving')
  isSaving: boolean = false;

  @Input()
  isEditingCustom: boolean = false;

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
    if (this.isEditingCustom)
    {
      return;
    }

    this.editCancelEmitter.emit();
    this.isEditing = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClickHandler(event)
  {
    if (this.isEditingCustom)
    {
      return;
    }

    if (
      this.formArea.nativeElement.contains(event.target)
    )
    {
      return;
    }


    if (this.isEditing)
    {
      this.isEditing = false;
      this.editCommitEmitter.emit();
    }
  }

  onEditClickHandler(event)
  {
    event.stopPropagation();

    this.isEditing = true;
    this.editInitEmitter.emit();
  }
}
