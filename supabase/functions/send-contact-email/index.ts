import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  formType?: string
  productInterest?: string
  company?: string
  timestamp: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData: ContactFormData = await req.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email configuration from environment variables
    const smtpConfig = {
      host: Deno.env.get('SMTP_HOST') || 'smtp.gmail.com',
      port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
      username: Deno.env.get('SMTP_USER') || 'admin@dsengineeringworks.com',
      password: Deno.env.get('SMTP_PASS'),
      companyEmail: Deno.env.get('COMPANY_EMAIL') || 'admin@dsengineeringworks.com'
    }

    if (!smtpConfig.password) {
      throw new Error('SMTP password not configured')
    }

    // Create email content
    const emailSubject = `New Contact Form Submission: ${formData.subject}`
    
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0284c7; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #0284c7; }
        .footer { margin-top: 20px; padding: 15px; background: #e5e7eb; border-radius: 4px; font-size: 12px; color: #6b7280; }
        .urgent { background: #fef2f2; border-left-color: #ef4444; }
        .product-inquiry { background: #f0f9ff; border-left-color: #3b82f6; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 DS Engineering - New Contact Form Submission</h1>
            <p>You have received a new inquiry through your website contact form.</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">📝 Form Type:</div>
                <div class="value ${formData.formType === 'product-inquiry' ? 'product-inquiry' : ''}">${formData.formType || 'General Contact'}</div>
            </div>
            
            <div class="field">
                <div class="label">👤 Customer Name:</div>
                <div class="value">${formData.name}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            
            ${formData.phone ? `
            <div class="field">
                <div class="label">📞 Phone Number:</div>
                <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
            </div>
            ` : ''}
            
            ${formData.company ? `
            <div class="field">
                <div class="label">🏢 Company:</div>
                <div class="value">${formData.company}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">📋 Subject:</div>
                <div class="value">${formData.subject}</div>
            </div>
            
            ${formData.productInterest ? `
            <div class="field">
                <div class="label">🔍 Product/Service Interest:</div>
                <div class="value product-inquiry">${formData.productInterest}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="field">
                <div class="label">⏰ Submitted At:</div>
                <div class="value">${new Date(formData.timestamp).toLocaleString('en-IN', { 
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}</div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <ul>
                <li>Respond to the customer within 24 hours</li>
                <li>If this is a product inquiry, prepare relevant technical information</li>
                <li>Consider scheduling a follow-up call for complex requirements</li>
            </ul>
            
            <p><strong>Contact Information:</strong></p>
            <p>DS Engineering | H-402, RIICO INDUSTRIAL AREA, Khuskhera, Alwar, Rajasthan 301707<br>
            Phone: +91 93541 30059 | Email: admin@dsengineeringworks.com</p>
            
            <p><em>This email was automatically generated from your website contact form.</em></p>
        </div>
    </div>
</body>
</html>
    `

    // Send email using fetch to a mail service
    const emailPayload = {
      to: smtpConfig.companyEmail,
      from: `DS Engineering Website <${smtpConfig.username}>`,
      replyTo: formData.email,
      subject: emailSubject,
      html: emailBody,
      text: `
New Contact Form Submission - DS Engineering

Customer Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}
- Company: ${formData.company || 'Not provided'}
- Subject: ${formData.subject}
- Product Interest: ${formData.productInterest || 'Not specified'}

Message:
${formData.message}

Submitted at: ${new Date(formData.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond to the customer promptly.

---
DS Engineering
H-402, RIICO INDUSTRIAL AREA, Khuskhera, Alwar, Rajasthan 301707
Phone: +91 93541 30059
Email: admin@dsengineeringworks.com
      `
    }

    // For this example, we'll use a simple email service API
    // You can replace this with your preferred email service (SendGrid, Mailgun, etc.)
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'your_emailjs_service_id',
        template_id: 'your_emailjs_template_id',
        user_id: 'your_emailjs_user_id',
        template_params: {
          to_email: smtpConfig.companyEmail,
          from_name: formData.name,
          from_email: formData.email,
          subject: emailSubject,
          message: emailBody
        }
      })
    })

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`)
    }

    // Log the submission (optional - you can store in Supabase database)
    console.log('Contact form submission processed:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      timestamp: formData.timestamp
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you soon.' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send message. Please try again later or contact us directly.',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})