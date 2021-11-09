export interface ICountry {
  capital: string
  createdAt: string
  currency: string
  currencySymbol: string
  emoji: string
  emojiu: string
  flag: boolean
  id: number
  iso2: string
  iso3: string
  latitude: number
  longitude: number
  name: string
  nativeName: string
  numericCode: string
  phonecode: string
  region: string
  subregion: string
  timezones: string
  tld: string
  translations: string
  updatedAt: string
  wikidataid: string
}
export interface IAddressState {
  cities: Nullable<string>
  countryCode: string
  countryId: number
  fipsCode: string
  id: number
  iso2: string
  latitude: number
  longitude: number
  name: string
  translations: string
}