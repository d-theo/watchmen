export class User {
  constructor(o) {
    this.userId = o.UserID || o.Id;
    this.email = o.Login || o.Email;
  }
}
/*Email
:
"theo.damaville@atinternet.com"
Firstname
:
null
Id
:
516552*/
/*
ExpiringToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUxNjU1MiwiZW1haWwiOiJ0aGVvLmRhbWF2aWxsZUBhdGludGVybmV0LmNvbSIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwibGFuZ3VhZ2VJZCI6MiwiYXV0aG9yaXphdGlvbkFjY2VzcyI6dHJ1ZSwibnhBY2Nlc3MiOnRydWUsIm9yZ2FuaXphdGlvbklkIjotMSwiZXhwIjoxNTEwMTI3NDE0LCJpc3MiOiJBVCBJbnRlcm5ldCJ9.do_mFOIIxOJf8-0boct-drvyaOAMLxzRzR4DI0M-DLw"
LanguageCode:"en"
LanguageID:2
Login:"theo.damaville@atinternet.com"
Quota:5
Scope:{HasGeodeAccess: true, HasNxAccess: true, Has75Access: false}
Token:"dqf8tJepRyi+k5gvuTrgSg=="
UserID:516552
*/