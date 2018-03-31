import path from 'path';
import emailTemplates from 'email-templates-v2';
import nodemailer from 'nodemailer';

const config = require('./../../../../config/env');

global.cachedEmailTemplates = global.cachedEmailTemplates || {};

function readTemplate(templateDir, mergeTags) {
  return new Promise((resolve, reject) => {
    let template = {};
    if (global.cachedEmailTemplates[templateDir]) {
      template = global.cachedEmailTemplates[templateDir];
    } else {
      template = new emailTemplates.EmailTemplate(templateDir, config.nodemailer.juice);
    }

    template.render(mergeTags, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function fetchTemplate(templatePath, language, mergeTags) {
  const templateDir = path.join(__dirname, templatePath, language);
  return readTemplate(templateDir, mergeTags);
}

export default (() => {
  function send(to, language, templatePath, mergeTags, transport = 'noReply') {
    if (!config.nodemailer.transport[transport]) {
      throw new Error(`Transport ${transport} not implemented`);
    }

    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport(config.nodemailer.transport[transport]);
      fetchTemplate(templatePath, language, mergeTags).then((mailOptions) => {
        transporter.sendMail(Object.assign(mailOptions, { to, from: config.nodemailer.transport[transport].auth.from }), (err, info) => {
          if (err) {
            return reject(err);
          }
          return resolve(info);
        });
      });
    });
  }

  return {
    send
  };
})();
