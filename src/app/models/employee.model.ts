import { Moment } from 'moment';

export interface IEmployee {
  id?: number;
  name?: string;
  fullName?: string;
  dateOfBirth?: Moment;
  phoneNumber?: string;
  email?: string;
  address?: string;
  personalWebsiteLink?: string;
  freelanceStatus?: string;
  jobTitle?: string;
  jobDescription?: any;
  languageSkill?: string;
  languageSkillLevel?: string;
  profileDescription?: any;
  availableSkillsDescription?: any;
  availableServicesDescription?: any;
  availableCertificateDescription?: any;
  personalResumeDescription?: any;
  clientsTestimonialsDescription?: any;
  blogDescription?: any;
  userIconClassName?: string;
  phoneNumberIconClassName?: string;
  emailIconClassName?: string;
  addressIconClassName?: string;
  jobTitleIconClassName?: string;
  created?: Moment;
  active?: boolean;
  websiteLogoLinkFileDownloadUri?: string;
  websiteLogoLinkId?: number;
  curriculumVitaeDocumentLinkFileDownloadUri?: string;
  curriculumVitaeDocumentLinkId?: number;
  backgroundPhotoLinkFileDownloadUri?: string;
  backgroundPhotoLinkId?: number;
  profilePhotoLinkFileDownloadUri?: string;
  profilePhotoLinkId?: number;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public name?: string,
    public fullName?: string,
    public dateOfBirth?: Moment,
    public phoneNumber?: string,
    public email?: string,
    public address?: string,
    public personalWebsiteLink?: string,
    public freelanceStatus?: string,
    public jobTitle?: string,
    public jobDescription?: any,
    public languageSkill?: string,
    public languageSkillLevel?: string,
    public profileDescription?: any,
    public availableSkillsDescription?: any,
    public availableServicesDescription?: any,
    public availableCertificateDescription?: any,
    public personalResumeDescription?: any,
    public clientsTestimonialsDescription?: any,
    public blogDescription?: any,
    public userIconClassName?: string,
    public phoneNumberIconClassName?: string,
    public emailIconClassName?: string,
    public addressIconClassName?: string,
    public jobTitleIconClassName?: string,
    public created?: Moment,
    public active?: boolean,
    public websiteLogoLinkFileDownloadUri?: string,
    public websiteLogoLinkId?: number,
    public curriculumVitaeDocumentLinkFileDownloadUri?: string,
    public curriculumVitaeDocumentLinkId?: number,
    public backgroundPhotoLinkFileDownloadUri?: string,
    public backgroundPhotoLinkId?: number,
    public profilePhotoLinkFileDownloadUri?: string,
    public profilePhotoLinkId?: number
  ) {
    this.active = this.active || false;
  }
}
