import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {IPhoto} from './models/photo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from './services/photo/photo.service';
import {AchievementsService} from './services/achievements/achievements.service';
import {AdvertisingImageService} from './services/advertising-image/advertising-image.service';
import {IAvailableServices} from './models/available-services.model';
import {AvailableSkillsService} from './services/available-skills/available-skills.service';
import {BlogService} from './services/blog/blog.service';
import {CertificationService} from './services/certification/certification.service';
import {CertificationGroupService} from './services/certification-group/certification-group.service';
import {ClientsTestimonialsService} from './services/clients-testimonials/clients-testimonials.service';
import {ContactService} from './services/contact/contact.service';
import {EmployeeService} from './services/employee/employee.service';
import {PersonalResumeService} from './services/personal-resume/personal-resume.service';
import {PersonalResumeGroupService} from './services/personal-resume-group/personal-resume-group.service';
import {SocialNetworkService} from './services/social-network/social-network.service';
import {LogicalOperator} from './utils/request-util';
import {IEmployee} from './models/employee.model';
import {HttpResponse} from '@angular/common/http';
import {IAchievements} from './models/achievements.model';
import {IAdvertisingImage} from './models/advertising-image.model';
import {AvailableServicesService} from './services/available-services/available-services.service';
import {IAvailableSkills} from './models/available-skills.model';
import {IBlog} from './models/blog.model';
import {ICertification} from './models/certification.model';
import {ICertificationGroup} from './models/certification-group.model';
import {IClientsTestimonials} from './models/clients-testimonials.model';
import {Contact, IContact} from './models/contact.model';
import {IPersonalResume} from './models/personal-resume.model';
import {IPersonalResumeGroup} from './models/personal-resume-group.model';
import {ISocialNetwork} from './models/social-network.model';
import {AuthenticationService} from './services/authentication/authentication.service';
import Typed from 'typed.js';
import * as $ from 'jquery';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Observable, Observer} from 'rxjs';
import {share} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'web-app';
  public employee?: IEmployee;
  public achievements?: IAchievements [];
  public advertisingImages: IAdvertisingImage[];
  public availableServices: IAvailableServices[];
  public availableSkills: IAvailableSkills[];
  public blogs: IBlog[];
  private certifications: ICertification[];
  public certificationGroups: ICertificationGroup[];
  public clientsTestimonials: IClientsTestimonials[];
  private contacts: IContact[];
  private photos: IPhoto[];
  private personalResumes: IPersonalResume[];
  public personalResumeGroups: IPersonalResumeGroup[];
  public socialNetworks: ISocialNetwork[];
  public advertisingImageSlideOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 30,
    responsive: {0: {items: 2}, 480: {items: 3}, 767: {items: 4}, 991: {items: 5}},
  };
  public clientsTestimonialsSlideOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 30,
    autoWidth: true,
    responsive: {0 : {items: 1 }, 767 : {items: 2}, 1199: {items: 3}},
  };
  public easyPieChartOptions = {
    barColor: '#FF324D',
    trackColor: '#eee',
    scaleColor: '#fff',
    scaleLength: 5,
    lineCap: 'round',
    lineWidth: 5,
    size: 170,
    rotate: 0,
    animate: {
      duration: 1000,
      enabled: true
    }
  };
  public triggerAnimation: Observable<boolean>;
  public triggerAnimationHandle: Observer<boolean>;
  public selectedPersonalResumeGroupTabId: number;
  public selectedCertificationGroupTabId: number;
  public selectedCertificationModal: ICertification;
  public contactForm: FormGroup;
  public submitted = false;
  public contactResponseMessage = '';
  public contactResponseError = false;

  constructor(
    protected authenticationService: AuthenticationService,
    protected achievementsService: AchievementsService,
    protected advertisingImageService: AdvertisingImageService,
    protected availableServicesService: AvailableServicesService,
    protected availableSkillsService: AvailableSkillsService,
    protected blogService: BlogService,
    protected certificationService: CertificationService,
    protected certificationGroupService: CertificationGroupService,
    protected clientsTestimonialsService: ClientsTestimonialsService,
    protected contactService: ContactService,
    protected employeeService: EmployeeService,
    protected photoService: PhotoService,
    protected personalResumeService: PersonalResumeService,
    protected personalResumeGroupService: PersonalResumeGroupService,
    protected socialNetworkService: SocialNetworkService,
    protected formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^([+]|[00]{2})([0-9]|[ -])*')]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
    this.getAccessToken();
  }

  ngAfterViewChecked(): void {
    $('.profile_image').height($('.profile_info').height());
  }
  getAccessToken(): void {
    this.authenticationService.getToken().subscribe(
      (res) => {
        this.loadingPage();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingPage(): void {
    const req = {
      active: {
        logicalOperator: LogicalOperator.equals,
        value: true,
      },
      sort: [['id,asc']]
    };
    this.employeeService.query(req).subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        if (res.body) {
          this.employee = res.body[0];
          this.setupContent(this.employee);
          this.loadingAchievements(this.employee.id);
          this.loadingAdvertisingImages(this.employee.id);
          this.loadingAvailableSkills(this.employee.id);
          this.loadingAvailableServices(this.employee.id);
          this.loadingBlogs(this.employee.id);
          this.loadingCertificationGroups(this.employee.id);
          this.loadingCertifications(this.employee.id);
          this.loadingClientsTestimonials(this.employee.id);
          this.loadingPersonalResumeGroups(this.employee.id);
          this.loadingPersonalResumes(this.employee.id);
          this.loadingContact(this.employee.id);
          this.loadingSocialNetworks(this.employee.id);
          setTimeout( () => {
            $('#preloader').delay(600).fadeOut(600).addClass('loaded');
          }, 700);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setupContent(employee: IEmployee): void {
    if (employee) {
      const typed = new Typed('#typed-text', {
        strings: [`${employee.jobTitle}`],
        typeSpeed: 60,
        backSpeed: 30,
        startDelay: 1000,
        loop: true,
        loopCount: Infinity
      });
    }
    this.triggerAnimation = new Observable<boolean>((observer: any) => this.triggerAnimationHandle = observer).pipe(share());
    // Trigger odometer after 2s
    setTimeout(() => this.triggerAnimationHandle.next(true), 2000);

    // Select Certification Group Tab - All
    this.selectedCertificationGroupTabId = 0;
  }
  loadingAchievements(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: [['id,asc']]
    };
    this.achievementsService.query(req).subscribe(
      (res: HttpResponse<IAchievements[]>) => {
        if (res.body) {
          this.achievements = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingAdvertisingImages(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: [['id,asc']]
    };
    this.advertisingImageService.query(req).subscribe(
      (res: HttpResponse<IAdvertisingImage[]>) => {
        if (res.body) {
          this.advertisingImages = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingAvailableServices(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: [['id,asc']]
    };
    this.availableServicesService.query(req).subscribe(
      (res: HttpResponse<IAvailableServices[]>) => {
        if (res.body) {
          this.availableServices = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingAvailableSkills(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: [['id,asc']]
    };
    this.availableSkillsService.query(req).subscribe(
      (res: HttpResponse<IAvailableSkills[]>) => {
        if (res.body) {
          this.availableSkills = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingBlogs(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: [['id,asc']]
    };
    this.blogService.query(req).subscribe(
      (res: HttpResponse<IBlog[]>) => {
        if (res.body) {
          this.blogs = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingCertifications(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.certificationService.query(req).subscribe(
      (res: HttpResponse<ICertification[]>) => {
        if (res.body) {
          this.certifications = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingCertificationGroups(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.certificationGroupService.query(req).subscribe(
      (res: HttpResponse<ICertificationGroup[]>) => {
        if (res.body) {
          this.certificationGroups = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingClientsTestimonials(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.clientsTestimonialsService.query(req).subscribe(
      (res: HttpResponse<IClientsTestimonials[]>) => {
        if (res.body) {
          this.clientsTestimonials = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingContact(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.contactService.query(req).subscribe(
      (res: HttpResponse<IContact[]>) => {
        if (res.body) {
          this.contacts = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingPhotos(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.photoService.query(req).subscribe(
      (res: HttpResponse<IPhoto[]>) => {
        if (res.body) {
          this.photos = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingPersonalResumes(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.personalResumeService.query(req).subscribe(
      (res: HttpResponse<IPersonalResume[]>) => {
        if (res.body) {
          this.personalResumes = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingPersonalResumeGroups(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.personalResumeGroupService.query(req).subscribe(
      (res: HttpResponse<IPersonalResumeGroup[]>) => {
        if (res.body) {
          this.personalResumeGroups = res.body;
          this.selectedPersonalResumeGroupTabId = this.personalResumeGroups[0].id;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadingSocialNetworks(employeeId: number): void {
    const req = {
      employeeIdId: {
        logicalOperator: LogicalOperator.equals,
        value: employeeId ? employeeId : '',
      },
      sort: ['id,asc']
    };
    this.socialNetworkService.query(req).subscribe(
      (res: HttpResponse<ISocialNetwork[]>) => {
        if (res.body) {
          this.socialNetworks = res.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterPersonalResumes(personalResumes: IPersonalResume[], id: number): IPersonalResume[] {
    return personalResumes.filter(personalResume => personalResume.personalresumegroupId === id);
  }

  clickPersonalResumeGroupTabId(id: number) {
   this.selectedPersonalResumeGroupTabId = id;
  }

  filterCertifications(certifications: ICertification[], id: number) {
    if (id === 0) {
      return certifications;
    }
    return certifications.filter(certification => certification.certificationgroupId === id);
  }

  clickCertificationGroupTabId(id: number) {
    this.selectedCertificationGroupTabId = id;
  }

  openCertificationModal(certification: ICertification) {
    this.selectedCertificationModal = certification;
  }

// convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }
  sendContact(employeeId: number) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    $('#preloader').removeAttr('style');

    this.contactService.create(this.createContactForm(employeeId)).subscribe(
      () => {
        this.contactResponseError = false;
        this.contactResponseMessage = 'This contact is connected to me. Thanks for your contact and thank you so much!';
        $('#preloader').delay(600).fadeOut(600).addClass('loaded');
      },
      () => {
        this.contactResponseError = true;
        this.contactResponseMessage = 'This contact is not connected to me because internal error server';
        $('#preloader').delay(600).fadeOut(600).addClass('loaded');
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.contactResponseError = false;
    this.contactResponseMessage = '';
    this.contactForm.reset();
  }

  personalResumeReadMore(id: number) {
    $('.personalResumecontent_' + id).removeClass('collapsed');
    $('.personalResumeReadMore_' + id).addClass('displayNone');
    $('.personalResumeReadLess_' + id).removeClass('displayNone');
  }

  personalResumeReadLess(id: number) {
    $('.personalResumecontent_' + id).addClass('collapsed');
    $('.personalResumeReadMore_' + id).removeClass('displayNone');
    $('.personalResumeReadLess_' + id).addClass('displayNone');
  }
  private createContactForm(employeeId: number): IContact {
    return {
      ...new Contact(),
      id: this.contactForm.get(['id']).value ? this.contactForm.get(['id']).value : undefined,
      name: this.contactForm.get(['name']).value ? this.contactForm.get(['name']).value : undefined,
      email: this.contactForm.get(['email']).value ? this.contactForm.get(['email']).value : undefined,
      phoneNumber: this.contactForm.get(['phoneNumber']).value ? this.contactForm.get(['phoneNumber']).value : undefined,
      subject: this.contactForm.get(['subject']).value ? this.contactForm.get(['subject']).value : undefined,
      message: this.contactForm.get(['message']).value ? this.contactForm.get(['message']).value : undefined,
      created: moment(moment().startOf('day'), environment.DATE_TIME_FORMAT),
      employeeIdId: employeeId,
    };
  }
}
