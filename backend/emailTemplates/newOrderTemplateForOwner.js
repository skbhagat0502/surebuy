const newOrderTemplateForOwner = (order) => {
  const {
    usersAddress,
    modelId,
    itemCondition,
    itemPrice,
    receivingCost,
    totalPrice,
  } = order;

  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      
      <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; background-color: #3498db; color: #ffffff; padding: 10px; border-radius: 8px 8px 0 0;">
            <h2>SureBuy Order Confirmation</h2>
          </div>
      
          <div style="margin-top: 20px;">
            <h3>Order Details:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd; background-color: #3498db; color: #ffffff;">Field</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd; background-color: #3498db; color: #ffffff;">Details</th>
              </tr>
              <tr>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">User's Address</td>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">${usersAddress}</td>
              </tr>
              <tr>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Model ID</td>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">${modelId}</td>
              </tr>
              <tr>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Item Condition</td>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">${itemCondition}</td>
              </tr>
              <tr>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Item Price</td>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">₹${itemPrice}</td>
              </tr>
              <tr>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Receiving Cost</td>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">₹${receivingCost}</td>
              </tr>
              <tr>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Total Price</td>
                <td style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">₹${totalPrice}</td>
              </tr>
            </table>
          </div>
      
          <div style="text-align: center; margin-top: 20px; color: #888;">
            <p>Thank you for choosing SureBuy. For any inquiries, please contact support@suresell.com</p>
          </div>
        </div>
      </body>
      
      </html>
    `,
  };
};

export default newOrderTemplateForOwner;
