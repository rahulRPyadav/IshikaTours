const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER
     || 'ishika.travels4379@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

// 1. Create & Save Booking in DB + Send Notification to Admin
exports.createBooking = async (req, res) => {
  try {
    const { tourName, customerName, email, phone, travelDate, guests, notes } = req.body;

    // Save to Database (Default guests = 1 if missing)
    const newBooking = await Booking.create({
      tourName,
      customerName,
      email,
      phone,
      travelDate,
      guests: guests || 1,
      notes
    });

    // Send Mail Notification to Admin
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER 
      || 'ishika.travels4379@gmail.com',
      subject: `🚨 New Booking Request - ${tourName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #34A99D;">New Tour Booking Request</h2>
          <p><strong>Tour Name:</strong> ${tourName}</p>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Travel Date:</strong> ${travelDate}</p>
          <p><strong>Number of Guests/Members:</strong> <span style="background-color: #FFF3C8; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${guests || 1} Persons</span></p>
          ${notes ? `<p><strong>Customer Notes:</strong> ${notes}</p>` : ''}
        </div>
      `
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) console.log('Admin Mail Error:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Booking saved in DB & Email Sent!',
      data: newBooking
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Fetch All Bookings for Admin Dashboard
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Update Booking Status & Send Email Notification to Customer
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`[STATUS UPDATE] Updating booking ID: ${id} to Status: ${status}`);

    // Database me Status update karo
    const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Status ke mutabiq Customer ke liye Email Content taiyar karo
    let emailSubject = '';
    let emailHtml = '';

    if (status === 'Confirmed') {
      emailSubject = `🎉 Booking Confirmed! - Ishika Tour & Travels`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #34A99D; border-radius: 12px; background-color: #f9fbfb;">
          <h2 style="color: #34A99D; margin-bottom: 5px;">Booking Confirmed! 🎉</h2>
          <p style="color: #555; font-size: 14px;">Namaste <strong>${updated.customerName}</strong>,</p>
          <p style="color: #555; font-size: 14px;">Aapka tour package request successfully confirm ho gaya hai!</p>
          
          <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 15px 0;">
            <p style="margin: 5px 0; color: #333;"><strong>Tour Package:</strong> ${updated.tourName}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Travel Date:</strong> ${updated.travelDate}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Total Members:</strong> ${updated.guests || 1} Persons</p>
            <p style="margin: 5px 0; color: #333;"><strong>Status:</strong> <span style="color: green; font-weight: bold;">Confirmed</span></p>
          </div>

          <p style="color: #555; font-size: 13px;">Ishika Tour & Travels team aapko jald hi travel itinerary aur further details ke liye call karegi.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
          <p style="color: #777; font-size: 12px; margin: 0;">Kisi bhi query ke liye humse sampark karein: <strong>+91 7891604638</strong></p>
          <p style="color: #34A99D; font-weight: bold; margin-top: 5px;">Ishika Tour & Travels</p>
        </div>
      `;
    } else if (status === 'Cancelled') {
      emailSubject = `🚫 Booking Status Update - Ishika Tour & Travels`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fff5f5;">
          <h2 style="color: #e53e3e; margin-bottom: 5px;">Booking Request Update 🚫</h2>
          <p style="color: #555; font-size: 14px;">Namaste <strong>${updated.customerName}</strong>,</p>
          <p style="color: #555; font-size: 14px;">Aapka tour package request <strong>${updated.tourName}</strong> cancel kar diya gaya hai.</p>
          
          <p style="color: #777; font-size: 12px; margin-top: 15px;">Agar koi issue ho ya aap doosra package plan karna chahte hain toh call karein: <strong>+91 7891604638</strong></p>
          <p style="color: #458393; font-weight: bold; margin-top: 5px;">Ishika Tour & Travels</p>
        </div>
      `;
    }

    // Customer Email sending trigger
    if (updated.email && emailSubject) {
      const customerMailOptions = {
        from: `"Ishika Tour & Travels" <${process.env.EMAIL_USER || 'ishika.travels4379@gmail.com'}>`,
        to: updated.email,
        subject: emailSubject,
        html: emailHtml
      };

      try {
        let mailResult = await transporter.sendMail(customerMailOptions);
        console.log('[MAIL SUCCESS] Customer email sent:', mailResult.response);
      } catch (mailErr) {
        console.error('[MAIL ERROR] Failed to send email to customer:', mailErr.message);
      }
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('[SERVER ERROR]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};