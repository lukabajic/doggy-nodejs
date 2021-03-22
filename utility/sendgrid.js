const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(
  "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"
);

const verifyEmailHtml = (token) =>
  `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>DoggyApp</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;line-height:1.15;color:#262322;background-color:#fff;box-sizing:border-box;min-height:100vh}*,*::after,*::before{box-sizing:inherit;padding:0;margin:0}.main{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px;min-height:100vh}.large-title{font-weight:900;line-height:1.15;letter-spacing:-2px;font-size:32px;text-align:center;margin:0 0 30px}.header{font-weight:500;text-align:center;margin:0 0 15px}@media only screen and (min-width: 768px){.main{max-width:90%;margin:0 auto}}</style></head><body> <main class="main"><h1 class="large-title">DoggyApp</span></h1><h3 class="header">Please confirm your email adress by clicking on the following link</h3> <a class="link" href="http://localhost:8080/user/verify-email/${token}" >Potvrdite email</a > </main></body></html>`;

const passwordHtml = (password) =>
  `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>DoggyApp</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;line-height:1.15;color:#262322;background-color:#fff;box-sizing:border-box;min-height:100vh}*,*::after,*::before{box-sizing:inherit;padding:0;margin:0}.main{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px;min-height:100vh}.large-title{font-weight:900;line-height:1.15;letter-spacing:-2px;font-size:32px;text-align:center;margin:0 0 30px}.header{font-weight:500;text-align:center;margin:0 0 15px}.paragraph{font-weight:400;opacity:0.75;margin:0 0 5px 0;text-align:center;line-height:24px}.password{margin:0 0 30px;text-align:center;display:flex;justify-content:center;align-items:flex-end;vertical-align:baseline}.new-password{font-weight:700;margin-left:5px}@media only screen and (min-width: 768px){.main{max-width:90%;margin:0 auto}}</style></head><body> <main class="mail"><h1 class="large-title">DoggyApp</span></h1><h3 class="header">You have successfully changed your password.</h3><p class="password"> <span class="">Your new password is:</span> <span class="new-password">${password}</span></p><p class="paragraph"> You can use this password to login and can always change it afterwards.</p> </main></body></html>`;

exports.passwordMail = (email, password) =>
  sendgrid.send({
    to: email,
    from: "luka.bajic@epicss.io",
    subject: "New password.",
    html: passwordHtml(password),
  });

exports.sendVerificationMail = (token, email) =>
  sendgrid.send({
    to: email,
    from: "luka.bajic@epicss.io",
    subject: "Confirm email.",
    html: verifyEmailHtml(token),
  });
