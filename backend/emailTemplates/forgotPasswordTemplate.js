const forgotPasswordTemplate = (url) => {
  return {
    html: `
      <html>
    <body style="background-color: #f2f2f2; padding: 1rem; color: #333; font-family: 'Arial', sans-serif; margin: 0;">
      <header style="background-color: tomato; padding: 1rem; text-align: center; color: white;">
        <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">SUREBUY</h1>
      </header>
      <h2 style="text-align: center;">Your password reset token is this:${url}</h2>
      <p style="margin: 0.5rem 0;">This email is from SUREBUY.</p>
      <footer style="text-align: center; margin-top: 2rem; color: #666;">
        <p>If you have not requested this email you can ignore it!</p>
      </footer>
    </body>
  </html>
  `,
  };
};

export default forgotPasswordTemplate;
