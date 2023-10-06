import sgMail from '@sendgrid/mail'

export const SendEmail = async (to, subject, htmlcode, textmessage) => {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
    const msg = {
        from: {
            email: 'rizwandevelopment@outlook.com',
            name: "PMS VRWEB-06"
        }, // Change to your verified sender
        replyTo: "rizwandevelopment@outlook.com",
        to, // Change to your recipient
        subject,
        text: textmessage,
        html: htmlcode
    }
    try {
        await sgMail.send(msg).then((response) => {
            console.log(`Status Code is : ${response[0].statusCode}`);
            console.log();
            console.log("----- Response Headers -----");
            console.log(response[0].headers);
            console.log("----------------------------");
        });
        console.log(`Email was sent successfully to : ${to}`);
    } catch (error) {
        console.error(error);
    }
}

