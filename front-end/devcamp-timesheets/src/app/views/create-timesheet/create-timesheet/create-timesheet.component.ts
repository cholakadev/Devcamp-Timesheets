import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AllTimesheetsService} from '../../../timesheet-services/all-timesheets/all-timesheets.service';
import {ITimesheet} from '../../../interfaces/timesheet';
import {IWeek, IWeekSelectOption} from '../../../interfaces/week';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss']
})
export class CreateTimesheetComponent implements OnInit {
  weekOptions: IWeekSelectOption[] = [];
  timesheet: ITimesheet;
  createTimesheetFormGroup: FormGroup;
  selectedWeek: IWeek;
  selectedCurrentWeek: string;

  constructor(
    private router: Router,
    private allTimesheetsService: AllTimesheetsService
  ) {
    this.createTimesheetFormGroup = new FormGroup(
      {
        weeks: new FormControl(),
      }
    );
  }

  ngOnInit(): void {
    this.allTimesheetsService.getWeeks()
      .subscribe(response => {
        response.map(w => {
          const weekOption = {
            week_start: w.week_start,
            current_week: w.selected ? 'current week' : ''
          };

          this.weekOptions.push(weekOption);
        });

        this.selectedCurrentWeek = this.weekOptions[3].week_start;

      });

    this.createTimesheetFormGroup
      .get('weeks')
      .valueChanges
      .subscribe((week: IWeek) => {
        week.selected = true;
        this.selectedWeek = week;
      });
  }

  createTimesheet() {
    const timeSheet = {
      is_submitted: false,
      start_date: this.selectedWeek.week_start,
      days: [
        {
          day_date: this.selectedWeek.week_start,
          worked_hours: 0,
          tasks: null
        }
      ]
    };


    this.allTimesheetsService.createTimesheet(timeSheet)
      .subscribe((response => {
        this.timesheet = response;
        this.redirect();
      }));
  }

  redirect() {
    this.router.navigate(['/timesheets/' + this.timesheet.id + '/edit']);
  }
}
