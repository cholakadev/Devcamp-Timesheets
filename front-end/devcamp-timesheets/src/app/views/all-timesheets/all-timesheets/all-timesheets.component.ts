import {Component, OnInit, TemplateRef} from '@angular/core';
import {ITimesheet} from 'src/app/interfaces/timesheet';
import {AllTimesheetsService} from 'src/app/timesheet-services/all-timesheets/all-timesheets.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-timesheets',
  templateUrl: './all-timesheets.component.html',
  styleUrls: ['./all-timesheets.component.scss']
})
export class AllTimesheetsComponent implements OnInit {

  modalRef: BsModalRef;
  timesheets: ITimesheet[];

  constructor(
    private router: Router,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    private allTimesheetsService: AllTimesheetsService,
    private modalService: BsModalService) {
    this.allTimesheetsService.loadTimesheets().subscribe(response => {
      this.timesheets = response;
    });
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.content = id;
  }

  deleteTimesheet(id: number) {
    this.reloadComponent();
    this.allTimesheetsService.deleteTimesheet(id).subscribe((response) => {
        this.allTimesheetsService.loadTimesheets().subscribe(resp => {
          this.timesheets = resp;
          this.reloadComponent();
        });
      }
    );
  }

  reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/timesheets']);
  }

  goTo(id: number) {
    this.router.navigate(['/timesheets/' + id + '/edit']);
  }
}