package petfinder.site.endpoint;


import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.user.UserDto;

import java.util.List;
import java.util.Map;
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

    @GetMapping(value = "/recommend{id}", produces = "application/json")
    public Map<UserDto, Integer> getRecommend(@PathVariable("id") String id) {
        return bookingService.findRecommend(id);
    }


    @GetMapping(value = "/openingBooking")
    public List<BookingDto> getOpenBooking() {
        return bookingService.findOpenBooking();
    }

    @PostMapping(value = "")
    public BookingDto saveBooking(@RequestBody BookingDto booking) {
        System.out.println(booking.getDescription());
        System.out.println(booking.getOwner());
        System.out.println(booking.getPetId());
        bookingService.save(booking);
        return booking;
    }

    @PostMapping(value = "/signUp")
    public BookingDto signUp(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.signUp(booking.getId());
        return booking;
    }


}
