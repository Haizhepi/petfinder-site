package petfinder.site.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.user.UserDto;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingEndpoint {
    @Autowired
    private BookingService bookingService;

    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<BookingDto> getBooking(@PathVariable("id") String id) {
        return bookingService.findBooking(id);
    }

    @PostMapping(value = "")
    public BookingDto saveBooking(@RequestBody BookingDto booking) {
        System.out.println(booking.getDescription());
        System.out.println(booking.getOwner());
        bookingService.save(booking);
        return booking;
    }


}
