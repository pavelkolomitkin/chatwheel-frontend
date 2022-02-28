// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:8080/api',
  baseSocketUrl: 'http://localhost:8080',
  lang: 'en',
  maxUploadFileSize: 7340032,
  maxUploadFileSizeLabel: '7M',

  geoLocationUpdateInterval: 60000,

  geoLocationInfoUri: 'https://nominatim.openstreetmap.org/reverse?format=json&namedetails=1',

  onlineActivitySeconds: 60,
  recentOnlineActivitySeconds: 300,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
