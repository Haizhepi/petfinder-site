package petfinder.site.common.booking;

import org.apache.tomcat.jni.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

import java.awt.print.Book;
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

    public BookingDto processDate(BookingDto bookingDto) {
        bookingDto.setStartDate(bookingDto.getStartDate().substring(0, 10));
        bookingDto.setEndDate(bookingDto.getEndDate().substring(0, 10));
        bookingDto.setStartTime(bookingDto.getStartTime().substring(11, 19));
        bookingDto.setEndTime(bookingDto.getEndTime().substring(11, 19));
        return bookingDto;
    }

    public BookingDto sitterCancel(String bookingId) {
        BookingDto booking = null;
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<BookingDto> res = bookingDao.findBooking(bookingId);
        if (res.isPresent()) {
            booking = res.get();
        }
        booking.setSitter("none");
        UserDto sitter = userDao.findUserByPrincipal(principal).get().getUser();
        sitter.panelty();
        booking.setStatus(BookingDto.BookingStatus.UNSIGNED);
        return booking;
    }

    public static class RecommendSitter{
        UserDto user;
        SitterAvailabilityDto sitterAvailabilityDto;
        Double distance;

        public UserDto getUser() {
            return user;
        }

        public void setUser(UserDto user) {
            this.user = user;
        }

        public SitterAvailabilityDto getSitterAvailabilityDto() {
            return sitterAvailabilityDto;
        }

        public void setSitterAvailabilityDto(SitterAvailabilityDto sitterAvailabilityDto) {
            this.sitterAvailabilityDto = sitterAvailabilityDto;
        }

        public Double getDistance() {
            return distance;
        }

        public void setDistance(Double distance) {
            this.distance = distance;
        }
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
                        String bet, String sst, String set){
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

        if (bookingStartDate.compareTo(sitterStartDate) < 0) {
            return 0;
        }
        if (bookingStartDate.compareTo(sitterEndDate) > 0) {
            return 0;
        }
        if (bookingEndDate.compareTo(sitterStartDate) < 0) {
            return 0;
        }
        if (bookingEndDate.compareTo(sitterEndDate) > 0) {
            return 0;
        }
//        if ((int)bookingStartTime.getTime() % (24*60*60*1000L) - (int) (sitterStartTime.getTime() % (24*60*60*1000L)) < 0) {
//            return 0;
//        }
//        if ((int)bookingStartTime.getTime() % (24*60*60*1000L) - (int) (sitterEndTime.getTime() % (24*60*60*1000L)) > 0) {
//            return 0;
//        }
//        if ((int)bookingEndtime.getTime() % (24*60*60*1000L) - (int) (sitterStartTime.getTime() % (24*60*60*1000L)) < 0) {
//            return 0;
//        }
//        if ((int)bookingEndtime.getTime() % (24*60*60*1000L) - (int) (sitterEndTime.getTime() % (24*60*60*1000L)) > 0) {
//            return 0;
//        }
        return 1;
    }

    public BookingDto save(BookingDto booking) {
        bookingDao.save(booking);
        NotificationDto ownerNoti = new NotificationDto();
        ownerNoti.setUserPrinciple(booking.getOwner());
        ownerNoti.setInfo("You have started a booking of ur pet: " + booking.getPetId());
        notificationDao.save(ownerNoti);
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
        sitterNoti.setUserPrinciple(principal);
        sitterNoti.setInfo("Hi, your have apply up: " + temp.getPetId() + " owned by: " + temp.getOwner());
        notificationDao.save(ownerNoti);
        notificationDao.save(sitterNoti);
        bookingDao.save(temp);
        return temp;
    }

    public BookingDto confrim(String bookingId) {
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
        SitterAvailabilityDto avail = sitterAvailabilityDao.findAvailabilityByUserID(new UserDto(principal)).get();
        avail.getInvitations().remove(bookingId);
        NotificationDto ownerNoti = new NotificationDto();
        ownerNoti.setUserPrinciple(temp.getOwner());
        ownerNoti.setInfo("Hi, sitter has agree to the booking");
        NotificationDto sitterNoti = new NotificationDto();
        sitterNoti.setUserPrinciple(principal);
        sitterNoti.setInfo("Hi, your have signed up to the booking");
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
        sitterNoti.setUserPrinciple(temp.getSitter());
        sitterNoti.setInfo("Hi, your have been approved up: " + temp.getPetId() + " owned by: " + temp.getOwner());
        notificationDao.save(ownerNoti);
        notificationDao.save(sitterNoti);
        temp.signUp();
        bookingDao.save(temp);

        return temp;
    }

    public BookingDto invite(String bookingId, String principal) {
        SitterAvailabilityDto avail = sitterAvailabilityDao.findAvailabilityByUserID(new UserDto(principal)).get();
        BookingDto bookingDto = bookingDao.findBooking(bookingId).get();

        if (avail.getInvitations() == null) {
            avail.setInvitations(_Lists.list(bookingId));
        }
        else {
            avail.addInvitation(bookingId);
        }
        NotificationDto ownerNoti = new NotificationDto();
        ownerNoti.setUserPrinciple(bookingDto.getOwner());
        ownerNoti.setInfo("You have invite user: " + principal);
        NotificationDto sitterNoti = new NotificationDto();
        sitterNoti.setUserPrinciple(principal);
        sitterNoti.setInfo(bookingDto.getOwner() + "invites you to the booking");
        notificationDao.save(ownerNoti);
        notificationDao.save(sitterNoti);
        sitterAvailabilityDao.save(avail);
        System.out.println("invite sitter");
        return bookingDto;
    }


    public List<BookingDto> findOpenBooking() {
        List<BookingDto> list = bookingDao.findOpenBooking();
        List<BookingDto> res = new ArrayList<>();
        for (BookingDto b : list) {
            res.add(processDate(b));
        }
        return res;
    }

    public void deleteBooking(BookingDto bookingDto) {
        bookingDao.deleteBooking(bookingDto.getId());
    }


    public BookingDto finish(BookingDto bookingDto) {
        BookingDto temp = bookingDao.findBooking(bookingDto.getId()).get();
        temp.setStatus(BookingDto.BookingStatus.FINISHED);
        bookingDao.save(temp);
        return bookingDto;
    }

    public List<BookingDto> sitterBookings(String principal) {
        return bookingDao.sitterBookings(principal);
    }

    public String checkApproachingBooking() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
        if (!temp.isPresent()) {
            return "not logged in";
        }
        List<BookingDto> bookings = new ArrayList<>();

        UserDto.UserType type = temp.get().getUser().getType();
        UserDto user = temp.get().getUser();
        Date lastCheckDate = temp.get().getUser().getLastCheckDate();
        Date today = new Date();
        if (! withInOneDay(user.getLastCheckDate(), today)) {
            if (type == UserDto.UserType.OWNER) {
                bookings.addAll(userDao.findBookings(user));
            } else if (type == UserDto.UserType.SITTER) {
                bookings.addAll(bookingDao.sitterBookings(user.getPrincipal()));
            } else {
                bookings.addAll(userDao.findBookings(user));
                bookings.addAll(bookingDao.sitterBookings(user.getPrincipal()));
            }

            for (BookingDto booking : bookings) {
                Date bookingStartDate = new Date();
                try {
                    bookingStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(booking.getStartDate().substring(0, 10));
                } catch (ParseException e) {

                }
                if (withInOneDay(today, bookingStartDate)) {
                    NotificationDto ownerNoti = new NotificationDto();
                    ownerNoti.setUserPrinciple(booking.getOwner());
                    ownerNoti.setInfo("your booking starting from" + booking.getStartDate() + " with: " + booking.getSitter() + "will start soon. ");
                    NotificationDto sitterNoti = new NotificationDto();
                    sitterNoti.setUserPrinciple(booking.getSitter());
                    sitterNoti.setInfo("your booking with" + booking.getOwner() + " will start soon");
                    notificationDao.save(ownerNoti);
                    notificationDao.save(sitterNoti);
                    userDao.save(temp.get());
                }
            }
        }
        temp.get().getUser().setLastCheckDate(today);
        userDao.save(temp.get());
        return "all checked";
    }
    public final static long MILLIS_PER_DAY = 24 * 60 * 60 * 1000L;

    public boolean withInOneDay(Date date1, Date date2) {
        return Math.abs(date1.getTime() - date2.getTime()) < MILLIS_PER_DAY;
    }

}
