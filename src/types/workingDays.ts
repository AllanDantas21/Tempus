export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface FormattedHoliday {
  date: string;
  localName: string;
}

export interface WorkingDaysResult {
  workingDays: number;
  holidays: string[];
}