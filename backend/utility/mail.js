import  nodemailer  from 'nodemailer';
 sendmail=( reciever, subject, message ) => {
    reciever = reciever.toString(); 
    const mailContent = "<center><table class='body-wrap' style='text-align:center;width:96%;font-family:arial,sans-serif;border:12px solid rgba(126, 122, 122, 0.08);border-spacing:4px 20px;'>\
            <tr><img src='https://s3.ap-south-1.amazonaws.com/lccbucket/logo.png' style='width:36%;'></tr>\
            <tr>\
                <td>\
                    <center>\
                        <table bgcolor='#FFFFFF' width='90%'' border='0'>\
                            <tbody>\
                                <tr style='text-align:center;color:#575252;font-size:14px;'>\
                                    <td>\
                                        <span><h3>"+decodeURIComponent(message)+"<h3></span>\
                                    </td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </center>\
                </td>\
            </tr>\
        </table></center>";

        if(message.substring(0, 4) == "Dear")
        mailContent = "<center><table class='body-wrap' style='text-align:center;width:96%;font-family:arial,sans-serif;border:12px solid rgba(126, 122, 122, 0.08);border-spacing:4px 20px;'>\
            <tr><img src='https://s3.ap-south-1.amazonaws.com/lccbucket/logo.png' style='width:36%;'></tr>\
        </table></center><br/>" + message;
  
    const smtpTransport = nodemailer.createTransport("SMTP", {
        service: 'gmail',
        auth: {
            user: "anshnagrath448@gmail.com", // Your gmail address.
            pass: "wezzy33beat",
        }

    });
  
    var mailOptions = {
        from: "anshnagrath448@gmail.com",
        to: 'anshnagrath448@gmail.com',
        subject: `Message from ${subject}`,
        generateTextFromHTML: true,
        html: mailContent
    }
  
    smtpTransport.sendMail(mailOptions, function(error, response) {
        smtpTransport.close();
        if(!error){
            console.log(chalk.blue("email sucessesfullySend"));
            return true
        }else{
            console.log(chalk.red("error while sending email"));
            return false
        }
    });
  }

export default  sendmail;