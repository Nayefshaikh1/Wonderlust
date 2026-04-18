const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// POST /listings/:id/reserve
module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut, guests } = req.body;

    if (!checkIn || !checkOut) {
        req.flash("errors", "Please select check-in and check-out dates.");
        return res.redirect(`/listings/${id}`);
    }

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("errors", "Listing not found.");
        return res.redirect("/listings");
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
        req.flash("errors", "Check-out must be after check-in.");
        return res.redirect(`/listings/${id}`);
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = listing.price * nights + 300; // +300 Wonderlust fee

    const booking = new Booking({
        listing: id,
        buyer: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests || 1,
        totalPrice,
    });

    await booking.save();
    req.flash("success", `Booking confirmed! 🎉 ${nights} night(s) reserved at ${listing.title}.`);
    res.redirect("/trips");
};

// GET /trips
module.exports.getTrips = async (req, res) => {
    const bookings = await Booking.find({ buyer: req.user._id })
        .populate("listing")
        .sort({ checkIn: 1 });
    res.render("users/trips.ejs", { bookings });
};

// POST /save/:id  (toggle wishlist)
module.exports.toggleSave = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const idx = user.savedListings.indexOf(id);

    if (idx === -1) {
        user.savedListings.push(id);
    } else {
        user.savedListings.splice(idx, 1);
    }
    await user.save();

    // respond as JSON for fetch API calls
    res.json({ saved: idx === -1 });
};

// GET /wishlists
module.exports.getWishlists = async (req, res) => {
    const user = await User.findById(req.user._id).populate("savedListings");
    res.render("users/wishlists.ejs", { savedListings: user.savedListings });
};
