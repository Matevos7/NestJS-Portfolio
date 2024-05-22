import { Country } from "@common/database/entities";

export const COUNTRY: Country = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Armenia',
  alpha2: 'am',
  alpha3: 'arm',
  continent: 'Asia',
  phoneCode: '374',
  currency: 'Dram'
};

export const COUNTRIES: Country[] = [COUNTRY];