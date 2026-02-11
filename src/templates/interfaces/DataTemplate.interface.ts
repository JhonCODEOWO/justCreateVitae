export interface DataTemplate {
  globalStyles: string;
  fullname: string;
  phoneNumber: number;
  email: string;
  profesionalLinks: { name: string; link: string }[];
  resume: string;
  workExperience: {
    companyName: string;
    occupation: string;
    startDate: string;
    endDate?: string;
    achievements: string[];
  }[];
  education: {
    titleName: string;
    institutionName: string;
    graduationDate: string;
    type: 'curso' | 'titulo';
  }[];
  residence: string;
}
