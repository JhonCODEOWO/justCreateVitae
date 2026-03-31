/**
 * A interface that defines how should be the data to incrust in any cv template
 */
export interface DataTemplate {
  /**
   * It contains the base64 string to implement in src elements of html.
   */
  userImg: string;
  fullname: string;
  phoneNumber: number;
  email: string;
  mainSite?: string;
  linkedIn: string;
  profesionalLinks: { name: string; link: string }[];
  resume: string;
  workExperience: {
    companyName: string;
    occupation: string;
    rangeDate: string;
    achievements: string[];
  }[];
  education: {
    titleName: string;
    institutionName: string;
    graduationDate: string;
    type: 'curso' | 'titulo';
  }[];
  residence: string;
  skills: {
    name: string;
    level: number;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  projects: {
    title: string;
    description: string;
    link?: string;
  }[];
}
