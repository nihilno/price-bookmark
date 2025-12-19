import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendPriceDropAlert(
  userEmail: string,
  product: Product,
  oldPrice: number,
  newPrice: number,
) {
  try {
    const priceDrop = oldPrice - newPrice;
    const percentageDrop =
      oldPrice > 0 ? ((priceDrop / oldPrice) * 100).toFixed(2) : "0.00";
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: userEmail,
      subject: `Price Drop Alert: ${product.name}`,
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f9fafb;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #FA5D19 0%, #FF7A29 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center; box-shadow: inset 0 -2px 6px rgba(0,0,0,0.1);">
      <h1 style="color: #fff; margin: 0; font-size: 26px; font-weight: 700;">🐾 Price Drop Alert!</h1>
      <p style="color: #fff; margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Your watchlist just got more perfect.</p>
    </div>
    
    <!-- Body -->
    <div style="background: #ffffff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
      
      <!-- Product image -->
      ${
        product.image_url
          ? `
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${product.image_url}" alt="${product.name}" style="max-width: 220px; height: auto; border-radius: 10px; border: 1px solid #e5e7eb; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
      </div>
      `
          : ""
      }
      
      <!-- Product name -->
      <h2 style="color: #111827; margin: 0; font-size: 20px; font-weight: 600; text-align: center;">${product.name}</h2>
      
      <!-- Drop info -->
      <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 14px; margin: 24px 0; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 15px; color: #9a3412; font-weight: 500;">
          🎉 Price dropped by <strong>${percentageDrop}%</strong>!
        </p>
      </div>
      
      <!-- Price table -->
      <table style="width: 100%; margin: 20px 0; border-collapse: separate; border-spacing: 0 12px;">
        <tr>
          <td style="padding: 12px; background: #f9fafb; border-radius: 8px; text-align: center;">
            <div style="font-size: 13px; color: #6b7280;">Previous Price</div>
            <div style="font-size: 18px; color: #9ca3af; text-decoration: line-through;">
              ${product.currency} ${oldPrice.toFixed(2)}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; text-align: center;">
            <div style="font-size: 13px; color: #6b7280;">Current Price</div>
            <div style="font-size: 28px; color: #FA5D19; font-weight: 700;">
              ${product.currency} ${newPrice.toFixed(2)}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #ecfdf5; border-radius: 8px; text-align: center;">
            <div style="font-size: 13px; color: #166534;">You Save</div>
            <div style="font-size: 22px; color: #16a34a; font-weight: 700;">
              ${product.currency} ${priceDrop.toFixed(2)}
            </div>
          </td>
        </tr>
      </table>
      
      <!-- CTA -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="${product.url}" 
           style="display: inline-block; background: #FA5D19; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
          View Product →
        </a>
      </div>
      
      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 18px; margin-top: 24px; text-align: center; color: #6b7280; font-size: 12px;">
        <p style="margin: 0;">You’re receiving this email because you’re tracking this product with Cat‑alog 🐱.</p>
        <p style="margin-top: 10px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #FA5D19; text-decoration: none; font-weight: 500;">
            View All Tracked Products
          </a>
        </p>
      </div>
    </div>
    
  </body>
</html>
`,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error sending email:", error);
    return { success: false, error: "Unexpected error sending email." };
  }
}

// https://pounce-bookmark.vercel.app/api/cron/check-prices
// Bearer 07bf4131d25a92747670d4f692be27986a3dc345f62d4ed082176523ec0513b2
