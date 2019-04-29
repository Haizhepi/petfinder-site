package petfinder.site.endpoint;


import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import petfinder.site.common.booking.ApproveRequest;
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


    @GetMapping(value = "/getStartingBooking")
    public boolean getStartingBooking() {
        bookingService.checkBookingSentNoti();
        return true;
    }

    @PostMapping(value = "")
    public BookingDto saveBooking(@RequestBody BookingDto booking) {
        System.out.println(booking.getDescription());
        System.out.println(booking.getOwner());
        System.out.println(booking.getPetId());
        System.out.println(booking.getTime());
        System.out.println(booking.getLat());
        System.out.println(booking.getLng());

        bookingService.save(booking);
        return booking;
    }

    @PostMapping(value = "/signUp")
    public BookingDto signUp(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.signUp(booking.getId());
        return booking;
    }

    @PostMapping(value = "/confirm")
    public BookingDto confirm(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.confrim(booking.getId());
        return booking;
    }

    @PostMapping(value = "/sitterCancel")
    public BookingDto sitterCancel(@RequestBody BookingDto booking) {
        System.out.println("canceling+" + booking.getId());
        bookingService.sitterCancel(booking.getId());
        return booking;
    }
    @PostMapping(value = "/delete")
    public BookingDto cancelBooking(@RequestBody BookingDto booking) {
        System.out.println("calling+" + booking.getId());
        bookingService.deleteBooking(booking);
        return booking;
    }

    @PostMapping(value = "/approve")
    public BookingDto approveBooking(@RequestBody ApproveRequest approveRequest) {
        System.out.println("approving+" + approveRequest.getBookingId());
        Optional<BookingDto> temp = bookingService.findBooking(approveRequest.getBookingId());
        if (temp.isPresent()) {
            bookingService.approve(approveRequest.getBookingId(), approveRequest.getPrincipal());
        }
        return temp.get();
    }


    @PostMapping(value = "/invite")
    public BookingDto inviteSitter(@RequestBody ApproveRequest approveRequest) {
        System.out.println("inviting+" + approveRequest.getBookingId());
        Optional<BookingDto> temp = bookingService.findBooking(approveRequest.getBookingId());
        if (temp.isPresent()) {
            bookingService.invite(approveRequest.getBookingId(), approveRequest.getPrincipal());
        }
        return temp.get();
    }

    @PostMapping(value = "/finish")
    public BookingDto inviteSitter(@RequestBody BookingDto bookingDto) {
        System.out.println("Booking finish");
        return bookingService.finish(bookingDto);
    }




}
