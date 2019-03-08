package petfinder.site.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;

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
}
