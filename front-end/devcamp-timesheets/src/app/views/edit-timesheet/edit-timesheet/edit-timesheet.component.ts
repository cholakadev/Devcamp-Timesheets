import { IProjects, IProjectSelectOption, ITaskSelectOption } from 'src/app/interfaces/project';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ITask } from '../../../interfaces/task';
import { IDay } from '../../../interfaces/day';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { AllTimesheetsService } from '../../../timesheet-services/all-timesheets/all-timesheets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITimesheet } from '../../../interfaces/timesheet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

class ISelectOption {
}

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss']
})
export class EditTimesheetComponent implements OnInit {
  projectsFormGroup: FormGroup;
  projectOptions: IProjectSelectOption[] = [];
  tasksByProjectOptions: ITaskSelectOption[] = [];

  routerParameterId: number;
  projects: IProjects[];
  selectedProject: IProjects;
  tasks: ITask[];
  days: IDay[];
  timesheet: ITimesheet;
  daysArr: Date[] = [];
  modalRef: BsModalRef;
  timesheets: ITimesheet[];

  constructor(
    private allTimesheetsService: AllTimesheetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    private modalService: BsModalService
  ) {
    this.routerParameterId = activatedRoute.snapshot.params.id;
    this.allTimesheetsService.getTimesheetById(this.routerParameterId)
      .subscribe(
        resp => {
          this.timesheet = resp;
          const firstDay = {
            day_date: resp.start_date,
            worked_hours: 0,
            tasks: null,
            timesheet_id: this.timesheet.id
          };

          const startDay = new Date(this.timesheet.start_date);
          this.daysArr.push(new Date(startDay));

          for (let i = 0; i < 6; i++) {
            startDay.setDate(startDay.getDate() + 1);
            this.daysArr.push(new Date(startDay));
          }
        }
      )
      ;

    // string for initial value
    this.projectsFormGroup = new FormGroup(
      {
        // enter input fields
        project: new FormControl('Select project'),
        task: new FormControl('Select task'),
        days: new FormControl('')
      }
    );

    // Get all actual genres with API GET request
    allTimesheetsService.getProjects()
      .subscribe(response => {
        if (response) {
          response.map(
            project => {
              const selectOption = {
                id: project.id,
                name: project.name,
                selected: false,
                tasks: []
              };

              const tasks = [];
              project.tasks.map(task => {
                const selectOpt = {
                  id: task.id,
                  name: task.name,
                  selected: false,
                };
                tasks.push(selectOpt);
              });

              selectOption.tasks = tasks;
              this.projectOptions.push(selectOption);
            }
          );
        }
      }
      );
  }

  get totalHours() {
    let sum = 0;
    for (let day of this.timesheet.days) {
      sum += Number(day.worked_hours);
    }
    return sum;
  }

  ngOnInit(): void {
    this.projectsFormGroup
      .get('project')
      .valueChanges
      .subscribe((option: IProjectSelectOption) => {
        this.tasksByProjectOptions = this.projectOptions[Number(option) - 1].tasks;
      });

    this.projectsFormGroup
      .get('task')
      .valueChanges
      .subscribe((option: ITaskSelectOption) => {
        console.log(option);
      });
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

  saveTimesheet() {
  }

  submitTimesheet() {
    const id = this.routerParameterId;
    this.allTimesheetsService.submitTimesheet(id).subscribe((response) => {
      this.reloadComponent();
    }
    );
  }

  // reloadComponent() {
  //   this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this._router.onSameUrlNavigation = 'reload';
  //   this._router.navigate(['/timesheets/' + this.timesheet.id + '/edit']);
  // }
}