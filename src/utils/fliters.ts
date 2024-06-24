export const isAbsoluteAddress=(value)=> URLS.absoluteAddress?value:`${location.protocol}//${location.hostname}${value}`;
