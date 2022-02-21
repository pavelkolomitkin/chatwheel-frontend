import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-alert-window',
  templateUrl: './alert-window.component.html',
  styleUrls: ['./alert-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertWindowComponent implements OnInit, OnDestroy {

  @ViewChild('confirmationWindow') template: TemplateRef<any>;

  @Output() isShownChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() title: string;

  _isShown: boolean = false;

  window: NgbModalRef = null;

  @Input() set isShown(value: boolean)
  {
    if (this._isShown === value)
    {
      return;
    }

    this._isShown = value;

    if (this._isShown)
    {
      this.openWindow();
    }
    else
    {
      this.closeWindow();
    }

    this.changeDetector.detectChanges();
  }

  constructor(
    private modal: NgbModal,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.closeWindow();
  }

  openWindow()
  {
    this.closeWindow();
    this.window = this.modal.open(this.template, { centered: true });
    this.window.result.then(() => {
      this._isShown = false
      this.isShownChange.emit(this._isShown);
    }).catch(() => {
      this._isShown = false
      this.isShownChange.emit(this._isShown);
    });
  }

  closeWindow()
  {
    if (!!this.window)
    {
      this.window.close();
      this.window = null;
    }
    this._isShown = false
    this.isShownChange.emit(this._isShown);
  }

}
