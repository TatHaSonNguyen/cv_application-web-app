import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((v) => {
      if (v.get('id')) {
        if (Number(v.get('id'))) {
          this.router.navigateByUrl('/', { state: { id: v.get('id')} });
        } else {
          this.router.navigate(['/page-not-found']);
        }
      }
    });
  }
}
