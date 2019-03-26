package petfinder.site.common.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import petfinder.site.common.Notification.NotificationDao;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.Notification.NotificationService;
import petfinder.site.common.pet.PetDao;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserAuthenticationDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private NotificationDao notificationDao;

    public Optional<BookingDto> findBooking(String id) {
        return bookingDao.findBooking(id);
    }

    public Map<UserDto, Integer> findRecommend(String id) {
        BookingDto booking = null;
        Map<UserDto, Integer> map = new HashMap<>();
        List<UserAuthenticationDto> sitters = userDao.findSitters();
        Optional<BookingDto> bookingDto =  bookingDao.findBooking(id);
        if (bookingDto.isPresent()) {
            booking = bookingDto.get();
        }
        else {
            booking = new BookingDto();
        }
        String bookingStartDate = booking.getStartDate();
        String bookingEndDate = booking.getEndDate();
        String bookingStartTime = booking.getStartTime();
        String bookingEndTime = booking.getEndTime();

        return map;
    }

    public BookingDto save(BookingDto booking) {
        bookingDao.save(booking);
        return booking;
    }

    public BookingDto update(BookingDto booking) {
        BookingDto temp = null;
        Optional<BookingDto> res = bookingDao.findBooking(booking.getId());
        if (!res.isPresent()) {
            System.out.println("cant find it");
        }
        else {
            temp = res.get();
            temp.setOwner(booking.getOwner());
            temp.setSitter(booking.getSitter());
            temp.setPetId(booking.getPetId());
            temp.setDescription(booking.getDescription());
            temp.setTime(booking.getTime());
        }
        bookingDao.save(temp);
        return temp;
    }

    public BookingDto signUp(String bookingId) {
        BookingDto temp = null;
        Optional<BookingDto> res = bookingDao.findBooking(bookingId);
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!res.isPresent()) {
            System.out.println("cant find it");
        }
        else {
            temp = res.get();
            temp.setSitter(principal);
            temp.signUp();
        }
        NotificationDto ownerNoti = new NotificationDto();
        ownerNoti.setUserPrinciple(temp.getOwner());
        ownerNoti.setInfo("Hi, your pet: " + temp.getPetId() + " is signed up by sitter: " + temp.getSitter());
        NotificationDto sitterNoti = new NotificationDto();
        sitterNoti.setUserPrinciple(temp.getOwner());
        sitterNoti.setInfo("Hi, your have signed up: " + temp.getPetId() + " owned by: " + temp.getOwner());
        notificationDao.save(ownerNoti);
        notificationDao.save(sitterNoti);
        bookingDao.save(temp);
        return temp;
    }

    public List<BookingDto> findOpenBooking() { return bookingDao.findOpenBooking();}

}
