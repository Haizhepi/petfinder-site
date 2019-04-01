package petfinder.site.common.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import petfinder.site.common.Notification.NotificationDao;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.Notification.NotificationService;
import petfinder.site.common.pet.PetDao;
import alloy.util._Lists;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserAuthenticationDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.sitter.SitterAvailabilityDao;
import petfinder.site.common.user.sitter.SitterAvailabilityDto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BookingService {
    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private SitterAvailabilityDao sitterAvailabilityDao;

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
        List<SitterAvailabilityDto> sitterList = new ArrayList<>();
        Map<SitterAvailabilityDto, UserDto> map2 = new HashMap<>();

        for (UserAuthenticationDto user : sitters) {
            Optional<SitterAvailabilityDto> temp = sitterAvailabilityDao.findAvailabilityByUserID(user.getUser());
            if (temp.isPresent()) {
                System.out.println("problem here");
                SitterAvailabilityDto sitter = temp.get();
                System.out.println("Checking user: " + user.getUser().getPrincipal());
                System.out.println("Checking sitter: " + sitter.getPrincipal());

                sitterList.add(sitter);
                map2.put(sitter, user.getUser());
            }

        }

        for (SitterAvailabilityDto sch : sitterList) {
            String startDate = sch.getStartDate();
            String endDate = sch.getEndDate();
            String startTime = sch.getStartTime();
            String endTime = sch.getEndTime();
            Integer result = 0;
            if (startDate != null && endDate != null && startTime != null && endTime != null) {
                try {
                    result = evaluate(bookingStartDate, bookingEndDate, startDate, endDate,
                            bookingStartTime, bookingEndTime, startTime, endTime);
                } catch (Exception e) {
                    System.out.println("problem parsing" + e.toString());
                }
                if (result == 1) {
                    map.put(map2.get(sch), result);
                }
            }

        }
        return map;
    }

    public int evaluate(String bsd, String bed, String ssd, String sed, String bst,
                        String bet, String sst, String set) throws Exception{
        Date bookingStartDate = null;
        Date bookingEndDate = null;
        Date sitterStartDate = null;
        Date sitterEndDate = null;
        Date bookingStartTime = null;
        Date bookingEndtime = null;
        Date sitterStartTime = null;
        Date sitterEndTime = null;


        try {
             bookingStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(bsd.substring(0, 10));
             bookingEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(bed.substring(0, 10));
             sitterStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(ssd.substring(0, 10));
             sitterEndDate = new SimpleDateFormat("yyyy-MM-dd").parse(sed.substring(0, 10));
             bookingStartTime = new SimpleDateFormat("hh:mm:ss").parse(bst.substring(11, 19));
             bookingEndtime = new SimpleDateFormat("hh:mm:ss").parse(bet.substring(11, 19));
             sitterStartTime = new SimpleDateFormat("hh:mm:ss").parse(sst.substring(11, 19));
             sitterEndTime = new SimpleDateFormat("hh:mm:ss").parse(set.substring(11, 19));
        }catch (ParseException p) {
            System.out.println("parse problem" +p.toString());
        }

        if (bookingStartDate.compareTo(sitterEndDate) < 0) {
            return 0;
        }
        if (bookingEndDate.compareTo(sitterEndDate) > 0) {
            return 0;
        }
        if (bookingStartTime.compareTo(sitterEndTime) < 0) {
            return 0;
        }
        if (bookingEndtime.compareTo(sitterEndTime) > 0) {
            return 0;
        }


        return 1;
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
            if (temp.getWaitingSitter() == null) {
                temp.setWaitingSitter(_Lists.list(principal));
            }
            else {
                temp.addSitter(principal);
            }

        }

        NotificationDto ownerNoti = new NotificationDto();
        ownerNoti.setUserPrinciple(temp.getOwner());
        ownerNoti.setInfo("Hi, your pet: " + temp.getPetId() + " is applied up by sitter: " + temp.getSitter());
        NotificationDto sitterNoti = new NotificationDto();
        sitterNoti.setUserPrinciple(temp.getOwner());
        sitterNoti.setInfo("Hi, your have apply up: " + temp.getPetId() + " owned by: " + temp.getOwner());
        notificationDao.save(ownerNoti);
        notificationDao.save(sitterNoti);
        bookingDao.save(temp);
        return temp;
    }

    public BookingDto approve(String bookingId, String principle) {
        BookingDto temp = null;
        Optional<BookingDto> res = bookingDao.findBooking(bookingId);
        if (!res.isPresent()) {
            System.out.println("cant find it");
        }
        else {
            temp = res.get();
            temp.setSitter(principle);
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
        temp.signUp();
        bookingDao.save(temp);

        return temp;
    }


    public List<BookingDto> findOpenBooking() { return bookingDao.findOpenBooking();}

    public void deleteBooking(BookingDto bookingDto) {
        bookingDao.deleteBooking(bookingDto.getId());
    }

}
