const disabledTransport = {
  sendMail: async () => {
    throw new Error(
      "Legacy SMTP email delivery is disabled. Use the Resend email service instead.",
    );
  },
};

export default disabledTransport;
